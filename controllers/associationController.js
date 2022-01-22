'use strict';
const Association = require('../models/association.model');



exports.loginAsso = function (req, res) {
    Association.loginAsso(req.body, function (err, user) {
        if (user != null) {
            res.status(200).json(user);
        } else {
            res.status(404).json("user name not found");
        }
    });
};



exports.assosiationProject = function (req, res) {
    Association.assosiationProject(req.params.id, function (err, Product) {
        if (err) res.send(err);
        res.json(Product);
    });
};


exports.assosiationdonation = function (req, res) {
    Association.assosiationdonation(req.params.id, function (err, Product) {
        if (err) res.send(err);
        res.json(Product);
    });
};

