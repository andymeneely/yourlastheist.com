import React from 'react';
import {compressToEncodedURIComponent as compress} from 'lz-string';

class TextMap extends React.Component {
  render() {
    return (
      <div>
        <div>{this.props.value}</div>
        <div>{compress(this.props.value)}</div>
      </div>
    );
  }
}

export default TextMap;
