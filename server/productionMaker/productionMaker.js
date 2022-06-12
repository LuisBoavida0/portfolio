import path from 'path'
import fs from 'fs'  //to read the html files
import { execSync } from 'child_process'  //To compile automatically the js files

//SET THE PRODUCTION PROJECT NAME
const productionFolder = "./productionProject"
const htmlFolder = "./html"
const projectStructure = {
    deleteFiles: [
        //IF YOU WANT TO DELETE A FILE THAT IT IS INCORRECTLY GOING TO PRODUCTION
        //productionFolder + "/public/server/helper.js"
    ],

    addFiles: [
        //IF YOU WANT TO ADD A FILE TO PRODUCTION THAT IT ISNT GOING
        /*{
            from: "./public/js/index.js",
            to: productionFolder + "/public/server/index.js"
        }*/
    ]
}

//Function to copy a file
function copyFileSync( source, target ) {

    var targetFile = target;

    // If target is a directory, a new file with the same name will be created
    if ( fs.existsSync( target ) ) {
        if ( fs.lstatSync( target ).isDirectory() ) {
            targetFile = path.join( target, path.basename( source ) );
        }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));
}

//Function to copy a folder
function copyFolderRecursiveSync( source, target ) {
    var files = [];

    // Check if folder needs to be created or integrated
    var targetFolder = path.join( target, path.basename( source ) );
    if ( !fs.existsSync( targetFolder ) ) {
        fs.mkdirSync( targetFolder );
    }

    // Copy
    if ( fs.lstatSync( source ).isDirectory() ) {
        files = fs.readdirSync( source );
        files.forEach( function ( file ) {
            var curSource = path.join( source, file );
            if ( fs.lstatSync( curSource ).isDirectory() ) {
                copyFolderRecursiveSync( curSource, targetFolder );
            } else {
                copyFileSync( curSource, targetFolder );
            }
        } );
    }
}

//If production folder exists, delete it
if (fs.existsSync(productionFolder))  fs.rmSync(productionFolder, { recursive: true })
fs.mkdirSync(productionFolder, { recursive: true })
fs.mkdirSync(productionFolder + "/public", { recursive: true }) //Create public folder (empty)
fs.mkdirSync(productionFolder + "/public/server", { recursive: true })  //Create server folder (empty)

//Create files and folders
copyFolderRecursiveSync(htmlFolder, productionFolder) //copy html folder
copyFolderRecursiveSync("./public/compiled", productionFolder + "/public") //copy compiled folder
copyFileSync("./public/server/helper.js", productionFolder + "/public/server/helper.js") //copy helper file
copyFileSync("./public/server/server.js", productionFolder + "/public/server/server.js") //copy server file
copyFileSync("./router.js", productionFolder + "/router.js") //copy router file
copyFileSync("./server/productionMaker/serverStarterProduction.js", productionFolder + "/serverStarter.js") //copy serverStarterProduction file


try {   //Try to convert package.json into production
    const packageJson = JSON.parse((fs.readFileSync('./package.json')).toString())
    delete packageJson['devDependencies']
    delete packageJson['scripts']
    packageJson['scripts'] = { "start": "node serverStarter" }
    fs.writeFileSync(productionFolder + "/package.json", JSON.stringify(packageJson)) //Save changes to txt file (to update the compiled file times)
} catch (error) {   //Since there was an error, just copy package.json into production
    console.log("there was an error converting package.json, so it will simply be copied to production folder, if you wish to edit it just edit it manually")
    copyFileSync("./package.json", productionFolder + "/package.json")
}

//Delete production files the user asked to
for (const file of projectStructure.deleteFiles) {
    fs.rmSync(file)
}

//Add production files the user wants
for (const file of projectStructure.addFiles) {
    const folder = file.to
    fs.mkdirSync(folder.substring(0, folder.lastIndexOf("/")), { recursive: true })
    copyFileSync(file.from, file.to)
}

//Install nodejs Modules
execSync(`npm install --prefix ./productionProject/`)