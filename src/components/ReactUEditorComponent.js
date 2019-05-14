import React from 'react';
import debounce from 'debounce';

class UEditor extends React.Component {
  constructor (props) {
    super(props);

    this.editorId = 'editor_' + Math.random().toString(16).slice(-6);

    // 大部分ueditor配置只在初始化时被确定
    // 不接受props改动而动态改动
    this.ueditorOptions = {
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
        videoMaxSize: 102400000, /* 上传大小限制，单位B，默认100MB */
        videoAllowFiles: [
          '.flv', '.swf', '.mkv', '.avi', '.rm', '.rmvb', '.mpeg', '.mpg',
          '.ogg', '.ogv', '.mov', '.wmv', '.mp4', '.webm', '.mp3', '.wav', '.mid'
        ]
      }
    };

    this.state = {
      // 有些情况下getProps中的值是旧值
      // 组件内维护一个content确定props中传进来的value是否是新值
      content: '',
      editorReady: false
    };

    this.observerOptions = {
      attributes: true, // 是否监听 DOM 元素的属性变化
      attributeFilter: ['src', 'style', 'type', 'name'], // 只有在该数组中的属性值的变化才会监听
      characterData: true, // 是否监听文本节点
      childList: true, // 是否监听子节点
      subtree: true // 是否监听后代元素
    };
  }

  componentDidMount () {
    // 编辑器ready后再进行后续操作
    this.setState(state => ({
      editorReady: new Promise((resolve, reject) => {
        let ueditor = window.UE.getEditor(this.editorId, {
          ...this.ueditorOptions,
          ...this.props.ueditorOptions
        });

        ueditor.ready(() => {
          resolve(ueditor);

          this.observerChangeListener(ueditor);

          ueditor.setContent(this.props.value || '');
        });
      })
    }));
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    let editorReady = prevState.editorReady;
    let value = nextProps.value;

    if (Object.prototype.hasOwnProperty.call(nextProps, 'value')) {
      console.log('getProps', value);
      console.log('content', prevState.content);

      editorReady && editorReady.then((ueditor) => {
        (value === prevState.content || value === ueditor.getContent()) || ueditor.setContent(value || '');
      });
    }

    // 只能更新severExtra
    if (Object.prototype.hasOwnProperty.call(nextProps.ueditorOptions, 'serverExtra')) {
      let serverExtraStr = JSON.stringify(nextProps.ueditorOptions.serverExtra);

      if (serverExtraStr === prevState.serverExtraStr) {
        return {
          ...prevState,
          content: value
        };
      }
      editorReady && editorReady.then((ueditor) => {
        ueditor.setExtraData && ueditor.setExtraData(nextProps.ueditorOptions.serverExtra) && console.log('resetConfig');
        // 增加一层保险，react的组件更新机制有可能使ueditor参数更新在beforeUpload之后
        nextProps.setExtraDataComplete && nextProps.setExtraDataComplete();
      });
      return {
        ...prevState,
        serverExtraStr,
        content: value
      };
    }

    return {
      ...prevState,
      content: value
    };
  }

  componentWillUnmount () {
    this.state.editorReady.then((ueditor) => {
      ueditor.destroy();
    });

    this.observer.disconnect();
  }

  observerChangeListener (ueditor) {
    const changeHandle = () => {
      let onChange = this.props.onChange;

      if (ueditor.document.getElementById('baidu_pastebin')) {
        return;
      }

      console.log('setcontent', ueditor.getContent());

      onChange && onChange(ueditor.getContent());
    };

    // this.observer = new MutationObserver(changeHandle);
    this.observer = new MutationObserver(debounce(changeHandle, 50));
    this.observer.observe(ueditor.body, this.observerOptions);
  }

  render () {
    return (
      <div
        id={this.editorId}
        ref={el => this.editorDOM = el}
      >
      </div>
    );
  }
}

export default UEditor;
