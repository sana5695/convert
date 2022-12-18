getCurrencise()

async function getCurrencise() {
    //парсим данные для определения страны пользователя
    const responseGeo = await fetch('http://www.geoplugin.net/json.gp?ip=xx.xx.xx.xx')
    const geo = await responseGeo.json()
    const geoJSON = await geo

    //парсим данные курса валют
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    const data = await response.json()
    const resultJSON = await data;

    //добовляем в объект данные руюля
    const RUB = {
        CharCode: "RUB",
        Name: "Рублей",
        Nominal: 1,
        Value: 1
    }
    resultJSON.Valute.RUB = RUB

    //определяем базовую валюту
    var location = geoJSON.geoplugin_currencyCode;

    const select = document.querySelector(".select")
    const main = document.querySelector('.main')

    //вызываем функцию для вывода значений с базовую валютой
    chosed(location)

    //меняем базовую валюту
    location = select.addEventListener("click", () => {
        select.addEventListener('change', function () {
            location = this.value
            main.innerHTML = ""
            chosed(location)
        });
    })

    function chosed(location) {
        //очищаем вывод
        select.innerHTML = ""

        //получение занчения каждой валюты
        for (var key in resultJSON.Valute) {

            var element = resultJSON.Valute[key];
            var number = element.Value
            var option = document.createElement("option")

            select.append(option)
            option.innerHTML = `${element.CharCode}`

            if (location == element.CharCode) {
                option.setAttribute("selected", "selected")
            } else {
                select.append(option)
                option.innerHTML = `${element.CharCode}`

                number = 1 / resultJSON.Valute[location].Value / element.Nominal * number * resultJSON.Valute[location].Nominal

                number = (Math.round(number * 100) / 100);

                var div = document.createElement("div");
                div.classList.add('cell');
                main.append(div)
                div.innerHTML = `1 <span>${element.CharCode}</span> = ${number} <span>${location}</span>`;
            }
        };
    }
}