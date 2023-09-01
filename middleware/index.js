const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const {urlencoded, json, raw, static:staticMiddleware} = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./swagger')

/**
 * Register all custome and external middleware
 * @{Express} app the Express app
 */

const middlewareRegister = (app)=>{
    var corsOptions ={
        origin:'*',
        methods:['GET', 'PUT','POST','PATCH','DELETE'],
        allowedHeaders:['Content-Type', 'Authorization'],
    credential:true,
    }

    app.use(cors(corsOptions))
    app.use(cookieParser())
    app.use(bodyParser.json());
    app.use('/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    app.use(urlencoded({extended:true}))
}

module.exports = middlewareRegister