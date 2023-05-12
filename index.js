import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-yny-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.querySelector("#shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    push(shoppingListInDB, inputValue)
    // appendItemToShoppingListEl(inputValue)
    cleanInputFieldEl()
    console.log(`${inputValue} add to database`)
})

onValue(shoppingListInDB, function(snapshot) {
    let shoppingListArray = Object.values(snapshot.val())

    shoppingListEl.innerHTML = ""

    for (let i = 0; i < shoppingListArray.length; i++) {
        const element = shoppingListArray[i];
        appendItemToShoppingListEl(element)
    }

})

function appendItemToShoppingListEl(itemValue) {
    shoppingListEl.innerHTML += `<li>${itemValue}</li>`
}

function cleanInputFieldEl() {
    inputFieldEl.value = ""
}
