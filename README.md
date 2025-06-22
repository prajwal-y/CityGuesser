# CityGuesser

CityGuesser is a geography game inspired by Wordle, where players try to guess a daily mystery city from around the world in 6 tries or less.

## Live Demo

Play the game at: [https://cityguesser.github.io](https://cityguesser.github.io)

## Features

- **Daily Challenge**: A new city is available to guess each day
- **Hint System**: Receive progressively helpful hints as you make guesses
- **Visual Feedback**: See the distance and direction to the target city
- **Interactive Map**: View your guesses on a world map
- **Statistics**: Track your performance over time
- **Share Results**: Share your results with friends
- **Settings**: Customize your gameplay experience (dark mode, distance units, difficulty)
- **Responsive Design**: Play on any device

## How to Play

1. Type the name of a city and submit your guess
2. After each guess, you'll see:
   - The distance to the target city
   - An arrow pointing in the direction of the target
   - A color indicator showing how close you are (red = far, green = close)
3. As you make more guesses, additional hints will be revealed:
   - The continent of the target city
   - The population range
   - The country
4. Try to guess the city in 6 tries or less!

## Technology

CityGuesser is built with:
- HTML5
- CSS3 with animations and responsive design
- Vanilla JavaScript
- Google Maps API for map visualization
- Local Storage for saving game progress and statistics

## Development

To run the game locally:

1. Clone this repository
2. Open `index.html` in a web browser

Note: The Google Maps functionality requires a valid API key. If the map fails to load with an "Oops! Something went wrong" message, obtain your own key from Google Cloud and replace the placeholder `YOUR_API_KEY_HERE` in `index.html`.

## Credits

- City data compiled from various open sources
- Icons from Font Awesome
- Fonts from Google Fonts

## License

MIT License - Feel free to use, modify, and distribute the code.