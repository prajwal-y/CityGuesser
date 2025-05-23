// Cities data for the game
const citiesData = [
    {
        name: "Tokyo",
        country: "Japan",
        continent: "Asia",
        population: 37400000,
        latitude: 35.6762,
        longitude: 139.6503
    },
    {
        name: "Delhi",
        country: "India",
        continent: "Asia",
        population: 29300000,
        latitude: 28.7041,
        longitude: 77.1025
    },
    {
        name: "Shanghai",
        country: "China",
        continent: "Asia",
        population: 26300000,
        latitude: 31.2304,
        longitude: 121.4737
    },
    {
        name: "São Paulo",
        country: "Brazil",
        continent: "South America",
        population: 21800000,
        latitude: -23.5505,
        longitude: -46.6333
    },
    {
        name: "Mexico City",
        country: "Mexico",
        continent: "North America",
        population: 21600000,
        latitude: 19.4326,
        longitude: -99.1332
    },
    {
        name: "Cairo",
        country: "Egypt",
        continent: "Africa",
        population: 20400000,
        latitude: 30.0444,
        longitude: 31.2357
    },
    {
        name: "Mumbai",
        country: "India",
        continent: "Asia",
        population: 20400000,
        latitude: 19.0760,
        longitude: 72.8777
    },
    {
        name: "Beijing",
        country: "China",
        continent: "Asia",
        population: 20000000,
        latitude: 39.9042,
        longitude: 116.4074
    },
    {
        name: "Dhaka",
        country: "Bangladesh",
        continent: "Asia",
        population: 19600000,
        latitude: 23.8103,
        longitude: 90.4125
    },
    {
        name: "Osaka",
        country: "Japan",
        continent: "Asia",
        population: 19300000,
        latitude: 34.6937,
        longitude: 135.5023
    },
    {
        name: "New York",
        country: "United States",
        continent: "North America",
        population: 18800000,
        latitude: 40.7128,
        longitude: -74.0060
    },
    {
        name: "Karachi",
        country: "Pakistan",
        continent: "Asia",
        population: 16000000,
        latitude: 24.8607,
        longitude: 67.0011
    },
    {
        name: "Buenos Aires",
        country: "Argentina",
        continent: "South America",
        population: 15000000,
        latitude: -34.6037,
        longitude: -58.3816
    },
    {
        name: "Chongqing",
        country: "China",
        continent: "Asia",
        population: 15000000,
        latitude: 29.4316,
        longitude: 106.9123
    },
    {
        name: "Istanbul",
        country: "Turkey",
        continent: "Europe/Asia",
        population: 14800000,
        latitude: 41.0082,
        longitude: 28.9784
    },
    {
        name: "Kolkata",
        country: "India",
        continent: "Asia",
        population: 14700000,
        latitude: 22.5726,
        longitude: 88.3639
    },
    {
        name: "Manila",
        country: "Philippines",
        continent: "Asia",
        population: 14400000,
        latitude: 14.5995,
        longitude: 120.9842
    },
    {
        name: "Lagos",
        country: "Nigeria",
        continent: "Africa",
        population: 14400000,
        latitude: 6.5244,
        longitude: 3.3792
    },
    {
        name: "Rio de Janeiro",
        country: "Brazil",
        continent: "South America",
        population: 13500000,
        latitude: -22.9068,
        longitude: -43.1729
    },
    {
        name: "Tianjin",
        country: "China",
        continent: "Asia",
        population: 13400000,
        latitude: 39.3434,
        longitude: 117.3616
    },
    {
        name: "London",
        country: "United Kingdom",
        continent: "Europe",
        population: 9000000,
        latitude: 51.5074,
        longitude: -0.1278
    },
    {
        name: "Paris",
        country: "France",
        continent: "Europe",
        population: 10900000,
        latitude: 48.8566,
        longitude: 2.3522
    },
    {
        name: "Berlin",
        country: "Germany",
        continent: "Europe",
        population: 3600000,
        latitude: 52.5200,
        longitude: 13.4050
    },
    {
        name: "Madrid",
        country: "Spain",
        continent: "Europe",
        population: 6600000,
        latitude: 40.4168,
        longitude: -3.7038
    },
    {
        name: "Rome",
        country: "Italy",
        continent: "Europe",
        population: 4300000,
        latitude: 41.9028,
        longitude: 12.4964
    },
    {
        name: "Moscow",
        country: "Russia",
        continent: "Europe",
        population: 12500000,
        latitude: 55.7558,
        longitude: 37.6173
    },
    {
        name: "Los Angeles",
        country: "United States",
        continent: "North America",
        population: 12500000,
        latitude: 34.0522,
        longitude: -118.2437
    },
    {
        name: "Chicago",
        country: "United States",
        continent: "North America",
        population: 8900000,
        latitude: 41.8781,
        longitude: -87.6298
    },
    {
        name: "Toronto",
        country: "Canada",
        continent: "North America",
        population: 6000000,
        latitude: 43.6532,
        longitude: -79.3832
    },
    {
        name: "Houston",
        country: "United States",
        continent: "North America",
        population: 6300000,
        latitude: 29.7604,
        longitude: -95.3698
    },
    {
        name: "Sydney",
        country: "Australia",
        continent: "Oceania",
        population: 5300000,
        latitude: -33.8688,
        longitude: 151.2093
    },
    {
        name: "Melbourne",
        country: "Australia",
        continent: "Oceania",
        population: 4900000,
        latitude: -37.8136,
        longitude: 144.9631
    },
    {
        name: "Bangkok",
        country: "Thailand",
        continent: "Asia",
        population: 10500000,
        latitude: 13.7563,
        longitude: 100.5018
    },
    {
        name: "Seoul",
        country: "South Korea",
        continent: "Asia",
        population: 9800000,
        latitude: 37.5665,
        longitude: 126.9780
    },
    {
        name: "Singapore",
        country: "Singapore",
        continent: "Asia",
        population: 5700000,
        latitude: 1.3521,
        longitude: 103.8198
    },
    {
        name: "Hong Kong",
        country: "China",
        continent: "Asia",
        population: 7500000,
        latitude: 22.3193,
        longitude: 114.1694
    },
    {
        name: "Dubai",
        country: "United Arab Emirates",
        continent: "Asia",
        population: 3300000,
        latitude: 25.2048,
        longitude: 55.2708
    },
    {
        name: "Johannesburg",
        country: "South Africa",
        continent: "Africa",
        population: 5800000,
        latitude: -26.2041,
        longitude: 28.0473
    },
    {
        name: "Nairobi",
        country: "Kenya",
        continent: "Africa",
        population: 4400000,
        latitude: -1.2921,
        longitude: 36.8219
    },
    {
        name: "Lima",
        country: "Peru",
        continent: "South America",
        population: 10000000,
        latitude: -12.0464,
        longitude: -77.0428
    },
    {
        name: "Bogotá",
        country: "Colombia",
        continent: "South America",
        population: 10700000,
        latitude: 4.7110,
        longitude: -74.0721
    },
    {
        name: "Santiago",
        country: "Chile",
        continent: "South America",
        population: 6700000,
        latitude: -33.4489,
        longitude: -70.6693
    },
    {
        name: "Vancouver",
        country: "Canada",
        continent: "North America",
        population: 2500000,
        latitude: 49.2827,
        longitude: -123.1207
    },
    {
        name: "Miami",
        country: "United States",
        continent: "North America",
        population: 6100000,
        latitude: 25.7617,
        longitude: -80.1918
    },
    {
        name: "Amsterdam",
        country: "Netherlands",
        continent: "Europe",
        population: 2400000,
        latitude: 52.3676,
        longitude: 4.9041
    },
    {
        name: "Barcelona",
        country: "Spain",
        continent: "Europe",
        population: 5500000,
        latitude: 41.3851,
        longitude: 2.1734
    },
    {
        name: "Vienna",
        country: "Austria",
        continent: "Europe",
        population: 1900000,
        latitude: 48.2082,
        longitude: 16.3738
    },
    {
        name: "Brussels",
        country: "Belgium",
        continent: "Europe",
        population: 2100000,
        latitude: 50.8503,
        longitude: 4.3517
    },
    {
        name: "Munich",
        country: "Germany",
        continent: "Europe",
        population: 1500000,
        latitude: 48.1351,
        longitude: 11.5820
    },
    {
        name: "Prague",
        country: "Czech Republic",
        continent: "Europe",
        population: 1300000,
        latitude: 50.0755,
        longitude: 14.4378
    },
    {
        name: "Warsaw",
        country: "Poland",
        continent: "Europe",
        population: 1800000,
        latitude: 52.2297,
        longitude: 21.0122
    },
    {
        name: "Athens",
        country: "Greece",
        continent: "Europe",
        population: 3800000,
        latitude: 37.9838,
        longitude: 23.7275
    },
    {
        name: "Stockholm",
        country: "Sweden",
        continent: "Europe",
        population: 1600000,
        latitude: 59.3293,
        longitude: 18.0686
    },
    {
        name: "Oslo",
        country: "Norway",
        continent: "Europe",
        population: 1000000,
        latitude: 59.9139,
        longitude: 10.7522
    },
    {
        name: "Helsinki",
        country: "Finland",
        continent: "Europe",
        population: 1200000,
        latitude: 60.1699,
        longitude: 24.9384
    },
    {
        name: "Copenhagen",
        country: "Denmark",
        continent: "Europe",
        population: 1300000,
        latitude: 55.6761,
        longitude: 12.5683
    },
    {
        name: "Dublin",
        country: "Ireland",
        continent: "Europe",
        population: 1200000,
        latitude: 53.3498,
        longitude: -6.2603
    },
    {
        name: "Lisbon",
        country: "Portugal",
        continent: "Europe",
        population: 2800000,
        latitude: 38.7223,
        longitude: -9.1393
    },
    {
        name: "Zurich",
        country: "Switzerland",
        continent: "Europe",
        population: 400000,
        latitude: 47.3769,
        longitude: 8.5417
    },
    {
        name: "Edinburgh",
        country: "United Kingdom",
        continent: "Europe",
        population: 500000,
        latitude: 55.9533,
        longitude: -3.1883
    },
    {
        name: "Wellington",
        country: "New Zealand",
        continent: "Oceania",
        population: 400000,
        latitude: -41.2924,
        longitude: 174.7787
    },
    {
        name: "Auckland",
        country: "New Zealand",
        continent: "Oceania",
        population: 1600000,
        latitude: -36.8509,
        longitude: 174.7645
    },
    {
        name: "Brisbane",
        country: "Australia",
        continent: "Oceania",
        population: 2400000,
        latitude: -27.4698,
        longitude: 153.0251
    },
    {
        name: "Perth",
        country: "Australia",
        continent: "Oceania",
        population: 2000000,
        latitude: -31.9505,
        longitude: 115.8605
    },
    {
        name: "Cape Town",
        country: "South Africa",
        continent: "Africa",
        population: 4500000,
        latitude: -33.9249,
        longitude: 18.4241
    },
    {
        name: "Casablanca",
        country: "Morocco",
        continent: "Africa",
        population: 3700000,
        latitude: 33.5731,
        longitude: -7.5898
    },
    {
        name: "Tunis",
        country: "Tunisia",
        continent: "Africa",
        population: 2300000,
        latitude: 36.8065,
        longitude: 10.1815
    },
    {
        name: "Accra",
        country: "Ghana",
        continent: "Africa",
        population: 2400000,
        latitude: 5.6037,
        longitude: -0.1870
    },
    {
        name: "Addis Ababa",
        country: "Ethiopia",
        continent: "Africa",
        population: 4800000,
        latitude: 9.0320,
        longitude: 38.7490
    },
    {
        name: "Riyadh",
        country: "Saudi Arabia",
        continent: "Asia",
        population: 7100000,
        latitude: 24.7136,
        longitude: 46.6753
    },
    {
        name: "Doha",
        country: "Qatar",
        continent: "Asia",
        population: 1200000,
        latitude: 25.2854,
        longitude: 51.5310
    },
    {
        name: "Kuwait City",
        country: "Kuwait",
        continent: "Asia",
        population: 3000000,
        latitude: 29.3759,
        longitude: 47.9774
    },
    {
        name: "Tehran",
        country: "Iran",
        continent: "Asia",
        population: 9000000,
        latitude: 35.6892,
        longitude: 51.3890
    },
    {
        name: "Baku",
        country: "Azerbaijan",
        continent: "Asia",
        continent: "Asia",
        population: 2300000,
        latitude: 40.4093,
        longitude: 49.8671
    },
    {
        name: "Kuala Lumpur",
        country: "Malaysia",
        continent: "Asia",
        population: 7400000,
        latitude: 3.1390,
        longitude: 101.6869
    },
    {
        name: "Jakarta",
        country: "Indonesia",
        continent: "Asia",
        population: 10500000,
        latitude: -6.2088,
        longitude: 106.8456
    },
    {
        name: "Ho Chi Minh City",
        country: "Vietnam",
        continent: "Asia",
        population: 8900000,
        latitude: 10.8231,
        longitude: 106.6297
    },
    {
        name: "Hanoi",
        country: "Vietnam",
        continent: "Asia",
        population: 8000000,
        latitude: 21.0285,
        longitude: 105.8542
    },
    {
        name: "Phnom Penh",
        country: "Cambodia",
        continent: "Asia",
        population: 2000000,
        latitude: 11.5564,
        longitude: 104.9282
    },
    {
        name: "Yangon",
        country: "Myanmar",
        continent: "Asia",
        population: 5000000,
        latitude: 16.8661,
        longitude: 96.1951
    },
    {
        name: "Taipei",
        country: "Taiwan",
        continent: "Asia",
        population: 2700000,
        latitude: 25.0330,
        longitude: 121.5654
    },
    {
        name: "Havana",
        country: "Cuba",
        continent: "North America",
        population: 2100000,
        latitude: 23.1136,
        longitude: -82.3666
    },
    {
        name: "Panama City",
        country: "Panama",
        continent: "North America",
        population: 1500000,
        latitude: 8.9936,
        longitude: -79.5197
    },
    {
        name: "Quito",
        country: "Ecuador",
        continent: "South America",
        population: 1900000,
        latitude: -0.1807,
        longitude: -78.4678
    },
    {
        name: "Montevideo",
        country: "Uruguay",
        continent: "South America",
        population: 1700000,
        latitude: -34.9011,
        longitude: -56.1915
    },
    {
        name: "Asunción",
        country: "Paraguay",
        continent: "South America",
        population: 2300000,
        latitude: -25.2637,
        longitude: -57.5759
    },
    {
        name: "La Paz",
        country: "Bolivia",
        continent: "South America",
        population: 1800000,
        latitude: -16.4990,
        longitude: -68.1450
    },
    {
        name: "Caracas",
        country: "Venezuela",
        continent: "South America",
        population: 2900000,
        latitude: 10.4806,
        longitude: -66.9036
    },
    {
        name: "San Francisco",
        country: "United States",
        continent: "North America",
        population: 3300000,
        latitude: 37.7749,
        longitude: -122.4194
    },
    {
        name: "Seattle",
        country: "United States",
        continent: "North America",
        population: 3400000,
        latitude: 47.6062,
        longitude: -122.3321
    },
    {
        name: "Boston",
        country: "United States",
        continent: "North America",
        population: 4300000,
        latitude: 42.3601,
        longitude: -71.0589
    },
    {
        name: "Montreal",
        country: "Canada",
        continent: "North America",
        population: 4100000,
        latitude: 45.5017,
        longitude: -73.5673
    },
    {
        name: "Quebec City",
        country: "Canada",
        continent: "North America",
        population: 800000,
        latitude: 46.8139,
        longitude: -71.2080
    },
    {
        name: "Ottawa",
        country: "Canada",
        continent: "North America",
        population: 1000000,
        latitude: 45.4215,
        longitude: -75.6972
    },
    {
        name: "Florence",
        country: "Italy",
        continent: "Europe",
        population: 380000,
        latitude: 43.7696,
        longitude: 11.2558
    },
    {
        name: "Venice",
        country: "Italy",
        continent: "Europe",
        population: 260000,
        latitude: 45.4408,
        longitude: 12.3155
    },
    {
        name: "Milan",
        country: "Italy",
        continent: "Europe",
        population: 1400000,
        latitude: 45.4642,
        longitude: 9.1900
    },
    {
        name: "Naples",
        country: "Italy",
        continent: "Europe",
        population: 970000,
        latitude: 40.8518,
        longitude: 14.2681
    }
];

