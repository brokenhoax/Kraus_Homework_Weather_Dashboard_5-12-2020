$( document ).ready(function() {
    const todoInput = document.querySelector('.todo-input');
    const todoButton = document.querySelector('.todo-button');
    const todoList = document.querySelector('.todo-list');
    var APIKey = "db417286ffd067d079c3760d5405b45d"
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" + "q=Chicago,IL,US&appid=" + APIKey; 
    var queryTwoURL = "https://api.openweathermap.org/data/2.5/forecast?" + "q=Chicago,IL,US&appid=" + APIKey; 
    
    //Show Current Date & Time

    function dayToday() {
        var NowMoment = moment().format("MMM Do YYYY");
        var eDisplayMoment = document.getElementById('display-moment');
        eDisplayMoment.innerHTML = NowMoment;    
    }

    //Show future Date & Time
    function dayFuture() {
        var dayOneMoment = moment().add(1, 'days').format('MMM Do');
        var dayOneShow = document.getElementById('day-one');
        var dayTwoMoment = moment().add(2, 'days').format('MMM Do');
        var dayTwoShow = document.getElementById('day-two');
        var dayThreeMoment = moment().add(3, 'days').format('MMM Do');
        var dayThreeShow = document.getElementById('day-three');
        var dayFourMoment = moment().add(4, 'days').format('MMM Do');
        var dayFourShow = document.getElementById('day-four');
        var dayFiveMoment = moment().add(5, 'days').format('MMM Do');
        var dayFiveShow = document.getElementById('day-five');
        dayOneShow.innerHTML = dayOneMoment;
        dayTwoShow.innerHTML = dayTwoMoment;
        dayThreeShow.innerHTML = dayThreeMoment;
        dayFourShow.innerHTML = dayFourMoment;
        dayFiveShow.innerHTML = dayFiveMoment;
        console.log('******* :' + dayOneShow);
    }

    dayToday();
    dayFuture();


    //Event Listeners
    todoButton.addEventListener('click', addToDo);
    todoList.addEventListener('click', deleteCheck);

    //User Search & Store

    function addToDo (event) {
        // Prevent form from submitting
        event.preventDefault();
        console.log('hello')
        //ToDo DIV
        const todoDiv = document.createElement('div');
        //Add Class to todoDiv
        todoDiv.classList.add('todo')
        //Create LI
        const newTodo = document.createElement('li');
        newTodo.innerText = todoInput.value;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //Append To List
        todoList.appendChild(todoDiv);
        //Clear ToDo Input Value
        todoInput.value = "";
    }

    // Delete ToDo from Quick Task List
    function deleteCheck(e){
        const item = e.target;
        console.log(e.target)
        //Delete Todo
        if(item.classList[0] === 'trash-btn'){
            const todoToRemove = item.parentElement;
            todoToRemove.remove();
        }
        //Check Mark Complete
        if(item.classList [0] === 'complete-btn') {
            const completedTodo = item.parentElement;
            completedTodo.classList.toggle('completed');
        }
    }



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
      // Icon sample => <i class="owf owf-200"></i>
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
        console.log(queryTwoURL);

        // Log the resulting object
        console.log('!!!!!!!!!! :' + JSON.parse(JSON.stringify(response)));

        // // Transfer content to HTML
        for (i = 0; i <= 40; i += 8) {

            $("#wind-"+[i]).text("Wind Speed: " + response.list[i].wind.speed + " MPH");
            $("#humidity-"+[i]).text("Humidity: " + response.list[i].main.humidity + " %");

            // Display Weather Icons
            $("#show-me-"+[i]).append("<i class='owf owf-" + response.list[i].weather[0].id + " owf-4x'" + "></i>");

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
        console.log(queryTwoURL);

        // Log the resulting object
        console.log('!!!!!!!!!! :' + JSON.stringify((response)));

        // // Transfer content to HTML
        $("#wind-"+[39]).text("Wind Speed: " + response.list[39].wind.speed + " MPH");
        $("#humidity-"+[39]).text("Humidity: " + response.list[39].main.humidity + " %");

        // Display Weather Icons
        $("#show-me-"+[39]).append("<i class='owf owf-" + response.list[39].weather[0].id + " owf-4x'" + "></i>");

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