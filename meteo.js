var key = '76826def575148a3aca2ad66f8eab4c3';

var callBackGetSuccess = function (data) {
    console.log("données api", data);
    // alert("Meteo temp : " + data.main.temp)
    document.getElementById("temp").innerHTML = data.main.temp;
    document.getElementById("ressenti").innerHTML = data.main.feels_like;
    document.getElementById("nuage").style.opacity = data.clouds.all / 100;
    document.getElementById("cloud percentage").innerHTML =
        "Couverture nuageuse : " + data.clouds.all + "%";
    document.getElementById("ville").innerHTML = data.name;
    var icon = data.weather[0].icon;
    document.getElementById("icon").src = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
    document.getElementById("meteo").innerHTML = data.weather[0].description

    var temp = data.main.feels_like;
    ////////////////////////////////////////////////////////////////////
    //   temp = document.getElementById("slider").value;              //
    //   document.getElementById("temp arbitraire").innerHTML = temp; //
    ////////////////////////////////////////////////////////////////////
    var hueMax = 255;
    if (temp <= 17.5) {
        var blue = (-hueMax / 17.5) * temp + hueMax;
        var green = (hueMax / 17.5) * temp;
        var red = 0;
    } else if (17.5 < temp && temp <= 26.25) {
        var blue = 0;
        var green = hueMax;
        var red = (hueMax / (26.25 - 17.5)) * temp - 2 * hueMax;
    } else if (26.25 < temp && temp <= 35) {
        var blue = 0;
        var green = (-hueMax / (26.25 - 17.5)) * temp + 4 * hueMax;
        var red = hueMax;
    }
    var color = new String("rgb(" + red + "," + green + "," + blue + ")");
    var bgVal = document.getElementsByTagName("body");
    bgVal[0].style.background = color;
    if (blue + green + red > 280) {
        document.getElementsByTagName("body")[0].style.color = "black";
    } else {
        document.getElementsByTagName("body")[0].style.color = "white";
    }

    document.getElementById("humidity").innerHTML = data.main.humidity;

    var lever = data.sys.sunrise;
    var coucher = data.sys.sunset;
    var temps = data.dt;
    var pourcentage = ((temps - lever) / (coucher - lever)) * 100;
    document.getElementsByClassName("progress")[0].style.width = pourcentage + "%";
};

function onloadfunc() {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };

    function success(pos) {
        var crd = pos.coords;

        var lat = crd.latitude;
        var long = crd.longitude;
        var url =
            "https://api.openweathermap.org/data/2.5/weather?lat=" +
            lat +
            "&lon=" +
            long +
            "&appid="+key+"&units=metric&lang=fr";
        $.get(url, callBackGetSuccess)
            .done(function () {
                // alert("second success");
            })
            .fail(function () {
                alert("error");
            })
            .always(function () {
                // alert("finished");
            });
    }

    function error(err) {
        console.warn(`ERREUR (${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
}
