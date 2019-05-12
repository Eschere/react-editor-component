import React, { Component } from 'react';
import ReactUEditorComponent from './components/ReactUEditorComponent';

import {
  uploadqiniu as upload, getToken, headers, qiniuDomain
} from './api/api';

export default class App extends Component {
  state = {
    value: ''
  }

  onChange = (value) => {
    console.log('change', value);

    this.setState({
      value
    });
  }

  /**
   * @tips
   * 由于react的组件更新机制，应该选用更保险的附加数据更新方法
   * 以下三种方法
   * 大多数情况下，方法一能按预想的执行顺序执行，这里只是提供了另外两种保险方法参考
   */
  // 1. 直接更新，有无法及时更新upload携带参数的风险
  /*
  beforeUpload = (file) => {
    this.setState({
      serverExtra: {
        headers,
        extraData: {
          tik: 123
        }
      }
    })
    return file
  }
  */

  // 2. setState回调中resolve一个promise
  // beforeUpload = file => new Promise((resolve, reject) => {
  //   this.setState({
  //     serverExtra: {
  //       headers,
  //       extraData: {
  //         tik: 123
  //       }
  //     }
  //   }, () => resolve(file));
  // })

  // 3. 在setExtraDataComplete中resolve一个promise
  // setExtraDataComplete会在重新设置上传携带参数时被调用
  // 需要将setExtraDataComplete传给ReactUEditorComponent才能生效
  beforeUpload = file => new Promise((resolve, reject) => {
    let key = 't' + Math.random().toString().slice(5, 16);

    // 请求服务器，获取七牛上传凭证
    fetch(`${getToken}?key=${key}`, {
      headers
    })
      .then(response => response.json())
      .then((data) => {
        // 设置七牛直传额外数据
        this.setState({
          serverExtra: {
            extraData: {
              token: data.token,
              key
            }
          },
          setExtraDataComplete: () => {
            resolve(file);
          }
        });
      });
  })

  render () {
    return (
      <div>
        上传到七牛
        <div style={{
          marginBottom: 200
        }}
        >
          {this.state.value}
        </div>
        <ReactUEditorComponent
          value={this.state.value}
          onChange={this.onChange}
          setExtraDataComplete={this.state.setExtraDataComplete}
          ueditorOptions={{
            beforeUpload: this.beforeUpload,
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
              imageUrlPrefix: qiniuDomain, /* 图片访问路径前缀 */
              imageResponseKey: 'key', //! 图片上传接口response中包含图片路径的键名

              /* 涂鸦图片上传配置项 */
              scrawlActionName: 'uploadscrawl', /* 执行上传涂鸦的action名称 */
              scrawlFieldName: 'file', /* 提交的图片表单名称 */
              scrawlPathFormat: '/ueditor/php/upload/image/{yyyy}{mm}{dd}/{time}{rand:6}', /* 上传保存路径,可以自定义保存路径和文件名格式 */
              scrawlMaxSize: 2048000, /* 上传大小限制，单位B */
              scrawlUrlPrefix: qiniuDomain, /* 图片访问路径前缀 */
              scrawlInsertAlign: 'none',
              scrawlResponseKey: 'key', //! 涂鸦图片上传接口response中包含图片路径的键名

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
