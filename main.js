const main = document.querySelector(".main")
var div = document.createElement("div");

const btn = document.querySelector('#btn')

btn.addEventListener("click", () => {

    const input = document.querySelector("#input").value

    a(input)

})

async function getCurrencise(firstValute, secondValute, inputNumber) {

    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    const data = await response.json()
    const resultJSON = await data;

    const RUB = {
        CharCode: "RUB",
        Name: "Рублей",
        Nominal: 1,
        Value: 1
    }

    resultJSON.Valute.RUB = RUB

    let result
    let resultString

    if ((resultJSON.Valute[firstValute] == undefined) || (resultJSON.Valute[secondValute] == undefined)) {
        throw "Некоректная форма записи валюты";
    }

    result = (inputNumber / resultJSON.Valute[secondValute].Value) / resultJSON.Valute[firstValute].Nominal * resultJSON.Valute[firstValute].Value * resultJSON.Valute[secondValute].Nominal
    resultString = resultJSON.Valute[secondValute].Name

    result = (Math.round(result * 100) / 100)

    main.append(div);

    div.innerHTML = `${result} ${resultString}`;

}

function a(input) {

    inputNumber = Number(input.replace(/\D/g, ''))
    inputString = input.replace(/\d/g, '').replace(/\s/g, '').toUpperCase()

    if (~input.indexOf(inputNumber)) {} else {
        throw "Некоректная форма записи числа";
    }

    if ((inputString.length !== 8) || (inputString.slice(3, 5) !== "IN")) {
        throw "Некоректная форма записи преобразования";
    }

    const firstValute = inputString.slice(0, 3)
    const secondValute = inputString.slice(5, 9)

    getCurrencise(firstValute, secondValute, inputNumber)

}