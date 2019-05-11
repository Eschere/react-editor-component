import ReactUEditorComponent from './components/ReactUEditorComponent'
import React, { Component } from 'react'

export default class App extends Component {
  render () {
    return <ReactUEditorComponent
      ueditorOptions={{
        // 上传文件时的额外信息
        serverExtra:{
          headers: {},
          data: {
            key: '123'
          }
        }
      }}
    />
  }
} 