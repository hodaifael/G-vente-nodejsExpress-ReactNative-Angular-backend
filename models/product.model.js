'use strict';
var dbConn = require('./../config/db.config');
const project = require('./project.model');
//Employee object create
var Product = function (Product) {
    this.id = Product.id;
    this.type = Product.type;
    this.description = Product.description;
    this.marque = Product.marque;
    this.etat_esthetique = Product.etat_esthetique;
    this.prix = Product.prix;
    this.prixofficiel = Product.prixofficiel;
    this.id_Client = Product.id_Client;
    this.etat = Product.etat;
    this.image = Product.image;
};


//inseret product

Product.create = function (newProduct, result) {
    const new_p = new Product(newProduct);
    dbConn.query("INSERT INTO products set ? ", new_p, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res.insertId);
        }
    });
};


Product.findById = function (id, result) {
    dbConn.query("Select * from products where id = ? ORDER BY date DESC", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};


Product.findByIdFromstock = function (id, result) {
    dbConn.query("Select * from stock where id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};



//supprition du produit et le caracteristique technique

Product.delete = function (id, result) {
    dbConn.query("DELETE FROM products WHERE id = ?", [id]);
    dbConn.query("DELETE FROM caracteristique WHERE id_product = ?", [id]);
};


//ajouter multiple images

Product.addimage = function (files, id, result) {

    dbConn.query('UPDATE products SET image=? where id = ?', [files[0].filename, id]);
    for (let i = 0; i < files.length; i++) {
        dbConn.query('INSERT INTO  images set image=? , idproduct = ?', [files[i].filename, id], function (err, res) {

        });
        if (i === files.length - 1) {
            result(null, true);
        }
    }
};

//get produits de meme type pour estimation de prix

Product.getproductBytype = function (id, result) {
    dbConn.query('Select * from products where type=? ORDER BY date DESC', id, function (err, res1) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res1);
        }
    });
};














//admin
///
//get produit en attend pour admin
Product.findAllenattend = function (result) {
    dbConn.query('Select * from products where etat="enAttend" ORDER BY date DESC', function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

//get produit en refuser pour admin


Product.findAllrefuser = function (result) {
    dbConn.query('Select * from products where etat="refuser" ORDER BY date DESC', function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};


//modifier l'etat de produit apres la validation d'admin  
//l'ajout du produit en stock 

Product.valideadmin = function (new_productstock, id, result) {
    dbConn.query('UPDATE products SET etat="valide" where id = ? ', id);
    dbConn.query("INSERT INTO stock set ?", new_productstock, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }

    });
};


//modifier l'etat de produit apres le refus d'admin  

Product.refuseradmin = function (id, result) {
    dbConn.query('UPDATE products SET etat="refuser" where id = ? ', id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

//modifier l'etat et le prix de produit apres le contre offre d'admin  


Product.contreoffre = function (product, result) {
    dbConn.query('UPDATE products SET etat="contreoffre" ,prix =?  WHERE id = ?', [product.prix, product.id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};


Product.changeprix = function (product, result) {
    console.log(product);
    dbConn.query('UPDATE products SET  prix =?,prixofficiel=?  WHERE id = ?', [product.prix, product.prixofficiel, product.id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};







//get offres pour marchand

Product.findAllByIdoffre = function (id, result) {
    dbConn.query('Select * from products where id_Client = ? and etat="offre" ORDER BY date DESC', id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

//get produits en Attent de verification technique pour marchand


Product.findAllByIdenattend = function (id, result) {
    dbConn.query('Select * from products where id_Client = ? and etat="enAttend" ORDER BY date DESC ', id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

//get produits refuser pour marchand


Product.findAllByIdrefuser = function (id, result) {
    dbConn.query('Select * from products where id_Client = ? and etat="refuser"  ORDER BY date DESC', id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

//get produits contre offre pour marchand


Product.findAllByIdcontre = function (id, result) {
    dbConn.query('Select * from products where id_Client = ? and etat="contreoffre" ORDER BY date DESC', id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

//modifier l'etat de produit apres l'acceptation du marchand  

Product.accepteClient = function (id, result) {
    dbConn.query('UPDATE products SET etat="enAttend" where id = ? ', id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};










//get chiffre d'affaire achtee

Product.chiffreproduct = function (id, result) {
    dbConn.query('Select SUM(prix)  as somme from products where etat="valide" ', function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

//get chiffre d'affaire vendu


Product.chiffrecommande = function (id, result) {
    dbConn.query('Select SUM(prix)  as somme from commande  ', function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};



//get les produits valide a vendre

Product.getstock = function (filter, result) {
    if (filter == "all") {
        dbConn.query('Select * from stock ', function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            }
            else {
                result(null, res);
            }
        });
    } else {
        dbConn.query('Select * from stock where type=? ', filter, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            }
            else {
                result(null, res);
            }
        });
    }
};

module.exports = Product;
