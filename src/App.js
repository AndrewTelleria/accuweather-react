import React from 'react';
import './App.css';
import CitySearchBar from './components/CitySearchBar';
import CityWeatherCard from './components/CityWeatherCard';
import API_KEY from './apiKey';

const axios = require('axios');

class CityWeatherForecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      city: '',
      error: null,
      locationKey: '',
      currentWeather: [],
      weatherForecast: [],
      firstSearch: false,
      locationLoaded: false,
      currentLoaded: false,
      forecastLoaded: false,
      metric: false
    };

    this.handleCitySearch = this.handleCitySearch.bind(this);
    this.handleCitySearchSubmit = this.handleCitySearchSubmit.bind(this);
    this.getWeather = this.getWeather.bind(this);
    this.handleUnitChange = this.handleUnitChange.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  getWeather() {
    axios.get('http://dataservice.accuweather.com/locations/v1/cities/search?apikey=' + API_KEY + '&q=' + escape(this.state.search)
      )
      .then(
        (response) => {
          const state = response.data[0].AdministrativeArea.LocalizedType === "State" ? response.data[0].AdministrativeArea.ID + ' ' : '';
          const country = response.data[0].AdministrativeArea.CountryID;
          this.setState({
            city: response.data[0].LocalizedName + ', ' + state + country,
            locationKey: response.data[0].Key,
            locationLoaded: true,
            firstSearch: true
          });

        axios.get('http://dataservice.accuweather.com/currentconditions/v1/' + this.state.locationKey + '?apikey=' + API_KEY,
        )
        .then((response) => {
          console.log(response.data[0]);
          this.setState({
            currentWeather: response.data[0],
            currentLoaded: true
          });
        })
        .catch((error) => {
          this.setState({
            error: error
          });
        });

        axios.get('http://dataservice.accuweather.com/forecasts/v1/daily/5day/' + this.state.locationKey + '?apikey=' + API_KEY + '&metric=' + this.state.metric
        )
        .then((response) => {
          this.setState({
            weatherForecast: response.data.DailyForecasts,
            forecastLoaded: true
          });
        })
        .catch((error) => {
          this.setState({
            error: error
          });
        });

      })
      .catch((error) => {
        this.setState({
          error: error,
        });
      });
  }

  handleUnitChange(unit) {
    this.setState({
      metric: unit
    });
  }

  handleCitySearch(search) {
    this.setState({
      search: search
    });
  }

  handleCitySearchSubmit(search) {
    this.setState({
      search: '',
      error: null
    });
    this.getWeather();
  }

  handleError() {
    this.setState({error: null});
  }

  render() {
    const { error, firstSearch, locationLoaded, currentLoaded, forecastLoaded, city, search  } = this.state;
    if (error) {
      return (
        <div className="main">
          <CitySearchBar
            search={search}
            onUnitChange={this.handleUnitChange}
            onCitySearchSubmit={this.handleCitySearchSubmit}
            onCitySearch={this.handleCitySearch} />
          <h3>Sorry there was an error :(</h3>
        </div>
      )
    } else if (!firstSearch) {
      return (
        <div className="main">
          <CitySearchBar
            search={search}
            onUnitChange={this.handleUnitChange}
            onCitySearchSubmit={this.handleCitySearchSubmit}
            onCitySearch={this.handleCitySearch} />
          <h3>Search for the current and forecasted weather conditions for a city</h3>
        </div>
      )
    } else if (!locationLoaded || !currentLoaded || !forecastLoaded) {
      return (
        <div className="main">
          <h3>Loading...</h3>
        </div>
      )
    } else {
        return (
        <div className="main">
          <CitySearchBar
            search={search}
            metric={this.state.metric}
            onUnitChange={this.handleUnitChange}
            onCitySearchSubmit={this.handleCitySearchSubmit}
            onCitySearch={this.handleCitySearch} />
          <CityWeatherCard
            city={city}
            metric={this.state.metric}
            forecast={this.state.weatherForecast}
            weather={this.state.currentWeather} />
        </div>
        )
    }
  }
}

export default CityWeatherForecast;
