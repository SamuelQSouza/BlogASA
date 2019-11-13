const {Schema, model} = require("mongoose")

const Usuario = new Schema({
    nome:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    isadmin:{
        type: Boolean,
        default: false
    },
    senha:{
        type: String,
        required: true
    }
})

module.exports = model("usuarios", Usuario)
