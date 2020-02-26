import React from 'react';

import WeatherControl from './WeatherControl';

const styles = {
  header: {
    width: '100%',
    height: '30px',
    textAlign: 'center',
    fontSize: '16pt',
    fontWeight: 'bold',
  },
  innerHeader: {
    margin: '20px',
  },
  container: {
    display: 'block',
    position: 'relative',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
};

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cities: [2643123, 5368361, 5128581, 3117735, 2654141],
    };
  }

  render() {
    return (
      <div>
        <div style={styles.header}>
          <div style={styles.innerHeader}>Global Weather</div>
        </div>
        <div style={styles.container}>
          {this.state.cities.map(city => (
            <WeatherControl key={city} city={city} />
          ))}
        </div>
      </div>
    );
  }
}
