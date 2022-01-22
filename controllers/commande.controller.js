'use strict';
const Commande = require('../models/commande.model');
const Info = require('../models/info.model');





exports.insertcommande = function (req, res) {
    const new_info = new Info(req.body[0]);
    //handles null error
    Commande.insertcommande(new_info, req.body[1], req.body[2], req.body[3], function (err, cmd) {
        if (err)
            res.send(err);
        res.json({ error: false, message: "product added successfully!", data: cmd });
    });

};




exports.getallcommande = function (req, res) {
    Commande.getallcommande(function (err, Cmd) {
        if (err)
            res.send(err);
        res.json(Cmd);
    });

};


exports.allcommandeCilent = function (req, res) {
    Commande.allcommandeCilent(req.params.id, function (err, Cmd) {
        if (err)
            res.send(err);
        res.json(Cmd);
    });

};


exports.getcommandeDetails = function (req, res) {
    Commande.getcommandeDetails(req.params.id, function (err, Cmd) {
        if (err)
            res.send(err);
        res.json(Cmd);
    });

};


exports.findOneclient = function (req, res) {
    Commande.findOneclient(req.params.id, function (err, Cmd) {
        if (err)
            res.send(err);
        res.json(Cmd);
    });

};