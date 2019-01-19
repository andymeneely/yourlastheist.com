import React from 'react';
import ReactDOM from 'react-dom';
import { HexGrid, Layout, Hexagon, GridGenerator, Pattern } from 'react-hexgrid';
import tileTypes from './tileTypes';
import './index.css';
import {compressToEncodedURIComponent as compress} from 'lz-string';

class TextMap extends React.Component {
  render() {
    debugger;
    return (
      <div>
        <div>{this.props.value}</div>
        <div>{compress(this.props.value)}</div>
      </div>
    );
  }
}

class HexToolButton extends React.Component {
  render() {
    var t = this.props.hexType
    var if_active = this.props.isActiveType ? 'active' : ''
    return (
      <button onClick={() => this.props.onHexButtonClick(t)}
              className={"hexbutton " + if_active}>
      <img src={this.props.svgurl}/>
    </button>
   )
  }
}

class Toolbox extends React.Component {
  render() {
    var hexbuttons = [];
    var typeMap = tileTypes;
    for(var t in tileTypes) {
      hexbuttons.push(
        <HexToolButton
           hexType={t}
           svgurl={require('./img/hexart/' + typeMap[t] + '.svg')}
           onHexButtonClick={this.props.onTypeClick}
           isActiveType={this.props.activeType === t}
        />)
    }
    return (
      <div className="tools">
        <button onClick={() => this.props.onClearClick()}>Clear</button>
        <button onClick={() => this.props.onSaveClick()}>Save SVG</button>
        {hexbuttons}
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
    const hex_code = this.props.tiles[i];
    const hex_type = tileTypes[hex_code];
    // console.log("Rendering hex " + i + " (" + hex_code + ")");
    return (
      <Hexagon
        key={i}
        className={'hex-' + hex_type}
        fill={hex_code} /* Gap until react-hexgrid updates */
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
      tiles: Array(100).fill('GP'),
      activeType: 'GP'
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
    const tiles = this.state.tiles.slice();
    tiles[i] = this.state.activeType;
    this.setState({
      tiles: tiles,
    });
  }

  handleClearClick(i){
    this.setState({
      tiles: Array(100).fill('GP')
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
        <div className="toolbox">
          <Toolbox onClearClick={this.handleClearClick}
                   onSaveClick={this.handleSaveClick}
                   onTypeClick={this.handleTypeClick}
                   activeType={this.state.activeType}
          />
        </div>
        <div className="scenariomap">
          <ScenarioMap tiles={this.state.tiles}
                       onHexClick={this.handleHexClick}/>
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
