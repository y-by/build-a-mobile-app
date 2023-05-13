import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// register service worker for PWA
if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
}

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
    cleanInputFieldEl()
    // console.log(`${inputValue} add to database`)
})

onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let shoppingListArray = Object.entries(snapshot.val())
    
        clearShoppingListEl()
    
        for (let i = 0; i < shoppingListArray.length; i++) {
            const currentItem = shoppingListArray[i];
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            // console.log(currentItemID, currentItemValue)
            appendItemToShoppingListEl(currentItem)
        }
    } else {
        shoppingListEl.innerHTML = `<h2>No items here... yet 🍦 </h2>`
    }

})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function cleanInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item) {
    let itemId = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    shoppingListEl.append(newEl)
    
    newEl.addEventListener("dblclick", function() {
        let exactLocationOfItemIdDb = ref(database, `shoppingList/${itemId}`)
        remove(exactLocationOfItemIdDb)
    })
}
