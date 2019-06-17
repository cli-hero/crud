const mongo = require('mongoose');

const NoteSchema = mongo.Schema({
    title: String,
    content: String
},{timestamps:true});

const PersonSchema = mongo.Schema({
    password: String
},{timestamps:false});

module.exports.note = mongo.model('Note',NoteSchema);
module.exports.person = mongo.model('Person',PersonSchema);