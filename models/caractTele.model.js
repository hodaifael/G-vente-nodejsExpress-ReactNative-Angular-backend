'use strict';
var dbConn = require('./../config/db.config');
//Employee object create
var Caract = function (CaractTele) {
    this.id = CaractTele.id;
    this.capacite = CaractTele.capacite;
    this.dimension = CaractTele.dimension;
    this.camera = CaractTele.camera;
    this.ecran = CaractTele.ecran;
    this.id_product = CaractTele.id_product;
    this.alimentation = CaractTele.alimentation;
    this.tension = CaractTele.tension;
    this.vitesse = CaractTele.vitesse;
    this.capacitel = CaractTele.capacitel;
    this.capacitek = CaractTele.capacitek;
    this.puissance = CaractTele.puissance;
    this.dimensionecran = CaractTele.dimensionecran;
    this.processeur = CaractTele.processeur;
    this.ram = CaractTele.ram;
    this.disquedur = CaractTele.disquedur;
    this.resolution = CaractTele.resolution;
    this.technologieaffichage = CaractTele.technologieaffichage;
    this.stokage = CaractTele.stokage;
    this.communicationwifi = CaractTele.communicationwifi;
    this.connectivite = CaractTele.connectivite;
    this.appareilscompatibles = CaractTele.appareilscompatibles;


};


Caract.create = function (newProduct, result) {
    dbConn.query("INSERT INTO caracteristique set ?", newProduct, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res.insertId);
        }
    });


};


//affiche caracteristique technique

Caract.findcaractById = function (newProduct, result) {
    var caractiristique = "";
    for (let i = 0; i < newProduct.length; i++) {
        dbConn.query("Select * from caracteristique where id_product = ? ", newProduct[i].id, function (err, res) {
            caractiristique = ""
            switch (newProduct[i].type) {
                case "caract_tel":
                    if (res[0].capacite !== null) {
                        caractiristique = caractiristique + "capacite : " + res[0].capacite;
                    }
                    if (res[0].camera !== null) {
                        caractiristique = caractiristique + ", camera : " + res[0].camera;
                    }
                    if (res[0].dimension !== null) {
                        caractiristique = caractiristique + ", dimension : " + res[0].dimension;
                    }
                    if (res[0].ecran !== null) {
                        caractiristique = caractiristique + ", ecran : " + res[0].ecran;
                    }
                    newProduct[i].caracteristiques_techniques = caractiristique;
                    break;

                case "Consoles de jeux":
                    if (res[0].stokage !== null) {
                        caractiristique = caractiristique + "stokage : " + res[0].stokage;
                    }
                    if (res[0].ram !== null) {
                        caractiristique = caractiristique + ", ram : " + res[0].ram;
                    }
                    if (res[0].alimentation !== null) {
                        caractiristique = caractiristique + ", alimentation : " + res[0].alimentation;
                    }
                    if (res[0].communicationwifi !== null) {
                        caractiristique = caractiristique + ", communicationwifi : " + res[0].communicationwifi;
                    }
                    newProduct[i].caracteristiques_techniques = caractiristique;
                    break;


                case "Gros electroménagers":
                    if (res[0].dimensionecran !== null) {
                        caractiristique = caractiristique + "dimensionecran : " + res[0].dimensionecran;
                    }
                    if (res[0].technologieaffichage !== null) {
                        caractiristique = caractiristique + ", technologieaffichage : " + res[0].technologieaffichage;
                    }
                    if (res[0].resolution !== null) {
                        caractiristique = caractiristique + ", resolution : " + res[0].resolution;
                    }
                    if (res[0].capacitel !== null) {
                        caractiristique = caractiristique + ", capacitel : " + res[0].capacitel;
                    }
                    if (res[0].capacitel !== null) {
                        caractiristique = caractiristique + ", capacitel : " + res[0].capacitel;
                    }
                    if (res[0].capacitel !== null) {
                        caractiristique = caractiristique + ", capacitel : " + res[0].capacitel;
                    }
                    if (res[0].capacitel !== null) {
                        caractiristique = caractiristique + ", capacitel : " + res[0].capacitel;
                    }
                    newProduct[i].caracteristiques_techniques = caractiristique;
                    break;
                case "Bricolage":
                    if (res[0].vitesse !== null) {
                        caractiristique = caractiristique + "vitesse : " + res[0].vitesse;
                    }
                    if (res[0].tension !== null) {
                        caractiristique = caractiristique + ", tension : " + res[0].tension;
                    }
                    if (res[0].alimentation !== null) {
                        caractiristique = caractiristique + ", alimentation : " + res[0].alimentation;
                    }
                    newProduct[i].caracteristiques_techniques = caractiristique;
                    break;
                case "Ordinateurs":
                    if (res[0].ram !== null) {
                        caractiristique = caractiristique + "ram : " + res[0].ram;
                    }
                    if (res[0].processeur !== null) {
                        caractiristique = caractiristique + ", processeur : " + res[0].processeur;
                    }
                    if (res[0].disquedur !== null) {
                        caractiristique = caractiristique + ", disquedur : " + res[0].disquedur;
                    }
                    newProduct[i].caracteristiques_techniques = caractiristique;
                    break;
                case "Objets connectes":
                    if (res[0].connectivite !== null) {
                        caractiristique = caractiristique + "connectivite : " + res[0].connectivite;
                    }
                    if (res[0].alimentation !== null) {
                        caractiristique = caractiristique + ", alimentation : " + res[0].alimentation;
                    }
                    if (res[0].appareilscompatibles !== null) {
                        caractiristique = caractiristique + ", appareilscompatibles : " + res[0].appareilscompatibles;
                    }
                    newProduct[i].caracteristiques_techniques = caractiristique;
                    break;

            }

            if (i === newProduct.length - 1) {
                result(null, newProduct);
            }
        });
    }

};


//get tous caracteristique pour estimation de prix
Caract.allcaractiristique = function (array, result) {
    var array1 = [];
    for (let i = 0; i < array.length; i++) {
        dbConn.query("Select * from caracteristique where id_product = ? ", array[i].id, function (err, res) {
            array1.push(res[0]);
            if (i == array.length - 1) {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else {
                    result(null, array1);

                }
            }
        });
    }
};
module.exports = Caract;
