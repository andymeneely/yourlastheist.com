import React from 'react';
import {compressToEncodedURIComponent as compress} from 'lz-string';

class TextMap extends React.Component {
  render() {
    let save_url = `http://localhost:3000?savekey=${compress(this.props.value)}`
    return (
      <div className="textmap">
        <h1>Save string: </h1>
        <div>{this.props.value}</div>
        <h1>To recreate this map, use this URL</h1>
        <div> <a href={save_url}>{save_url}</a> </div>
        <p>Note: this website is stateless - EVERY change to your map will change this URL. Wanna immortalize it? Tweet it!</p>
      </div>
    );
  }
}

export default TextMap;
