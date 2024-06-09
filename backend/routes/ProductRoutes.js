const express = require('express')
const routes = express()
const ProductController = require("../controller/ProductController")
const { productValidator } = require("../middleware/validation")

// const createValidation = require("../middleware/validation");
// const createValidationPartial = require("../middleware/validationPartial");

const { isAuthorized } = require("../middleware/authValidationJWT");

// routes.get("/getall", ProductController.getAllProducts);

// requirement
// gets all data
routes.get("/getall", ProductController.getAll);

// get one data
routes.get("/:id", productValidator.delete, ProductController.getOne);

// deletes
routes.delete("/:id", isAuthorized, productValidator.delete, ProductController.delete);

// add
routes.post('/add', 
isAuthorized, 
productValidator.create, 
ProductController.add)

// partial update
routes.patch('/:id', isAuthorized, productValidator.update, ProductController.update)

// update
// routes.put('/:id', createValidation, ProductController.update)

module.exports = routes