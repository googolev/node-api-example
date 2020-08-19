var db = require('../db');
var ObjectID = require('mongodb').ObjectID
var equip =  db.getContext('artists').collection('equip')
var artists =  db.getContext('artists').collection('artists')


exports.all = function (cb) {
    equip.find().toArray(function (err, results) {
        cb(err, results);
    })
}

exports.findById = function (id, cb) {
    equip.findOne({ _id: ObjectID(id) }, function (err, result) {
        cb(err, result)
    })
}

exports.create = function (equipment, cb) {
    equip.insertOne(equipment, function (err, result) {
        cb(err, result)
    }) 
}

exports.update = function (id, newData, cb) {
    equip.updateOne(
        { _id: ObjectID(id)},
        { $set: newData},
        function (err, result) {
            cb(err, result)
        }
    )
}

exports.delete = function(id, cb) {
    equip.deleteOne(
        { _id: ObjectID(id) },
        function (err, result) {
            cb(err, result)
        }
    )
}

exports.setEquip = async function(id, userId,  cb) {
    const equipment = await equip.findOne({ _id: ObjectID(id) })
    artists.updateOne(
        { _id: ObjectID(userId)},
        { $push: {"equip": equipment}},
        cb
    )
}