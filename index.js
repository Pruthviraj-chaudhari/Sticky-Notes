const addBtn = document.getElementById('btn');
const appDiv = document.getElementById('app');

getNotes().forEach((note) => {
    const noteEl = createNoteElement(note.id, note.content);
    appDiv.insertBefore(noteEl, addBtn);
});

function createNoteElement(id, content){
    const element = document.createElement("textarea");
    element.classList.add("note");
    element.placeholder = "Enter Note";
    element.value = content;

    element.addEventListener("dblclick", ()=>{
        const warning = confirm("Do you want to delete this note?");
        if(warning)
            deleteNote(id, element);
    })

    element.addEventListener("input", ()=>{
        updateNote(id, element.value);
    });

    return element;
}

function deleteNote(id, element){
    const notee = getNotes().filter((note)=>note.id!=id);
    saveNote(notee);
    appDiv.removeChild(element);
}

function updateNote(id, content){
    const notee = getNotes();
    const target = notee.filter((note)=>note.id==id)[0];
    target.content = content;
    saveNote(notee);
}

function addNote(){

    const notes = getNotes();
    const noteObj = {
        id : Math.floor(Math.random()*100000),
        content: ""
    }

    const newNote = createNoteElement(noteObj.id, noteObj.content);
    appDiv.insertBefore(newNote, addBtn);

    notes.push(noteObj);
    saveNote(notes);
}

function saveNote(notes){
    localStorage.setItem("note-app", JSON.stringify(notes));
}

function getNotes(){
    return JSON.parse(localStorage.getItem("note-app") || "[]");
}

addBtn.addEventListener('click', addNote);