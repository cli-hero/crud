const Note = require('../models/note.model').note;
const Person = require('../models/note.model').person;

exports.create = (req,res) => {
    if(!req.body.content){
        return res.status(400).send({message:"content is empty"});
    }
    const note = new Note({
        title: req.body.title || "Untitled Note",
        content: req.body.content
    });

    note.save((err,data)=>{
        if(data){
            res.send(data);
        }
        else{res.status(500).send("An error occured");}
    })
}

exports.findAll = (req,res) => {
    Note.find((err,notes)=>{
        if(notes){
            res.send(notes);
        }else{
            res.status(500).send("An error occured");
        }
    })
}

exports.findOne = (req,res) => {
    Note.findById(req.params.noteId,(err,data)=>{
        if(data){
            res.send(data);
        }else{
            res.status(500).send("An error occured");
        }
    });
}

exports.update = (req,res) => {
    if(!req.body.content){
        return res.status(400).send({message:"content is empty"});
    }else{
        Note.findByIdAndUpdate(req.params.noteId,{content:req.body.content},{new:true},(err,result)=>{
            if(result){
                res.send('Note updated');
            }else{
                res.status(500).send("An error occured");
            }
        })
    }
    
}

exports.delete = (req,res) => {
    Note.findByIdAndRemove(req.params.noteId,(err,result)=>{
        if(result){
            res.send('Note deleted');
        }else{
            res.status(500).send("An error occured");
        }
    })
}

exports.login = (req,res) => {
    Person.findById(req.params.pid,(err,result)=>{
        if(result.password===req.body.password){
            res.redirect('/notes');
        }else{
            res.send('Password is incorrect');
        }
    })
}