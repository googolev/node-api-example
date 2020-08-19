var db = require('../db');
var ObjectID = require('mongodb').ObjectID
var artists =  db.getContext('artists').collection('artists')

exports.all = function (cb) {
    artists.find().toArray(function (err, results) {
        cb(err, results);
    })
}

exports.findById = function (id, cb) {
    artists.findOne({ _id: ObjectID(id) }, function (err, result) {
        cb(err, result)
    })
}

exports.create = function (artist, cb) {
    artists.insertOne(artist, function (err, result) {
        cb(err, result)
    }) 
}

exports.update = function (id, newData, cb) {
    // const data = formatedResponse(req.body)
    artists.updateOne(
        { _id: ObjectID(id)},
        { $set: newData},
        function (err, result) {
            cb(err, result)
        }
    )
}

exports.delete = function(id, cb) {
    artists.deleteOne(
        { _id: ObjectID(id) },
        function (err, result) {
            cb(err, result)
        }
    )
}