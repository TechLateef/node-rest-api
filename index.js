const express = require('express')
const user = require('./routers/user.route')
const app = express()

// app.use('/api/user', user)

require('./startup/route')(app)

app.listen(3000, ()=>{
    console.log("Runing");
})