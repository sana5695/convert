


getCurrencise()


async function getCurrencise(){
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    const data = await response.json()
    const resultJSON = await data;
    
    for (var key in resultJSON.Valute) {
        
        var element = resultJSON.Valute[key];
        var number=element.Value
        number = (Math.floor(number * 100) / 100)
        console.log(element.CharCode);
        div = document.createElement("div");
        document.body.append(div);
        div.innerHTML = `${element.CharCode} ${number}`;
        
      };




}

