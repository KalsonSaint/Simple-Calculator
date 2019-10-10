const getHistory = () => {
  return document.getElementById("history-value").innerText;
};
const printHistory = num => {
  document.getElementById("history-value").innerText = num;
};
const getOutput = () => {
  return document.querySelector("#output-value").innerText;
};
const printOutput = num => {
  if (num == "") {
    document.querySelector("#output-value").innerText = num;
  } else {
    document.querySelector("#output-value").innerText = getFormattedNumber(num);
  }
};
const getFormattedNumber = num => {
  if (num == "-") {
    return "";
  }
  let n = Number(num).toLocaleString("en");
  return n;
};
const reverseNumberFormat = num => {
  return Number(num.replace(/,/g, ""));
};
let operator = document.querySelectorAll(".operator");
operator.forEach(e => {
  e.addEventListener("click", function() {
    if (this.id == "clear") {
      printHistory("");
      printOutput("");
    } else if (this.id == "backspace") {
      let output = reverseNumberFormat(getOutput()).toString();
      if (output) {
        output = output.substr(0, output.length - 1);
        printOutput(output);
      }
    } else {
      let output = getOutput();
      let history = getHistory();
      if (output == "" && history != "") {
        if (isNaN(history[history.length - 1])) {
          history = history.substr(0, history.length - 1);
        }
      }
      if (output != "" || history != "") {
        output = output==""?output:reverseNumberFormat(output);
        history += output;
        if (this.id == "=") {
          let result = eval(history);
          printOutput(result);
          printHistory("");
        } else {
          history += this.id;
          printHistory(history);
          printOutput("");
        }
      }
    }
  });
});
let number = document.querySelectorAll(".number");
number.forEach(e => {
  e.addEventListener("click", function() {
    let output = reverseNumberFormat(getOutput());
    if (output != NaN) {
      output += this.id;
      printOutput(output);
    }
  });
});
let mic = document.querySelector("#mic");
mic.onclick = () => {
    mic.classList.add("record");
    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();
    let operators = {
      "plus": "+",
      "minus": "-",
      "multiply": "*",
      "multiplied": "*",
      "divide": "/",
      "divided": "/",
      "remainder": "%"
    }
    recognition.onresult = e => {
        let input = e.results[0][0].transcript;
        for (const key in operators) {
          input = input.replace(property, operators[property]);
        }
        document.querySelector('#output-value').innerText = input
        setTimeout(()=>{
          evaluate(input);
        }, 2000);
        mic.classList.remove("record");
    }
};

const evaluate = input => {
  try {
    let result = eval(input);
    document.querySelector('#output-value').innerText = result;
  } catch (e) {
    console.log(e);
    document.querySelector('#output-value').innerText = "";
  }
}