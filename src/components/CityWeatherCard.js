import React from 'react';
import CityCurrentWeather from './CityCurrentWeather';
import CityForecast from './CityForecast';

class CityWeatherCard extends React.Component {
  render() {
    return (
      <div className="weather-card">
        <CityCurrentWeather
          metric={this.props.metric}
          currentTemp={this.props.currentTemp}
          city={this.props.city}
          weather={this.props.weather} />
        <CityForecast forecast={this.props.forecast} />
      </div>
    )
  }
}

export default CityWeatherCard;
