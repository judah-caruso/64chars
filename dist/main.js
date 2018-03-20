var list = document.getElementById("notes");
var noteBox = document.getElementById("noteBox");
var addButton = document.getElementById("addNoteButton");
var removeButton = document.getElementById("removeNoteButton");
var charCount = document.getElementById("count");
var clearButton = document.getElementById("clearListButton");

window.onLoad = getList();

const max = 64;
noteBox.maxLength = max;

addButton.onclick = function () {
    var note = document.getElementById("noteBox").value;
    if (note < 1) {
        return;
    } else {
        list.innerHTML += "<li>" + note + "</li>";
        saveList();
        noteBox.value = "";   
    }
}

removeButton.onclick = function () {
    if (list.getElementsByTagName("li").length < 1) {
        return;
    } else {
        list.removeChild(list.lastChild);
        saveList();
    }
}

clearButton.onclick = function () {
    list.innerHTML = "";
    saveList();
}

noteBox.addEventListener('input', function () {
    var oMin = 0;
    var oMax = 0.85;
    var count = document.getElementById("count");
    count.innerHTML = max - noteBox.value.length + " characters left...";
    count.style.opacity = oMin + noteBox.value.length / 100 * oMax;
});

function getList() {
    var savedItems = window.localStorage.items;
    if (!savedItems) {
        list.innerHTML = "<li> Click <span class='main'>'Add Note'</span> to create a new note! </li>"
                       + "<li> Or <span class='accent'>'Remove Note'</span> to remove one! </li>";
    } else {
        list.innerHTML = savedItems;
    }
}

function saveList() {
    window.localStorage.items = list.innerHTML;
}