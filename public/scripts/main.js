const originalToCountryOptions = Array.from(document.getElementById('toCountry').options);
  
function updateToCountryOptions() {
  const fromCountrySelect = document.getElementById('fromCountry');
  const toCountrySelect = document.getElementById('toCountry');
  toCountrySelect.disabled = false;
  toCountrySelect.innerHTML = '';
  const selectedFromCountry = fromCountrySelect.value;
  originalToCountryOptions.forEach(option => {
    const newOption = option.cloneNode(true);
    if (option.value === selectedFromCountry) {
      newOption.disabled = true;
    }
    toCountrySelect.appendChild(newOption);
  });
}


const oneWayOption = document.getElementById("oneWay");
const twoWayOption = document.getElementById("twoWay");

oneWayOption.addEventListener("click", () => {
 oneWayOption.classList.add("active");
twoWayOption.classList.remove("active");
 document.getElementById('returnDate').value='';
document.getElementById('flightResults1').innerHTML = '';
document.getElementById("Return").classList.add("return");
});

twoWayOption.addEventListener("click", () => {
twoWayOption.classList.add("active");
oneWayOption.classList.remove("active");
document.getElementById("Return").classList.remove("return");
});


function searchFlights(fromCountry, toCountry, dateOfJourney, returnDate) {
const filteredFlights = flights.filter(flight =>
  flight.fromCountry === fromCountry &&
  flight.toCountry === toCountry &&
  flight.dates.some(date => date.date === dateOfJourney)
).map(({ dates, ...rest }) => ({
  ...rest,
  dates: dates.filter(date => date.date === dateOfJourney)
}));
if (filteredFlights[0]) {
  filteredFlights[0]['isReturn'] = false;
}

if (returnDate) {
  const returnFlights = flights.filter(flight =>
    flight.fromCountry === toCountry &&
    flight.toCountry === fromCountry &&
    flight.dates.some(date => date.date === returnDate)
  ).map(({ dates, ...rest }) => ({
    ...rest,
    dates: dates.filter(date => date.date === returnDate)
  }));
  if (returnFlights[0]) {
    returnFlights[0]['isReturn'] = true;
  }
  return [...filteredFlights, ...returnFlights];
}
return filteredFlights;
}

document.getElementById('flightSearchForm').addEventListener('submit', function(event) {
event.preventDefault(); 
var fromCountry = document.getElementById('fromCountry').value;
var toCountry = document.getElementById('toCountry').value;
var number = document.getElementById('no').value;
var dateOfJourney = document.getElementById('dateOfJourney').value;
var returnDate = document.getElementById('returnDate').value;
var passengers = parseInt(number);

var searchResults = searchFlights(fromCountry, toCountry, dateOfJourney, returnDate);
displayFlightResults(searchResults,passengers);
});

