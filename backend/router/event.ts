// import { createId } from "@paralleldrive/cuid2";
// import { Router } from "express";
// import { engineQueue, redis } from "../services/redisClient";

// const router = Router();

// router.post("/initiate",async(req,res)=>{
//     const{userId , eventId , side , price ,quantity} = req.body
//     if(!userId || !eventId|| !side || !price || !quantity){
//         res.status(401).json({message : "invalid information"})
//         return
//     }
//     const responseId = createId()
//     const data = {
//         userId,
//         eventId,
//         side , 
//         price,
//         quantity,
//         type : "initiateOrder"
//     }
//     await engineQueue(data);
//     await redis.subscribe("initiateOrder",(data)=>{
//         const parseData = JSON.parse(data)
//         if(parseDa)
//     })
// })

// export default router;
