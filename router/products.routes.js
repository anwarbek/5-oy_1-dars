const { Router } = require("express")
const { getAllProducts, getOneProduct, addProduct, updateProduct, deleteProduct } = require("../controller/product.ctr")
const adminChecker = require("../middleware/adminChecker")

const productRouter = Router()

productRouter.get("/get_all_products", getAllProducts)
productRouter.get("/get_oneproduct/:id", getOneProduct)
productRouter.post("/add_product", adminChecker, addProduct)
productRouter.put("/update_product/:id", adminChecker, updateProduct)
productRouter.delete("/delete_product/:id", adminChecker, deleteProduct)

module.exports = productRouter