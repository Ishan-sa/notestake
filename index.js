const express = require('express')
const port = 3000;

const app = express()
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const homepagePath = __dirname + '/index.html'

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  console.log(req.body)
  res.sendFile(homepagePath)
})

app.post('/', (req, res) => {
  
})

app.get('welcome', (req, res) => {
  res.send('this is a welcome page')
})

app.listen(port, () => {
  console.log(`Notestake app listening on port ${port}`)
})
