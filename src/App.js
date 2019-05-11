import React, { Component } from 'react';
import ReactUEditorComponent from './components/ReactUEditorComponent';

export default class App extends Component {
  render () {
    return (
      <ReactUEditorComponent
        ueditorOptions={{
        // 上传文件时的额外信息
          serverExtra: {
            headers: {},
            data: {
              key: '123'
            }
          }
        }}
      />
    );
  }
}
