const express = require('express')
const routes = express()
const AuthController = require("../controller/AuthController")
const ProductController = require("../controller/ProductController")
const { userValidator, authValidator } = require("../middleware/validation")
// const { authValidator } = require("../middleware/authValidation");

// for signing up
routes.post('/auth/signup', userValidator.create, authValidator.create, AuthController.signup)

// for logging in
routes.post('/auth/login', authValidator.login, AuthController.login)

// for logging in
// routes.post('/auth/login', authValidator.login, ProductController.getAll)

module.exports = routes