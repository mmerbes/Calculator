
var buttons = $('#buttons')[0];
buttons.addEventListener('click', numPadHandler, false);
var maths =  "÷--×";
var chain = false;
var ops = [];
var answerHistory = undefined;
var newQuestion = false;

function calculate(ops, eql = false) {
    var answer = document.querySelector('#answer');
    var history = document.querySelector('#history p');
    console.log(ops);
    if(eql) {
        ops[2] = answer.innerHTML;
    }
    switch(ops[1]) {
        case "+":
            if(answerHistory === undefined) {
                answerHistory = parseFloat(ops[0], 10) + parseFloat(ops[2], 10);
            } else {
                answerHistory = answerHistory + parseFloat(ops[2], 10);
            }
            break;
        case "-":
            if(answerHistory === undefined) {
                answerHistory = parseFloat(ops[0], 10) - parseFloat(ops[2], 10);
            } else {
                answerHistory = answerHistory - parseFloat(ops[2], 10);
            }
            break;
        case "/":
            if(answerHistory === undefined) {
                answerHistory = parseFloat(ops[0], 10) / parseFloat(ops[2], 10);
            } else {
                answerHistory = answerHistory / parseFloat(ops[2], 10);
            }
            break;
        case "x": 
            if(answerHistory === undefined) {
                answerHistory = parseFloat(ops[0], 10) * parseFloat(ops[2], 10);
            } else {
                answerHistory = answerHistory * parseFloat(ops[2], 10);
            }
            break;
        default:
            console.log('wtf work dang you');
    }
    answer.innerHTML = answerHistory.toString().length > 6 ? answerHistory.toFixed(5) : answerHistory;
}

function historyScreen(v) {
    var answer = document.querySelector('#answer');
    var history = document.querySelector('#history p');
    var hisText = history.innerHTML;
    var ansText = answer.innerHTML;
    //maths.indexOf(hisText[hisText.length-1]);
    if(hisText === "") {
        history.innerHTML = ansText + " " + v;
        ops.push(ansText, v);
        chain = false;
    } else if(!chain) {
        return;
    } else {
        history.innerHTML = hisText + " " + ansText + " " + v;
        ops.push(ansText, v);
        chain = false;
    }

    if(ops.length >= 3) {
        var temp = ops.slice(-4, -1);
        calculate(temp, false);
    }

}

function answerScreen(v) {
    var answer = document.querySelector('#answer');
    var history = document.querySelector('#history p').innerHTML;
    if(answer.innerHTML.length >= 8) {
        alert("Overflow Error");
        answer.innerHTML = "";
    } else if((answer.innerHTML === "0" || (!chain && history.length > 0) || newQuestion) &&  v !== '.') {
        var text = "";
        newQuestion = false;
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
                ops = [];
                answerHistory = undefined;
                break;
            case "btn-9": case "btn-8": case "btn-7": case "btn-6": case "btn-5":
            case "btn-4": case "btn-3": case "btn-2": case "btn-1":
            case "btn-0": 
                answerScreen(clickedItem.value);
                break;
            case "btn-point":
                if(answer.innerHTML.indexOf('.')  === -1)  {
                    answerScreen(clickedItem.value);
                }
                break;
            case "btn-divide": case "btn-multi": case "btn-minus": case "btn-plus":
                historyScreen(clickedItem.value);
                break;
            case "btn-eql":
                calculate(ops.slice(-2), true, clickedItem.value);
                ops = []
                answerHistory = undefined;
                history.innerHTML = "";
                newQuestion = true;
                break;
        }
    }
    e.stopPropagation();
}