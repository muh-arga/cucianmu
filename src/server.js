require("dotenv").config()
const express = require("express")
const cors = require("cors")
const path = require("path")

const errorHandler = require("./interface/middleware/errorHandleMiddleware")

const app = express()

// routes
const authRoutes = require("./interface/routes/authRoutes")
const serviceRoutes = require("./interface/routes/serviceRoutes")

app.use(cors())
app.use(express.json())

// Upload folder static
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")))

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({error: "Something went wrong!"})
})

app.use("/api/auth", authRoutes)
app.use("/api", serviceRoutes)

// Error handler middleware
app.use(errorHandler)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  try {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})
