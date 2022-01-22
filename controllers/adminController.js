'use strict';
const User = require('../models/user.model');
const project = require('../models/project.model');


exports.loginAdmin = function (req, res) {
    const login_user = new User(req.body);
    //handles null error
    User.loginAdmin(login_user, function (err, user) {
        if (user != null) {
            res.status(200).json({
                user,
            });
        } else {
            res.status(404).json("user name not found");
        }
    });
};


exports.showProjets = function (req, res) {
    project.showProjetsadmin(function (err, Product) {
        if (err) res.send(err);
        res.json(Product);
    });
};

exports.validateProjet = function (req, res) {
    project.validateProjet(req.params.id, function (err, Product) {
        if (err) res.send(err);
        res.json({ validate: "done" });
    });
};

exports.updateProjet = function (req, res) {
    project.updateProjet(req.params.id, req.body, function (err, Product) {
        if (err) res.send(err);
        res.json(Product);
    });
};


