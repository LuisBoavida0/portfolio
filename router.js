export const routes = { //Routes
    '/': {
        template: 'html/home.hbs',
        partials: ['layout', 'header', 'aboutMe', 'myWork', 'contacts'], //The default path for partials is html/partials
        startValues: {
            pageTitle: "Home",
            myWork: [ 
                {
                    projectName: "work1",
                    gif: "Gif1.gif",
                    description: "Descrição \n DEU!!! \n ASDAS \n adasd"
                }, 
                {
                    projectName: "work2",
                    gif: "Gif2.gif",
                    description: "Descrição \n DEU!!! \n ASDAS \n adasd"
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