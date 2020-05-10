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

      // Display Weather Icons
        $("#display-icon").append("<i class='owf owf-" + response.weather[0].id + " owf-4x'" + "></i>");

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

    //Next Four Day API Call
    $.ajax({    
        url: queryTwoURL,      
        method: "GET"
    })
        .then(function(response) {

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log('!!!!!!!!!! :' + JSON.parse(JSON.stringify(response)));

        // // Transfer content to HTML
        for (i = 0; i <= 40; i += 8) {

            $("#wind-"+[i]).text("Wind Speed: " +  response.list[i].wind.speed  + " MPH");
            $("#humidity-"+[i]).text("Humidity: " + response.list[i].main.humidity + " %");

            // Display Weather Icons
            // $("#display-icon").append("<i class='owf owf-" + response.weather[i].id + " owf-4x'" + "></i>");

            // // Convert the temp to fahrenheit    
            var tempF = (response.list[i].main.temp - 273.15) * 1.80 + 32;
            console.log("Day: " + [i] + " Temp: " + tempF);

            // add temp content to html
            $(".temp").text("Temperature (K) " + response.list[i].main.temp);
            $("#tempF-"+[i]).text("Temperature: " + tempF.toFixed(2) + " (°F)");

            // Log the data in the console as well
            console.log("Wind Speed: " + response.list[i].wind.speed);
            console.log("Humidity: " + response.list[i].main.humidity);
            console.log("Temperature (F): " + tempF);
        };
    });

    //Last Day API Call
    $.ajax({    
        url: queryTwoURL,      
        method: "GET"
    })
        .then(function(response) {

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log('!!!!!!!!!! :' + JSON.parse(JSON.stringify(response)));

        // // Transfer content to HTML
    
        $("#wind-"+[39]).text("Wind Speed: " + response.list[39].wind.speed + " MPH");
        $("#humidity-"+[39]).text("Humidity: " + response.list[39].main.humidity + " %");

        // // Convert the temp to fahrenheit    
        var tempF = (response.list[39].main.temp - 273.15) * 1.80 + 32;
        console.log("Day: " + [39] + " Temp: " + tempF);

        // add temp content to html
        $(".temp").text("Temperature (K) " + response.list[39].main.temp);
        $("#tempF-"+[39]).text("Temperature: " + tempF.toFixed(2) + " (°F)");

        // Log the data in the console as well
        console.log("Wind Speed: " + response.list[39].wind.speed);
        console.log("Humidity: " + response.list[39].main.humidity);
        console.log("Temperature (F): " + tempF);
    });
});