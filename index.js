const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')

const app = express();

app.use(express.static('public'))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// parse  application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

let bezeroak = [
    {
        id: 1,
        izena: 'Ane',
        abizena: 'Uriarte',
        email: 'ane@ni.eus'
    },
    {
        id: 2,
        izena: 'Jon',
        abizena: 'Juanenea',
        email: 'jon@ni.eus'
    },
    {
        id: 3,
        izena: 'Oihane',
        abizena: 'Lete',
        email: 'oihane@ni.eus'
    },
]

app.get("/", function(req, res) {
    res.render('index', {
        'izenburua': 'EJS probatzen',
        'bezeroak': bezeroak
    })
});

app.post('/bezeroa', function(req, res, next) {
    console.log("Entrando");
    res.send("Bezeroaren izena:" + req.body.izena);
    // console.log(req.text); // raw
    // next();
})

app.get('/bezeroa', function(req, res) {
    res.send("Bezeroaren izena: " + req.query.izena);
    res.send("Bezeroaren abizena: " + req.query.abizena);
});


/* app.get('/bezeroa/:izena', function(req, res) {
  res.send("Bezeroaren izena: " + req.params.izena);
});
*/


app.listen( 3000, function() {
    console.log("Zerbitzaria 3000 portuan entzuten");
})
