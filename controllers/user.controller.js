'use strict';
const User = require('../models/user.model');
const project = require('../models/project.model');

exports.registre = function (req, res) {
    const new_user = new User(req.body);
    //handles null error

    User.registre(new_user, function (err, user) {
        if (err)
            res.send(err);
        res.json({ error: false, message: "User added successfully!", data: user });
    });

};


exports.loginUser = function (req, res) {
    const login_user = new User(req.body);
    User.loginUser(login_user, function (err, user) {
        if (user != null) {
            res.status(200).json({
                user,
            });
        } else {
            res.status(404).json("user name not found");
        }
    });
};

exports.login = function (req, res) {
    const login_user = new User(req.body);
    User.login(login_user, function (err, user) {
        if (user != null) {
            res.status(200).json(user);
        } else {
            res.status(404).json('user name not found');
        }
    });

};

exports.update = function (req, res) {
    const login_user = new User(req.body);
    //handles null error

    User.update(login_user, function (err, user) {
        if (user) {
            res.status(200).json({
                "logged": "true"
            })
        } else {
            res.status(404).json('user name not found')
        }

    });

};

//
exports.showProjets = function (req, res) {
    project.showProjets(function (err, Product) {
        if (err) res.send(err);
        res.json(Product);
    });
};


// donation by the user to the project

exports.donateToProject = function (req, res) {
    const donation = req.body.donation;
    User.getuser(req.params.idUser, function (err, res1) {
        project.getproject(req.params.idProject, function (err, res2) {
            var userNewCoins = res1[0].coins - donation;
            var projectNewCoins = res2[0].coins + donation;
            project.donateToProject(
                userNewCoins,
                projectNewCoins,
                req.params.idUser,
                req.params.idProject,
                function (err, Product) {
                    if (Product) {
                        res.status(200).json({
                            userNewCoins,
                        });
                    } else {
                        res.status(404).json("user name not found");
                    }
                }
            );
        });
    });
};