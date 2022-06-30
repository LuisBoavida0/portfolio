export const routes = { //Routes
    '/': {
        template: 'html/home.hbs',
        partials: ['layout', 'header', 'aboutMe', 'myWork', 'contacts'], //The default path for partials is html/partials
        startValues: {
            pageTitle: "Home",
            myWork: [                 
                {
                    projectName: "Migros nature heroes",
                    gif: "img/natureHeroes.gif",
                    link: "img/natureHeroes.gif",
                    description: `I made this project when I was working on Innovagency. 

                    Me and my team made this project to Migros.
                    We used parallax to make the insects move as you scroll.
                    The homepage main image moves when you move the mouse (as you can see in the video).
                    
                    This Website had more pages but it was discontinued since migros stopped nature heroes, this is the only video that I have of it.
                    
                    The technologies used were HTML, SCSS and VanillaJs.`
                }, 
                {
                    projectName: "MyMyanmarPlatform",
                    gif: "img/myMyanmarPlatform.gif",
                    link: "img/myMyanmarPlatform.gif",
                    description: `I made this project with my internship colleague in my second internship.
                    This is a project to help a country that is in civil war, where the civilians insert in the map where the conflict areas are.
                    There is also a backoffice to manage the conflicts.
                    There was even a vice article about it.
                    
                    The technologies used were ASP.net C#.
                    `,
                    href: {
                        link: "https://www.vice.com/pt/article/gyk85x/portugues-esta-a-criar-plataforma-online-para-garantir-mais-acesso-a-informacao-em-myanmar",
                        title: "Vice Article",
                    }
                }, 
                {
                    projectName: "Bluetickets",
                    gif: "img/bluetickets.gif",
                    link: "img/bluetickets.gif",
                    description: `I made this project on my second Internship.
                    This project I made with a team, and i helped making the slider part.
                    This Website is for kiosks that are placed close to stadiums to buy tickets. Thats why the website is only configured for 2 measures
                    
                    The technologies used were ASP.net Core C#. `
                }, 
                {
                    projectName: "GroundForce Intranet",
                    gif: "img/groundForceIntranet.png",
                    link: "img/groundForceIntranet.png",
                    description: `I was on the front end for this project. This project was done with sharepoint online, and I builded the custom templates for it, I made this front page that you see on the image (The homepage is bigger but I only have this picture) by making each component separately and then calling it.
                    
                    The technologies used were SharePoint online (I made the components with html, css and JS).
                    `,
                    href: {
                        link: "https://www.innovagency.com/work/intranet-groundforce",
                        title: "Intranet groundforce summary.",
                    }
                }, 
                {
                    projectName: "Pisca Pisca",
                    gif: "img/piscapisca.gif",
                    link: "img/piscapisca.gif",
                    description: `This was one of my final projects working for Innovagency (2 months later I went to the UK to go to Coventry University).
                    It was also probably the biggest one i made.
                    I was part of the front-end team, and the entire team was more than 20 people.
                    It's a website to buy used cars.
                    
                    The technologies used were HTML, SCSS, TypeScript and Angular (I am not sure if we used Angular or not).
                    `,
                    href: {
                        link: "https://www.piscapisca.pt/",
                        title: "Pisca pisca",
                    }
                }, 
                {
                    projectName: "La poste services for equity",
                    gif: "img/laPoste.gif",
                    link: "https://www.laposteservicesforequity.fr/",
                    description: `This was my last project for Innovagency, I made it on 1 week.
                                I did it by myself and it only required front end.
                                
                                The technologies used were HTML, SCSS and VanillaJs.  
                                `,
                    href: {
                        link: "https://www.laposteservicesforequity.fr/",
                        title: "la poste services for equity",
                    }
                },
                {
                    projectName: "AlphaRunner",
                    gif: "img/alphaRunner.gif",
                    link: "img/alphaRunner.gif",
                    description: `It was a small 2d platform game that me and my brother made in 1 week of vacation that we took from work.
                                  I made it because my twin brother was going to study Games Development and so we decided to make this game for him to gain some experience.
                                  
                                  The technology used was unity.
                                  `,
                    href: {
                        link: "https://play.google.com/store/apps/details?id=com.Lampd.AlphaRunner&hl=en_US&gl=US",
                        title: "AlphaRunner",
                    }
                },
                {
                    projectName: "LuisSiteConstructor",
                    gif: "img/luisSiteConstructor.gif",
                    link: "img/luisSiteConstructor.gif",
                    description: `I made this project in my free time on one of my vacations, it took 2 days to finish.

                    This creates a project by the files and with the possibility to create new pages and contents. It is to create PHP projects without any framework. It comes with a scss compiler.
                    I made this project in 2018/2019.
                    
                    The technology used was NodeJS.`
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