import React from 'react';
import ReactDOM from 'react-dom';
import { HexGrid, Layout, Hexagon, GridGenerator, Pattern } from 'react-hexgrid';
import './index.css';
import tileTypes from './tileTypes';

class TextMap extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <textarea
        value="Here is some stuff"
        onChange={this.handleChange}
      />
    );
  }
}

class ScenarioMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hexagons: GridGenerator.rectangle(10,10),
      tiles: Array(100).fill('BL'),
    };
  }

  handleClick(i) {
    const tiles = this.state.tiles.slice();
    switch(tiles[i]){
      case 'BL': tiles[i] = 'EM'; break;
      case 'EM': tiles[i] = 'SC'; break;
      default:   tiles[i] = 'BL';
    }
    this.setState({
      tiles: tiles,
    });
  }

  renderHexagon(hex, i) {
    return (
      <Hexagon
        key={i}
        fill="none"
        className={'hex-' + tileTypes[this.state.tiles[i]]}
        q={hex.q}
        r={hex.r}
        s={hex.s}
        value={i}
        onClick={() => this.handleClick(i)}
      >
      </Hexagon>
    );
  }

  render() {
    return (
      <div className="hexgrid">
        <HexGrid width={600}
                 height={600}
                 viewBox="-30 -30 350 350">
          <Layout size={{ x: 16, y: 16 }}
                  spacing={1.02}
                  flat={false}
                  origin={{x: 0, y: 0}}>
            { this.state.hexagons.map((hex, i) => this.renderHexagon(hex, i))}
            <Pattern id="favicon" link="favicon.ico" />
            <Pattern id="security" link="hexart/security.svg" />
          </Layout>
        </HexGrid>
      </div>
    );
  }
}

class Designer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tiles: Array(100).fill(false),
    };
  }

  render() {
    return (
      <div className="designer">
        <div className="scenario-map">
          <ScenarioMap />
        </div>
        <div className="schematic">
          <TextMap />
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Designer />,
  document.getElementById('root')
);
