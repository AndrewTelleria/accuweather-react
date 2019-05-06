import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CityWeatherForecast from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<CityWeatherForecast />, document.getElementById('root'));

serviceWorker.unregister();
