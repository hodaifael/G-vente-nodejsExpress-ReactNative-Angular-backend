'use strict';
var dbConn = require('./../config/db.config');
//Employee object create

var Commande = function (Commande) {
    this.type = Commande.type;
    this.description = Commande.description;
    this.marque = Commande.marque;
    this.caracteristiques_techniques = Commande.caracteristiques_techniques;
    this.etat_esthetique = Commande.etat_esthetique;
    this.prix = Commande.prix;
    this.id_Client = Commande.id_Client;
    this.loginid = Commande.loginid;
    this.image = Commande.image;
};


//ajouter commande

Commande.insertcommande = function (newinfo, newcomd, newcoin, loginid, result) {

    dbConn.query("INSERT INTO clients set ?", newinfo, function (err, res) {
        for (let i = 0; i < newcomd.length; i++) {
            const new_comd = new Commande(newcomd[i]);
            new_comd.id_Client = res.insertId;
            new_comd.loginid = loginid;
            dbConn.query("INSERT INTO commande set ?", new_comd);
        }
        dbConn.query("update users set coins=coins+? where id=?", [newcoin, loginid]);
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });


};

//get all commande

Commande.getallcommande = function (result) {
    dbConn.query('Select * from clients ', function (err, res1) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res1);
        }
    });
};

//get historique des commandes

Commande.allcommandeCilent = function (id, result) {
    console.log(id);
    dbConn.query('Select * from commande where loginid=? ', id, function (err, res1) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res1);
        }
    });
};


//get details commande

Commande.getcommandeDetails = function (id, result) {
    dbConn.query('Select * from commande where id_client=?', id, function (err, res1) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res1);
        }
    });
};

//get client avec id

Commande.findOneclient = function (id, result) {
    dbConn.query('Select * from clients where id=?', id, function (err, res1) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res1);
        }
    });
};


module.exports = Commande;
