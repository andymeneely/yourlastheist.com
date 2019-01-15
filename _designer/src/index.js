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
    return (
      <Hexagon
        key={i}
        className={'hex-' + hex_type['name']}
        fill={'EM'} /* Empty until react-hexgrid updates */
        q={hex.q}
        r={hex.r}
        s={hex.s}
        value={i}
        onClick={() => this.props.onHexClick(i)}
        draggable={false}
      />
    );
  }

  createPatterns(){
    var defs = [];
    var typeMap = tileTypes;
    for(var t in tileTypes) {
      var svg = require('./img/hexart/' + typeMap[t] + '.svg');
      defs.push(
        <pattern
          id={t} patternUnits="objectBoundingBox"
          x="0" y="0" width="100%" height="100%">
            <image xlinkHref={svg} x="-6" y="-3" width="40" height="40" />
        </pattern>
      )
    }
    return (<defs>{defs}</defs>)
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
            {this.createPatterns()}
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
      tiles: Array(100).fill('EM'),
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
