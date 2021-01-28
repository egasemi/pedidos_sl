const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pedidoSchema = new Schema({
    items:[{
        producto:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'producto'
        },
        cantidad: Number
    }],
    contacto: Number,
    activo: {
        type: Boolean,
        default: true,
    },
    lugar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'lugar'
    }
},{
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('pedido', pedidoSchema);