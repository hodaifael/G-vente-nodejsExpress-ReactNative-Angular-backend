'use strict';
var dbConn = require('./../config/db.config');
//Employee object create
var Stock = function (stock) {
    this.type = stock.type;
    this.description = stock.description;
    this.marque = stock.marque;
    this.caracteristiques_techniques = stock.caracteristiques_techniques;
    this.etat_esthetique = stock.etat_esthetique;
    this.prix = stock.prix;
    this.image = stock.image;
};


module.exports = Stock;
