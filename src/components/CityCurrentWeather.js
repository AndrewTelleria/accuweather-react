import React from 'react';


class CityCurrentWeather extends React.Component {
  render() {
    const weather = this.props.weather;
    const temp = this.props.metric ? weather.Temperature.Metric.Value : weather.Temperature.Imperial.Value;
    const icon = weather.WeatherIcon < 10 ? '0' + weather.WeatherIcon : weather.WeatherIcon;
    return(
      <div className="current-weather">
        <h2>{this.props.city}</h2>
        <h2>{temp}</h2>
        <img src={"https://developer.accuweather.com/sites/default/files/" + icon + "-s.png"} alt="Current weather icon" className="current-icon"/>
      </div>
    )
  }
}

export default CityCurrentWeather;
