import { Router } from "express";

const router: Router = Router();

// Routing
// Authentication and Registration
router.post("/auth/register", (req, res) => {
  res.json("register");
  console.log(req.body.name);
});

export default router;
