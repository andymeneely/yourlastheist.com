import React from 'react';
import ReactDOM from 'react-dom';
import { HexGrid, Layout, Hexagon, GridGenerator, Pattern } from 'react-hexgrid';
import tileTypes from './tileTypes';
import './index.css';

class TextMap extends React.Component {
  render() {
    return (
      <div>{this.props.value}</div>
    );
  }
}

class Toolbox extends React.Component {
  render() {
    return (
      <div className="tools">
        <div>
          <button onClick={() => this.props.onClearClick()}>Clear</button>
        </div>
        <div>
          <button onClick={() => this.props.onSaveClick()}>Save SVG</button>
        </div>
        <div>
          <button onClick={() => this.props.onTypeClick('ALL')}>Blank/Security</button>
        </div>
        <div>
          <button onClick={() => this.props.onTypeClick('GU')}>Guard</button>
        </div>
        <div>
          <button onClick={() => this.props.onTypeClick('LO')}>Lock</button>
        </div>
    </div>
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
    const hex_type = tileTypes[this.props.tiles[i]]
    console.log(this.props.tiles[i])
    var fill_color = hex_type['fill'] || '#000000'
    return (
      <Hexagon
        key={i}
        className={'hex-' + hex_type['name']}
        fill='#0000' /* Empty until react-hexgrid updates */
        q={hex.q}
        r={hex.r}
        s={hex.s}
        value={i}
        onClick={() => this.props.onHexClick(i)}
        draggable={false}
      >
        <svg
          x="-15"
          y="-15"
          width="30"
          height="30"
          viewBox="0 0 150 150"
          >
          <path
            fill={fill_color}
            d="M 135.62899,110.02267 75,145.04531 14.371011,110.02267 V 39.977346 L 75,4.9546871 135.62899,39.977346 Z"/>
          <path
            fill="#fff"
            d={hex_type['path_d']}/>
        </svg>
      </Hexagon>
    );
  }

  render() {
    return (
      <div className="hexgrid">
        <HexGrid width={600}
                 height={600}
                 viewBox="-30 -30 350 350"
                 >
          <Layout size={{ x: 16, y: 16 }}
                  spacing={1.02}
                  flat={false}
                  origin={{x: 0, y: 0}}>
            { this.state.hexagons.map((hex, i) => this.renderHexagon(hex, i))}
            <Pattern id="favicon" link="favicon.ico" />
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
      activeType: 'ALL'
    };
    this.handleHexClick = this.handleHexClick.bind(this);
    this.handleClearClick = this.handleClearClick.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleTypeClick = this.handleTypeClick.bind(this);
  }

  makeSaveString(i) {
    return this.state.tiles.join(' ');
  }

  handleHexClick(i){
    console.log('Setting active type to' + this.state.activeType)
    const tiles = this.state.tiles.slice();
    if(this.state.activeType === 'ALL'){
      switch(tiles[i]){
        case 'BL': tiles[i] = 'EM'; break;
        case 'EM': tiles[i] = 'SC'; break;
        default:   tiles[i] = 'BL';
      }
    } else {
      console.log('Setting active type to' + this.state.activeType)
      tiles[i] = this.state.activeType;
    }
    this.setState({
      tiles: tiles,
    });
  }

  handleClearClick(i){
    this.setState({
      tiles: Array(100).fill('BL')
    });
  }

  handleTypeClick(hexType){
    this.setState({
      activeType: hexType
    });
  }

  handleSaveClick(){
    var svg = document.querySelector(".hexgrid>svg");
    var serializer = new XMLSerializer();
    var svg_blob = new Blob([serializer.serializeToString(svg)],
                          {'type': "image/svg+xml"});
    var url = URL.createObjectURL(svg_blob);
    // var svg_win = window.open(url, "svg_win");
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.setAttribute("download", "scenario.svg");
    a.setAttribute("href", url);
    a.style["display"] = "none";
    a.click();
  }

  render() {
    return (
      <div className="designer">
        <div className="scenariomap">
          <ScenarioMap tiles={this.state.tiles}
                       onHexClick={this.handleHexClick}/>
        </div>
        <div className="toolbox">
          <Toolbox onClearClick={this.handleClearClick}
                   onSaveClick={this.handleSaveClick}
                   onTypeClick={this.handleTypeClick}
          />
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
