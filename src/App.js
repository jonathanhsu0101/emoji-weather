import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    address: 'Salt Lake City, UT',
    nextAddress: '',
    title: '',
    weather: '',
    temperature: null,
    precipitation: null
  };

  changeAddressHandler = event => {
    this.setState({ nextAddress: event.target.value });
  };

  setAddressHandler = () => {
    this.setState({ address: this.state.nextAddress });
    this.setState({ nextAddress: '' });
  };

  render() {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const API_KEY = 'b8a83aa1f489146a34aa17da63b910c9';
    const WEATHER_API_URL = `${proxy}https://api.darksky.net/forecast/${API_KEY}/`;
    const GEO_API_URL = `${proxy}https://darksky.net/geo?q=`;

    const icons = {
      'clear-day': '🌞',
      'clear-night': '🌃',
      rain: '☔',
      snow: '⛄',
      sleet: '🌧❄',
      wind: '🌬',
      fog: '🌫',
      cloudy: '☁☁☁',
      'partly-cloudy-day': '⛅',
      'partly-cloudy-night': '☁🌒',
      'Drizzle and Windy': '🌧🌬'
    };

    function getCoordinates(location) {
      return fetch(`${GEO_API_URL}${location}`).then(response =>
        response.json()
      );
    }

    function getForecast(lat, lng) {
      return fetch(`${WEATHER_API_URL}${lat},${lng}`).then(response =>
        response.json()
      );
    }

    getCoordinates(this.state.address).then(my => {
      getForecast(my.latitude, my.longitude).then(weather => {
        this.setState({
          summary: weather.currently.summary,
          icon: icons[weather.currently.icon],
          temperature: weather.currently.temperature,
          precipitation: weather.currently.precipProbability
        });
      });
    });

    return (
      <div className="App">
        <div>
          <p>
            <input
              className="InputBox"
              type="text"
              value={this.state.nextAddress}
              onChange={this.changeAddressHandler}
            />
            <button className="Button" onClick={this.setAddressHandler}>
              Search
            </button>
          </p>
        </div>
        <div className="Div3">
          <p className="Address">{this.state.address}</p>
          <p className="Summary">{this.state.summary}</p>
          <p className="Icon"> {this.state.icon} </p>
          <p className="Temp">{this.state.temperature}°F</p>
          <p className="Precip">
            {Math.round(this.state.precipitation * 100)}% chance of
            precipitation
          </p>
        </div>
      </div>
    );
  }
}

export default App;
