import React from 'react';
import HexToolButton from '../HexToolButton';
import tileTypes from '../../tileTypes';

class Toolbox extends React.Component {
  render() {
    var hexbuttons = [];
    var typeMap = tileTypes;
    for(var t in tileTypes) {
      hexbuttons.push(
        <HexToolButton
           hexType={t}
           svgurl={require('../img/hexart/' + typeMap[t] + '.svg')}
           onHexButtonClick={this.props.onTypeClick}
           isActiveType={this.props.activeType === t}
        />)
    }
    return (
      <div className="tools">
        <button onClick={() => this.props.onClearClick()}>Clear</button>
        <button onClick={() => this.props.onSaveClick()}>Save SVG</button>
        <label>
          <input
              name="isGoing"
              type="checkbox"
              checked={this.props.showGrid}
              onChange={this.props.onShowGridClick} />
            Grid
        </label>

        {hexbuttons}
    </div>
    );
  }
}

export default Toolbox;
