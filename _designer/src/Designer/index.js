import React from 'react';
import ScenarioMap from './ScenarioMap';
import StatusBox from './StatusBox';
import TextMap from './TextMap';
import Toolbox from './Toolbox';
import {decompressFromEncodedURIComponent as decompress} from 'lz-string';
import tileTypes from '../tileTypes';

class Designer extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.loadOrInit(props.savekey);
    this.handleHexClick = this.handleHexClick.bind(this);
    this.handleClearClick = this.handleClearClick.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleTypeClick = this.handleTypeClick.bind(this);
    this.handleShowGridClick = this.handleShowGridClick.bind(this);
    this.onWheel = this.onWheel.bind(this);
  }

  initialState(){
    return {
      tiles: Array(100).fill('GP'),
      activeType: 'EM',
      showGrid: true
    };
  }

  loadOrInit(savekey) {
    if(savekey == null || savekey.length === 0 ) { // init
      return this.initialState();
    }
    let save_str = decompress(savekey); // load
    if(save_str == null || save_str.length === 0){ //decompressing went awry
      console.log(`Savekey ${savekey} failed to decompress properly.`)
      return this.initialState();
    }
    return {
      tiles: save_str.split(' '),
      activeType: 'GP',
      showGrid: true
    };
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

  handleShowGridClick(){
    this.setState({
      showGrid: !this.props.showGrid
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

  onWheel(e){ // cycle through tools
    let codes = Object.keys(tileTypes);
    let i = codes.indexOf(this.state.activeType);
    if(e.deltaY > 0){
      i++;
    } else {
      i--;
    }
    i = (i + codes.length ) % codes.length; // Wrap around 
    this.setState({
      activeType: codes[i]
    });
  }

  render() {
    return (
      <div className="designer">
        <div className="toolbox">
          <Toolbox onClearClick={this.handleClearClick}
                   onSaveClick={this.handleSaveClick}
                   onTypeClick={this.handleTypeClick}
                   onShowGridClick={this.handleShowGridClick}
                   onWheel={this.onWheel}
                   showGrid={this.state.showGrid}
                   activeType={this.state.activeType}
          />
        </div>
        <div className="scenariomap">
          <ScenarioMap tiles={this.state.tiles}
                       onWheel={this.onWheel}
                       onHexClick={this.handleHexClick}/>
        </div>
        <StatusBox tiles={this.state.tiles}/>
        <div className="textmap">
          <TextMap value={this.makeSaveString()}/>
        </div>
      </div>
    );
  }
}

export default Designer;
