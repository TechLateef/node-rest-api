const express = require('express')
const { createUser, getAll, update, deleteUser } = require('../controllers/user.controller')
const user = require('../models/user')

const userRoute = express.Router()


userRoute.post('/', createUser)

userRoute.get('/', getAll)

userRoute.patch('/:id', update)

userRoute.delete('/:id', deleteUser)

module.exports = userRoute