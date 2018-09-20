 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyCZUyfAZeE9Hv73HzWN1XGQ5O7MhOBdXtc",
    authDomain: "train-time-9045b.firebaseapp.com",
    databaseURL: "https://train-time-9045b.firebaseio.com",
    projectId: "train-time-9045b",
    storageBucket: "train-time-9045b.appspot.com",
    messagingSenderId: "86284127849"
  };
  
  firebase.initializeApp(config);

  var dataRef = firebase.database();

  // Initial Values
//   var trainName = "";
//   var destination = "";
//   var frequency = 7;
//   var trainTime = "03:30";


  $("#submit").on("click", function(event){
      event.preventDefault();

    // Grabs user input
    var addTrain = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var frequency = $("#frequency").val().trim();
    var firstTrainTime = $("#trainTime").val().trim();

      // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: addTrain,
    destination: destination,
    frequency: frequency,
    firstTrainTime: firstTrainTime
  };

// Code for the push
dataRef.ref().push(newTrain);

// Logs everything to console
console.log(newTrain.name);
console.log(newTrain.destination);
console.log(newTrain.frequency);
console.log(newTrain.firstTrainTime);

//     trainName: trainName,
//     destination: destination,
//     frequency: frequency,
//     timeConverted: moment(trainTime, "HH:mm").subtract(1, "years")
// });
// });

// Clears all of the text-boxes
    $("#trainName").val("");
    $("#destination").val("");
    $("#frequency").val("");
    $("#trainTime").val("");

});



dataRef.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
    // Store everything into a variable.
   var addTrain = childSnapshot.val().name;
   var destination = childSnapshot.val().destination;
   var frequency = childSnapshot.val().frequency
   var firstTrainTime = childSnapshot.val().firstTrainTime;

  // Employee Info
  console.log(addTrain);
  console.log(destination);
  console.log(frequency);
  console.log(firstTrainTime);

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().frequency);
    console.log(childSnapshot.val().firstTrainTime);

        // Assumptions
        // var tFrequency = frequency;

        // Time is 3:30 AM
        var firstTrainArr = firstTrainTime.split(":");
        var trainTime = moment().hours(firstTrainArr[0]).minutes(firstTrainArr[1]);
    
        // First Time (pushed back 1 year to make sure it comes before current time)
        // var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
        // console.log(firstTimeConverted);
    
        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    
        // Difference between the times
        var diffTime = moment().diff(moment(trainTime), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);
    
        // Time apart (remainder)
        var tRemainder = diffTime % frequency;
        console.log(tRemainder);
    
        // Minute Until Train
        var tMinutesTillTrain = frequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    
        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "m").format("hh:mm A");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(addTrain),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(nextTrain),
    $("<td>").text(tMinutesTillTrain),
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});

  