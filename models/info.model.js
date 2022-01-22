'use strict';
var dbConn = require('./../config/db.config');
//Employee object create

var Info = function (Info) {
    this.fname = Info.fname;
    this.mnumber = Info.mnumber;
    this.city = Info.city;
    this.adress = Info.adress;

};





module.exports = Info;
