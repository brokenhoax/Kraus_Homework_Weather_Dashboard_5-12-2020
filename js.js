//Current Date & Time
console.log(moment());

function getToday() {
    var NowMoment = moment().format('dddd MMMM Do YYYY');
    var eDisplayMoment = document.getElementsByClassName('display-moment');
    for (i = 0; i < eDisplayMoment.length; i++) {   
        console.log('******** :' + JSON.stringify(eDisplayMoment[""+i]))
        eDisplayMoment[""+i].innerHTML = NowMoment;
    }
}

$( document ).ready(function() {
var APIKey = "db417286ffd067d079c3760d5405b45d"
var queryURL = "https://api.openweathermap.org/data/2.5/weather?" + "q=Chicago,IL,US&appid=" + APIKey;

getToday() 

$.ajax({    
    url: queryURL,      
    method: "GET"
})

    .then(function(response) {

    // Log the queryURL
    console.log(queryURL);

    // Log the resulting object
    console.log(response);

    // // Transfer content to HTML
    // $(".city").html("<h1>" + response.name + "<div " + "class=\'display-moment\'>Test" + "</div>" + "</h1>");
    $(".city").html("<h1>" + response.name + "</h1>");
    $(".wind").text("Wind Speed: " + response.wind.speed);
    $(".humidity").text("Humidity: " + response.main.humidity);

    // // Convert the temp to fahrenheit    
    var tempF = (response.main.temp - 273.15) * 1.80 + 32;

    // add temp content to html
    $(".temp").text("Temperature (K) " + response.main.temp);
    $(".tempF").text("Temperature (F) " + tempF.toFixed(2));

    // Log the data in the console as well
    console.log("Wind Speed: " + response.wind.speed);
    console.log("Humidity: " + response.main.humidity);
    console.log("Temperature (F): " + tempF);    
  });

});






