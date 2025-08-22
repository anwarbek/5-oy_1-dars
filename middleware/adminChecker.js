const jwt = require("jsonwebtoken")

module.exports = function adminChecker(req, res, next) {
  try {
    const token = req.headers.authorization

    if (!token) {
      return res.status(401).json({
        message: "Token note found"
      })
    }

    const bearer = token.split(" ")[0]
    const accessToken = token.split(" ")[1]


    if (bearer !== "Bearer" || !accessToken) {
      return res.status(401).json({
        message: "Invalid Bearer or invalid access token"
      })
    }

    const decode = jwt.verify(accessToken, process.env.SEKRET_KEY)
    req.user = decode
    ///////////////////GUARD///////////////////
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "You are not admin"
      })
    }

    next()
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}