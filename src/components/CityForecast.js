import React from 'react';
import CityForecastCard from './CityForecastCard';

class CityForecast extends React.Component {
  render() {
    const forecast = this.props.forecast;
    const cards = [];
    for (let i = 0; i < forecast.length; i++) {
      cards.push(
        <CityForecastCard
          forecast={forecast[i]}
          key={i} />
      )
    }
    return(
      <div className="forecast-cards">
        {cards}
      </div>
    )
  }
}

export default CityForecast;
