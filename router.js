export const routes = { //Routes
    '/': {
        template: 'html/home.hbs',
        partials: ['layout', 'header', 'aboutMe', 'myWork', 'contacts'], //The default path for partials is html/partials
        startValues: {
            pageTitle: "Home",
            myWork: [ 
                {
                    projectName: "Portal do Avaliador",
                    gif: "Gif1.gif",
                    description: `This project i made with a friend of mine in our own free time right after we finished the course.

                    It was for a Worker of a known tech company (Deloitte, portugal).
                    
                    He saw our final presentation on the school and offered us this opportunity.
                    
                    We finished making the project and sent him, but since i don't have an account here, i can't use the project. Also i think the project has been discontinued.`
                }, 
                {
                    projectName: "LuisSiteConstructor",
                    gif: "Gif2.gif",
                    description: `I made this project in my free time on one of my vacations, i took 2 days to do this.

                    This creates a project by creating and structuring files. It is to create PHP projects without any framework.
                    
                    I made this project in 2018/2019.
                    MELHORAR, FALTA DIZER Q USA SCSS E O VIDEO Q TENHO NA WISH TA DESATUALIZADO`
                }, 
                {
                    projectName: "work3",
                    gif: "Gif1.gif",
                    description: "Descrição \n DEU!!! \n ASDAS \n adasd"
                }, 
                {
                    projectName: "work1",
                    gif: "Gif2.gif",
                    description: "Descrição \n DEU!!! \n ASDAS \n adasd"
                }, 
                {
                    projectName: "work2",
                    gif: "Gif1.gif",
                    description: "Descrição \n DEU!!! \n ASDAS \n adasd"
                }, 
                {
                    projectName: "work3",
                    gif: "Gif2.gif",
                    description: "Descrição \n DEU!!!"
                }
            ]
        },
        js: 'home.js',
        //js: 'indexTS.ts' //If You are using typescript
    },
    '404': {    //404 route (when no route is matched, this route is used)
        template: 'html/404.hbs',  //Only the template is required, the other are optional
    }
}

/* The default folder for js is public/js, if you want to use another, for example if you are using typescript, then declare this variable:*/
//export const ts = 'public/ts'