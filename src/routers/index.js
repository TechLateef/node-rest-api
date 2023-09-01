const userRoute = require("./user.route")



/**
 * Register all Routes
 * @param {Express} app Express app
 */
const registerRoutes = (app) =>{

app.get('/', (req, res)=>{
    res.send('Application is up and Rinning')
})

    app.use('/api/user', userRoute)
}

module.exports = registerRoutes