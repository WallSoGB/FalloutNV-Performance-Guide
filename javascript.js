window.addEventListener('resize', sizeChanged);

let settings = {
    grass: 0,
    light: 200,
    specularity: 200,
    objects: 2.5,
};

let selectedSettings = {
    grass: -1,
    light: -1,
    specularity: -1,
    objects: -1,
};
function sizeChanged() {
    if (document.documentElement.clientWidth > 760) {
        document.getElementById("header").style.marginLeft = "";
        document.getElementById("sidebar").style.width = "";
        document.getElementById("flippyHeader").innerText = "🙃"
    }
}

function toggleNav() {
    if (document.getElementById("sidebar").style.width == 0) {
        document.getElementById("header").style.marginLeft = "80%";
        document.getElementById("sidebar").style.width = "80%";
        document.getElementById("flippyHeader").innerText = "🙂";
    }
    else {
        document.getElementById("header").style.marginLeft = "";
        document.getElementById("sidebar").style.width = "";
        document.getElementById("flippyHeader").innerText = "🙃"
    }
}

function refreshRateCalculations() {
    const rr = document.getElementById("refreshRateInput").value;
    if (rr > 24) {
        const rrVSync = rr - 1;
        if (rr < 90) {
            var rrVRR = Math.round((rr - (rr * 0.034)));
        }
        else {
            var rrVRR = Math.round((rr - (rr * 0.068)));
        }

        const fpsFixed = document.getElementsByClassName("fpsFixed");
        const fpsVSync = document.getElementsByClassName("fpsVSync");
        const fpsVRR = document.getElementsByClassName("fpsVRR");
        const iFpsFixed = document.getElementsByClassName("iFpsFixed");
        const iFpsVSync = document.getElementsByClassName("iFpsVSync");

        fpsFixed[0].innerHTML = rr;
        fpsVSync[0].innerHTML = rrVSync;

        for (const fpsVRRItem of fpsVRR) {
            fpsVRRItem.innerHTML = Math.round(rrVRR);
        }
        for (const iFpsFixedItem of iFpsFixed) {
            iFpsFixedItem.innerHTML = Math.round(rr);
        }
        for (const iFpsVSyncItem of iFpsVSync) {
            iFpsVSyncItem.innerHTML = Math.round(rrVSync);
        }
    }
}

function expandCard(thisObj, $open) {
    if ($open.classList.contains('expander-opened')) {
        $open.classList.remove('expander-opened');
        setTimeout(() => $open.style.display = "none", 400)
        thisObj.innerText = "Show";
        thisObj.parentNode.parentNode.style.borderBottomLeftRadius = "8px";
        thisObj.parentNode.parentNode.style.borderBottomRightRadius = "8px";
    }
    else {
        $open.classList.add('expander-opened');
        $open.style.display = "block";
        thisObj.innerText = "Hide";
        thisObj.parentNode.parentNode.style.borderBottomLeftRadius = 0;
        thisObj.parentNode.parentNode.style.borderBottomRightRadius = 0;
    }
}

function expandLimiterTutorials(thisObj, $open, $close) {
    const expanderTop = document.getElementById('api-expander').style;
    if ($open.classList.contains('expander-opened')) {
        thisObj.classList.remove('active');
        $open.classList.remove('expander-opened');
        setTimeout(() => $open.style.display = "none", 400)
        expanderTop.borderBottomLeftRadius = "8px";
        expanderTop.borderBottomRightRadius = "8px";
    }
    else {
        if ($close.classList.contains('expander-opened')) {
            $close.style.display = "none";
            $close.classList.remove('expander-opened')
            for (const activeButton of activeButtons = document.getElementsByClassName("api-selection active")) {
                activeButton.classList.remove('active');
            }
        }
        thisObj.classList.add('active');
        $open.classList.add('expander-opened');
        $open.style.display = "block";
        expanderTop.borderBottomLeftRadius = 0;
        expanderTop.borderBottomRightRadius = 0;
    }
}

function changeImage(thisObj, $value) {
    const className = thisObj.parentNode.classList[0]
    const currentClass = document.getElementsByClassName(className)
    const buttonGroup = Array.from(currentClass['card-buttons'].children);
    const fonfigCard = currentClass['card-fonfig'];

    settings[className.toLowerCase()] = $value.replace("-", ".");

    currentClass["image"].src = 'DisplayComparisons/' + className + '/' + $value + '.png';

    if (currentClass['card-fonfig']) {
        if (selectedSettings[className] == -1) {
            currentClass['card-fonfig'].innerText = `Add to Fonfig™️ - ${settings[className]}`;
        }
        else if (selectedSettings[className] != settings[className]) {
            currentClass['card-fonfig'].classList.remove('active');
            currentClass['card-fonfig'].innerText = `Add to Fonfig™️ - ${settings[className]} \n Current - ${selectedSettings[className]}`;
        }
        else {
            currentClass['card-fonfig'].classList.add('active');
            currentClass['card-fonfig'].innerText = `Added to Fonfig™️ - ${selectedSettings[className]}`;
        }
    }

    for (const button of buttonGroup) {
        button.classList.remove('active');
    }

    thisObj.classList.add('active');
}

function openImg(thisObj) {
    window.open(thisObj.src);
}

function changeGame(thisObj) {
    let parent = Array.from(thisObj.parentNode.children)

    if (parent[1].style.display == "none") {
        active = 1 // show TTW
        hidden = 0 // hide FNV
        thisObj.innerText = "Tale of Two Wastelands"
    }
    else {
        active = 0 // show FNV
        hidden = 1 // hide TTW
        thisObj.innerText = "Fallout New Vegas"
    }
    parent[active].style.display = "block";
    parent[hidden].style.display = "none";
    hiddenButtons = Array.from(parent[hidden].children);
    activeButtons = Array.from(parent[active].children);

    activeButton = hiddenButtons.indexOf(parent[hidden].getElementsByClassName("active")[0])

    for (const button of activeButtons) {
        button.classList.remove('active');
    }

    oppositeActiveButton = parent[active].children[activeButton];
    oppositeActiveButton.classList.add('active');
    oppositeActiveButtonFunction = oppositeActiveButton.getAttribute('onclick');
    functionStart = oppositeActiveButtonFunction.lastIndexOf(", '");
    functionEnd = oppositeActiveButtonFunction.lastIndexOf("'");
    imagePath = oppositeActiveButtonFunction.substring(functionStart + 3, functionEnd);
    parent[2].src = 'DisplayComparisons/' + imagePath;

}

function addFonfig(thisObj) {
    let className = thisObj.classList[0].toLowerCase();
    let currentClass = document.getElementsByClassName(className);
    //let activeButton = currentClass[1].getElementsByClassName("active").item(0);
    selectedSettings[className] = settings[className];
    thisObj.innerText = `Added to Fonfig™️ - ${selectedSettings[className]}`;
    currentClass["value"].innerText = selectedSettings[className];
    thisObj.classList.add('active');
}