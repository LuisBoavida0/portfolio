startTemplate = {
}

eventsToUse = [
    ['aboutMeDiv', 'click', showContent, ["contentAboutMe", "about-me"]],
    ['myWorkDiv', 'click', showContent, ["contentMyWork", "my-work"]],
    ['returnAboutMeBtn', 'click', returnFromContent, ["contentAboutMe", "about-me"]],
    ['returnMyWorkBtn', 'click', returnFromContent, ["contentMyWork", "my-work"]],
    ['returnContactsBtn', 'click', returnFromContent, ["contentContacts", "contacts"]]
]

let myWorkInterval = null
function showContent(e, target, targetClass) {
    if (target === "contentMyWork") setTimeout(function(){ myWorkInterval = setInterval(myWorkScroll, 1) }, 2500)
    else clearInterval(myWorkInterval)

    elem.contentsDiv.classList.add(targetClass)
    setTimeout(() => { elem[target].classList.add("show") }, 2000)
}

function returnFromContent(e, target, targetClass) {
    clearInterval(myWorkInterval)
    elem[target].classList.remove("show")
    setTimeout(() => { elem.contentsDiv.classList.remove(targetClass) }, 1000)
}

import './homeScrollAnimations'