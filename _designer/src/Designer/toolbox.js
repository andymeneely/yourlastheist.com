import React from 'react';
import HexToolButton from './hexToolButton';
import tileData from './tileData';

class Toolbox extends React.Component {
  render() {
    var hexbuttons = [];
    for(var t in tileData) {
      hexbuttons.push(
        <HexToolButton
           hexType={t}
           svgurl={require('./img/hexart/' + tileData[t]['slug'] + '.svg')}
           onHexButtonClick={this.props.onTypeClick}
           isActiveType={this.props.activeType === t}
        />)
    }
    return (
      <div className="toolbox">
        <div className="tools" onWheel={this.props.onWheel}>
          {hexbuttons}
        </div>
        <button onClick={() => this.props.onClearClick()}>Clear</button>
        <button onClick={() => this.props.onSaveClick()}>Save SVG</button>
        <label>
          <input name="isGoing"
                 type="checkbox"
                 checked={this.props.showGrid}
                 onChange={this.props.onShowGridClick} />
          Grid
        </label>

    </div>
    );
  }
}

export default Toolbox;
