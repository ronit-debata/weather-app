var i = document.getElementsByTagName('img');
var h = document.getElementsByTagName('h5');
var p = document.getElementsByTagName('p');
var b = document.getElementsByTagName('a');

var getCountries = async () => {
    const fetchedData = await fetch("https://restcountries.com/v3/all");
    console.log("Fetching Complete");
    const parsedData = await fetchedData.json();
    console.log("Parsing Complete");
    console.log(parsedData);

    var r = Math.floor(Math.random() * (200 - 1 + 1) + 1);
    
    for(let c = 0; c < 3; c++) {
        i[c].setAttribute("src", `${parsedData[c+r].flags[0]}`);
        h[c].innerText = `${parsedData[c+r].name.common}`;
        p[c].innerHTML = `Capital : <strong>${parsedData[c+r].capital[0]}</strong> <br> Region : ${parsedData[c+r].region} <br> Country Code: ${parsedData[c+r].cca2}`;
    }
}

for(let j = 0; j < 3; j++) {
    b[j].addEventListener("click", () => {
        var city = document.getElementsByTagName('strong');

        async function getWeather() {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city[j].innerHTML}&appid=da101bfa11c7ca0c4a63855be7a96308`);
            console.log("Fetching Complete");
            const wData = await response.json();
            console.log("Parsing Complete");
            return wData;
        }      
        getWeather()
            .then((data) => {
                console.log(data);
                var city = document.querySelector('.city');
                var tdate = document.querySelector('.date');
                var temp = document.querySelector('.temp');
                var element = document.querySelector('.weather');
                var minmax = document.querySelector('.minmax');

                city.innerText = `${data.name}, ${data.sys.country}`;
                temp.innerText = `${Math.round(data.main.temp-273.15)}°c`;
                element.innerText = `${data.weather[0].main}`;
                minmax.innerText = `${Math.round(data.main.temp_min-273.15)}°c / ${Math.round(data.main.temp_max-273.15)}°c`;

                let now = new Date();
                tdate.innerText = dateBuilder(now);

                function dateBuilder (d) {
                    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                  
                    let day = days[d.getDay()];
                    let date = d.getDate();
                    let month = months[d.getMonth()];
                    let year = d.getFullYear();
                  
                    return `${day}, ${date} ${month} ${year}`;
                }
            })
            .catch((err) => {
                console.log(err);
            })
    })
}

