import path from 'path'
import fs from 'fs'  //to read the html files
import Koa from 'koa' //For the Server
import Router from 'koa-router' //For the routes
import serve from 'koa-static'  //For the static files
import mount from 'koa-mount' //To create custom static links to use compiledJS instead of normal ones without changing the src path
const indexValues = await import('../router.js') //Gets the routes and the partials
import { execSync } from 'child_process'  //To compile automatically the js files

const app = new Koa()  //Create a new server
const router = new Router()  //Create the routes

//Check if 404 route exists, if it does, delete from routes and store it on route404 (to be used later)
let route404 = undefined
if (indexValues.routes['404']) {
  route404 = indexValues.routes['404']
  delete indexValues.routes['404']
}

//------------- GET TXT FILE OBJECT -----------------
let fileChanges = {}
try {
  fileChanges = JSON.parse((fs.readFileSync('./server/fileChanges.txt')).toString())  //object containing the file changes (from txt file)
} catch (error) {
  fileChanges = {"js": {},"css": {}}  //If there was an error (file doesnt exists or it is badly configured, set filechanges by hand)
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

function wasFileChanged(path, lastModified, filename, fileType) { // Checks if a file was changed
  if ((!fs.existsSync(`public/compiled/js/${filename.split('.')[0]}.js`) && fileType === 'js') || (!fs.existsSync(`public/compiled/css${filename.split('.')[0]}.css`) && fileType === 'css')) { //If file doesnt exists on the compiled files, compile it
    fileChanges[fileType][path] = new Date().toISOString()
    return true
  }

  const fileModified = fs.statSync(path).mtime.toISOString()  //Get last time the file was modified
  if (fileModified === lastModified) return false //If file was not modified since the last time (last time saved in the fileChanges txt)

  if (!lastModified) {  //If the file was never compiled (because it isnt in the txt file), save it and compile it
    fileChanges[fileType][path] = fileModified
    return true
  }
  
  fileChanges[fileType][path] = fileModified  //If neither it means the file was once compiled but it has been updated, so, update it
  return true
}

function compileJSFiles(typeOfScript, defaultPath) { //Function that will compile all the js files needed 
  let compiledJSFiles = {}  //Object to check if that file was already compiled this time and to get all files needed in the compiledJS directory
  try {
    let jsPath = ''
    indexValues[typeOfScript] ? jsPath = indexValues[typeOfScript] : jsPath = defaultPath //Get the path to the js files
    for (const [key, value] of Object.entries(indexValues.routes)) { //Go through each route (to get the used js files)
      if (value.js && !compiledJSFiles['/' + value.js.split('.')[0]]) { //If file isnt on the compiledJS List, add it
        if (wasFileChanged(`${jsPath}/${value.js}`, fileChanges.js[`${jsPath}/${value.js}`], value.js, 'js')) {  //If file was not compiled
          console.log(`${value.js} being compiled`)
          if (typeOfScript === 'js') execSync(`npx browserify -p esmify ${jsPath}/${value.js} -o public/compiled/js/${value.js}`)  //Compile it
          if (typeOfScript === 'ts') execSync(`npx browserify ${jsPath}/${value.js} -p [ tsify] -o public/compiled/js/${value.js.split('.')[0]}.js`)  //Compile it
        }
        compiledJSFiles['/' + value.js.split('.')[0]] = 'compiled'
      }
    }
    if (wasFileChanged('public/server/globalImports.js', fileChanges.js['public/server/globalImports.js'], 'serverCompiled/globalImports.js', 'js')) {  //If globalImports component was changed, compile it
      console.log('globalImports.js being compiled')
      execSync(`npx browserify -p esmify public/server/globalImports.js -o public/compiled/js/serverCompiled/globalImports.js`)  //Compile globalImports
    }
    
    compiledJSFiles['/serverCompiled/globalImports'] = 'compiled'  //Add globalImports to compiled files list
    ThroughDirectory('public/compiled/js')  //Get all the compiled files inside compiled js directory
    for (const [key, value] of Object.entries(ThroughDirectoryFiles)) { //Check which files that are already compiled arent used anymore
      if (!compiledJSFiles[key]) {  //If file in directory is not being used
        console.log(`${key}.js file was deleted`)
        fs.unlinkSync(value)  // Delete file
      }
    }
  } catch (error) {
    console.error(`Error compiling js`)
  }
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

function compileCSSFiles() { //Function that will compile all the Scss files to CSS
  try {
    let scssPath = ''
    let compiledSCSSFiles = {}   //Object to get all files needed in the compiledCSS directory
    indexValues.scss ? scssPath = indexValues.scss : scssPath = 'public/scss' //Get the path to the scss files

    ThroughDirectory(scssPath)  //Get all scss files
    for (const [key, value] of Object.entries(ThroughDirectoryFiles)) { //Go through each file
      if (wasFileChanged(value, fileChanges.css[value], `${key}.${value.split('.')[1]}`, 'css')) {  //If file was changed, compile it
        console.log(`${key}.${value.split('.')[1]} being compiled`)
        const child = execSync(`npx sass ${value}:public/compiled/css/${key}.css`)  //Compile it
      }
      compiledSCSSFiles[key] = 'compiled'
    }

    ThroughDirectory('public/compiled/css')  //Get all the compiled files inside compiled css directory
    for (const [key, value] of Object.entries(ThroughDirectoryFiles)) { //Check which files that are already compiled arent used anymore
      if (!compiledSCSSFiles[key]) {  //If file in directory is not being used
        console.log(`${key}.css file was deleted`)
        fs.unlinkSync(value)  // Delete file
        fs.unlinkSync(`${value.split('.')[0]}.css`) // Delete file
      }
    }
  } catch (error) {
    console.error(`Error compiling scss`)
  }
}

function createPartialsHtml(partials) { // function to create the partials html
  if (partials) { //If there are any partials
    let partialsHtml = "<div serverId='partials'>"
    for (const partial of partials)   //Go through the partials and write the html code
      partialsHtml += `<script serverId='${partial}' type='text/x-handlebars-template'>${fs.readFileSync(partialsPath[partial], 'utf8')} </script>`
    partialsHtml += "</div>"
    return partialsHtml
  }
  return ""
}

function createPageHtml(partials, route) {  // funtion to create the page html
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

//------------- COMPILE JS (OR TS) -----------------
if (indexValues.js) compileJSFiles('js', indexValues.js)  //Compile all javascript files
else if (indexValues.ts) compileJSFiles('ts', indexValues.ts)  //Compile all typeScript files
else compileJSFiles('js', 'public/js')

//------------- COMPILE SCSS INTO CSS -----------------
compileCSSFiles()

fs.writeFileSync('./server/fileChanges.txt', JSON.stringify(fileChanges)) //Save changes to txt file (to update the compiled file times)

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
    if(route404 && parseInt(ctx.status) === 404) {  //If there is a 404 status (route not found, set this route)
       ctx.status = 404
       ctx.body = createPageHtml(createPartialsHtml(route404.partials), route404)
    }
})

app.listen(3000, () => {
    console.log('running on port 3000')
  })