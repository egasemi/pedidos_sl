const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lugarSchema = new Schema({
    nombre: String,
    direccion: String,
    contacto: Number,
    activo: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('lugar', lugarSchema);