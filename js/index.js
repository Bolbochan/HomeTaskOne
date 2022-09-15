// storage
const
    addBox = document.querySelector(".open-button"),
    closeBox = document.querySelector(".cancel"),
    addDate = document.querySelector(".notepadApp"),
    addForm = document.querySelector(".form-popup"),
    saveInfo = addForm.querySelector(".save"),
    spaceBox = addDate.querySelector(".notesBar"),
    archiveBox = addDate.querySelector(".archive"),
    countBox = addDate.querySelector(".countDate"),
    nameTag = addDate.querySelector(".name"),
    categoryTag = addDate.querySelector(".category"),
    contentTag = addDate.querySelector(".content"),
    dateFirstTag = addDate.querySelector(".dateFirst"),
    addArchive = addDate.querySelector(".open-archive"),
    closeArchive = addDate.querySelector(".close-archive"),
    dateSecondTag = addDate.querySelector(".dateSecond");


const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];
const category = ["Task", "Idea", "Random Thought"];

// arr date notes and notes archive
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
const archive = JSON.parse(localStorage.getItem("archive") || "[]");
//remove update notes
let isUpdate = false, updateId;

//button event form add and close
addBox.addEventListener("click", () => {
    nameTag.focus();
    addForm.style.display = 'block'
});
closeBox.addEventListener("click", () => {
    isUpdate = false;
    nameTag.value = " ";
    categoryTag.value = " ";
    contentTag.value = " ";
    dateFirstTag.value = " ";
    dateSecondTag.value = " ";
    addForm.style.display = 'none';

});

//show

function showNotes() {
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note, index) => {
        let liTag = ` <li class="note">
        <div>${note.noteName}</div>
        <div>${note.date}</div>
        <div>${note.categoryName}</div>
        <div>${note.contentName}</div>
        <div>${note.datesFirstName}${note.dateSecondName}</div>
        <button class = "btn-arc" onclick="updateNote(${index},'${note.noteName}','${note.categoryName} ','${note.contentName}','${note.datesFirstName}','${note.dateSecondName}')">edit</button>
        <button button onclick="archiveNote(${index},'${note.noteName}','${note.categoryName} ','${note.contentName}','${note.datesFirstName}','${note.dateSecondName}')" > archive</button >
        <button onclick="deleteNote(${index})">delete</button>
        </li > `;
        spaceBox.insertAdjacentHTML("afterbegin", liTag);
    })
};
showNotes();

//func delete notes
function deleteNote(noteId) {
    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
};

//func update notes
function updateNote(noteId, noteName, categoryName, contentName, datesFirstName, dateSecondName) {
    isUpdate = true;
    updateId = noteId;
    addBox.click();
    nameTag.value = noteName;
    categoryTag.value = categoryName;
    contentTag.value = contentName;
    dateFirstTag.value = datesFirstName;
    dateSecondTag.value = dateSecondName;
};


//local storage
saveInfo.addEventListener("click", e => {
    e.preventDefault();
    let noteName = nameTag.value,
        categoryName = categoryTag.value,
        contentName = contentTag.value,
        datesFirstName = dateFirstTag.value,
        dateSecondName = dateSecondTag.value;


    if (noteName) {
        let dateObj = new Date(),
            month = months[dateObj.getMonth()],
            day = dateObj.getDate(),
            year = dateObj.getFullYear();

        let noteInfo = {
            noteName, date: `${month} ${day}, ${year} `, categoryName, contentName, datesFirstName, dateSecondName
        }
        //update
        if (!isUpdate) {
            notes.push(noteInfo);// add new notes
        } else {
            isUpdate = false;
            notes[updateId] = noteInfo;
        }
        localStorage.setItem("notes", JSON.stringify(notes));
        showNotes();
        closeBox.click();
    }
});

//archive storage 
function archiveNote(noteId) {
    let archiveInfo = notes[noteId];
    deleteNote(noteId);
    archive.push(archiveInfo);
    localStorage.setItem("archive", JSON.stringify(archive))
}

let counter;
//list count active or archive
function countActive(date) {
    let countTask = 0;
    let countIdea = 0;
    let countRandom = 0;
    for (let i = 0; i < date.length; i++) {
        if (date[i].categoryName === "Task") {
            countTask += 1;
        } else if (date[i].categoryName === "Idea") {
            countIdea += 1;
        } else if (date[i].categoryName === "Random Thought") {
            countRandom += 1;
        }
    } counter = [countTask, countIdea, countRandom];
}

countActive(notes);
notesCount = counter;
countActive(archive);
archiveCount = counter;


// archive html
function showCount() {
    document.querySelectorAll(".count");
    let liTag = ` <div class="count">
        <div>Task${notesCount[0]}${archiveCount[0]}</div>
        <div>Idea${notesCount[1]}${archiveCount[1]}</div>
        <div>Random Thought${notesCount[2]}${archiveCount[2]}</div>
        </ div> `;
    countBox.insertAdjacentHTML("afterbegin", liTag);
};
showCount();

//archive
addArchive.addEventListener("click", () => {
    archiveBox.style.display = 'block'

});
closeArchive.addEventListener("click", () => {
    archiveBox.style.display = 'none'
});
function showArchive() {

    document.querySelectorAll(".test").forEach(test => test.remove());
    archive.forEach((test, index) => {
        let dateTag = ` <div class="test" id="wtf">
        <div>${test.noteName}</div>
        <div>${test.date}</div>
        <div>${test.categoryName}</div>
        <div>${test.contentName}</div>
        <div>${test.datesFirstName}${test.dateSecondName}</div>
        <button onclick="updateNote(${index},'${test.noteName}','${test.categoryName} ','${test.contentName}','${test.datesFirstName}','${test.dateSecondName}')">edit</button>
        <button button onclick="unzipNote(${index},'${test.noteName}','${test.date}','${test.categoryName} ','${test.contentName}','${test.datesFirstName}','${test.dateSecondName}')" > unzip</button >
        <button onclick="deleteArchive(${index})">delete</button>
        </ div> `;
        archiveBox.insertAdjacentHTML("afterbegin", dateTag);
    })
};
showArchive();

function deleteArchive(noteId) {
    archive.splice(noteId, 1);
    localStorage.setItem("archive", JSON.stringify(archive));
    showArchive();
};

function unzipNote(noteId, noteName, date, categoryName, contentName, datesFirstName, dateSecondName) {
    let archiveInfo = {
        noteName, date, categoryName, contentName, datesFirstName, dateSecondName
    }
    notes.push(archiveInfo);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes(noteId);
    deleteArchive(noteId);
}