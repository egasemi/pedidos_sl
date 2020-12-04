const express = require('express');
const router = express.Router();

const Pedido = require('../models/pedidos');
const Lugar = require('../models/lugar');

// form pedido
router.get('/', async (req,res) => {
    const pedidos = await Pedido.find();
    const lugares = await Lugar.find({activo:true});
    var ent = [];
    var desc = [];
    for(var i = 0; i < pedidos.length; i++) {
        ent.push(pedidos[i].enteras);
        desc.push(pedidos[i].descremadas);
    };
    let totalEnt = ent.reduce((a,b) => a + b, 0);
    let totalDesc = desc.reduce((a,b) => a + b, 0);
    res.render('index', {
        pedidos,
        lugares,
        totalDesc,
        totalEnt
    });
});

// tabla pedidos
router.get('/lista', async (req,res) => {
    const lista = await Pedido.find()
    res.render('lista', {
        lista
    });
})

// agregar pedido
router.post('/add', async (req,res) => {
    const pedido = new Pedido(req.body);
    await pedido.save();
    console.log(pedido)
    res.redirect('/');
});

// eliminar pedido
router.get('/pedido/delete/:id',async (req, res) => {
    const { id } = req.params;
    await Pedido.deleteOne({_id: id});
    res.redirect('/lista');
})

// ver pedido
router.get('/pedido/:id', async (req, res) => {
    const { id } = req.params;
    const pedido = await Pedido.findById(id);
    const lugar = pedido.punto_retiro
    const lugares = await Lugar.find({activo:true});
    res.render('pedido',{
        pedido,
        lugares,
        lugar
    });

});

// editar pedido
router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    await Pedido.updateOne({_id:id}, req.body);
    console.log(req.body)
    res.redirect('/lista');
});

module.exports = router;