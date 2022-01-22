const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
var documents = {};
const path = require('path');


app.use('/uploads', express.static(__dirname + '/public'));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const userRoutes = require('./routes/user.routes.js')
const ProductRoutes = require('./routes/product.routes.js')
const commandeRoutes = require('./routes/commande.routes.js')
const adminRoutes = require('./routes/adminRoutes')
const associationRoutes = require('./routes/associationRoutes')

app.use('/user', userRoutes)
app.use('/products', ProductRoutes)
app.use('/commande', commandeRoutes)
app.use('/admin', adminRoutes)
app.use('/association', associationRoutes)



io.on("connection", socket => {

    socket.on("getDoc", function () {
        socket.emit("document", documents[0]);
    });

    socket.on("editdoc", doc => {
        documents[0] = doc;
        socket.broadcast.emit("document", doc);
    });

});



const stripe = require('stripe')("sk_test_51Jdb9YEDz5NI9QSPt2lxmC3SlX1L86UBidf2ZsY8nSIOtsFsPZ4TgNxiv7ZuWwsSvCIOhu5LcrLhNGLE28lfGxKl006lkBsQkq")

app.post('/purchase/', function (req, res) {
    stripe.charges.create({
        amount: req.body[1] * 100,
        source: req.body[0].source.id,
        currency: 'usd',
    }).then(function () {
        console.log('Charge Successful')
        res.json({ message: 'Successfully purchased items' })
    }).catch(function (err) {
        console.log(err)
        res.status(500).end()
    })
});



app.post('/transfer/', function (req, res) {
    stripe.transfers.create({
        amount: req.body[1] * 100,
        currency: 'usd',
        destination: req.body[0].source.id,
        transfer_group: 'ORDER_95',
    });
});

app.get('/assets/:name', function (req, res) {
    res.sendFile(
        path.join(
            path.dirname(require.main.filename) + `/uploads/${req.params.name}`,
        ),
    );
});

http.listen(5000, () => {

    console.log(`Server is listening on port 5000`);
});
