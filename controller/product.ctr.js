const uuid = require("uuid")
const { read_file, write_file } = require("../fs/fileSystem")

const getAllProducts = async (req, res) => {
  try {
    const products = read_file("products.json")
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//////////////////////////GET ONE PRODUCT///////////////////
const getOneProduct = async (req, res) => {
  try {
    const products = read_file("products.json")
    const foundedProduct = products.find((item) => item.id === req.params.id)

    if (!foundedProduct) {
      return res.status(400).json({
        message: "Product not found"
      })
    }
    res.ststus(200).json(foundedProduct)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const addProduct = async (req, res) => {
  try {
    const { title, price, quantity } = req.body
    const products = read_file("products.json")
    products.push({
      id: uuid.v4(),
      title,
      price,
      quantity
    })
    write_file("products.json", products)
    res.status(200).json({
      message: "added new product"
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


/////////////////UPDATE PRODUCT//////////////////
const updateProduct = async (req, res) => {
  try {
    const { title, price, quantity } = req.body
    const products = read_file("products.json")
    const foundedProduct = products.find((item) => item.id === req.params.id)

    if (!foundedProduct) {
      return res.status(400).json({
        message: "Product not found"
      })
    }
    products.forEach((item) => {
      if (item.id === req.params.id) {
        item.title = title ? title : item.title
        item.price = price ? price : item.price
        item.quantity = quantity ? quantity : item.quantity
      }
    })

    write_file("products.json", products)
    res.status(200).json({
      message: "Updated new product"
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

////////////////////DELETE PRODUCT//////////////////
const deleteProduct = async (req, res) => {
  try {
    const products = read_file("products.json")
    const foundedProduct = products.find((item) => item.id === req.params.id)

    if (!foundedProduct) {
      return res.status(400).json({
        message: "Product not found"
      })
    }
    products.forEach((item, index) => {
      if (item.id === req.params.id) {
        products.splice(index, 1)
      }
    })

    write_file("products.json", products)
    res.status(200).json({
      message: "Deleted new product"
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getAllProducts,
  getOneProduct,
  addProduct,
  updateProduct,
  deleteProduct
}