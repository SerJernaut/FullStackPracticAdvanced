const authenticateRouter = require("./authenticateRouter");
const resetPasswordRouter  = require("./resetPasswordRouter");
const contestRouter = require("./contestRouter");
const chatRouter = require("./chatRouter");
const userRouter = require("./userRouter");
const express = require('express');

const router = express.Router();

router.use('/user', userRouter)
router.use('/authentication', authenticateRouter);
router.use('/recovery', resetPasswordRouter);
router.use('/contest', contestRouter);
router.use('/chat', chatRouter)

module.exports = router;