function displayFlightResults(flightData,passengers) {
var flightResultsDiv = document.getElementById('flightResults');
var flightResultsDiv1 = document.getElementById('flightResults1');
flightResultsDiv.innerHTML = '';
flightResultsDiv1.innerHTML = '';

var flightList = document.createElement('ul');
flightList.setAttribute("id", "flights");
var flightList1 = document.createElement('ul');
flightList1.setAttribute("id", "returnflights");
flightData.forEach(function(flight) {
  flight.dates.forEach(function(date) {
    var flightItem = document.createElement('li');
    flightItem.classList.add('flight-card');
    flightItem.textContent = '';
    var lineBreak = document.createElement('br');

    var airline = document.createElement('p');
    airline.setAttribute("id", "airline");
    airline.textContent = flight.airline;

    const slipDiv = document.createElement('div');
    slipDiv.classList.add('slip');

const fromSpan = document.createElement('span');
fromSpan.classList.add('fromslip');
fromSpan.textContent = flight.fromCountry;

const planeSpan = document.createElement('span');
planeSpan.classList.add('planeslip');
planeSpan.innerHTML = '<svg clip-rule="evenodd" fill-rule="evenodd" height="50" width="50" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg"><g stroke="#222"><line fill="none" stroke-linecap="round" stroke-width="30" x1="300" x2="55" y1="390" y2="390"/><path d="M98 325c-9 10 10 16 25 6l311-156c24-17 35-25 42-50 2-15-46-11-78-7-15 1-34 10-42 16l-56 35 1-1-169-31c-14-3-24-5-37-1-10 5-18 10-27 18l122 72c4 3 5 7 1 9l-44 27-75-15c-10-2-18-4-28 0-8 4-14 9-20 15l74 63z" fill="#222" stroke-linejoin="round" stroke-width="10"/></g></svg>';

const toSpan = document.createElement('span');
toSpan.classList.add('toslip');
toSpan.textContent = flight.toCountry;

const price = document.createElement('p');
price.id = 'price';
price.innerHTML = '$' + flight.price;


slipDiv.appendChild(fromSpan);
slipDiv.appendChild(planeSpan);
slipDiv.appendChild(toSpan);
slipDiv.appendChild(price);

    var flightNumber = document.createElement('p');
    flightNumber.setAttribute("id", "flightno");
    var flightNumberSpan = document.createElement('span');
    flightNumberSpan.textContent = flight.flightNumber;
    flightNumber.appendChild(document.createTextNode('Flight Number'));
    flightNumber.appendChild(lineBreak);
    flightNumber.appendChild(flightNumberSpan);
    var lineBreak = document.createElement('br');

var departureTime = document.createElement('p');
departureTime.setAttribute("id", "dtime");
var departureTimeSpan = document.createElement('span');
departureTimeSpan.textContent = date.departureTime;
departureTime.appendChild(document.createTextNode('Departure Time'));
departureTime.appendChild(lineBreak);
departureTime.appendChild(departureTimeSpan);
var lineBreak = document.createElement('br');


const cardDiv = document.createElement('div');
cardDiv.classList.add('card');

var arrivalTime = document.createElement('p');
arrivalTime.setAttribute("id", "atime");
var arrivalTimeSpan = document.createElement('span');
arrivalTimeSpan.textContent = date.arrivalTime;
arrivalTime.appendChild(document.createTextNode('Arrival Time'));
arrivalTime.appendChild(lineBreak);
arrivalTime.appendChild(arrivalTimeSpan);
var lineBreak = document.createElement('br');

var numPassengers = document.createElement('p');
numPassengers.setAttribute("id", "num");
var numPassengersSpan = document.createElement('span');
numPassengersSpan.textContent = passengers;
numPassengers.appendChild(document.createTextNode('No. of Passengers'));
numPassengers.appendChild(lineBreak);
numPassengers.appendChild(numPassengersSpan);

var lineBreak = document.createElement('br');

var totalPrice = document.createElement('p');
totalPrice.setAttribute("id", "total");
var totalPriceSpan = document.createElement('span');
totalPriceSpan.textContent = '$'+(flight.price * passengers);
totalPrice.appendChild(document.createTextNode('Total Price'));
totalPrice.appendChild(lineBreak);
totalPrice.appendChild(totalPriceSpan);


cardDiv.appendChild(flightNumber);
cardDiv.appendChild(departureTime);
cardDiv.appendChild(arrivalTime);
cardDiv.appendChild(numPassengers);
cardDiv.appendChild(totalPrice);
var bookButton = document.createElement('button');
bookButton.textContent = 'Book Flight';

cardDiv.appendChild(bookButton);

flightItem.appendChild(airline);
flightItem.appendChild(slipDiv);
flightItem.appendChild(cardDiv);
bookButton.addEventListener('click', function() {
  bookFlight(flight,passengers);
  bookButton.style.backgroundColor = 'green';
  bookButton.textContent = 'Booked';
    });
    if(flight.isReturn)
    {
      flightList1.appendChild(flightItem);
    }
    else{
      flightList.appendChild(flightItem);
    }
  });
});
var dateOfJourneyInput = document.querySelector('input[name="dateOfJourney"]');
if(flightList.childElementCount)
{
const heading = document.createElement('h1');
heading.textContent = 'Flights';
flightResultsDiv.appendChild(heading);
flightResultsDiv.appendChild(flightList);
}
else if(dateOfJourneyInput.value){
  const heading = document.createElement('h1');
  heading.textContent = 'Flights';
  const text = document.createElement('a');
  text.textContent='No flights available for the selected criteria.Click here to see available flights';
 text.href = '/flights';
 text.target = '_blank'; 
  flightResultsDiv.appendChild(heading);
  flightResultsDiv.appendChild(text);
}
var returnDateInput = document.querySelector('input[name="returnDate"]');
if(flightList1.childElementCount )
{
const heading1 = document.createElement('h1');
heading1.textContent = 'Return Flights';
flightResultsDiv1.appendChild(heading1);
flightResultsDiv1.appendChild(flightList1);
}
else if(returnDateInput.value){
  const heading1 = document.createElement('h1');
  heading1.textContent = 'Return Flights';
  const text1 = document.createElement('a');
   text1.textContent='No flights available for the selected criteria.Click here to see available flights';
  text1.href = '/flights';
  text1.target = '_blank'; 
  flightResultsDiv1.appendChild(heading1);
  flightResultsDiv1.appendChild(text1);

}
} 

function bookFlight(flight,passengers) {
var { flightNumber,fromCountry,toCountry, airline,price,dates,isReturn } = flight;
var { departureTime, arrivalTime } = dates[0];
fetch('/main', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({  flightNumber,fromCountry,toCountry, airline,price,passengers, departureTime, arrivalTime,isReturn })
})
.then(function(response) {
  if (response.ok) {
    alert('Flight booked successfully');
  } else {
    alert('Failed to book flight');
  }
})
.catch(function(error) {
  console.error('Error:', error);
  alert('An error occurred');
});
}