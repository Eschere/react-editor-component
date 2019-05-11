import React, { Component } from 'react';
import ReactUEditorComponent from './components/ReactUEditorComponent';

import api from './api/api';

export default class App extends Component {
  state = {
    value: ''
  }

  onChange = (value) => {
    this.setState({
      value
    });
  }

  render () {
    return (
      <div>
        <div style={{
          marginBottom: 100
        }}
        >
          {this.state.value}
        </div>
        <ReactUEditorComponent
          ueditorOptions={{
          // 上传文件时的额外信息
            serverExtra: {
              headers: {},
              data: {
                key: '123'
              }
            },
            serverUrl: api.upload
          }}
        />

      </div>
    );
  }
}
