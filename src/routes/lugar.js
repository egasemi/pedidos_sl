const express = require('express');
const router = express.Router();

const Lugar = require('../models/lugar');

router.post('/lugar', async (req,res) => {
    const lugar = new Lugar(req.body);
    await lugar.save();
    res.redirect('lugar');
});
router.get('/lugar/:id', async (req,res) => {
    const { id } = req.params;
    const lugar = await Lugar.findById(id);
    const lista_lugares = await Lugar.find();
    res.render('lugar',{
        lista_lugares,
        lugar
    });
});

router.get('/lugar', async (req,res) => {
    const { id } = req.params;
    const lugar = await Lugar.findById(id);
    const lista_lugares = await Lugar.find();
    res.render('lugar',{
        lista_lugares,
        lugar
    });
});

router.get('/activo/:id', async (req,res) => {
    const { id } = req.params;
    const lugar = await Lugar.findById(id);
    lugar.activo = !lugar.activo;
    await lugar.save();
    res.redirect('/lugar')
});

router.get('/lugar/delete/:id', async (req, res) => {
    const {id} = req.params;
    await Lugar.deleteOne({_id:id});
    res.redirect('/lugar')
});

router.post('/lugar/guardar/:id', async (req, res) => {
    const { id } = req.params;
    await Lugar.updateOne({_id:id},req.body);
    res.redirect('/lugar');
})

module.exports = router;