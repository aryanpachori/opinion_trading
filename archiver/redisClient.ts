import { createClient } from "redis";


export const redis = createClient({
    socket:{
        port : 6379,
        host : 'localhost'
    }
})

await redis.connect().then(()=>{
    console.log("connected to  redis")
})
