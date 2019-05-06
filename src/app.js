const path=require('path')
const express=require('express')
const hbs=require('hbs')
const navigateRouter=require('./routers/navigate')
const dbRouter=require('./routers/db')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
app.set('view engine', 'hbs');
app.use(express.static(publicDirectoryPath))
app.use(express.json())
const partialsPath = path.join(__dirname, '../views/partials')
hbs.registerPartials(partialsPath)


app.use(navigateRouter)
app.use(dbRouter)

const port = process.env.PORT||3000; // to add heroku port
app.listen(port,()=>{
    console.log('running on port ', port)
})