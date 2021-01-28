const express = require('express');
const router = express.Router();

const Producto = require('../models/producto');

//nuevo producto
router.post('/', async (req,res) => {
    const producto = new Producto(req.body);
    await producto.save();
    res.redirect('producto');
});

// ver producto
router.get('/:id', async (req,res) => {
    const { id } = req.params;
    const producto = await Producto.findById(id);
    const lista_productos = await Producto.find();
    res.render('producto',{
        lista_productos,
        producto
    });
});

// ver productos
router.get('/', async (req,res) => {
    const { id } = req.params;
    const producto = await Producto.findById(id);
    const lista_productos = await Producto.find();
    res.render('producto',{
        lista_productos,
        producto
    });
});

// cambiar estado
router.get('/activo/:id', async (req,res) => {
    const { id } = req.params;
    const producto = await Producto.findById(id);
    producto.activo = !producto.activo;
    await producto.save();
    res.redirect('/producto')
});

// eliminar producto
router.get('/delete/:id', async (req, res) => {
    const {id} = req.params;
    await Producto.deleteOne({_id:id});
    res.redirect('/producto')
});

// editar producto
router.post('/guardar/:id', async (req, res) => {
    const { id } = req.params;
    await Producto.updateOne({_id:id},req.body);
    res.redirect('/producto');
})

module.exports = router;