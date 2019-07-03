import React from 'react';
import {compressToEncodedURIComponent as compress} from 'lz-string';

class TextMap extends React.Component {
  render() {
    let save_url = `http://localhost:3000?savekey=${compress(this.props.value)}`
    return (
      <div className="textmap">
        <p>To recreate this map, use this URL: <a href={save_url}>{save_url}</a></p>
      </div>
    );
  }
}

export default TextMap;
