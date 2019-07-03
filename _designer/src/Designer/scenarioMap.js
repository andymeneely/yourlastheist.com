import React from 'react';
import { HexGrid, Layout, Hexagon, GridGenerator } from 'react-hexgrid';
import tileTypes from './tileTypes';

/* eslint import/no-webpack-loader-syntax: off */
var tileIcons = {
  "GP": require('!!raw-loader!./img/hexart/gap.svg'),
  "EM": require('!!raw-loader!./img/hexart/empty.svg'),
  "SC": require('!!raw-loader!./img/hexart/security.svg'),
  "GU": require('!!raw-loader!./img/hexart/security-guard.svg'),
  "LO": require('!!raw-loader!./img/hexart/security-lock.svg'),
  "CM": require('!!raw-loader!./img/hexart/security-camera.svg'),
  "JW": require('!!raw-loader!./img/hexart/jewel.svg'),
  "$1": require('!!raw-loader!./img/hexart/1k.svg'),
  "$2": require('!!raw-loader!./img/hexart/2k.svg'),
  "$3": require('!!raw-loader!./img/hexart/3k.svg'),
  "RE": require('!!raw-loader!./img/hexart/reinforcements.svg'),
  "GA": require('!!raw-loader!./img/hexart/gate-a.svg'),
  "GB": require('!!raw-loader!./img/hexart/gate-b.svg'),
  "GC": require('!!raw-loader!./img/hexart/gate-c.svg'),
  "GD": require('!!raw-loader!./img/hexart/gate-d.svg'),
  "E1": require('!!raw-loader!./img/hexart/entrance-upper-right.svg'),
  "E2": require('!!raw-loader!./img/hexart/entrance-right.svg'),
  "E3": require('!!raw-loader!./img/hexart/entrance-lower-right.svg'),
  "E4": require('!!raw-loader!./img/hexart/entrance-lower-left.svg'),
  "E5": require('!!raw-loader!./img/hexart/entrance-left.svg'),
  "E6": require('!!raw-loader!./img/hexart/entrance-upper-left.svg'),
  "WT": require('!!raw-loader!./img/hexart/watchtower.svg'),
};

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
    var stroke_state = this.props.showGrid ? ' grid_show' : ' grid_hide';
    return (
      <Hexagon
        key={i}
        className={'hex-' + hex_type + stroke_state}
        fill={hex_code}
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
    for(var t in tileTypes) {
      defs.push(
        <pattern
          id={t}
          patternUnits="objectBoundingBox"
          x="-10%" y="-10%"
          width="120%"
          height="120%"
          viewBox="0 0 150 150"
          dangerouslySetInnerHTML={{__html: tileIcons[t].default}}
        >
        </pattern>
      )
    }
    return (<defs>{defs}</defs>)
  }

  render() {
    return (
      <div className="scenariomap">
        <div className="hexgrid" onWheel={this.props.onWheel}>
          <HexGrid viewBox="-15 -30 350 325">
            <Layout size={{ x: 19, y: 19 }}
                    spacing={1.03}
                    flat={false}
                    origin={{x: 0, y: 0}}>
              { this.state.hexagons.map((hex, i) => this.renderHexagon(hex, i))}
              {this.createPatterns()}
            </Layout>
          </HexGrid>
        </div>
      </div>
    );
  }
}

export default ScenarioMap;
