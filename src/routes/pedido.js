const express = require('express');
const router = express.Router();

const Pedido = require('../models/pedido');
const Lugar = require('../models/lugar');
const Producto = require('../models/producto');

//nuevo pedido
router.post('/', async (req,res) => {
    const pedido = new Pedido(req.body)
    await pedido.save();
    res.redirect('pedido');
});

// ver pedido
router.get('/:id', async (req,res) => {
    const { id } = req.params;

    const pedido = await Pedido.findById(id)
    .populate('lugar')
    .populate({
        path:'items',
        populate:{
            path: 'producto'
        }
    });

    const lista_productos = await Producto.find({activo:true})
    .populate({
        path:'items',
        populate: {
            path:'producto'
        }
    })
    const lista_lugares = await Lugar.find({activo:true}).sort({nombre: 1});
    const lista_pedidos = await Pedido.find()
    .populate('lugar')
    .populate({
        path: 'items',
        populate: {
            path:'producto'
        }
    });

    const items = pedido.get('items')
    var resumen = {}
    for (let i = 0; i < items.length; i++) {
        resumen[items[i].producto._id] = items[i].cantidad
    }

    console.log(resumen)
    res.render('pedido',{
        resumen,
        lista_pedidos,
        lista_productos,
        lista_lugares,
        pedido
    });
});

// ver pedidos
router.get('/', async (req,res) => {
    const lista_productos = await Producto.find({activo:true}).populate('lugar')

    const lista_lugares = await Lugar.find({activo:true}).sort({nombre: 1});

    const { id } = req.params;

    const pedido = await Pedido.findById(id).populate('lugar')

    const lista_pedidos = await Pedido.find().populate('lugar')
    .populate({
        path:'items',
        populate:{
            path:'producto'
        }
    })

    res.render('pedido',{
        lista_productos,
        lista_lugares,
        lista_pedidos,
        pedido
    });
});

// cambiar estado
router.get('/activo/:id', async (req,res) => {
    const { id } = req.params;
    const pedido = await Pedido.findById(id);
    pedido.activo = !pedido.activo;
    await pedido.save();
    res.redirect('/pedido')
});

// eliminar pedido
router.get('/delete/:id', async (req, res) => {
    const {id} = req.params;
    await Pedido.deleteOne({_id:id});
    res.redirect('/pedido')
});

// editar pedido
router.post('/guardar/:id', async (req, res) => {
    const { id } = req.params;
    await Pedido.updateOne({_id:id},req.body);
    res.redirect('/pedido');
})

module.exports = router;