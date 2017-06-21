console.log('\'Allo \'Allo!');

var buttons = $('#buttons')[0];
buttons.addEventListener('click', numPadHandler, false);
var maths =  "÷--×";
var chain = false;

function historyScreen(v) {
    var answer = document.querySelector('#answer');
    var history = document.querySelector('#history p');
    var hisText = history.innerHTML;
    var ansText = answer.innerHTML;
    //maths.indexOf(hisText[hisText.length-1]);
    if(hisText === "") {
        history.innerHTML = ansText + " " + hisText + " " + v;
        chain = false;
    } else if(!chain) {
        return;
    } else {
        history.innerHTML = hisText + " " + ansText + " " + v;
        chain = false;
    }

}

function answerScreen(v) {
    var answer = document.querySelector('#answer');
    if(answer.innerHTML.length >= 8) {
        alert("overflow Error");
        answer.innerHTML = "";
    }
    if(answer.innerHTML === "0") {
        var text = "";
    } else {
        var text = answer.innerHTML;
    }
    answer.innerHTML = text + v;
    chain = true;
}

function numPadHandler(e) {
    var answer = document.querySelector('#answer');
    var history = document.querySelector('#history p');
    if(e.target !== e.currentTarget) {
        var clickedItem = e.target;
        switch (clickedItem.id) {
            case "btn-CE":
                answer.innerHTML = "0";
                break;
            case "btn-C":
                answer.innerHTML = "0";
                history.innerHTML = "";
                break;
            case "btn-9": case "btn-8": case "btn-7": case "btn-6": case "btn-5":
            case "btn-4": case "btn-3": case "btn-2": case "btn-1":
            case "btn-0":
                answerScreen(clickedItem.value);
                break;
            case "btn-divide": case "btn-multi": case "btn-minus": case "btn-plus":
                historyScreen(clickedItem.value);
                break;
            case "btn-point":
                break;
        }
    }
    e.stopPropagation();
}