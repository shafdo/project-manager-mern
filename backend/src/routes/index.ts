import { Router } from "express";

const router = Router();

// Define your routes here
router.get("/", (req, res) => {
  res.json({ message: "API up and running..." });
});

export default router;
