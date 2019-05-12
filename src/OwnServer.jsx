import React, { Component } from 'react';
import ReactUEditorComponent from './components/ReactUEditorComponent';

import {
  upload, headers
} from './api/api';

export default class extends Component {
  state = {
    value: '',
    serverExtra: {
      headers,
      extraData: {
        yourdata: '123'
      }
    }
  }

  onChange = (value) => {
    console.log('change', value);

    this.setState({
      value
    });
  }

  render () {
    return (
      <div>
        上传到自己的服务器
        <div style={{
          marginBottom: 200
        }}
        >
          {this.state.value}
        </div>
        <ReactUEditorComponent
          value={this.state.value}
          onChange={this.onChange}
          ueditorOptions={{
            serverOptions: {
              /* 上传图片配置项 */
              imageActionName: 'uploadimage', /* 执行上传图片的action名称 */
              imageFieldName: 'file', /* 提交的图片表单名称 */
              imageMaxSize: 2048000, /* 上传大小限制，单位B */
              imageAllowFiles: ['.png', '.jpg', '.jpeg', '.gif', '.bmp'], /* 上传图片格式显示 */
              // imageAllowFiles: ['.png', '.jpg', '.jpeg', '.gif', '.bmp'], /* 上传图片格式显示 */
              imageCompressEnable: true, /* 是否压缩图片,默认是true */
              imageCompressBorder: 1600, /* 图片压缩最长边限制 */
              imageInsertAlign: 'none', /* 插入的图片浮动方式 */
              imageUrlPrefix: '', /* 图片访问路径前缀 */
              imageResponseKey: 'fileURL', //! 图片上传接口response中包含图片路径的键名

              /* 涂鸦图片上传配置项 */
              scrawlActionName: 'uploadscrawl', /* 执行上传涂鸦的action名称 */
              scrawlFieldName: 'file', /* 提交的图片表单名称 */
              scrawlPathFormat: '/ueditor/php/upload/image/{yyyy}{mm}{dd}/{time}{rand:6}', /* 上传保存路径,可以自定义保存路径和文件名格式 */
              scrawlMaxSize: 2048000, /* 上传大小限制，单位B */
              scrawlUrlPrefix: '', /* 图片访问路径前缀 */
              scrawlInsertAlign: 'none',
              scrawlResponseKey: 'fileURL', //! 涂鸦图片上传接口response中包含图片路径的键名

              /* 上传视频配置 */
              videoActionName: 'uploadvideo', /* 执行上传视频的action名称 */
              videoFieldName: 'file', /* 提交的视频表单名称 */
              videoPathFormat: '/ueditor/php/upload/video/{yyyy}{mm}{dd}/{time}{rand:6}', /* 上传保存路径,可以自定义保存路径和文件名格式 */
              videoUrlPrefix: '', /* 视频访问路径前缀 */
              videoMaxSize: 102400000, /* 上传大小限制，单位B，默认100MB */
              videoAllowFiles: [
                '.flv', '.swf', '.mkv', '.avi', '.rm', '.rmvb', '.mpeg', '.mpg',
                '.ogg', '.ogv', '.mov', '.wmv', '.mp4', '.webm', '.mp3', '.wav', '.mid'
              ]
            },
            // 上传文件时的额外信息
            serverExtra: this.state.serverExtra,
            serverUrl: upload
          }}
        />

      </div>
    );
  }
}
