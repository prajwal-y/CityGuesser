document.addEventListener('DOMContentLoaded', () => {
    // Game state
    const state = {
        targetCity: null,
        guesses: [],
        maxGuesses: 6,
        gameOver: false,
        gameWon: false,
        hints: {
            continent: false,
            population: false,
            country: false
        },
        distanceUnit: 'km', // 'km' or 'mi'
        darkMode: false,
        difficulty: 'medium', // 'easy', 'medium', 'hard'
        statistics: loadStatistics()
    };

    // DOM Elements
    const elements = {
        cityInput: document.getElementById('city-input'),
        submitButton: document.getElementById('submit-button'),
        guessesList: document.getElementById('guesses-list'),
        distanceIndicator: document.getElementById('distance-indicator'),
        distanceValue: document.getElementById('distance-value'),
        directionArrow: document.getElementById('direction-arrow'),
        map: document.getElementById('map'),
        resultMap: document.getElementById('result-map'),
        continentValue: document.getElementById('continent-value'),
        populationValue: document.getElementById('population-value'),
        countryValue: document.getElementById('country-value'),
        infoButton: document.getElementById('info-button'),
        statsButton: document.getElementById('stats-button'),
        settingsButton: document.getElementById('settings-button'),
        infoModal: document.getElementById('info-modal'),
        statsModal: document.getElementById('stats-modal'),
        settingsModal: document.getElementById('settings-modal'),
        gameOverModal: document.getElementById('game-over-modal'),
        closeButtons: document.querySelectorAll('.close-button'),
        darkModeToggle: document.getElementById('dark-mode-toggle'),
        kmToggle: document.getElementById('km-toggle'),
        miToggle: document.getElementById('mi-toggle'),
        difficultySelect: document.getElementById('difficulty-select'),
        gameResultTitle: document.getElementById('game-result-title'),
        correctCity: document.getElementById('correct-city'),
        guessCount: document.getElementById('guess-count'),
        nextGameCountdown: document.getElementById('next-game-countdown'),
        shareButton: document.getElementById('share-button'),
        shareResultButton: document.getElementById('share-result-button'),
        gamesPlayed: document.getElementById('games-played'),
        winPercentage: document.getElementById('win-percentage'),
        currentStreak: document.getElementById('current-streak'),
        maxStreak: document.getElementById('max-streak'),
        guessDistribution: document.getElementById('guess-distribution')
    };

    // Google Maps
    let gameMap = null;
    let markers = [];
    let cityMarkers = [];
    let polyline = null;

    // Initialize the game
    function initGame() {
        // Set up the target city
        state.targetCity = getTodaysCity();
        console.log("Today's city:", state.targetCity.name); // For debugging

        // Initialize Google Maps
        initMap();

        // Set up event listeners
        setupEventListeners();

        // Load settings from local storage
        loadSettings();

        // Update statistics display
        updateStatisticsDisplay();

        // Start countdown for next game
        startCountdown();

        // Check if game has been played today
        checkTodaysGame();
    }

    // Initialize Google Maps
    function initMap() {
        // Check if dark mode is enabled
        const darkModeEnabled = localStorage.getItem('cityGuesserSettings') ? 
            JSON.parse(localStorage.getItem('cityGuesserSettings')).darkMode : false;
        
        // Set map styles based on mode
        const mapStyles = darkModeEnabled ? [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
                featureType: 'administrative.locality',
                elementType: 'labels',
                stylers: [{visibility: 'off'}]
            },
            {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{visibility: 'off'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#38414e'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{color: '#212a37'}]
            },
            {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{color: '#9ca5b3'}]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{color: '#17263c'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#515c6d'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#17263c'}]
            }
        ] : [
            {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            },
            {
                featureType: "administrative.locality",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            }
        ];
        
        // Create the map centered on [0,0] with a world view
        gameMap = new google.maps.Map(elements.map, {
            center: { lat: 20, lng: 0 },
            zoom: 2,
            minZoom: 2,
            maxZoom: 10,
            streetViewControl: false,
            fullscreenControl: false,
            mapTypeControl: false,
            styles: mapStyles
        });
    }

    // Set up event listeners
    function setupEventListeners() {
        // Submit button
        elements.submitButton.addEventListener('click', handleGuess);

        // Enter key in input field
        elements.cityInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                handleGuess();
            }
        });

        // Modal open buttons
        elements.infoButton.addEventListener('click', () => openModal(elements.infoModal));
        elements.statsButton.addEventListener('click', () => openModal(elements.statsModal));
        elements.settingsButton.addEventListener('click', () => openModal(elements.settingsModal));

        // Modal close buttons
        elements.closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modal = button.closest('.modal');
                closeModal(modal);
            });
        });

        // Close modal when clicking outside content
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                closeModal(e.target);
            }
        });

        // Settings event listeners
        elements.darkModeToggle.addEventListener('change', toggleDarkMode);
        elements.kmToggle.addEventListener('click', () => changeDistanceUnit('km'));
        elements.miToggle.addEventListener('click', () => changeDistanceUnit('mi'));
        elements.difficultySelect.addEventListener('change', changeDifficulty);

        // Share buttons
        elements.shareButton.addEventListener('click', shareResults);
        elements.shareResultButton.addEventListener('click', shareResults);

        // Setup autocomplete for city input
        setupAutocomplete();
    }

    // Handle city guess
    function handleGuess() {
        const cityInput = elements.cityInput.value.trim();
        
        if (!cityInput || state.gameOver) return;

        // Find the city in the data
        const guessedCity = findCity(cityInput);
        
        if (!guessedCity) {
            showToast('City not found in our database. Try another city!', 'error');
            return;
        }

        // Check if city has already been guessed
        if (state.guesses.some(guess => guess.name.toLowerCase() === guessedCity.name.toLowerCase())) {
            showToast('You already guessed this city!', 'error');
            return;
        }

        // Add the guess to the list
        addGuessToList(guessedCity);
        
        // Clear the input field
        elements.cityInput.value = '';
        
        // Check for win
        if (guessedCity.name.toLowerCase() === state.targetCity.name.toLowerCase()) {
            handleWin();
        } else if (state.guesses.length >= state.maxGuesses) {
            handleLoss();
        } else {
            // Reveal hints based on number of guesses
            revealHints();
        }
    }

    // Find a city by name
    function findCity(cityName) {
        return citiesData.find(city => 
            city.name.toLowerCase() === cityName.toLowerCase());
    }

    // Add a guess to the list
    function addGuessToList(city) {
        state.guesses.push(city);
        
        // Calculate distance and direction
        const distance = calculateDistance(
            city.latitude, city.longitude,
            state.targetCity.latitude, state.targetCity.longitude,
            state.distanceUnit
        );
        
        const bearing = calculateBearing(
            city.latitude, city.longitude,
            state.targetCity.latitude, state.targetCity.longitude
        );
        
        const direction = getDirection(bearing);
        
        // Create guess item
        const guessItem = document.createElement('div');
        guessItem.className = 'guess-item';
        guessItem.innerHTML = `
            <div class="guess-city">${city.name}, ${city.country}</div>
            <div class="guess-distance">
                <span class="distance-value ${getDistanceClass(distance)}">${distance} ${state.distanceUnit}</span>
                <div class="direction-arrow" style="transform: rotate(${bearing}deg)">
                    <i class="fas fa-arrow-up"></i>
                </div>
            </div>
        `;
        
        // Add to DOM
        elements.guessesList.appendChild(guessItem);
        
        // Add animation
        guessItem.style.animation = 'slideIn 0.3s forwards';
        
        // Update distance indicator
        updateDistanceIndicator(distance, bearing);
        
        // Add marker to map
        addMarkerToMap(city, distance);
    }

    // Add a marker to the map for a guessed city
    function addMarkerToMap(city, distance) {
        // Create marker for guessed city
        const marker = new google.maps.Marker({
            position: { lat: city.latitude, lng: city.longitude },
            map: gameMap,
            title: city.name,
            animation: google.maps.Animation.DROP,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: getMarkerColor(distance),
                fillOpacity: 0.8,
                strokeWeight: 2,
                strokeColor: 'white',
                scale: 8
            }
        });
        
        // Add info window
        const infoWindow = new google.maps.InfoWindow({
            content: `<div><strong>${city.name}, ${city.country}</strong><br>${distance} ${state.distanceUnit}</div>`
        });
        
        marker.addListener('click', () => {
            infoWindow.open(gameMap, marker);
        });
        
        // Add to markers array
        markers.push(marker);
        
        // If this is at least the second guess, draw a line between the last two guesses
        if (markers.length > 1) {
            // Remove old polyline if it exists
            if (polyline) {
                polyline.setMap(null);
            }
            
            // Create a new polyline
            polyline = new google.maps.Polyline({
                path: state.guesses.map(g => ({ lat: g.latitude, lng: g.longitude })),
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                map: gameMap
            });
        }
        
        // Adjust map bounds to include all markers
        const bounds = new google.maps.LatLngBounds();
        markers.forEach(m => bounds.extend(m.getPosition()));
        gameMap.fitBounds(bounds, { padding: 50 });
    }

    // Update the distance indicator
    function updateDistanceIndicator(distance, bearing) {
        elements.distanceValue.textContent = `${distance} ${state.distanceUnit}`;
        elements.distanceValue.className = getDistanceClass(distance);
        elements.directionArrow.style.transform = `rotate(${bearing}deg)`;
        elements.distanceIndicator.classList.remove('hidden');
    }

    // Get the CSS class for distance coloring
    function getDistanceClass(distance) {
        const threshold = state.distanceUnit === 'km' ? 1 : 0.621371;
        if (distance < 50 * threshold) return 'very-hot';
        if (distance < 200 * threshold) return 'hot';
        if (distance < 500 * threshold) return 'warm';
        if (distance < 1000 * threshold) return 'cold';
        return 'very-cold';
    }

    // Get marker color based on distance
    function getMarkerColor(distance) {
        const threshold = state.distanceUnit === 'km' ? 1 : 0.621371;
        if (distance < 50 * threshold) return '#6ab04c'; // very-hot
        if (distance < 200 * threshold) return '#78e08f'; // hot
        if (distance < 500 * threshold) return '#f0932b'; // warm
        if (distance < 1000 * threshold) return '#ff7979'; // cold
        return '#eb4d4b'; // very-cold
    }

    // Reveal hints based on number of guesses
    function revealHints() {
        const guessCount = state.guesses.length;
        
        // Adjust hint revealing based on difficulty
        switch (state.difficulty) {
            case 'easy':
                if (guessCount >= 1 && !state.hints.continent) {
                    revealContinent();
                }
                if (guessCount >= 2 && !state.hints.population) {
                    revealPopulation();
                }
                if (guessCount >= 3 && !state.hints.country) {
                    revealCountry();
                }
                break;
                
            case 'medium':
                if (guessCount >= 2 && !state.hints.continent) {
                    revealContinent();
                }
                if (guessCount >= 3 && !state.hints.population) {
                    revealPopulation();
                }
                if (guessCount >= 4 && !state.hints.country) {
                    revealCountry();
                }
                break;
                
            case 'hard':
                if (guessCount >= 3 && !state.hints.continent) {
                    revealContinent();
                }
                if (guessCount >= 4 && !state.hints.population) {
                    revealPopulation();
                }
                if (guessCount >= 5 && !state.hints.country) {
                    revealCountry();
                }
                break;
        }
    }

    // Reveal continent hint
    function revealContinent() {
        elements.continentValue.textContent = state.targetCity.continent;
        elements.continentValue.parentElement.classList.add('pulse');
        setTimeout(() => {
            elements.continentValue.parentElement.classList.remove('pulse');
        }, 1000);
        state.hints.continent = true;
    }

    // Reveal population hint
    function revealPopulation() {
        elements.populationValue.textContent = formatPopulation(state.targetCity.population);
        elements.populationValue.parentElement.classList.add('pulse');
        setTimeout(() => {
            elements.populationValue.parentElement.classList.remove('pulse');
        }, 1000);
        state.hints.population = true;
    }

    // Reveal country hint
    function revealCountry() {
        elements.countryValue.textContent = state.targetCity.country;
        elements.countryValue.parentElement.classList.add('pulse');
        setTimeout(() => {
            elements.countryValue.parentElement.classList.remove('pulse');
        }, 1000);
        state.hints.country = true;
    }

    // Handle win
    function handleWin() {
        state.gameOver = true;
        state.gameWon = true;
        
        // Update statistics
        updateStatistics(true);
        
        // Show celebration
        createConfetti();
        
        // Show game over modal
        setTimeout(() => {
            elements.gameResultTitle.textContent = 'You Won!';
            elements.correctCity.textContent = state.targetCity.name;
            elements.guessCount.textContent = state.guesses.length;
            
            // Create result map
            createResultMap();
            
            openModal(elements.gameOverModal);
        }, 1500);
    }

    // Handle loss
    function handleLoss() {
        state.gameOver = true;
        
        // Update statistics
        updateStatistics(false);
        
        // Show game over modal
        setTimeout(() => {
            elements.gameResultTitle.textContent = 'You Lost!';
            elements.correctCity.textContent = state.targetCity.name;
            elements.guessCount.textContent = state.guesses.length;
            
            // Create result map
            createResultMap();
            
            openModal(elements.gameOverModal);
        }, 1000);
    }

    // Create the result map
    function createResultMap() {
        // Check if dark mode is enabled
        const mapStyles = state.darkMode ? [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
                featureType: 'administrative.locality',
                elementType: 'labels',
                stylers: [{visibility: 'off'}]
            },
            {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{visibility: 'off'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#38414e'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{color: '#212a37'}]
            },
            {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{color: '#9ca5b3'}]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{color: '#17263c'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#515c6d'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#17263c'}]
            }
        ] : [
            {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            },
            {
                featureType: "administrative.locality",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            }
        ];
        
        // Create a new map
        const resultMap = new google.maps.Map(elements.resultMap, {
            center: { lat: state.targetCity.latitude, lng: state.targetCity.longitude },
            zoom: 5,
            streetViewControl: false,
            fullscreenControl: false,
            mapTypeControl: false,
            styles: mapStyles
        });
        
        // Add marker for target city
        const targetMarker = new google.maps.Marker({
            position: { lat: state.targetCity.latitude, lng: state.targetCity.longitude },
            map: resultMap,
            title: state.targetCity.name,
            animation: google.maps.Animation.DROP,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: '#6ab04c',
                fillOpacity: 1,
                strokeWeight: 2,
                strokeColor: 'white',
                scale: 10
            }
        });
        
        // Add info window
        const infoWindow = new google.maps.InfoWindow({
            content: `<div><strong>${state.targetCity.name}, ${state.targetCity.country}</strong></div>`
        });
        
        // Open info window
        infoWindow.open(resultMap, targetMarker);
        
        // Add markers for guesses
        state.guesses.forEach((city, index) => {
            // Skip the target city if it was guessed
            if (city.name === state.targetCity.name) return;
            
            // Calculate distance
            const distance = calculateDistance(
                city.latitude, city.longitude,
                state.targetCity.latitude, state.targetCity.longitude,
                state.distanceUnit
            );
            
            // Create marker
            const marker = new google.maps.Marker({
                position: { lat: city.latitude, lng: city.longitude },
                map: resultMap,
                title: city.name,
                label: (index + 1).toString(),
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    fillColor: getMarkerColor(distance),
                    fillOpacity: 0.7,
                    strokeWeight: 2,
                    strokeColor: 'white',
                    scale: 8
                }
            });
            
            // Draw line to target
            const line = new google.maps.Polyline({
                path: [
                    { lat: city.latitude, lng: city.longitude },
                    { lat: state.targetCity.latitude, lng: state.targetCity.longitude }
                ],
                geodesic: true,
                strokeColor: getMarkerColor(distance),
                strokeOpacity: 0.5,
                strokeWeight: 2,
                map: resultMap
            });
            
            cityMarkers.push(marker);
        });
        
        // Adjust map bounds to include all markers
        if (cityMarkers.length > 0) {
            const bounds = new google.maps.LatLngBounds();
            bounds.extend(targetMarker.getPosition());
            cityMarkers.forEach(m => bounds.extend(m.getPosition()));
            resultMap.fitBounds(bounds, { padding: 50 });
        }
    }

    // Update game statistics
    function updateStatistics(won) {
        // Load current stats
        const stats = state.statistics;
        
        // Update stats
        stats.gamesPlayed++;
        
        if (won) {
            stats.gamesWon++;
            stats.currentStreak++;
            stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak);
            
            // Update guess distribution
            stats.guessDistribution[state.guesses.length] = (stats.guessDistribution[state.guesses.length] || 0) + 1;
        } else {
            stats.currentStreak = 0;
        }
        
        // Save updated stats
        localStorage.setItem('cityGuesserStats', JSON.stringify(stats));
        
        // Update display
        updateStatisticsDisplay();
        
        // Mark today's game as played
        markTodayPlayed(won);
    }

    // Load statistics from local storage
    function loadStatistics() {
        const defaultStats = {
            gamesPlayed: 0,
            gamesWon: 0,
            currentStreak: 0,
            maxStreak: 0,
            guessDistribution: {}
        };
        
        const savedStats = localStorage.getItem('cityGuesserStats');
        return savedStats ? JSON.parse(savedStats) : defaultStats;
    }

    // Update statistics display
    function updateStatisticsDisplay() {
        const stats = state.statistics;
        
        elements.gamesPlayed.textContent = stats.gamesPlayed;
        elements.winPercentage.textContent = stats.gamesPlayed > 0 
            ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) 
            : 0;
        elements.currentStreak.textContent = stats.currentStreak;
        elements.maxStreak.textContent = stats.maxStreak;
        
        // Update guess distribution
        updateGuessDistribution();
    }

    // Update guess distribution display
    function updateGuessDistribution() {
        const stats = state.statistics;
        const container = elements.guessDistribution;
        
        // Clear existing content
        container.innerHTML = '';
        
        // Find max value for scaling
        const maxValue = Math.max(1, ...Object.values(stats.guessDistribution));
        
        // Create rows for each possible guess number
        for (let i = 1; i <= state.maxGuesses; i++) {
            const count = stats.guessDistribution[i] || 0;
            const percentage = Math.max(5, Math.round((count / maxValue) * 100));
            
            const row = document.createElement('div');
            row.className = 'distribution-row';
            
            row.innerHTML = `
                <div class="guess-number">${i}</div>
                <div class="distribution-bar-container">
                    <div class="distribution-bar" style="width: ${percentage}%">${count}</div>
                </div>
            `;
            
            container.appendChild(row);
        }
    }

    // Check if today's game has been played
    function checkTodaysGame() {
        const todayKey = getTodayKey();
        const savedGame = localStorage.getItem(`cityGuesserGame_${todayKey}`);
        
        if (savedGame) {
            const gameData = JSON.parse(savedGame);
            
            // If game was completed, show game over modal
            if (gameData.completed) {
                state.gameOver = true;
                state.gameWon = gameData.won;
                state.guesses = gameData.guesses;
                
                // Rebuild guesses list
                rebuildGuessesList();
                
                // Reveal all hints
                if (gameData.hints.continent) {
                    elements.continentValue.textContent = state.targetCity.continent;
                    state.hints.continent = true;
                }
                
                if (gameData.hints.population) {
                    elements.populationValue.textContent = formatPopulation(state.targetCity.population);
                    state.hints.population = true;
                }
                
                if (gameData.hints.country) {
                    elements.countryValue.textContent = state.targetCity.country;
                    state.hints.country = true;
                }
                
                // Show game result
                setTimeout(() => {
                    elements.gameResultTitle.textContent = gameData.won ? 'You Won!' : 'You Lost!';
                    elements.correctCity.textContent = state.targetCity.name;
                    elements.guessCount.textContent = gameData.guesses.length;
                    
                    // Create result map
                    createResultMap();
                    
                    openModal(elements.gameOverModal);
                }, 1000);
            }
        }
    }

    // Rebuild guesses list from saved game
    function rebuildGuessesList() {
        state.guesses.forEach(city => {
            // Calculate distance and direction
            const distance = calculateDistance(
                city.latitude, city.longitude,
                state.targetCity.latitude, state.targetCity.longitude,
                state.distanceUnit
            );
            
            const bearing = calculateBearing(
                city.latitude, city.longitude,
                state.targetCity.latitude, state.targetCity.longitude
            );
            
            // Create guess item
            const guessItem = document.createElement('div');
            guessItem.className = 'guess-item';
            guessItem.innerHTML = `
                <div class="guess-city">${city.name}, ${city.country}</div>
                <div class="guess-distance">
                    <span class="distance-value ${getDistanceClass(distance)}">${distance} ${state.distanceUnit}</span>
                    <div class="direction-arrow" style="transform: rotate(${bearing}deg)">
                        <i class="fas fa-arrow-up"></i>
                    </div>
                </div>
            `;
            
            // Add to DOM
            elements.guessesList.appendChild(guessItem);
            
            // Add marker to map
            addMarkerToMap(city, distance);
        });
        
        // Update distance indicator for last guess
        if (state.guesses.length > 0) {
            const lastGuess = state.guesses[state.guesses.length - 1];
            const distance = calculateDistance(
                lastGuess.latitude, lastGuess.longitude,
                state.targetCity.latitude, state.targetCity.longitude,
                state.distanceUnit
            );
            
            const bearing = calculateBearing(
                lastGuess.latitude, lastGuess.longitude,
                state.targetCity.latitude, state.targetCity.longitude
            );
            
            updateDistanceIndicator(distance, bearing);
        }
    }

    // Mark today's game as played
    function markTodayPlayed(won) {
        const todayKey = getTodayKey();
        const gameData = {
            completed: true,
            won: won,
            guesses: state.guesses,
            hints: state.hints
        };
        
        localStorage.setItem(`cityGuesserGame_${todayKey}`, JSON.stringify(gameData));
    }

    // Get today's date key (YYYY-MM-DD)
    function getTodayKey() {
        const today = new Date();
        return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    }

    // Start countdown to next game
    function startCountdown() {
        // Calculate time until midnight
        function updateCountdown() {
            const now = new Date();
            const tomorrow = new Date(now);
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0);
            
            const timeRemaining = tomorrow - now;
            
            const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
            
            elements.nextGameCountdown.textContent = 
                `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
        
        // Update immediately and then every second
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // Setup autocomplete for city input
    function setupAutocomplete() {
        const cityNames = citiesData.map(city => `${city.name}, ${city.country}`);
        
        let currentFocus;
        
        // Execute when someone writes in the text field
        elements.cityInput.addEventListener("input", function(e) {
            let a, b, i, val = this.value;
            
            // Close any already open lists
            closeAllLists();
            
            if (!val) { return false; }
            currentFocus = -1;
            
            // Create a DIV element that will contain the suggestions
            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            
            // Append the DIV element as a child of the autocomplete container
            this.parentNode.appendChild(a);
            
            // For each item in the array...
            for (i = 0; i < cityNames.length; i++) {
                // Check if the item starts with the same letters as the text field value
                if (cityNames[i].toLowerCase().includes(val.toLowerCase())) {
                    // Create a DIV element for each matching element
                    b = document.createElement("DIV");
                    
                    // Make the matching letters bold
                    const index = cityNames[i].toLowerCase().indexOf(val.toLowerCase());
                    b.innerHTML = cityNames[i].substring(0, index);
                    b.innerHTML += "<strong>" + cityNames[i].substring(index, index + val.length) + "</strong>";
                    b.innerHTML += cityNames[i].substring(index + val.length);
                    
                    // Insert a input field that will hold the current array item's value
                    b.innerHTML += "<input type='hidden' value='" + cityNames[i] + "'>";
                    
                    // Execute a function when someone clicks on the item value (DIV element)
                    b.addEventListener("click", function(e) {
                        // Insert the value for the autocomplete text field
                        elements.cityInput.value = this.getElementsByTagName("input")[0].value.split(',')[0];
                        
                        // Close the list of autocompleted values
                        closeAllLists();
                    });
                    
                    a.appendChild(b);
                    
                    // Limit to 5 suggestions for performance
                    if (a.childElementCount >= 5) break;
                }
            }
        });
        
        // Execute a function when keyboard key is pressed
        elements.cityInput.addEventListener("keydown", function(e) {
            let x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            
            if (e.keyCode == 40) {
                // Arrow DOWN key
                currentFocus++;
                addActive(x);
            } else if (e.keyCode == 38) {
                // Arrow UP key
                currentFocus--;
                addActive(x);
            } else if (e.keyCode == 13) {
                // ENTER key
                e.preventDefault();
                if (currentFocus > -1) {
                    // Simulate a click on the "active" item
                    if (x) x[currentFocus].click();
                }
            }
        });
        
        // Classify an item as "active"
        function addActive(x) {
            if (!x) return false;
            
            // Remove "active" class on all items
            removeActive(x);
            
            if (currentFocus >= x.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = (x.length - 1);
            
            // Add class "autocomplete-active"
            x[currentFocus].classList.add("autocomplete-active");
        }
        
        // Remove the "active" class from all autocomplete items
        function removeActive(x) {
            for (let i = 0; i < x.length; i++) {
                x[i].classList.remove("autocomplete-active");
            }
        }
        
        // Close all autocomplete lists in the document
        function closeAllLists(elmnt) {
            const x = document.getElementsByClassName("autocomplete-items");
            for (let i = 0; i < x.length; i++) {
                if (elmnt != x[i] && elmnt != elements.cityInput) {
                    x[i].parentNode.removeChild(x[i]);
                }
            }
        }
        
        // Close the lists when clicking elsewhere
        document.addEventListener("click", function (e) {
            closeAllLists(e.target);
        });
    }

    // Modal functions
    function openModal(modal) {
        modal.classList.add('show');
    }

    function closeModal(modal) {
        modal.classList.remove('show');
    }

    // Settings functions
    function toggleDarkMode() {
        state.darkMode = elements.darkModeToggle.checked;
        document.body.classList.toggle('dark-mode', state.darkMode);
        
        // Force map to redraw with appropriate styles
        if (gameMap) {
            google.maps.event.trigger(gameMap, 'resize');
            if (state.darkMode) {
                gameMap.setOptions({
                    styles: [
                        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
                        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
                        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
                        {
                            featureType: 'administrative.locality',
                            elementType: 'labels',
                            stylers: [{visibility: 'off'}]
                        },
                        {
                            featureType: 'poi',
                            elementType: 'labels',
                            stylers: [{visibility: 'off'}]
                        },
                        {
                            featureType: 'road',
                            elementType: 'geometry',
                            stylers: [{color: '#38414e'}]
                        },
                        {
                            featureType: 'road',
                            elementType: 'geometry.stroke',
                            stylers: [{color: '#212a37'}]
                        },
                        {
                            featureType: 'road',
                            elementType: 'labels.text.fill',
                            stylers: [{color: '#9ca5b3'}]
                        },
                        {
                            featureType: 'water',
                            elementType: 'geometry',
                            stylers: [{color: '#17263c'}]
                        },
                        {
                            featureType: 'water',
                            elementType: 'labels.text.fill',
                            stylers: [{color: '#515c6d'}]
                        },
                        {
                            featureType: 'water',
                            elementType: 'labels.text.stroke',
                            stylers: [{color: '#17263c'}]
                        }
                    ]
                });
            } else {
                gameMap.setOptions({
                    styles: [
                        {
                            featureType: "poi",
                            elementType: "labels",
                            stylers: [{ visibility: "off" }]
                        },
                        {
                            featureType: "administrative.locality",
                            elementType: "labels",
                            stylers: [{ visibility: "off" }]
                        }
                    ]
                });
            }
        }
        saveSettings();
    }

    function changeDistanceUnit(unit) {
        state.distanceUnit = unit;
        
        // Update UI
        elements.kmToggle.classList.toggle('selected', unit === 'km');
        elements.miToggle.classList.toggle('selected', unit === 'mi');
        
        // Update distances in the UI
        updateDistanceDisplays();
        
        saveSettings();
    }

    function changeDifficulty() {
        state.difficulty = elements.difficultySelect.value;
        saveSettings();
    }

    // Update all distance displays when unit changes
    function updateDistanceDisplays() {
        // Update guesses list
        const guessItems = elements.guessesList.querySelectorAll('.guess-item');
        
        guessItems.forEach((item, index) => {
            const city = state.guesses[index];
            const distance = calculateDistance(
                city.latitude, city.longitude,
                state.targetCity.latitude, state.targetCity.longitude,
                state.distanceUnit
            );
            
            const distanceElement = item.querySelector('.distance-value');
            distanceElement.textContent = `${distance} ${state.distanceUnit}`;
            distanceElement.className = `distance-value ${getDistanceClass(distance)}`;
        });
        
        // Update distance indicator
        if (state.guesses.length > 0) {
            const lastGuess = state.guesses[state.guesses.length - 1];
            const distance = calculateDistance(
                lastGuess.latitude, lastGuess.longitude,
                state.targetCity.latitude, state.targetCity.longitude,
                state.distanceUnit
            );
            
            elements.distanceValue.textContent = `${distance} ${state.distanceUnit}`;
            elements.distanceValue.className = getDistanceClass(distance);
        }
        
        // Update map markers
        markers.forEach((marker, index) => {
            const city = state.guesses[index];
            const distance = calculateDistance(
                city.latitude, city.longitude,
                state.targetCity.latitude, state.targetCity.longitude,
                state.distanceUnit
            );
            
            // Update info window content
            const infoWindow = marker.infoWindow;
            if (infoWindow) {
                infoWindow.setContent(`<div><strong>${city.name}, ${city.country}</strong><br>${distance} ${state.distanceUnit}</div>`);
            }
        });
    }

    // Save settings to local storage
    function saveSettings() {
        const settings = {
            darkMode: state.darkMode,
            distanceUnit: state.distanceUnit,
            difficulty: state.difficulty
        };
        
        localStorage.setItem('cityGuesserSettings', JSON.stringify(settings));
    }

    // Load settings from local storage
    function loadSettings() {
        const savedSettings = localStorage.getItem('cityGuesserSettings');
        
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            
            // Apply dark mode
            state.darkMode = settings.darkMode;
            elements.darkModeToggle.checked = settings.darkMode;
            document.body.classList.toggle('dark-mode', settings.darkMode);
            
            // Apply distance unit
            state.distanceUnit = settings.distanceUnit || 'km';
            elements.kmToggle.classList.toggle('selected', state.distanceUnit === 'km');
            elements.miToggle.classList.toggle('selected', state.distanceUnit === 'mi');
            
            // Apply difficulty
            state.difficulty = settings.difficulty || 'medium';
            elements.difficultySelect.value = state.difficulty;
        }
    }

    // Share results
    function shareResults() {
        if (!state.gameOver) return;
        
        let resultText = `CityGuesser ${getTodayKey()}\n`;
        resultText += state.gameWon ? `🎉 Guessed ${state.targetCity.name} in ${state.guesses.length}/${state.maxGuesses} tries!\n\n` : 
            `❌ Failed to guess ${state.targetCity.name}\n\n`;
        
        // Add emoji grid
        state.guesses.forEach(city => {
            const distance = calculateDistance(
                city.latitude, city.longitude,
                state.targetCity.latitude, state.targetCity.longitude
            );
            
            let emoji;
            const threshold = state.distanceUnit === 'km' ? 1 : 0.621371;
            
            if (city.name === state.targetCity.name) {
                emoji = '🎯';
            } else if (distance < 50 * threshold) {
                emoji = '🔥';
            } else if (distance < 200 * threshold) {
                emoji = '🥵';
            } else if (distance < 500 * threshold) {
                emoji = '🥴';
            } else if (distance < 1000 * threshold) {
                emoji = '🧊';
            } else {
                emoji = '❄️';
            }
            
            resultText += `${emoji} ${distance} ${state.distanceUnit}\n`;
        });
        
        resultText += `\nPlay at: https://cityguesser.com`;
        
        // Copy to clipboard
        navigator.clipboard.writeText(resultText)
            .then(() => {
                showToast('Results copied to clipboard!', 'success');
            })
            .catch(err => {
                showToast('Failed to copy results.', 'error');
                console.error('Failed to copy: ', err);
            });
    }

    // Show toast notification
    function showToast(message, type = 'info') {
        // Remove existing toast
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }
        
        // Create new toast
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        // Add to body
        document.body.appendChild(toast);
        
        // Show toast
        setTimeout(() => toast.classList.add('show'), 10);
        
        // Auto hide after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Create confetti animation for winning
    function createConfetti() {
        const colors = ['#f0932b', '#6ab04c', '#eb4d4b', '#4834d4', '#be2edd', '#22a6b3'];
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.animationDelay = Math.random() * 2 + 's';
            
            document.body.appendChild(confetti);
            
            // Remove after animation completes
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }

    // Initialize the game
    initGame();
});