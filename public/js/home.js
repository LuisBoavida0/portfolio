startTemplate = {
}

//Show content and return from content events
eventsToUse = [
    ['aboutMeDiv', 'click', showContent, ["contentAboutMe", "about-me"]],
    ['myWorkDiv', 'click', showContent, ["contentMyWork", "my-work"]],
    ['contactsDiv', 'click', showContent, [null, "contacts"]],
    ['returnAboutMeBtn', 'click', returnFromContent, ["contentAboutMe", "about-me"]],
    ['returnMyWorkBtn', 'click', returnFromContent, ["contentMyWork", "my-work"]],
    ['returnContactsBtn', 'click', returnFromContent, [null, "contacts"]]
]

//Function to show the content
let myWorkInterval = null
function showContent(e, target, targetClass) {
    //To activate or deactivate the scroll trigger from my work (to fix sound bug because it was always changing work)
    if (target === "contentMyWork") setTimeout(function () { myWorkInterval = setInterval(myWorkScroll, 1) }, 2500)
    else clearInterval(myWorkInterval)

    //Zoom to part
    elem.contentsDiv.classList.add(targetClass)

    //show content if there is a target (contacts doesnt have)
    if (target) setTimeout(() => { elem[target].classList.add("show") }, 2000)
}

//Function to return from the content
function returnFromContent(e, target, targetClass) {
    //Remove the Scroll interval
    clearInterval(myWorkInterval)

    //If there is a target hide it (contacts doesnt have)
    if (target) {
        elem[target].classList.remove("show")
        elem[target].scrollTop = 0;

        //If it is to leave my work, Show again the first gif only
        if (target == 'contentMyWork') {
            elem.workGif0.style.display = "block"
            for (let i = 1; i < myWorksNum; i++) {
                elem['workGif' + (myWorksNum - 1)].style.display = "none"
            }
        }
    }

    //Remove content
    if (target) setTimeout(() => { elem.contentsDiv.classList.remove(targetClass) }, 1000)
    else setTimeout(() => { elem.contentsDiv.classList.remove(targetClass) }, 100)
}

import './homeScrollAnimations'