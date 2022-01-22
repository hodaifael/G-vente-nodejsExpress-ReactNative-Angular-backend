'use strict';
var dbConn = require('./../config/db.config');
//Employee object create
var User = function (User) {
    this.id = User.id;
    this.username = User.username;
    this.password = User.password;
    this.email = User.email;
    this.type = User.type;

};



//registre

User.registre = function (newUser, result) {
    dbConn.query("INSERT INTO users set ?", newUser, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res.insertId);
        }
    });
};


// user login

User.loginUser = function (login_user, result) {
    console.log(login_user);
    dbConn.query(
        "Select * from users where username = ? and password=? ",
        [login_user.username, login_user.password],
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

//login pour web

User.login = function (login_user, result) {
    console.log(login_user);
    dbConn.query("Select * from users where username = ? and password=? ", [login_user.username, login_user.password], function (err, res) {
        if (res.length == 0) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};


// Admin login mobile

User.loginAdmin = function (login_user, result) {
    dbConn.query(
        "Select * from users where username = ? and password=? ",
        [login_user.username, login_user.password],
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

//update compte utilisateur

User.update = function (login_user, result) {
    dbConn.query("UPDATE users set password=? where email=? ", [login_user.password, login_user.email], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};



// get coins d'utilisateur

User.getuser = function (id, result) {
    dbConn.query(
        "Select coins from users where id = ?  ",
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


module.exports = User;
