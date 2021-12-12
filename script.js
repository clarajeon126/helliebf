import {saveForm} from "../firebase.js"

setUpParticle()

var step = 0;
var questions = [
    "What is your name?",
    "Do you like pottery?",
    "Do you wanna go stargazing?",
    "What's your discord tag",
    "What are your interests?",
    "What's your favorite food",
    "Do you like me?",
]

//objects
var questionObj = document.getElementById('main-question')
var textFieldObj = document.getElementById('text-field')
var enterLabelObj = document.getElementById('enter-label')
var yesDiv = document.getElementById('yes-div')
var noDiv = document.getElementById('no-div')
var dots = document.getElementsByClassName('dot')
var yesDot = document.getElementById('YES')
var noDot = document.getElementById('NO')
var submitButtonObj = document.getElementById('submit-but')

var applicant = {
    "name": "no",
    "pottery": "no",
    "dream": "no",
    "discord": "no",
    "interests": "no",
    "favfood": "no",
    "likeme": "yes"
}

yesDot.addEventListener('click', (event) => {
    if(step != 6){
        show(enterLabelObj)
    }
})

noDot.addEventListener('click', (event) => {
    noDot.checked = true
    show(enterLabelObj)
})

var whatQuestionType = "text"

//detects enter and only moves on if conditions are met
document.addEventListener('keydown', (event) => { 

    // get name of the keyboard click
    var name = event.key

    if(step == 6){
        console.log("enddd")
        if(name == "1"){
            yesDot.checked = true
        }
    }
    else if(name != "Enter"){
        //dictates what will happen if key is tapped depending on yn or text
        //first check if we are in a yn section or textfield and check the 1 and 2 stuff
        if (whatQuestionType == "yn"){
            
            if(name == "1"){
                yesDot.checked = true
            }
            else if(name == "2"){
                noDot.checked = true
            }
            show(enterLabelObj)
        }
        //in text question n user clicked a keyboard so show enter
        else if(whatQuestionType == "text") {
            console.log("in text")

            //so when i type it automatically highlights the textbox :D
            textFieldObj.focus()

            show(enterLabelObj)
        }
    }
    //the key has to be enter
    else if(name == "Enter" && step < 6){
        //check if enter has been shown
        let shown = enterLabelObj.style.display

        step += 1
        console.log(shown)
        //enter text field is shown
        if(shown == "block"){

            //change question text
            questionObj.innerHTML = questions[step]

            //setting data to applicant dict
            if(step == 1 ){
                applicant.name = textFieldObj.value
                textToYn()
            }
            else if(step == 2){
                let likesCoding = "no"
                if (yesDot.checked){
                    likesCoding = "yes"
                }
                applicant.pottery = likesCoding
                clearYn()
            }
            else if(step == 3){
                let likesDream = "no"
                if (yesDot.checked){
                    likesDream = "yes"
                }
                applicant.dream = likesDream
                ynToText()
            }
            else if(step == 4){
                applicant.discord = textFieldObj.value
                clearTextField()
            }
            else if(step == 5){
                applicant.interests = textFieldObj.value
                clearTextField()
            }
            else if(step == 6){
                applicant.favfood = textFieldObj.value
                textToYn()
                hide(noDiv)
                show(submitButtonObj)
            }

            hide(enterLabelObj)
        }
    }
})

function textToYn(){
    //change to yn
    whatQuestionType = "yn"

    hide(textFieldObj)
    textFieldObj.blur()
    show(yesDiv)
    show(noDiv)

    clearYn()
}

function ynToText(){
    //change to text
    whatQuestionType = "text"

    hide(yesDiv)
    hide(noDiv)

    clearTextField()
    show(textFieldObj)
}

function clearYn(){
    //clear fields
    yesDot.checked = false
    noDot.checked = false
}

function clearTextField(){
    //name says it lol
    textFieldObj.value = ""
}

//submit and finish and saves to firebase
submitButtonObj.addEventListener('click', (event) => {
    console.log(applicant)
    questionObj.innerHTML = "thank you for submitting :D"

    submit()

    //hide everything
    hide(yesDiv)
    hide(noDiv)
    hide(enterLabelObj)
    hide(submitButtonObj)
});

function show(element){
    element.style.display = "block"
}

function hide(element){
    element.style.display = "none"
}

//for the end when we're submitting :D
function submit() {
    saveForm(applicant)
}

function setUpParticle(){
    particlesJS.load('particles-js', 'particles.json', function() {
        console.log('callback - particles.js config loaded');
      });
}
