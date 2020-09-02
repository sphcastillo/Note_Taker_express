const fs = require("fs");

module.exports = function(app){
    
    app.get("/api/notes", function(req, res){
        const savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        res.send(savedNotes);
    })


    app.post("/api/notes", function(req,res){
        console.log("Adding new notes are we speak!");
        const savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

        
        const newNote = {
            title: req.body.title,
            text: req.body.text,
            id: savedNotes.length ? (savedNotes[savedNotes.length-1].id + 1) : 1
        }
        console.log("What the new note?: ", newNote);

        savedNotes.push(newNote);

        fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes), function(err){
            if(err) throw err;
            console.log("There has been an error with new notes");

        });
            console.log("Congrats, a new note has been written & stored");
            res.send(true);
    
    })


    app.delete("/api/notes/:id", function(req,res){
        
        const noteID = req.params.id;
        console.log("id of Note / req.params.id: ", noteID);

        fs.readFile("./db/db.json","utf8", function(err, data){
            if(err) throw err;
        

            const allTheNotes = JSON.parse(data);
            console.log("all of Our Notes: ", allTheNotes);

            const newNotes = allTheNotes.filter(function(note){
                return note.id != noteID;
            })
            console.log("All new Notes: ", newNotes);

            fs.writeFile("./db/db.json", JSON.stringify(newNotes, null, 2), function(err){
                if(err) throw err;
                res.send(true);
                console.log("the note has been deleted");
            })

        })

        
    })
}