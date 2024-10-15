import  express  from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import { startWorker } from './service/intialiseWorker';
const app = express()

app.use(cors());
app.use(bodyParser.json())
startWorker();

app.listen(3002,()=>{
    console.log("worker running on 3002")
})