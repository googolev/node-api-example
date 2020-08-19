var Artists = require('../models/artists');
const { formatedResponse } = require('../utils/index')

exports.all = function (req, res) {
    Artists.all(function (err, docs) {
        if (err) {
            console.log(err)
            return res.sendStatus(500)
        }
        res.send(docs);
    })
}

exports.findById = function (req, res) {
    Artists.findById(req.params.id, function (err, doc) {
        if (err) {
            console.log(err)
            return res.sendStatus(500)
        }
        res.send(doc)
    })
}

exports.create = function (req, res) {
    const data = formatedResponse(req.body)
    
    const artist = {
        name: data.name
    }

    Artists.create(artist, function (err, doc) {
        if (err) {
            console.log(err)
            return res.sendStatus(500)
        }
        res.send(doc)
    })
}

exports.update = function (req, res) {
    const data = formatedResponse(req.body)
    const newData = {
        ...data
    }

    Artists.update(req.params.id, newData, function (err, result) {
        if (err) {
            console.log(err)
            return res.sendStatus(500)
        }
        res.send(`${req.params.id} has been updated`)
    })
}

exports.delete = function(req, res) {
    Artists.delete(req.params.id, function (err, result) {
        if (err) {
            console.log(err)
            return res.sendStatus(500)
        }
        res.send(`${req.params.id} has been removed`)
    })
}