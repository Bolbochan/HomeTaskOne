


// storage
const
    addBox = document.querySelector(".open-button"),
    closeBox = document.querySelector(".cancel"),
    addDate = document.querySelector(".notepadApp"),
    addForm = document.querySelector(".form-popup"),
    saveInfo = addForm.querySelector(".save"),
    spaceBox = addDate.querySelector(".notesBar"),
    nameTag = addDate.querySelector(".name"),
    categoryTag = addDate.querySelector(".category"),
    contentTag = addDate.querySelector(".content"),
    dateFirstTag = addDate.querySelector(".dateFirst"),
    dateSecondTag = addDate.querySelector(".dateSecond");

const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

const notes = JSON.parse(localStorage.getItem("notes") || "[]");

//button
addBox.addEventListener("click", () => {
    addForm.style.display = 'block'
});
closeBox.addEventListener("click", () => {
    addForm.style.display = 'none'
});

//show

function showNotes() {
    notes.forEach((note) => {
        let liTag = ` <li class="test">
        <div>${note.noteName}</div>
        <div>${note.date}</div>
        <div>${note.categoryName}</div>
        <div>${note.contentName}</div>
        <div>${note.datesFirstName, note.dateSecondName}</div>
        <button>edit</button>
        <button>archive</button>
        <button>delete</button>
        </li>`;
        spaceBox.insertAdjacentHTML("afterbegin", liTag);
    })
};
showNotes();
//local storage
saveInfo.addEventListener("click", e => {
    console.log(`click`)
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
            noteName, date: `${month} ${day}, ${year}`, categoryName, contentName, datesFirstName, dateSecondName
        }
        localStorage.setItem("notes", JSON.stringify(notes));
        notes.push(noteInfo);
        closeBox.click();
    }



});