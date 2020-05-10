$( document ).ready(function() {
    var APIKey = "db417286ffd067d079c3760d5405b45d"
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" + "q=Chicago,IL,US&appid=" + APIKey; 
    var queryTwoURL = "https://api.openweathermap.org/data/2.5/forecast?" + "q=Chicago,IL,US&appid=" + APIKey; 
    
    //Show Current Date & Time
    console.log(moment());

    function dayZero() {
        var NowMoment = moment().add(0  , 'days').calendar();
        var eDisplayMoment = document.getElementsByClassName('display-moment');
        for (i = 0; i < eDisplayMoment.length; i++) {   
            console.log('~~~~~~ :' + JSON.stringify(eDisplayMoment[""+i]))
            eDisplayMoment[""+i].innerHTML = NowMoment;
        }
    }

    //Show future Date & Time
    function showDay() {
        var dayOneMoment = moment().add(1, 'days').calendar();
        var dayOneShow = document.getElementById('day-one');
        var dayTwoMoment = moment().add(2, 'days').calendar();
        var dayTwoShow = document.getElementById('day-two');
        var dayThreeMoment = moment().add(3, 'days').calendar();
        var dayThreeShow = document.getElementById('day-three');
        var dayFourMoment = moment().add(4, 'days').calendar();
        var dayFourShow = document.getElementById('day-four');
        var dayFiveMoment = moment().add(5, 'days').calendar();
        var dayFiveShow = document.getElementById('day-five');
        dayOneShow.innerHTML = dayOneMoment;
        dayTwoShow.innerHTML = dayTwoMoment;
        dayThreeShow.innerHTML = dayThreeMoment;
        dayFourShow.innerHTML = dayFourMoment;
        dayFiveShow.innerHTML = dayFiveMoment;
        console.log('******* :' + dayOneShow);
    }

    dayZero();
    showDay();

    //Today API Call
    $.ajax({    
        url: queryURL,      
        method: "GET"
    })
        .then(function(response) {

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log('******* :' + JSON.parse(JSON.stringify(response)));

        // // Transfer content to HTML
        $(".today-city").html("<h1>" + response.name + "</h1>");
        $(".today-wind").text("Wind Speed: " + response.wind.speed + " MPH");
        $(".today-humidity").text("Humidity: " + response.main.humidity + " %");

        // // Convert the temp to fahrenheit    
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        console.log(tempF);

        // add temp content to html
        $(".today-temp").text("Temperature (K) " + response.main.temp);
        $(".today-tempF").text("Temperature: " + tempF.toFixed(2) + " (°F)");

        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + tempF);
    });

    //Tomorrow API Call
    $.ajax({    
        url: queryTwoURL,      
        method: "GET"
    })
        .then(function(response) {

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log('******* :' + JSON.parse(JSON.stringify(response)));

        // // Transfer content to HTML
        $(".city").html("<h1>" + response.city.name + "</h1>");
        $(".wind").text("Wind Speed: " + response.list[0].wind.speed + " MPH");
        $(".humidity").text("Humidity: " + response.list[0].main.humidity + " %");

        // // Convert the temp to fahrenheit    
        var tempF = (response.list[0].main.temp - 273.15) * 1.80 + 32;
        console.log(tempF);

        // add temp content to html
        $(".temp").text("Temperature (K) " + response.list[0].main.temp);
        $(".tempF").text("Temperature: " + tempF.toFixed(2) + " (°F)");

        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + tempF);
    });
});