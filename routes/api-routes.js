const fs = require("fs");
const database = require("../db/db.json");


module.exports = function(app){
    
    app.get("/api/notes", function(req, res){
        
        res.send(database);
    })


    app.post("/api/notes", function(req,res){
        console.log("Adding new notes are we speak!");
        const savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

        const newNote = {
            title: req.body.title,
            text: req.body.text,
            id: id
        }
        console.log("What the new note?: ", newNote);

        savedNotes.push(newNote);

        fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes), function(err){
            if(err) throw err;
            console.log("There has been an error with new notes");
        });
            console.log("Congratulation, a new note has been written & stored");
            return res.json(savedNotes);
    
    })


    app.delete("/api/notes/:id", function(req,res){
        
        const idNumberofNote = req.params.id;
        console.log("id of Note / req.params.id", idNumberofNote);

        fs.readFile("./db.db.json","utf8", function(err, data){
            if(err) throw err;
        

            const allofOurNotes = JSON.parse(data);
            const allNewNotes = allofOurNotes.filter(function(note){
                return note.id != idNumberofNote;
            })

            fs.writeFile("./db/db.json", JSON.stringify(allNewNotes, null, 2), function(err){
                if(err) throw err;
                res.send(true);
                console.log("the note has been deleted");
            })

        })

        
    })
}