// Generate a seed for the random number generator based on the date
function getDateSeed() {
    const today = new Date();
    // Format as YYYYMMDD
    return parseInt(`${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`);
}

// Seeded random function
function seededRandom(seed) {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

// Get the city for today
function getTodaysCity() {
    const seed = getDateSeed();
    const index = Math.floor(seededRandom(seed) * citiesData.length);
    return citiesData[index];
}

// Function to calculate distance between two points using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2, unit = 'km') {
    const R = unit === 'km' ? 6371 : 3958.8; // Radius of the Earth in km or miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return Math.round(distance);
}

// Function to calculate bearing between two points
function calculateBearing(lat1, lon1, lat2, lon2) {
    lat1 = lat1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const y = Math.sin(dLon) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
    let bearing = Math.atan2(y, x) * 180 / Math.PI;
    bearing = (bearing + 360) % 360; // Normalize to 0-360
    return bearing;
}

// Get the direction based on bearing
function getDirection(bearing) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
    return directions[Math.round(bearing / 45)];
}

// Format population for display
function formatPopulation(population) {
    if (population >= 1000000) {
        return (population / 1000000).toFixed(1) + ' million';
    } else if (population >= 1000) {
        return (population / 1000).toFixed(1) + ' thousand';
    } else {
        return population.toString();
    }
}

// Export the functions and data
window.citiesData = citiesData;
window.getTodaysCity = getTodaysCity;
window.calculateDistance = calculateDistance;
window.calculateBearing = calculateBearing;
window.getDirection = getDirection;
window.formatPopulation = formatPopulation;