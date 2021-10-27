import React, { useEffect } from 'react';
import styles from './Editor.module.scss';
import classNames from 'classnames/bind';

import { FormGroup, HTMLSelect, Icon } from '@blueprintjs/core';

import MarkdownIt from 'markdown-it';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-gruvbox";

const cx = classNames.bind(styles);

export const Editor = () => {
  const [source, setSource] = React.useState<string>('');

  return (
    <div className={cx('editor-main')}>
      <MarkdownInputPane onSourceUpdate={setSource} />
      <MarkdownPreviewPane source={source} />
    </div>
  );
};

interface IMarkdownInputPane {
  onSourceUpdate: (code: string) => void;
};

class MarkdownInputPane extends React.Component<IMarkdownInputPane, any> {
  constructor(props: IMarkdownInputPane) {
    super(props);

    this.state = {
      code: "",
      typingTimeout: 0,
    };
  }

  renderMarkdown = () => {
    this.props.onSourceUpdate(this.state.code);
  };

  updateCode = (value: string) => {
    clearTimeout(this.state.typingTimeout);
    const timeoutId = setTimeout(this.renderMarkdown, 700);
    this.setState({
      code: value,
      typingTimeout: timeoutId
    });
  };

  render() {
    return (
      <div className={cx('markdown-input-pane')}>

        <div className={cx('input-header')}>
          <span className={cx('text', 'center-text-flow')}>
            <Icon icon="code" />
            <span className="icon-text-md">Markdown</span>
          </span>
        </div>

        <AceEditor
          mode="markdown"
          theme="gruvbox"
          value={this.state.code}
          onChange={this.updateCode}
          name="Markdown_Input"
          editorProps={{ $blockScrolling: false }}
          setOptions={{
            useWorker: false,
            behavioursEnabled: false,
            animatedScroll: true,
            enableSnippets: false,
            overwrite: false,
            spellcheck: false,
            newLineMode: true,
            fontFamily: "Fira Code"
          }}
          fontSize={12}
          className={cx('input-editor')}
          width="100%"
          style={{ flex: 1, paddingBottom: 400 }}
          showPrintMargin={false}
          enableSnippets={false}
          enableBasicAutocompletion={false}
          enableLiveAutocompletion={false}
          wrapEnabled={true}
        />

      </div>
    );
  }
};

const mdit = new MarkdownIt({ html: true });

type RenderOutputType = 'html' | 'view';

const MarkdownPreviewPane: React.FC<{
  source: string
}> = ({ source }) => {

  const [previewType, setPreviewType] = React.useState<RenderOutputType>('view');
  const [renderedMarkup, setRenderedMarkup] = React.useState<string>();

  useEffect(() => {
    setRenderedMarkup(mdit.render(source));
  }, [source]);

  return (
    <div className={cx('markdown-preview-pane')}>

      <div className={cx('preview-header')}>
        <span className={cx('text', 'center-text-flow')}>
          <Icon icon="eye-open" />
          <span className="icon-text-md">Preview</span>
        </span>
        <FormGroup
          label={<span style={{ fontWeight: 600 }}>Output:</span>}
          inline={true}
          className={cx("preview-selectbox", 'bp3-dark')}
        >
          <HTMLSelect
            minimal={true}
            value={previewType}
            onChange={e => setPreviewType(e.target.value as RenderOutputType)}
          >
            <option value='view'>Rendered Markdown</option>
            <option value='html'>HTML</option>
          </HTMLSelect>
        </FormGroup>
      </div>


      {previewType == 'html' ?
        <div className={cx('preview-area', 'preview-type-html')}>
          <pre>
            <code>
              {renderedMarkup}
            </code>
          </pre>
        </div> :

        <div
          dangerouslySetInnerHTML={{ __html: renderedMarkup || '' }}
          className={cx('preview-area', 'preview-type-md')}
        />
      }

    </div>
  );
};

