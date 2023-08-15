async function displayFlightTickets() {
    try {
        const response = await fetch('/main1');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
       
        
        const flightTicketsDiv = document.getElementById('flightTickets');
        const flightTicketsDiv1 = document.getElementById('flightTickets1');
        flightTicketsDiv.innerHTML = '';
        flightTicketsDiv1.innerHTML = '';  

        var flightList = document.createElement('ul');
        flightList.setAttribute("id", "flights");
        var flightList1 = document.createElement('ul');
        flightList1.setAttribute("id", "returnflights");
    if (data && data.bookedFlights) {
        const booked_flights = data.bookedFlights;
  
        booked_flights.forEach((flight) => {
            var flightItem = document.createElement('li');
            flightItem.classList.add('flight-card');
            flightItem.textContent = '';

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
var lineBreak = document.createElement('br');
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
departureTimeSpan.textContent = flight.departureTime;
departureTime.appendChild(document.createTextNode('Departure Time'));
departureTime.appendChild(lineBreak);
departureTime.appendChild(departureTimeSpan);
var lineBreak = document.createElement('br');


const cardDiv = document.createElement('div');
cardDiv.classList.add('card');


var arrivalTime = document.createElement('p');
arrivalTime.setAttribute("id", "atime");
var arrivalTimeSpan = document.createElement('span');
arrivalTimeSpan.textContent = flight.arrivalTime;
arrivalTime.appendChild(document.createTextNode('Arrival Time'));
arrivalTime.appendChild(lineBreak);
arrivalTime.appendChild(arrivalTimeSpan);
var lineBreak = document.createElement('br');

    var numPassengers = document.createElement('p');
numPassengers.setAttribute("id", "num");
var numPassengersSpan = document.createElement('span');
numPassengersSpan.textContent = flight.passengers;
numPassengers.appendChild(document.createTextNode('No. of Passengers'));
numPassengers.appendChild(lineBreak);
numPassengers.appendChild(numPassengersSpan);

var lineBreak = document.createElement('br');

var totalPrice = document.createElement('p');
totalPrice.setAttribute("id", "total");
var totalPriceSpan = document.createElement('span');
totalPriceSpan.textContent = '$'+(flight.price * flight.passengers);
totalPrice.appendChild(document.createTextNode('Total Price'));
totalPrice.appendChild(lineBreak);
totalPrice.appendChild(totalPriceSpan);


cardDiv.appendChild(flightNumber);
cardDiv.appendChild(departureTime);
cardDiv.appendChild(arrivalTime);
cardDiv.appendChild(numPassengers);
cardDiv.appendChild(totalPrice);


var bookButton = document.createElement('button');
bookButton.textContent = 'Cancel';
          cardDiv.appendChild(bookButton);
           flightItem.appendChild(airline);
           flightItem.appendChild(slipDiv);
           flightItem.appendChild(cardDiv);
           
           bookButton.addEventListener('click', async () => {
            const flightId = flight.flightId;
            try {
              const response = await fetch('/cancel', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ flightId })
              });
              const data = await response.json();
              bookButton.style.backgroundColor = 'green';
               bookButton.textContent = 'Cancelled';
              console.log(data);
            } catch (error) {
              console.error('Error:', error);
            }
               
            });   
              flightList.appendChild(flightItem);
    }); 

if(flightList.childElementCount)
{
const heading = document.createElement('h1');
heading.textContent = 'Booked Flight Tickets';
flightTicketsDiv.appendChild(heading);
flightTicketsDiv.appendChild(flightList);
}

}

      if (data && data.returnFlights) {
        const return_flights = data.returnFlights;
        return_flights.forEach((flight) => {
        
          var flightItem = document.createElement('li');
          flightItem.classList.add('flight-card');
          flightItem.textContent = '';

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
var lineBreak = document.createElement('br');
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
departureTimeSpan.textContent = flight.departureTime;
departureTime.appendChild(document.createTextNode('Departure Time'));
departureTime.appendChild(lineBreak);
departureTime.appendChild(departureTimeSpan);
var lineBreak = document.createElement('br');


const cardDiv = document.createElement('div');
cardDiv.classList.add('card');



var arrivalTime = document.createElement('p');
arrivalTime.setAttribute("id", "atime");
var arrivalTimeSpan = document.createElement('span');
arrivalTimeSpan.textContent = flight.arrivalTime;
arrivalTime.appendChild(document.createTextNode('Arrival Time'));
arrivalTime.appendChild(lineBreak);
arrivalTime.appendChild(arrivalTimeSpan);
var lineBreak = document.createElement('br');

  var numPassengers = document.createElement('p');
numPassengers.setAttribute("id", "num");
var numPassengersSpan = document.createElement('span');
numPassengersSpan.textContent = flight.passengers;
numPassengers.appendChild(document.createTextNode('No. of Passengers'));
numPassengers.appendChild(lineBreak);
numPassengers.appendChild(numPassengersSpan);

var lineBreak = document.createElement('br');
var totalPrice = document.createElement('p');
totalPrice.setAttribute("id", "total");
var totalPriceSpan = document.createElement('span');
totalPriceSpan.textContent = '$'+(flight.price * flight.passengers);
totalPrice.appendChild(document.createTextNode('Total Price'));
totalPrice.appendChild(lineBreak);
totalPrice.appendChild(totalPriceSpan);


cardDiv.appendChild(flightNumber);
cardDiv.appendChild(departureTime);
cardDiv.appendChild(arrivalTime);
cardDiv.appendChild(numPassengers);
cardDiv.appendChild(totalPrice);


var bookButton = document.createElement('button');
bookButton.textContent = 'Cancel';
        cardDiv.appendChild(bookButton);
         flightItem.appendChild(airline);
         flightItem.appendChild(slipDiv);
         flightItem.appendChild(cardDiv);
         
         bookButton.addEventListener('click', async () => {
          const flightId = flight.flightId;
          try {
            const response = await fetch('/cancel', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ flightId })
            });
            const data = await response.json();
            bookButton.style.backgroundColor = 'green';
             bookButton.textContent = 'Cancelled';
            console.log(data);
          } catch (error) {
            console.error('Error:', error);
          }
             
          });  
            flightList1.appendChild(flightItem);
  }); 

if(flightList1.childElementCount)
{
const heading = document.createElement('h1');
heading.textContent = 'Booked Return Flight Tickets';
flightTicketsDiv1.appendChild(heading);
flightTicketsDiv1.appendChild(flightList1);
}
  

      } if(!flightList1.childElementCount && !flightList.childElementCount) {
        flightTicketsDiv.innerHTML = "<p>No booked flights found for this user.</p>";
      }
    } catch (err) {
      console.error('Error:', err);
    }

  }
  
  const goBackBtn = document.getElementById('goBackButton');
  goBackBtn.addEventListener('click', ()=> {
    window.history.replaceState({}, document.title, '/main');
  window.location.reload();
  });
  
  window.onload = displayFlightTickets;