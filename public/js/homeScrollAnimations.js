//Will contain all works
let workElements = []

window.onload = function () {
    //Set block to contents (they start with none because of transitions scale bug)
    elem.contentAboutMe.classList.add('smooth')
    elem.contentMyWork.classList.add('smooth')

    //Get all works
    workElements = elem.myWorks.children

    //Store length globally
    myWorksNum = workElements.length
}

//Checks if work is visible
function isVisible (work) {
    const { top, bottom } = work.getBoundingClientRect();
    return ( Math.abs(((top + bottom) / 2) - (window.innerHeight / 2)) < 100)
}

//When scroll (Inside of my works)
const audio = new Audio('img/audio.wav');
myWorkScroll = () => {
    for (let i = 0; i < workElements.length; i++) {
        //If visible
        if (currAnimation != i && isVisible(workElements[i])) {
            //Play audio
            audio.volume = 0.2;
            audio.play();

            //Remove previous work style
            workElements[currAnimation].querySelector('p').classList.remove('show')
            elem["workGif" + currAnimation].style.display = "none"

            //Update index
            currAnimation = i

            //Add new focused work style
            workElements[i].querySelector('p').classList.add('show')
            elem["workGif" + i].style.display = "block"
            //Reset the gif to be able to watch it from the start
            resetGif(elem["workGif" + i])   
            return
        }
    }
}

//Resets the gif img
function resetGif(img) {
    const imageUrl = img.src;
    img.src = "";
    img.src = imageUrl;
}

let currAnimation = 0