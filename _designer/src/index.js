import React from 'react';
import ReactDOM from 'react-dom';
import Designer from './Designer/designer';
import './index.scss';

ReactDOM.render(
  <Designer
    savekey={new URL(document.location).searchParams.get('savekey')}
  />,
  document.getElementById('root')
);
