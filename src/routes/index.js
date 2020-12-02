const express = require('express');
const router = express.Router();

const Pedido = require('../models/pedidos');
const Lugar = require('../models/lugar');

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


router.get('/lista', async (req,res) => {
    const lista = await Pedido.find()
    res.render('lista', {
        lista
    });
})

router.post('/add', async (req,res) => {
    const pedido = new Pedido(req.body);
    await pedido.save();
    res.redirect('/');
});

router.get('/pedido/delete/:id',async (req, res) => {
    const { id } = req.params;
    await Pedido.deleteOne({_id: id});
    res.redirect('/lista');
})

router.get('/pedido/:id', async (req, res) => {
    const { id } = req.params;
    console.log(req.params);
    const pedido = await Pedido.findById(id);
    const lugar = pedido.punto_retiro
    console.log(lugar);
    const lugares = await Lugar.find({activo:true});
    console.log(lugares)
    res.render('pedido',{
        pedido,
        lugares,
        lugar
    });

});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    await Pedido.updateOne({_id:id}, req.body);
    res.redirect('/lista');
});

module.exports = router;