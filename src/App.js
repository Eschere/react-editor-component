import React from 'react';
import OwnServer from './OwnServer';
import QiniuServer from './QiniuServer';
import Test from './Test';

import {
  upload, headers
} from './api/api';

let toolbars = [[
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
]];

export default class extends React.Component {
  state = {
    value: ''
  }

  componentDidMount () {
    window.UE.getEditor('static_editor', {
      autoHeightEnabled: false,
      toolbars,
      // 图片转存关闭
      catchRemoteImageEnable: false,
      serverUrl: upload,
      serverExtra: {
        headers
      },
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
        imageResponseKey: 'fileURL', // ! 图片上传接口response中包含图片路径的键名

        /* 涂鸦图片上传配置项 */
        scrawlActionName: 'uploadscrawl', /* 执行上传涂鸦的action名称 */
        scrawlFieldName: 'file', /* 提交的图片表单名称 */
        scrawlPathFormat: '/ueditor/php/upload/image/{yyyy}{mm}{dd}/{time}{rand:6}', /* 上传保存路径,可以自定义保存路径和文件名格式 */
        scrawlMaxSize: 2048000, /* 上传大小限制，单位B */
        scrawlUrlPrefix: '', /* 图片访问路径前缀 */
        scrawlInsertAlign: 'none',
        scrawlResponseKey: 'fileURL', /* 涂鸦图片上传接口response中包含图片路径的键名 */

        /* 上传视频配置 */
        videoActionName: 'uploadvideo', /* 执行上传视频的action名称 */
        videoFieldName: 'file', /* 提交的视频表单名称 */
        videoPathFormat: '/ueditor/php/upload/video/{yyyy}{mm}{dd}/{time}{rand:6}', /* 上传保存路径,可以自定义保存路径和文件名格式 */
        videoUrlPrefix: '', /* 视频访问路径前缀 */
        videoMaxSize: 102400000, /* 上传大小限制，单位B，默认100MB */
        videoResponseKey: 'fileURL', /* 涂鸦图片上传接口response中包含图片路径的键名 */
        videoAllowFiles: [
          '.flv', '.swf', '.mkv', '.avi', '.rm', '.rmvb', '.mpeg', '.mpg',
          '.ogg', '.ogv', '.mov', '.wmv', '.mp4', '.webm', '.mp3', '.wav', '.mid'
        ]
      }
    });
  }

  input = () => {
    this.setState({
      value: Math.random()
    });

    console.log(this.state.value);

    setTimeout(() => {
      this.setState({
        value: Math.random()
      });
      console.log(this.state.value);
    }, 5000);
  }

  render () {
    return (
      <div>
        {/* 三种不同的的ueditor对比 */}
        <input type="text" onInput={this.input} />
        <Test test={this.state.value}></Test>

        {/* 直接上传到服务器 */}
        <OwnServer></OwnServer>

        <hr />
        <hr />
        {/* 获取上传凭证后上传到服务器 */}
        <QiniuServer></QiniuServer>

        <hr />
        <hr />
        {/* 未被ReactUEditorComponent包裹的ueditor */}
        <div className="static_editor" id="static_editor"></div>
      </div>
    );
  }
}
