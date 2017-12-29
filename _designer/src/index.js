import React from 'react';
import ReactDOM from 'react-dom';
import { HexGrid, Layout, Hexagon, GridGenerator, Pattern } from 'react-hexgrid';
import './index.css';
import tileTypes from './tileTypes';

class TextMap extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>{this.props.value}</div>
    );
  }
}

class Toolbox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button>Toolbox</button>
    );
  }
}

class ScenarioMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hexagons: GridGenerator.rectangle(10,10)
    };
  }

  renderHexagon(hex, i) {
    return (
      <Hexagon key={i}
               className={'hex-' + tileTypes[this.props.tiles[i]]}
               q={hex.q}
               r={hex.r}
               s={hex.s}
               value={i}
               onClick={() => this.props.onHexClick(i)}/>
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
      tiles: Array(100).fill('BL'),
    };
    this.handleHexClick = this.handleHexClick.bind(this);
  }

  makeSaveString(i) {
    return this.state.tiles.join(' ');
  }

  handleHexClick(i){
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

  render() {
    return (
      <div className="designer">
        <div className="scenariomap">
          <ScenarioMap tiles={this.state.tiles}
                       onHexClick={this.handleHexClick}/>
        </div>
        <div className="toolbox">
          <Toolbox />
        </div>
        <div className="textmap">
          <TextMap value={this.makeSaveString()}/>
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
