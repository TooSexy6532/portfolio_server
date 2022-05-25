const { Category } = require("../models/category");

const getCategories = async (req, res) => {  
  const result  = await Category.find({}) 
  return result
}

module.exports = {
  getCategories
}