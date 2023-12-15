//// variable declerations
// probabilities for each element
let elements = {
    'At': 1/1111111,
    'C': 1/125,
    'O': 1/55,
    'He': 1/10,
    'H': 1/1,
};
let elementInventory = {};
let synthesizerSize = 1;


//// some general functions to utilize
function changeInnerHTML(id, content) {
    // function instead of typing it every time. it really annoys me
    document.getElementById(id).innerHTML = content;
}
function addToInventory(inventory, item, amount = 1) {
    // same thing as the previous function, just makes it much easier to read
    inventory[item] = (item in inventory) ? inventory[item] + amount : amount;
}
function dropArrayToObject(list) {
    // returns ['H','H','C'] -> {'H':2, 'C':1}
    let object = {};
    for (var i = 0; i < list.length; i++) {
        e = list[i];
        object[e] = (e in object) ? object[e] + 1 : 1;
    }
    return object;
}
function formatSynthesizerRolls(listOfElements) {
    // returns ['H','H','C','He'] -> "2x H, 1x C, 1x He"
    let elemsToReturn = "";
    let elemList = dropArrayToObject(listOfElements);
    for (var item in elemList) {
        elemsToReturn += item + " " + elemList[item] + "x, ";
    }
    return elemsToReturn.replace(/, $/g, '');
}
function updateElementInventory() {
    // just displays the inventory
    let formattedInv = "";
    for (item in elementInventory) {
        formattedInv += item + " " + elementInventory[item] + "x\n";
    }
    changeInnerHTML('inventory', formattedInv.replace(/, $/g, ''));
}


//// gameplay functions
// synthesis functions. we have separate ones so it's easier to edit. a little scuffed tho lol
function synthesisRoll() {
    // handles the actual rolling and rng
    let probabiltyTable = elements;
    let elementToGive = "";
    let summedProb = 0;
    let chosenValue = Math.random();
    for (var elem in probabiltyTable) {
        summedProb += probabiltyTable[elem];
            
        if (chosenValue < summedProb) {
            elementToGive = elem;
            break;  
        }
    }
    return elementToGive;
}
function synthesisProcess() {
    // handles the process of displaying rolls, adding to inventory, 
    // and rolling multiple times ( with a for loop using synthesisRoll() )
    let drops = [];

    for (let i = 0; i < synthesizerSize; i++) {
        drops.push(synthesisRoll());
    }
    changeInnerHTML('last-synthesis', 'Synthesized: ' + formatSynthesizerRolls(drops));

    let dropsForInventory = dropArrayToObject(drops);
    for (item in dropsForInventory) {
        addToInventory(elementInventory, item, dropsForInventory[item]);
    }
    updateElementInventory();
}

