const express = require("express");
const router = express.Router();
const { contract } = require("../utils/web3");

router.post("/", async (req, res) => {
  try {
    const { from, to, date, passengerCount } = req.body;
    const price = ethers.utils.parseEther("0.01");

    const tx = await contract.bookTicket(from, to, date, passengerCount, { value: price });
    await tx.wait();

    res.json({ status: "success", txHash: tx.hash });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "failed", error: error.message });
  }
});

module.exports = router;
