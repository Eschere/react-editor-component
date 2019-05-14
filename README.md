### react-ueditor-component

ueditor的react封装版，修改了ueditor中的获取服务器端配置实现，更符合前后端分离的思想

使用assets中的ueditor才能正常使用上传文件功能，所有ueditor源码改动都用`MARK:`做了标记，解压该文件可以查看具体改动

ueditor基于官方1.4.3.3分支修改，功能还在不断完善中

<p>
  <a href="https://www.npmjs.com/package/react-ueditor-component">
    <img alt="npm" src="https://img.shields.io/npm/v/react-ueditor-component.svg">
  </a>
</p>


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
import ReactUEditorComponent from 'react-ueditor-component';

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
### API

| 参数 | 说明 | 类型 | 默认值 |
|-|-|-|-|
| value | 设置编辑器的内容 | `string` | - |
| setExtraDataComplete | 设置上传文件额外数据完成事件 | `Function()` | - |
| onChange | 设置编辑器内容变化回调 | `Function(value)` | - |
| ueditorOptions | 编辑器初始化的配置，在[官方文档](https://fex.baidu.com/ueditor/#start-config)支持的参数上增加了一些内容，**除`serverExtra`外不能动态变动** | `object` | 见下文 |

### ueditorOptions
默认值：
```js
{
  autoHeightEnabled: false,
  toolbars: [[
    'fullscreen', /*  */ 'source', '|', 'undo', 'redo', '|',
    'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
    'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
    'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
    'directionalityltr', 'directionalityrtl', 'indent', '|',
    'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
    'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
    'simpleupload', /* 'insertimage', 不支持 */ 'emotion', 'scrawl', 'insertvideo', /* 上传视频 , */ /* 'music', 'attachment', */ /* 'map', 'gmap', */ 'insertframe', 'insertcode', /* 'webapp', */ 'pagebreak', /* 'template', */ /* 'background', */ '|',
    'horizontal', 'date', 'time', 'spechars', /* 'snapscreen',  'wordimage', */'|',
    'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', /* 'charts', */ '|',
    'print', 'preview', 'searchreplace', 'drafts', 'help'
  ]],
  // 图片转存关闭
  catchRemoteImageEnable: false,
  // serverUrl: 'http://localhost:8000',
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
    imageResponseKey: 'url', // ! 图片上传接口response中包含图片路径的键名

    /* 涂鸦图片上传配置项 */
    scrawlActionName: 'uploadscrawl', /* 执行上传涂鸦的action名称 */
    scrawlFieldName: 'file', /* 提交的图片表单名称 */
    scrawlPathFormat: '/ueditor/php/upload/image/{yyyy}{mm}{dd}/{time}{rand:6}', /* 上传保存路径,可以自定义保存路径和文件名格式 */
    scrawlMaxSize: 2048000, /* 上传大小限制，单位B */
    scrawlUrlPrefix: '', /* 图片访问路径前缀 */
    scrawlInsertAlign: 'none',
    scrawlResponseKey: 'url', /* 涂鸦图片上传接口response中包含图片路径的键名 */

    /* 上传视频配置 */
    videoActionName: 'uploadvideo', /* 执行上传视频的action名称 */
    videoFieldName: 'file', /* 提交的视频表单名称 */
    videoPathFormat: '/ueditor/php/upload/video/{yyyy}{mm}{dd}/{time}{rand:6}', /* 上传保存路径,可以自定义保存路径和文件名格式 */
    videoUrlPrefix: '', /* 视频访问路径前缀 */
    videoMaxSize: 102400000, /* 上传大小限制，单位B，默认100MB */,
    videoResponseKey: 'url',
    videoAllowFiles: [
      '.flv', '.swf', '.mkv', '.avi', '.rm', '.rmvb', '.mpeg', '.mpg',
      '.ogg', '.ogv', '.mov', '.wmv', '.mp4', '.webm', '.mp3', '.wav', '.mid'
    ]
  }
}

```
`toolbars`中被注释的内容都是当前版本不能完美支持的功能，将在后续的版本中完善

#### 上传配置
`ueditorOptions.serverOptions`
将后端配置迁移到前端，支持[官方文档](https://fex.baidu.com/ueditor/#server-deploy)的参数，在这基础上增加了：

`imageResponseKey`: 上传图片成功后，后台返回的json数据中包含图片地址信息的字段名

比如配置为
```js
{
  imageUrlPrefix: 'http://demo.com/', /* 图片访问路径前缀 */
  imageResponseKey: 'url', //
}
```
上传成功后后台返回的数据为
```js
{
  url: 'demo.jpg'
}
```
则生成的图片地址为`http://demo.com/demo.jpg`(这里指编辑器的内容中插入的图片地址字符串，而不是服务器存储的地址，服务器把上传文件存在哪里完全有服务端决定)


`scrawlResponseKey`: 涂鸦上传成功后，后台返回的json数据中包含图片地址信息的字段名
`videoResponseKey`: 视频上传成功后，后台返回的json数据中包含视频地址信息的字段名

#### 上传接口
`ueditorOptions.serverUrl`
必填

#### 上传接口额外数据
`ueditorOptions.serverExtra`
上传接口的额外数据，可动态变动的数据
```jsx

<ReactUEditorComponent 
  ueditorOptions={{
    serverUrl: 'http://upload.com',
    serverExtra: {
      headers: {
        auth: 'token'
      },
      extraData: {
        author: 'author'
      }
    }
  }}
/>
```
如上例子在调用上传接口时header会增加`auth: token`,
body中会增加`author: author`

#### 上传前钩子
`ueditorOptions.beforeUpload`
`File => File | Promise`

接口预上传的文件，需要返回File或者Promise,
如果返回Promise，需要resolve一个File

#### 设置额外数据完成钩子
`setExtraDataComplete`
应用场景：上传钩子中设置上传额外数据，防止额外数据设置完成前就已经开始上传，可以使用安全的`setExtraDataComplete`钩子

应用场景举例：七牛云上传前需要调用后台接口获取上传凭证
```jsx
export default class App extends React.Component {
  state = {
    value: '',
    serverExtra: {
      // 上传文件额外的数据
      extraData: {}
    }
  }

  beforeUpload = file => new Promise((resolve, reject) => {
    let key = 't' + Math.random().toString().slice(5, 16);

    // 请求服务器，获取七牛上传凭证
    fetch('getuploadtoken.com', {
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

  onChange = (value) => this.setState(value);

  render () {
    return (
      <ReactUEditorComponent
        value={this.state.value}
        onChange={this.onChange}
        // 必须在state中
        setExtraDataComplete={this.state.setExtraDataComplete}
        ueditorOptions={{
          beforeUpload: this.beforeUpload,
          // 上传文件时的额外信息
          serverExtra: this.state.serverExtra,
          serverUrl: 'http://qiniuupload.com' // 上传文件的接口
        }}
      />
    )
  }
}
```

