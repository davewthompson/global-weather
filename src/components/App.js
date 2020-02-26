import React from 'react';

import Background from '../resources/Background.jpg';
import WeatherControl from './WeatherControl';

const styles = {
  body: {
    backgroundImage: `url(${Background})`,
    minHeight: '100%',
    height: '100%',
  },
  header: {
    width: '100%',
    textAlign: 'center',
    fontSize: '16pt',
    fontWeight: 'bold',
  },
  innerHeader: {
    padding: '20px',
    paddingBottom: '14px',
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
      cities: [2643123, 5368361, 5128581, 3117735, 2654141, 999],
    };
  }

  render() {
    return (
      <div style={styles.body}>
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
