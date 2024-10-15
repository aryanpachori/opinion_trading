import { Request, Response, Router } from "express";

const router = Router();

router.post("/test", async (req: Request, res: Response) => {
   res.json({ message: "c" });
   return
});

export default router;
