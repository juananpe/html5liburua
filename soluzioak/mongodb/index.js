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

    if (req.body._id) {
        db.bezeroak.update(
            {_id: mongojs.ObjectID(req.body._id)},
            {
                $set: bezeroBerria
            }, function (err) {
                if (err) {
                    console.log(err);
                }
            })
    }else{
        db.bezeroak.insert( bezeroBerria );
    }

    res.redirect('/');
})

app.get('/bezeroa', function(req, res) {
    res.send("Bezeroaren izena: " + req.query.izena);
    res.send("Bezeroaren abizena: " + req.query.abizena);
});

app.get('/bezeroa/ezabatu/:id', function(req, res) {

    db.bezeroak.find(
        {"_id":  mongojs.ObjectID(req.params.id)},
        function (err, doc) {
            if (err) {
                console.log(err)
            } else {
                res.render('ezabatu', {
                    'izenburua': 'Bezeroa ezabatu',
                    'bezeroa': doc[0]
                })
            }
        })
})

app.post('/bezeroa/ezabatu', function(req, res) {
    db.bezeroak.remove(
        {_id:  mongojs.ObjectID(req.body._id)}, function () {
            console.log("zuzen ezabatu da");
        }
    );
    res.redirect('/');
})


app.get('/bezeroa/editatu/:id', function(req, res) {

    console.log(req.params.id);

    db.bezeroak.find(
        {"_id":  mongojs.ObjectID(req.params.id)},
        function (err, doc) {
        if (err) {
            console.log(err)
        } else {
            res.render('editatu', {
                'izenburua': 'Bezeroa editatu',
                'bezeroa': doc[0]
            })
        }
    })
});

const port = process.env.PORT || 3000;

app.listen( port, function() {
    console.log(`Zerbitzaria ${port} portuan entzuten`);
})
