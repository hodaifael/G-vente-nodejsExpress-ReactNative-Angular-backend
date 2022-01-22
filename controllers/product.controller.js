'use strict';
const Product = require('../models/product.model');
const Stock = require('../models/stock.model');
const Caract = require('../models/caractTele.model');

exports.create = function (req, res) {
    const new_product = new Product(req.body);
    //handles null error
    Product.create(new_product, function (err, product) {
        if (err)
            res.send(err);
        res.json({ data: product });
    });

};

exports.createcarctphone = function (req, res) {
    //handles null error
    Caract.create(req.body, function (err, product) {
        if (err)
            res.send(err);
        res.json({ error: false, message: "product added successfully!", data: product });
    });

};

exports.findcaractById = function (req, res) {
    //handles null error
    Caract.findcaractById(req.body, function (err, product) {
        if (err)
            res.send(err);
        res.json(product);
    });

};



exports.createinfo = function (req, res) {
    const new_info = new Product(req.body);
    //handles null error
    Product.createinfo(new_info, function (err, info) {
        if (err)
            res.send(err);
        res.json({ error: false, message: "product added successfully!", data: info });
    });

};


exports.findAllenattend = function (req, res) {
    Product.findAllenattend(function (err, Product) {
        Caract.findcaractById(Product, function (err, res1) {
            if (err)
                res.send(err);
            res.json(Product);
        });
    });
};

exports.findAllrefuser = function (req, res) {
    Product.findAllrefuser(function (err, Product) {
        Caract.findcaractById(Product, function (err, res1) {
            if (err)
                res.send(err);
            res.json(Product);
        });
    });
};

exports.getstock = function (req, res) {
    Product.getstock(req.params.id, function (err, Product) {
        if (err)
            res.send(err);
        res.send(Product);
    });
};


exports.findById = function (req, res) {
    Product.findById(req.params.id, function (err, Product) {
        if (err)
            res.send(err);
        res.json(Product);
    });
};

exports.findByIdFromstock = function (req, res) {
    Product.findByIdFromstock(req.body[0], function (err, Product) {
        if (err)
            res.send(err);
        res.json(Product);
    });
};

exports.findAllByIdoffre = function (req, res) {
    Product.findAllByIdoffre(req.params.id, function (err, Product) {
        Caract.findcaractById(Product, function (err, res1) {
            if (err)
                res.send(err);
            res.json(Product);
        });
    });

};

exports.findAllByIdenattend = function (req, res) {
    Product.findAllByIdenattend(req.params.id, function (err, Product) {
        Caract.findcaractById(Product, function (err, res1) {
            if (err)
                res.send(err);
            res.json(Product);
        });
    });
};

exports.findAllByIdrefuser = function (req, res) {
    Product.findAllByIdrefuser(req.params.id, function (err, Product) {
        Caract.findcaractById(Product, function (err, res1) {
            if (err)
                res.send(err);
            res.json(Product);
        });
    });
};

exports.findAllByIdcontre = function (req, res) {
    Product.findAllByIdcontre(req.params.id, function (err, Product) {
        Caract.findcaractById(Product, function (err, res1) {
            if (err)
                res.send(err);
            res.json(Product);
        });
    });
};

exports.accepteClient = function (req, res) {
    Product.accepteClient(req.params.id, function (err, Product) {
        if (err)
            res.send(err);
        res.json(Product);
    });
};


exports.valideadmin = function (req, res) {
    const new_product = new Stock(req.body[0]);
    Product.valideadmin(new_product, req.body[1], function (err, res1) {
        if (err)
            res.send(err);
        res.json(res1);
    });

};

exports.refuseradmin = function (req, res) {
    Product.refuseradmin(req.params.id, function (err, Product) {
        if (err)
            res.send(err);
        res.json(Product);
    });
};
exports.contreoffre = function (req, res) {
    const new_product = new Product(req.body);
    Product.contreoffre(new_product, function (err, product) {
        if (err)
            res.send(err);
        res.json({ error: false, message: "product added successfully!", data: product });
    });

};
exports.changeprix = function (req, res) {
    const new_product = new Product(req.body);
    Product.changeprix(new_product, function (err, product) {
        if (err)
            res.send(err);
        res.json({ error: false, message: "product added successfully!", data: product });
    });

};


exports.delete = function (req, res) {
    Product.delete(req.params.id, function (err, employee) {
    });


};



exports.addMultipleimage = function (req, res, next) {
    const files = req.files;
    Product.addimage(files, req.params.id, function (err, product) {
        if (err)
            res.send(err);
        res.json({ error: false, message: "product added successfully!", data: product });
    });
    if (!files) {
        const error = new Error('No File')
        error.httpStatusCode = 400
        return next(error)
    }
}





exports.getproductBytype = function (req, res) {
    Product.getproductBytype(req.params.id, function (err, Product) {
        if (err)
            res.send(err);
        res.json(Product);
    });

};



exports.allcaractiristique = function (req, res) {
    Caract.allcaractiristique(req.body, function (err, Product) {
        if (err)
            res.send(err);
        res.json(Product);
    });

};




exports.chiffreproduct = function (req, res) {
    Product.chiffreproduct(req.params.id, function (err, Product) {
        if (err)
            res.send(err);
        res.json(Product);
    });
};



exports.chiffrecommande = function (req, res) {
    Product.chiffrecommande(req.params.id, function (err, Product) {
        if (err)
            res.send(err);
        res.json(Product);
    });
};

