'use strict';
const project = require('../models/project.model');



exports.createProject = function (req, res) {
    project.createProject(req.body, req.params.id, function (err, user) {
        if (err) res.status(400).json("error de creation");
        res.status(200).json("created ");
    });
};
