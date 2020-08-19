var Equip = require('../models/equip');
const { formatedResponse } = require('../utils/index')

exports.all = function (req, res) {
    Equip.all(function (err, docs) {
        if (err) {
            console.log(err)
            return res.sendStatus(500)
        }
        res.send(docs);
    })
}

exports.findById = function (req, res) {
    Equip.findById(req.params.id, function (err, doc) {
        if (err) {
            console.log(err)
            return res.sendStatus(500)
        }
        res.send(doc)
    })
}

exports.create = function (req, res) {
    const data = formatedResponse(req.body)
    console.log(data)
    const equip = {
        name: data.equip_name
    }

    Equip.create(equip, function (err, doc) {
        if (err) {
            console.log(err)
            return res.sendStatus(500)
        }
        res.send(doc)
    })
}

exports.update = function (req, res) {
    const data = formatedResponse(req.body)
    console.log(data)
    const newData = {
        name: data.equip_name
    }

    Equip.update(req.params.id, newData, function (err, result) {
        if (err) {
            console.log(err)
            return res.sendStatus(500)
        }
        res.send(`${req.params.id} has been updated`)
    })
}

exports.delete = function(req, res) {
    Equip.delete(req.params.id, function (err, result) {
        if (err) {
            console.log(err)
            return res.sendStatus(500)
        }
        res.send(`${req.params.id} has been removed`)
    })
}

exports.setEquip = function(req, res) {
    Equip.setEquip(req.params.id, req.params.userId, function (err, result) {
        if (err) {
            console.log(err)
            return res.sendStatus(500)
        }
        res.send(`${req.params.id} has been set for ${req.params.userId}`)
    })
}