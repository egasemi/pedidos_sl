const express = require('express');
const pedidos = require('../models/pedidos');
const router = express.Router();

const Pedido = require('../models/pedidos');

router.get('/', async (req,res) => {
    const pedidos = await Pedido.find();
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

router.get('/lista/delete/:id',async (req, res) => {
    const { id } = req.params;
    await Pedido.remove({_id: id});
    res.redirect('/lista');
})

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const pedido = await Pedido.findById(id);
    res.render('edit',{
        pedido
    });

});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    await Pedido.update({_id:id}, req.body);
    res.redirect('/lista');
});

module.exports = router;