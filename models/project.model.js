
var dbConn = require('./../config/db.config');


var project = function (Project) {
    this.titre = Project.titre;
    this.description = Project.description;
    this.is_valid = Project.is_valid;
    this.coins = Project.coins;
    this.associationId = Project.associationId;

};


//get projets valide

project.showProjets = function (result) {
    dbConn.query("Select * from projects where is_valid=1 ", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

//get projet en attente de validation

project.showProjetsadmin = function (result) {
    dbConn.query("Select * from projects where is_valid=0 ", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};


//valider un projet 

project.validateProjet = function (id, result) {
    dbConn.query(
        "UPDATE projects SET is_valid=1 where id = ? ",
        id,
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                result(null, res);
            }
        }
    );
};

//modifier un projet

project.updateProjet = function (id, req, result) {
    dbConn.query(
        "UPDATE projects SET description=?,titre=? where id = ? ",
        [req.description, req.titre, id],
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                result(null, res);
            }
        }
    );
};

//insert projet

project.createProject = function (newProduct, id, result) {
    const new_p = new project(newProduct);
    new_p.associationId = id;
    new_p.coins = 0;
    new_p.is_valid = false;
    dbConn.query("INSERT INTO projects set ? ", new_p, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res.insertId);
        }
    });
};

//get un seule projet

project.getproject = function (id, result) {
    dbConn.query(
        "Select coins from projects where id = ?  ",
        id,
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                result(null, res);
            }
        }
    );
};


// faire un don a un projet

project.donateToProject = function (
    userNewCoins,
    projectNewCoins,
    idUser,
    idProject,
    result
) {
    dbConn.query("UPDATE projects SET coins=? where id = ?  ", [
        projectNewCoins,
        idProject,
    ]);
    dbConn.query(
        "UPDATE users SET coins=? where id = ?  ",
        [userNewCoins, idUser],
        function (err, res) {
            if (res.length == 0) {
                console.log("error: ", err);
                result(err, null);
            } else {
                result(null, res);
            }
        }
    );
};

module.exports = project;
