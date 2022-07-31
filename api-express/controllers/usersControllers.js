const { response, request } = require('express');



const userGet = (req = request, res = response) => {

    const {q, nombre = 'noName', apikey, page = 1, limit} = req.query;

    res.json({
        msg: "get api en controllers",
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const userPost = (req, res) => {

    const {nombre, edad} = req.body;

    res.status(201).json({
        nombre,
        edad
    });
}

const userPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg: "put api",
        id: id
    });
}

const userPatch = (req, res) => {
    res.json({
        msg: "patch api"
    });
}

const userDelete = (req, res) => {
    res.json({
        msg: "delete api"
    });
}


module.exports={
    userGet,
    userPut,
    userPatch,
    userPost,
    userDelete
}