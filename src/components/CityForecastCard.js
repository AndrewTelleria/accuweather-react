import React from 'react';

class CityForecastCard extends React.Component {
  render() {
    const forecast = this.props.forecast;
    const dayIcon = forecast.Day.Icon < 10 ? '0' + forecast.Day.Icon : forecast.Day.Icon;
    const nightIcon = forecast.Night.Icon < 10 ? '0' + forecast.Night.Icon : forecast.Night.Icon;
    const date = new Date(forecast.EpochDate * 1000);
    const days = {
      0: "Sun",
      1: "Mon",
      2: "Tues",
      3: "Wed",
      4: "Thu",
      5: "Fri",
      6: "Sat"
    }
    const day = () => {
      for (let i = 0; i < Object.keys(days).length; i++) {
        if (date.getDay() === i) {
          return days[i];
        }
      }
    };
    return(
      <div className="forecast-card">
        <h2>{day()}</h2>
        <div className="day-night-forecast">
          <div className="day-forecast">
            <img src={"https://developer.accuweather.com/sites/default/files/" + dayIcon + "-s.png"} alt="Day forecast icon" />
            <h3>{forecast.Temperature.Maximum.Value}</h3>
          </div>
          <div className="night-forecast">
            <img src={"https://developer.accuweather.com/sites/default/files/" + nightIcon + "-s.png"} alt="Night forecast icon" />
            <h3>{forecast.Temperature.Minimum.Value}</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default CityForecastCard;
