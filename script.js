var sourceCode = ""
var sourceContainer, sourceElement, accessMessageElement;

var startIndex = 0;
var endIndex = 0;

var cursor = "|"

const CHARS_PER_STROKE = 5;


var locked = false;

const load_source_code = () => {
    var request = new XMLHttpRequest();
    request.open("GET", "./code.txt")
    request.onreadystatechange = () => {
        sourceCode = request.responseText
        console.log(sourceCode);
    }
    request.send()
}

const getElements = () => {
    sourceContainer = document.getElementById("container")
    sourceElement = document.getElementById("source")
    accessMessageElement = document.getElementById("access-msg")
}

const update_screen = () => {
    if (!locked) {
        console.log(locked);
        endIndex += CHARS_PER_STROKE
        // update source code
        sourceElement.textContent = sourceCode.substring(startIndex, endIndex)

        // update cursor
        sourceElement.textContent += cursor;

        //update access message
        if (endIndex !== 0 && endIndex % 300 === 0) {
            accessMessageElement.textContent = "Access Denied"
            accessMessageElement.classList.add('denied')
            sourceContainer.classList.add('blurred')
            locked = true
        }
        if (endIndex !== 0 && endIndex % 750 === 0) {
            accessMessageElement.textContent = "Access Granted"
            accessMessageElement.classList.add('success')
            sourceContainer.classList.add('blurred')
            locked = true;
        }


    }

}

const removeMessage = () => {
    locked = false;
    accessMessageElement.removeAttribute('class')
    accessMessageElement.classList.add('d-none')
    sourceContainer.removeAttribute('class')

}

const init = () => {
    load_source_code();
    getElements();
    sourceElement.textContent += cursor;

}

init()

window.onkeydown = (e) => {
    if (e.key == "Escape") {
        removeMessage()
    }
    else
        update_screen()
}