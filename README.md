<p>
  <img src="https://img.shields.io/badge/release-1.0.0-brightgreen.svg">
</p>

### react-ueditor-component
ueditor的react封装版，同时修改了ueditor中的获取服务器端配置实现，更符合前后端分离的思想进行前后端配置

使用assets中的ueditor才能正常使用上传文件功能，所用ueditor源码改动都用`MARK:`做了标记，解压该文件可以查看改动
ueditor基于官方1.4.3.3分支修改，功能还在不断完善中

### 安装
```bash
npm install react-ueditor-component --save-dev
```
或者
```bash
yarn add react-ueditor-component --save
```

### 使用
```js
const ReactUeditorComponent = require('react-ueditor-component');

export default class App extends React.Component {
  state = {
    value: '',
    serverExtra: {
      // 上传文件额外请求头
      headers: {
        Auth: 'token'
      },
      // 上传文件额外的数据
      extraData: {
        desc: 'more data'
      }
    }
  }

  onChange = (value) => this.setState(value);

  render () {
    return (
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
            imageCompressEnable: true, /* 是否压缩图片,默认是true */
            imageCompressBorder: 1600, /* 图片压缩最长边限制 */
            imageInsertAlign: 'none', /* 插入的图片浮动方式 */
            imageUrlPrefix: '', /* 图片访问路径前缀 */
            imageResponseKey: 'fileURL' //! 图片上传接口response中包含图片路径的键名
          },
          // 上传文件时的额外信息
          serverExtra: this.state.serverExtra,
          serverUrl: 'http://upload.com' // 上传文件的接口
        }}
      />
    )
  }
}
```

正在完善中