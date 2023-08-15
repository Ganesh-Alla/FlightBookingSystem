const flights = [
  {
    flightNumber: "ABC123", 
    airline: "Example Airlines",
    fromCountry: "New York, USA",
    toCountry: "London, UK",
    price: 500, 
    dates: [
      { date: "2023-08-01", departureTime: "09:00 AM", arrivalTime: "03:30 PM"},
      { date: "2023-08-05", departureTime: "10:30 AM", arrivalTime: "05:00 PM"},
      { date: "2023-08-10", departureTime: "08:45 AM", arrivalTime: "02:15 PM"},
    ]
  },
  {
    flightNumber: "XYZ789", 
    airline: "International Airways",
    fromCountry: "Los Angeles, USA",
    toCountry: "Tokyo, Japan",
    price: 800, 
    dates: [
      { date: "2023-08-02", departureTime: "11:00 PM", arrivalTime: "06:30 AM (next day)"},
      { date: "2023-08-07", departureTime: "10:15 PM", arrivalTime: "06:45 AM (next day)"},
      { date: "2023-08-14", departureTime: "10:30 PM", arrivalTime: "06:55 AM (next day)"},
    ]
  },
  {
    flightNumber: "JKL456", 
    airline: "Global Airlines",
    fromCountry: "London, UK",
    toCountry: "Sydney, Australia",
    price: 1200, 
    dates: [
      { date: "2023-08-03", departureTime: "08:00 AM", arrivalTime: "08:00 PM"},
      { date: "2023-08-09", departureTime: "07:30 AM", arrivalTime: "07:30 PM"},
      { date: "2023-08-15", departureTime: "08:15 AM", arrivalTime: "08:15 PM"},
    ]
  },
  {
    flightNumber: "MNO789", 
    airline: "Skyway Airlines",
    fromCountry: "Singapore",
    toCountry: "Paris, France",
    price: 900, 
    dates: [
      { date: "2023-08-04", departureTime: "02:00 PM", arrivalTime: "09:00 PM"},
      { date: "2023-08-10", departureTime: "01:30 PM", arrivalTime: "08:30 PM"},
      { date: "2023-08-16", departureTime: "02:15 PM", arrivalTime: "09:15 PM"},
    ]
  },

  {
    flightNumber: "ABC123-R", 
    airline: "Example Airlines",
    fromCountry: "London, UK",
    toCountry: "New York, USA",
    price: 480, 
    dates: [
      { date: "2023-08-02", departureTime: "09:00 AM", arrivalTime: "03:30 PM"},
      { date: "2023-08-06", departureTime: "10:30 AM", arrivalTime: "05:00 PM"},
      { date: "2023-08-11", departureTime: "08:45 AM", arrivalTime: "02:15 PM"},
    ]
  },
  {
    flightNumber: "XYZ789-R", 
    airline: "International Airways",
    fromCountry: "Tokyo, Japan",
    toCountry: "Los Angeles, USA",
    price: 780, 
    dates: [
      { date: "2023-08-03", departureTime: "11:00 PM", arrivalTime: "06:30 AM (next day)"},
      { date: "2023-08-08", departureTime: "10:15 PM", arrivalTime: "06:45 AM (next day)"},
      { date: "2023-08-15", departureTime: "10:30 PM", arrivalTime: "06:55 AM (next day)"},
    ]
  },
  {
    flightNumber: "JKL456-R", 
    airline: "Global Airlines",
    fromCountry: "Sydney, Australia",
    toCountry: "London, UK",
    price: 1100,
    dates: [
      { date: "2023-08-04", departureTime: "08:00 AM", arrivalTime: "08:00 PM"},
      { date: "2023-08-10", departureTime: "07:30 AM", arrivalTime: "07:30 PM"},
      { date: "2023-08-16", departureTime: "08:15 AM", arrivalTime: "08:15 PM"},
    ]
  },
  {
    flightNumber: "MNO789-R", 
    airline: "Skyway Airlines",
    fromCountry: "Paris, France",
    toCountry: "Singapore",
    price: 850, 
    dates: [
      { date: "2023-08-05", departureTime: "02:00 PM", arrivalTime: "09:00 PM"},
      { date: "2023-08-11", departureTime: "01:30 PM", arrivalTime: "08:30 PM"},
      { date: "2023-08-17", departureTime: "02:15 PM", arrivalTime: "09:15 PM"},
    ]
  },
  {
    flightNumber: "XYZ456", 
    airline: "GlobeFly Airlines",
    fromCountry: "Sydney, Australia",
    toCountry: "New York, USA",
    price: 1200, // USD
    dates: [
      { date: "2023-08-01", departureTime: "12:00 PM", arrivalTime: "08:00 PM"},
      { date: "2023-08-06", departureTime: "11:30 AM", arrivalTime: "07:30 PM"},
      { date: "2023-08-12", departureTime: "01:00 PM", arrivalTime: "09:00 PM"},
    ]
  },
  {
    flightNumber: "XYZ456-R", 
    airline: "GlobeFly Airlines",
    fromCountry: "New York, USA",
    toCountry: "Sydney, Australia",
    price: 1150, // USD (Return flight discounted price)
    dates: [
      { date: "2023-08-02", departureTime: "09:30 AM", arrivalTime: "06:30 PM"},
      { date: "2023-08-07", departureTime: "10:00 AM", arrivalTime: "07:00 PM"},
      { date: "2023-08-13", departureTime: "11:00 AM", arrivalTime: "08:00 PM"},
    ]
  },
  {
    flightNumber: "JKL123", 
    airline: "AirConnect",
    fromCountry: "London, UK",
    toCountry: "Tokyo, Japan",
    price: 900, 
    dates: [
      { date: "2023-08-04", departureTime: "08:00 AM", arrivalTime: "06:00 PM"},
      { date: "2023-08-09", departureTime: "09:00 AM", arrivalTime: "07:00 PM"},
      { date: "2023-08-15", departureTime: "10:00 AM", arrivalTime: "08:00 PM"},
    ]
  },
  {
    flightNumber: "JKL123-R", 
    airline: "AirConnect",
    fromCountry: "Tokyo, Japan",
    toCountry: "London, UK",
    price: 880, 
    dates: [
      { date: "2023-08-05", departureTime: "08:30 AM", arrivalTime: "06:30 PM"},
      { date: "2023-08-10", departureTime: "09:30 AM", arrivalTime: "07:30 PM"},
      { date: "2023-08-16", departureTime: "10:30 AM", arrivalTime: "08:30 PM"},
    ]
  },
  

  {
    flightNumber: "DEF789", 
    airline: "AirGlobe",
    fromCountry: "Los Angeles, USA",
    toCountry: "Paris, France",
    price: 950, 
    dates: [
      { date: "2023-08-07", departureTime: "11:00 AM", arrivalTime: "07:00 PM"},
      { date: "2023-08-12", departureTime: "12:00 PM", arrivalTime: "08:00 PM"},
      { date: "2023-08-18", departureTime: "01:00 PM", arrivalTime: "09:00 PM"},
    ]
  },
  {
    flightNumber: "DEF789-R", 
    airline: "AirGlobe",
    fromCountry: "Paris, France",
    toCountry: "Los Angeles, USA",
    price: 920, 
    dates: [
      { date: "2023-08-08", departureTime: "09:30 AM", arrivalTime: "05:30 PM"},
      { date: "2023-08-13", departureTime: "10:30 AM", arrivalTime: "06:30 PM"},
      { date: "2023-08-19", departureTime: "11:30 AM", arrivalTime: "07:30 PM"},
    ]
  }
 
];
