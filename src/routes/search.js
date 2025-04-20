const express = require("express");
const router = express.Router();

const dummyRoutes = [
  // Jakarta Routes
  { from: "Jakarta", to: "Bandung", company: "Sinar Jaya", price: "0.01 ETH", duration: "3 hours" },
  { from: "Jakarta", to: "Surabaya", company: "27 Trans", price: "0.015 ETH", duration: "12 hours" },
  { from: "Jakarta", to: "Yogyakarta", company: "Pahala Kencana", price: "0.012 ETH", duration: "10 hours" },
  { from: "Jakarta", to: "Semarang", company: "Sinar Jaya", price: "0.011 ETH", duration: "8 hours" },
  { from: "Jakarta", to: "Malang", company: "Lorena", price: "0.014 ETH", duration: "14 hours" },
  
  // Surabaya Routes
  { from: "Surabaya", to: "Malang", company: "DAMRI", price: "0.005 ETH", duration: "2 hours" },
  { from: "Surabaya", to: "Yogyakarta", company: "Sinar Jaya", price: "0.008 ETH", duration: "8 hours" },
  { from: "Surabaya", to: "Semarang", company: "Pahala Kencana", price: "0.007 ETH", duration: "6 hours" },
  { from: "Surabaya", to: "Bali", company: "Sumber Kencono", price: "0.02 ETH", duration: "12 hours" },
  
  // Yogyakarta Routes
  { from: "Yogyakarta", to: "Semarang", company: "Sinar Jaya", price: "0.006 ETH", duration: "4 hours" },
  { from: "Yogyakarta", to: "Solo", company: "DAMRI", price: "0.004 ETH", duration: "1 hour" },
  { from: "Yogyakarta", to: "Malang", company: "Pahala Kencana", price: "0.009 ETH", duration: "8 hours" },
  
  // Bali Routes
  { from: "Bali", to: "Lombok", company: "Perama Tour", price: "0.015 ETH", duration: "8 hours" },
  { from: "Bali", to: "Surabaya", company: "Sumber Kencono", price: "0.02 ETH", duration: "12 hours" },
  
  // Medan Routes
  { from: "Medan", to: "Pekanbaru", company: "ALS", price: "0.01 ETH", duration: "8 hours" },
  { from: "Medan", to: "Padang", company: "Kurnia", price: "0.012 ETH", duration: "12 hours" },
  
  // Makassar Routes
  { from: "Makassar", to: "Toraja", company: "Lorena", price: "0.008 ETH", duration: "8 hours" },
  { from: "Makassar", to: "Pare-pare", company: "DAMRI", price: "0.005 ETH", duration: "3 hours" }
];

router.get("/", (req, res) => {
  try {
    const { from, to } = req.query;
    
    // Check if required parameters are present
    if (!from || !to) {
      return res.status(400).json({
        data: [],
        success: false,
        message: "Missing required parameters: 'from' and 'to' are required"
      });
    }

    // Convert to lowercase for case-insensitive comparison
    const fromLower = from.toLowerCase();
    const toLower = to.toLowerCase();

    const filtered = dummyRoutes.filter(r =>
      r.from.toLowerCase() === fromLower &&
      r.to.toLowerCase() === toLower
    );

    res.json({
      data: filtered,
      success: true,
      message: filtered.length > 0 ? "Routes found successfully" : "No routes found"
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      data: [],
      success: false,
      message: "An error occurred while searching for routes"
    });
  }
});

module.exports = router;
