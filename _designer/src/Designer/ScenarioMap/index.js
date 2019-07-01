import React from 'react';
import { HexGrid, Layout, Hexagon, GridGenerator, Pattern } from 'react-hexgrid';
import tileTypes from '../../tileTypes';

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
    var typeMap = tileTypes;
    for(var t in tileTypes) {
      var svg = require('../img/hexart/' + typeMap[t] + '.svg');
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

export default ScenarioMap;
