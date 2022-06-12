import path from 'path'
import fs from 'fs'  //to read the html files
import Koa from 'koa' //For the Server
import Router from 'koa-router' //For the routes
import serve from 'koa-static'  //For the static files
import mount from 'koa-mount' //To create custom static links to use compiledJS instead of normal ones without changing the src path
const indexValues = await import('./router.js') //Gets the routes and the partials

const app = new Koa()  //Create a new server
const router = new Router()  //Create the routes

let route404 = undefined
if (indexValues.routes['404']) {
  route404 = indexValues.routes['404']
  delete indexValues.routes['404']
}

//------------- HELPER FUNCTIONS -----------------
let ThroughDirectoryFiles = {}  //List containing the directory files after calling the function
function ThroughDirectory(Directory, RootPath, isRecursion, keepExtension) {
  if (!isRecursion) { //If it is called by us and not the recursive
    /*Reset list and root path is set to the directory folder for the key of the list to be correct 
    (for example if we are getting all files inside html folder and we have a file in html/partials, 
    the key needs to be partials/file_name instead of file_name, and by using this RootPath we enable that).*/
    ThroughDirectoryFiles = {} 
    RootPath = Directory
  }

  //Go through each file/folder
  fs.readdirSync(Directory).forEach(File => {
      const Absolute = path.join(Directory, File).replaceAll(/\\/g, '/')  //Replace \\ to /
      //If it is a folder do recursion inside of this folder (to get the files inside it)
      if (fs.statSync(Absolute).isDirectory()) return ThroughDirectory(Absolute, RootPath, true, keepExtension)
      else {
        if (keepExtension) return ThroughDirectoryFiles[Absolute.replace(RootPath, '')] = Absolute  //If file, store it in list
        else return ThroughDirectoryFiles[Absolute.replace(RootPath, '').split('.')[0]] = Absolute  //If file, store it in list (without extension)
      }
  });
}

function getAllPartialFiles() { //This function gets all partial Files
  let partials = indexValues.partials
  if (!indexValues.partials) {  //If there is no partials variable set by user, set them
    try {
      ThroughDirectory('html/partials/')  //Get all partials
      partials = ThroughDirectoryFiles  //Store it
      console.log("Created partials")
    } catch (error) {
      console.log("No partials added")
    }
  }
  return partials
}

function createPartialsHtml(partials) {
  if (partials) { //If there are any partials
    let partialsHtml = "<div serverId='partials'>"
    for (const partial of partials)   //Go through the partials and write the html code
      partialsHtml += `<script serverId='${partial}' type='text/x-handlebars-template'>${fs.readFileSync(partialsPath[partial], 'utf8')} </script>`
    partialsHtml += "</div>"
    return partialsHtml
  }
  return ""
}

function createPageHtml(partials, route) {
  return `
  <script src='server/helper.js'></script>
  <script src='serverCompiled/globalImports.js'></script>
  ${fs.readFileSync(route.template, 'utf8')}    
  ${partials}
  ${route.js ? `<script src='${route.js.split('.')[0]}.js'></script>` : ``}
  ${typeof route.startValues === 'object' ? `<x-startValues>${JSON.stringify(route.startValues)}</x-startValues>` : ``}
  <script src='server/server.js'></script>
  `
}

//------------- GET ALL PARTIALS -----------------
const partialsPath = getAllPartialFiles() //Get all partial files

//------------- WRITE HTML AND ROUTES -----------------
console.log("Creating routes")
for (const [key, value] of Object.entries(indexValues.routes)) {  //Define routes
  //------------------- PARTIALS (CREATE HTML FOR THEM) -----------------------------
  const partialsHtml = createPartialsHtml(value.partials) //variable containing partials html
 
  //-------------------- ROUTES -----------------------------
  router.get(key, (ctx) => {  //Write the route
    ctx.type = 'html'
    ctx.body = createPageHtml(partialsHtml, value)
  })
}

//------------- SERVE STATIC FILES -----------------
app.use(serve('public'))
.use(mount('/', serve('public/compiled/js'))) //enable calling compiled JS without calling the path
.use(mount('/', serve('public/compiled/css'))) //enable calling compiled CSS without calling the path

app
  .use(router.routes())
  .use(router.allowedMethods())

app.use(async (ctx, next) => {
    if(route404 && parseInt(ctx.status) === 404) {
       ctx.status = 404
       ctx.body = createPageHtml(createPartialsHtml(route404.partials), route404)
    }
})

app.listen(3000, () => {
    console.log('running on port 3000')
  })