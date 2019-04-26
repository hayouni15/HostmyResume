const path=require('path')
const express=require('express')
const hbs=require('hbs')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
app.set('view engine', 'hbs');
app.use(express.static(publicDirectoryPath))
app.use(express.json())
const partialsPath = path.join(__dirname, '../views/partials')
hbs.registerPartials(partialsPath)
 
app.get('/', function (req, res) {
  res.render('index.hbs')
})
app.get('/templates', function (req, res) {
  res.render('templates.hbs')
})

app.get('/pricing', function (req, res) {
  res.render('pricing.hbs')
})

app.get('/contact', function (req, res) {
  res.render('contact.hbs')
})

app.get('/portfolio', function (req, res) {
  res.render('portfolio.hbs')
})



app.listen(3000,()=>{
    console.log('running on port ', 3000)
})