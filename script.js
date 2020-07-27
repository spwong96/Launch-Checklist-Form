// Write your JavaScript code here!
window.addEventListener("load", function(){
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
      response.json().then(function(json){
         console.log(json);
         let missionTarget = document.getElementById("missionTarget");

         function randomize(){
            let x = Math.floor((Math.random() * 5) + 1);
            return x;
         }

         let chosenPlanet = randomize();

         let itinerary = `<h2>Mission Destination</h2>
            <ol>
               <li>Name: ${json[chosenPlanet].name}</li>
               <li>Diameter: ${json[chosenPlanet].diameter}</li>
               <li>Star: ${json[chosenPlanet].star}</li>
               <li>Distance from Earth: ${json[chosenPlanet].distance}</li>
               <li>Number of Moons: ${json[chosenPlanet].moons}</li>
            </ol>
            <img src="${json[chosenPlanet].image}">`

         missionTarget.innerHTML = itinerary;
      });
   });

   let button = document.getElementById("formSubmit");
   button.addEventListener("click", function(event){
      event.preventDefault();
      let pilotName = document.querySelector("input[name=pilotName]");
      let copilotName = document.querySelector("input[name=copilotName]");
      let fuelLevel = document.querySelector("input[name=fuelLevel]");
      let cargoMass = document.querySelector("input[name=cargoMass]");

      function validate(name){    
         var re = /^[a-zA-Z]+$/;
         if(re.test(name.value))
            return true;
         else
            return false;
     }
      function checkForm(){
         if (validate(pilotName) === false || validate(copilotName) === false) {
            alert("Please put a valid name.");
            event.preventDefault();
         }  else if (isNaN(fuelLevel.value) || isNaN(cargoMass.value)) {
               alert("Please put a valid number.");
               event.preventDefault();
            }  else if (pilotName.value === ""|| copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === "") {
                  alert("All fields are required.");
                  event.preventDefault();
               }  else {
                     return true;
               }
      }

      if (checkForm() === true) {
         let launchStatus = document.getElementById("launchStatus");
         let faultyItems = document.getElementById("faultyItems");
         let pilotStatus = document.getElementById("pilotStatus");
         let copilotStatus = document.getElementById("copilotStatus");
         let fuelStatus = document.getElementById("fuelStatus");
         let cargoStatus = document.getElementById("cargoStatus");

         pilotStatus.innerHTML = `Pilot ${pilotName.value} is ready for launch`;
         copilotStatus.innerHTML = `Co-pilot ${copilotName.value} is ready for launch`;
         
         if (cargoMass.value < 10000 || fuelLevel.value > 10000) {
            launchStatus.innerHTML = "Shuttle is Ready for Launch";
            launchStatus.style.color = "green";
            fuelStatus.innerHTML = "Fuel level high enough for launch";
            cargoStatus.innerHTML = "Cargo mass low enough for launch";
         }
         if (cargoMass.value > 10000) {
            cargoStatus.innerHTML = "The cargo is too heavy for launch";
            launchStatus.innerHTML = "Shuttle Not Ready for Launch";
            launchStatus.style.color = "red";
         }
         if (fuelLevel.value < 10000) {
            fuelStatus.innerHTML = "Fuel level is too low for launch";
            launchStatus.innerHTML = "Shuttle Not Ready for Launch";
            launchStatus.style.color = "red";
         }
         faultyItems.style.visibility = "visible";
      }

   });
});