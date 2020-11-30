const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pedidoSchema = new Schema({
    //_id: {type: String, rquired:true},
    enteras: {
        type: Number, 
        default: 0
    },
    descremadas: {
        type: Number,
        default: 0
    },
    celular: Number,
    punto_retiro: String,
    //fecha_pedido: Date,
    //fecha_modificacion: Date
})

module.exports = mongoose.model('pedidos', pedidoSchema);