import React from 'react';

const WEATHER_URL = 'https://weather-broker-cdn.api.bbci.co.uk/en/forecast/rss/3day/';

const extractWeather = data => {
  const parser = new window.DOMParser();
  const xmlDocument = parser.parseFromString(data, 'text/xml');

  const titles = xmlDocument.getElementsByTagName('title');
  if (titles.length <= 2) {
    throw new Error('Weather response not in correct format!');
  }

  const location = titles[0].innerHTML.substr(26).trim();
  const weather = titles[2].innerHTML.substr(titles[2].innerHTML.indexOf(':') + 1).trim();

  return { location, weather };
};

const styles = {
  card: {
    display: 'inline-block',
    position: 'relative',
    width: '200px',
    height: '150px',
    margin: '10px',
    padding: '10px',
    backgroundColor: 'white',
    opacity: '0.95',
    boxShadow: '-2px 4px 15px 1px rgba(0,0,0,0.5)',
  },
  loading: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
  error: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
  weather: {
    height: '100px',
  },
  caption: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '12pt',
    padding: '4px',
    paddingBottom: '8px',
  },
  reload: {
    textAlign: 'right',
  },
  reloadButton: {
    border: '1px solid #aaa',
    cursor: 'pointer',
  },
};

export default class WeatherControl extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: undefined,
      location: 'Unknown',
      weather: undefined,
    };

    this.getWeatherData = this.getWeatherData.bind(this);
  }

  componentDidMount() {
    if (!this.props.city) {
      return;
    }

    this.getWeatherData();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.city !== this.props.city) {
      this.getWeatherData();
    }
  }

  getWeatherData() {
    const city = this.props.city;

    this.setState(
      {
        loading: true,
        error: undefined,
      },
      () => {
        const url = WEATHER_URL + city;
        fetch(url, { cache: 'no-cache' })
          .then(response => response.text())
          .then(weather => {
            this.setState({
              ...extractWeather(weather),
              loading: false,
            });
          })
          .catch(error => {
            this.setState({
              weather: undefined,
              loading: false,
              error,
            });
          });
      }
    );
  }

  render() {
    const loading = this.state.loading;
    const error = this.state.error;
    const location = this.state.location;
    const weather = this.state.weather;

    return (
      <div style={styles.card}>
        <div style={styles.caption}>{location}</div>
        <div style={styles.weather}>
          {loading && <div style={styles.loading}>Loading...</div>}
          {error && <div style={styles.error}>Error! {error.message || error}</div>}
          {!loading && !error && weather && <div>{weather}</div>}
        </div>
        <div style={styles.reload}>
          <button style={styles.reloadButton} onClick={this.getWeatherData} disabled={loading}>
            Refresh
          </button>
        </div>
      </div>
    );
  }
}
