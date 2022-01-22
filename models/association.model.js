
var dbConn = require('./../config/db.config');


var Association = function (association) {
    this.id = association.id;
    this.titre = association.titre;
    this.adr = association.adr;
    this.date_creat = association.date_creat;

};

//login association
Association.loginAsso = function (login_user, result) {
    console.log(login_user);
    dbConn.query(
        "Select * from associations where titre = ? AND  adr=? AND  id=? ",
        [login_user.titre, login_user.adr, login_user.id],
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

//get all projects of association
Association.assosiationProject = function (id, result) {
    dbConn.query("Select * from projects where associationId=? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

//get project have donation
Association.assosiationdonation = function (id, result) {
    dbConn.query("Select * from projects where associationId=? AND coins!=0 ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};




module.exports = Association;
