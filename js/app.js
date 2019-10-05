const getHistory = () => {
    return document.getElementById("history-value").innerText;
}
const printHistory = num => {
    document.getElementById("history-value").textContent = num;
}
const getOutput = () => {
    return document.querySelector('.#output-value').innerText;
}
const printOutput = num => {
    if(num == ""){
        document.querySelector('#output-value').innerText = num;
    } else{
        document.querySelector('#output-value').innerText = getFormattedNumber(num);
    }
}
const getFormattedNumber = num => {
    let n = Number(num).toLocaleString("en");
    return n;
}
const reverseNumberFormat = num => {
    return Number(num.replace(/,/g,''));
}
let operator = document.querySelectorAll('.operator');
operator.forEach(e => {
    e.addEventListener('click', function() {
        
    })
});
let number = document.querySelectorAll('.number');
number.forEach(e => {
    e.addEventListener('click', function() {
        let output = reverseNumberFormat(getOutput());
        if(!(output=NaN)){
            output=output+this.id;
            printOutput(output);
        }
    })
});