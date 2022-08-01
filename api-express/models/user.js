const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    name:{
        type: String,
        required: [true, 'Name cant be null']
    },
    mail:{
        type: String,
        required: [true, 'Mail cant be null'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'Password cant be null']
    },
    image:{
        type: String
    },
    role:{
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    },
});

module.exports = model( 'Usuario', UsuarioSchema );