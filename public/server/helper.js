//------------- DECLARE GLOBAL FUNCTIONS HERE --------------------
const getElem = (e) => { return document.querySelector(e) } //Get One element
const getElems = (e) => { return document.querySelectorAll(e) } //Get all elements
const addCode = function(code, values) { //Inject handlebars code
    try {
        const template = Handlebars.compile(code)   //Compile new code
        this.innerHTML += template(values)  //Inject it
    } catch (error) {
        throw error
    }
}
function decodeEntity(inputStr) {   //Convert encoded string into decoded one (to be able to use special characters)
    var textarea = document.createElement("textarea");
    textarea.innerHTML = inputStr;
    return textarea.value;
}

//------------- DECLARE GLOBAL VARIABLES HERE -------------------
const elem = {} //List containing all elements
let startTemplate = {} //List containing the values for the template
let eventsToUse = {} //List containing the events

//------------ DECLARE GLOBAL IMPORTS VARIABLES HERE (THE IMPORT ITSELF IS IN globalImports.js) -------------------------
let Handlebars = null //Handlebars
let myWorkScroll = null
let myWorksNum = 0