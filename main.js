
div = document.createElement("div");

document.body.append(div);


async function getCurrencise(firstValute,secondValute, inputNumber){
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    const data = await response.json()
    const resultJSON = await data;
    
    let result
    let resultString

    if((firstValute!=="RUB" && resultJSON.Valute[firstValute]== undefined)||(secondValute !=="RUB" && resultJSON.Valute[secondValute]== undefined)){
        throw "Некоректная форма записи валюты";
    }

    if (firstValute == "RUB" && secondValute == "RUB") {
        result = inputNumber
        resultString = "Рублей"
    } else if (firstValute == "RUB"){
        result = inputNumber / resultJSON.Valute[secondValute].Value
        resultString = resultJSON.Valute[secondValute].Name
    } else if (secondValute == "RUB") {
        result = inputNumber * resultJSON.Valute[firstValute].Value
        resultString = "Рублей"
    } else {
        result = (inputNumber / resultJSON.Valute[firstValute].Value)*resultJSON.Valute[secondValute].Value
        resultString = resultJSON.Valute[secondValute].Name
    }

    result = (Math.floor(result * 100) / 100)
    
    

    
    div.innerHTML = `${result} ${resultString}` ;
    


}

const btn = document.querySelector('#btn')
btn.addEventListener("click", () => {
    console.log("click")
    const input = document.querySelector("#input").value
    console.log(input)
    a(input)
    
})


function a(input) {
    console.log(input)

    inputNumber = Number(input.replace(/\D/g, ''))

    inputString = input.replace(/\d/g, '').replace(/\s/g, '').toUpperCase()
    
    

    if (~input.indexOf(inputNumber)) {

    } else {
        throw "Некоректная форма записи числа";
    }

    if (inputString.length !== 8) {
        throw "Некоректная форма записи преобразования";
    }

    const firstValute = inputString.slice(0,3)
    const secondValute = inputString.slice(5,9)

    
    

    
}

