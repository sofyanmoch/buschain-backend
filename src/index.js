const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const searchRoutes = require("./routes/search");
const bookingRoutes = require("./routes/booking");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/search", searchRoutes);
app.use("/api/book", bookingRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
