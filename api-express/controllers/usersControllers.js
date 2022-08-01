const { response, request } = require('express');

const User = require('../models/user');

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

const userPost = async (req, res) => {

    const body = req.body;
    const user = new User(body);

    await user.save();

    res.status(201).json({
        user
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