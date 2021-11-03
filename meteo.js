var callBackGetSuccess = function(data) {
    console.log("données api", data);
    // alert("Meteo temp : " + data.main.temp)
    document.getElementById("temp").innerHTML = "La température est de " + data.main.temp + "°C";
    document.getElementById("ressenti").innerHTML = "Température ressentie : " + data.main.feels_like + "°C";
    document.getElementById("nuage").style.opacity = data.clouds.all / 100
    document.getElementById("cloud percentage").innerHTML = "Couverture nuageuse : " + data.clouds.all +"%";
    var temp = data.main.feels_like
    // temp = document.getElementById("slider").value
    // document.getElementById("temp arbitraire").innerHTML = temp;
    var hueMax = 255;
    if (temp <= 17.5) {
        var blue = (-hueMax/17.5)*temp + hueMax;
        var green = (hueMax/17.5)*temp;
        var red = 0;
    } else if (17.5 < temp && temp <= 26.25) {
        var blue = 0;
        var green = hueMax;
        var red = (hueMax/(26.25-17.5))*temp - 2*hueMax;
    } else if (26.25 < temp && temp <= 35) {
        var blue = 0;
        var green = (-hueMax/(26.25-17.5))*temp + 4*hueMax;
        var red = hueMax;
    };
    var color = new String("rgb("+red+","+green+","+blue+")");
    var bgVal = document.getElementsByTagName("body");
    bgVal[0].style.background = color;
    document.getElementById("humidity").innerHTML = "Humidité : " + data.main.humidity + "%";
}

// function buttonClickGET() {
//     var queryLoc = document.getElementById("queryLoc").value;

//     var url = "https://api.openweathermap.org/data/2.5/weather?q="+queryLoc+"&appid=45588b05eb419a5ff7319f7d44a6ca74&units=metric"
//     $.get(url, callBackGetSuccess).done(function() {
//         // alert("second success");
//     })
//     .fail(function() {
//         alert("error");
//     })
//     .always(function() {
//         // alert("finished");
//     });
// }

function onloadfunc() {
    var url = "https://api.openweathermap.org/data/2.5/weather?lat=45.19119457575232&lon=5.765416217189155&appid=45588b05eb419a5ff7319f7d44a6ca74&units=metric&lang=fr"
    $.get(url, callBackGetSuccess).done(function() {
        // alert("second success");
    })
    .fail(function() {
        alert("error");
    })
    .always(function() {
        // alert("finished");
    });
}