import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import { redis } from "./redisClient"

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.listen(3003,()=>{
    console.log("server running on 3003")
})

async function startArchiver() {
    while (true) {
        // 2-> consumer groups -> websocket_consumer and archiver_consumer
        // 3-> streams -> trade_stream, event_stream , order_stream
        const result = await redis.XREADGROUP('GROUP', 'archiver_group', 'archiver_consumer', 'STREAMS', 'trade_events', '>');
        
        if (result) {
            for (const [stream, messages] of result) {
                for (const [id, fields] of messages) {
                    const tradeData = JSON.parse(fields[1]); 
                    //await storeTradeInDb(tradeData);
                    await redis.xAck('trade_events', 'archiver_group', id);
                }
            }
        }
    }
}