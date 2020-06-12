const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const passport = require('passport')

//Initialize app
const app = express()

//Middleware
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use(cors())

app.use(express.static(path.join(__dirname,'public')))//Setting our public folder as  static directory

//Use The Passport Middleware to protect the route
app.use(passport.initialize())

require('./config/passport')(passport)


//Bring in the Database Config and connect with DataBase
const db = require('./config/keys').mongoURL
mongoose.connect(db, { useNewUrlParser : true,useUnifiedTopology: true}).then(()=>{
    console.log('Database connected!')
}).catch(err=> console.log('Cannot connect DataBase'))

//Bring the users route
const user = require('./routes/api/users')
app.use('/api/users',user)

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/index.html'))
})

const PORT = process.env.PORT ||5000

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`)
})