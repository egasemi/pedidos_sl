const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productoSchema = new Schema({
    codigo: String,
    nombre: String,
    marca: String,
    precio: {
        costo: Number,
        referencia: Number,
        lista: Number
    },
    categoria: [{
        type: Schema.Types.ObjectId,
        ref: 'categoria'
    }],
    provedor: {
        type: Schema.Types.ObjectId,
        ref: 'provedor'
    },
    activo: {
        type: Boolean,
        default: true
    },
    stock: Number,
    lugar:[{
        type: Schema.Types.ObjectId,
        ref: 'lugar'
    }]
},{
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('producto', productoSchema);