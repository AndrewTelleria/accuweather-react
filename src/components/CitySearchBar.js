import React from 'react';

class CitySearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleCitySearch = this.handleCitySearch.bind(this);
    this.handleUnitChange = this.handleUnitChange.bind(this);
  }

  handleCityChange(e) {
    this.props.onCitySearch(e.target.value);
  }

  handleCitySearch(e) {
    e.preventDefault();
    this.props.onCitySearchSubmit(this.refs.description.value);
  }

  handleUnitChange(e) {
    this.props.onUnitChange(e.target.checked);
  }

  render() {
    return(
      <form onSubmit={this.handleCitySearch}>
        <input
          type="text"
          placeholder="City, State/Country"
          ref="description"
          value={this.props.search}
          onChange={this.handleCityChange} />
        <input
          type="checkbox"
          checked={this.props.metric}
          onChange={this.handleUnitChange}
          />Metric
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default CitySearchBar;
