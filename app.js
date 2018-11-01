const express = require('express')
const mustacheExpress = require('mustache-express')
var bodyParser = require('body-parser')
var session = require('express-session')
const app = express()
const port = 3000

let users = []
let vacationPosts = []

app.use(bodyParser.urlencoded({ extended: false }))
app.engine('mustache',mustacheExpress())
app.set('views','./views')
app.set('view engine','mustache')
app.use(session({
  secret: '1a2s3d4f',
  resave: false,
  saveUninitialized: false
}))

app.listen(port, function(){
  console.log('server is running...')
})

app.get('/vacation', function(req,res){
  res.render('vacation', { vacationPostsElement : vacationPosts}
)
})

app.post('/login', function(req,res){
  let username = req.body.username
  let password = req.body.password

  users.push({ username : username, password : password })
  console.log(users)

  let user = users.find(function(user){
    return user.username == username && user.password == password
  })
  if(user != null){

  }

  for(i = 0; i < users.length; i++){
    if (username == users[i].username){
      if(req.session) {
      // save the username in the session
      req.session.username = username
      // redirect user to root url
      res.redirect("/vacation")
    }
  }
}})

app.get('/login',function(req,res){
  res.render('login')
})

app.post('/add-vacation',function(req,res){

  let cityName = req.body.cityName
  let imgURL = req.body.imgURL
  let dateDeparture = req.body.dateDeparture
  let dateReturn = req.body.dateReturn

  vacationPosts.push({cityName : cityName, imgURL : imgURL, dateDeparture : dateDeparture, dateReturn : dateReturn})

  res.redirect('/vacation')
})
app.get('/add-vacation', function(req,res){
  res.render('add-vacation')
})


app.get('/', function(req,res){
  res.redirect('/login')
})
