const authenticateRouter = require("./authenticateRouter");
const resetPasswordRouter  = require("./resetPasswordRouter");
const contestsRouter = require("./contestsRouter");
const chatRouter = require("./chatRouter");
const userRouter = require("./userRouter");
const offersRouter = require("./offersRouter");
const express = require('express');

const router = express.Router();

router.use('/user', userRouter)
router.use('/authentication', authenticateRouter);
router.use('/recovery', resetPasswordRouter);
router.use('/contests', contestsRouter);
router.use('/offers', offersRouter)
router.use('/chat', chatRouter)

module.exports = router;
