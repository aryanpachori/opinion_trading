import { createClient } from "redis";


export const redis = createClient({
    socket:{
        port : 6379,
        host : 'localhost'
    }
})


