const express = require('express');
const router = express.Router();

const Lugar = require('../models/lugar');

//nuevo lugar
router.post('/', async (req,res) => {
    const lugar = new Lugar(req.body);
    await lugar.save();
    res.redirect('lugar');
});

// ver lugar
router.get('/:id', async (req,res) => {
    const { id } = req.params;
    const lugar = await Lugar.findById(id);
    const lista_lugares = await Lugar.find();
    res.render('lugar',{
        lista_lugares,
        lugar
    });
});

// ver lugares
router.get('/', async (req,res) => {
    const { id } = req.params;
    const lugar = await Lugar.findById(id);
    const lista_lugares = await Lugar.find();
    res.render('lugar',{
        lista_lugares,
        lugar
    });
});

// cambiar estado
router.get('/activo/:id', async (req,res) => {
    const { id } = req.params;
    const lugar = await Lugar.findById(id);
    lugar.activo = !lugar.activo;
    await lugar.save();
    res.redirect('/lugar')
});

// eliminar lugar
router.get('/delete/:id', async (req, res) => {
    const {id} = req.params;
    await Lugar.deleteOne({_id:id});
    res.redirect('/lugar')
});

// editar lugar
router.post('/guardar/:id', async (req, res) => {
    const { id } = req.params;
    await Lugar.updateOne({_id:id},req.body);
    res.redirect('/lugar');
})

module.exports = router;