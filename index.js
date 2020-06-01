const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const mongojs = require('mongojs')
const db = mongojs('bezeroakdb', ['bezeroak'])

const app = express();

app.use(express.static('public'))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// parse  application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req, res) {
    db.bezeroak.find( function (err, docs) {
        if (err) {
            console.log(err)
        } else {
            console.log(docs);
            res.render('index', {
                'izenburua': 'EJS probatzen',
                'bezeroak': docs
            })
        }
    })
});

app.post('/bezeroa', function(req, res) {
    const bezeroBerria =  {
        izena : req.body.izena,
        abizena: req.body.abizena,
        email: req.body.email
    };

    console.log(bezeroBerria);

    db.bezeroak.insert( bezeroBerria, function(err) {
        if (err) {
            console.log(err);
        } else {
            db.bezeroak.insert( bezeroBerria );
            res.redirect('/');
        }
    })
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
