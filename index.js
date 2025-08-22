const express = require("express")
require("dotenv").config()
const cors = require("cors")
const authRouter = require("./router/auth.routes")
const productRouter = require("./router/products.routes")

const app = express()
const PORT = process.env.PORT || 3000
app.use(cors())
app.use(express.json())


// router//////////
app.use("/auth", authRouter)
app.use(productRouter)

app.listen(PORT, () => {
  console.log("server is runnint at: " + PORT);
})

app.get("/", (req, res) => {
  res.json("salom")
})