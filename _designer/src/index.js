import React from 'react';
import ReactDOM from 'react-dom';
import { HexGrid, Layout, Hexagon, GridGenerator, Text, Pattern } from 'react-hexgrid';
import './index.css';

class TextMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };

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
        value={this.state.value}
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
      tiles: Array(100).fill(false),
    };
  }

  handleClick(i) {
    const tiles = this.state.tiles.slice();
    tiles[i] = !tiles[i];
    this.setState({
      tiles: tiles,
    });
  }

  renderHexagon(hex, i) {
    return (
      <Hexagon
        key={i}
        fill="none"
        className={this.state.tiles[i] ? "hex-blue" : "hex-red"}
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
        <HexGrid
          width={600} height={600}
          viewBox="-70 -70 400 400"
          >
          <Layout
            size={{ x: 16, y: 16 }}
            spacing={1.02}
            flat={false}
            origin={{x: 0, y: 0}}
            >
            { this.state.hexagons.map((hex, i) => this.renderHexagon(hex, i))}
            <Pattern id="favicon" link="favicon.ico" />
          </Layout>
        </HexGrid>
      </div>
    );
  }
}

class Designer extends React.Component {
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
