const {Schema, model} = require("mongoose")

const Categoria = new Schema({
    nome:{
        type: String,
        required: true
    },
    slug:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now()
    }
})

module.exports = model("categorias", Categoria)