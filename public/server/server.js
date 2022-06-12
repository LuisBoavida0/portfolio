//----------------------- HELPERS ------------------------------------
var isJsonParsable = string => {
    try {
        return JSON.parse(string);
    } catch (e) {
        return false;
    }
}

//----------------------- PARTIALS ------------------------------------
const partialsHtml = document.querySelector('[serverId="partials"]')    //Get partials div
if (partialsHtml) {
    for (const child of partialsHtml.children) {    //Go through each partial
        Handlebars.registerPartial(child.getAttribute('serverId'), decodeEntity(child.innerHTML)) //Register it
    }
    partialsHtml.remove()   //Remove partials html (they will be compiled again)
}

//----------------------- TEMPLATE ------------------------------------
const htmlTag = document.querySelector('html')  //Get html element

// Compile the template
const template = Handlebars.compile(decodeEntity(htmlTag.innerHTML))

// execute the compiled template
try {
    const startTemplateBackend = isJsonParsable(document.querySelector('x-startValues').innerHTML)
    if (startTemplateBackend) htmlTag.innerHTML = template({...startTemplate, ...startTemplateBackend })
    else htmlTag.innerHTML = template(startTemplate)
    document.querySelector('x-startValues').remove()
} catch (error) {
    htmlTag.innerHTML = template()
}    

htmlTag.style.display = 'block' // Show code

//Put x-head code into head and x-body to body
document.querySelector('head').innerHTML = document.querySelector('x-head').innerHTML
document.querySelector('body').innerHTML += document.querySelector('x-body').innerHTML
document.querySelector('x-head').remove()
document.querySelector('x-body').remove()

function cloneAttributes(target, source) {  //Function to clone attributes from one element to another
    [...source.attributes].forEach( attr => { target.setAttribute(attr.nodeName ,attr.nodeValue) })
}

//Get all x-scripts to replace them by real scripts
const xScripts = document.querySelectorAll('x-script')
for (const xScript of xScripts) {   //For each x-script
    const script = document.createElement('script') //Create the script to place the content
    cloneAttributes(script, xScript)    //Copy the attributes
    script.innerHTML = xScript.innerHTML    //Copy the inline code (check if works)

    xScript.parentNode.insertBefore(script, xScript)    //Place the new script where the other is
    xScript.parentNode.removeChild(xScript) //Removi the x-script
}

//------------------------- EVENTS --------------------------------
try {
    for (const elItem of eventsToUse) { //Go through each event
        const element = document.querySelector(`[elemId='${elItem[0]}']`) //get event element
        if (elItem.length > 3)  //If Event has arguments add event with arguments
            element.addEventListener(elItem[1], (e) => { elItem[2].apply(this, [e, ...elItem[3]]) }) 
        else 
            element.addEventListener(elItem[1], (e) => { elItem[2](e) })
    }
} catch (error) {
}

for (const el of document.querySelectorAll('[elemId]')) {   //Register elements
    elem[el.getAttribute('elemId')] = el
    el.removeAttribute('elemId')  //remove attribute
}
