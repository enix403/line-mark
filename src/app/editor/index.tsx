import styles from './Editor.module.scss';
import classNames from 'classnames/bind';

import { FormGroup, HTMLSelect, Icon } from '@blueprintjs/core';

import MarkdownIt from 'markdown-it';

const cx = classNames.bind(styles);

export const Editor = () => {
  return (
    <div className={cx('editor-main')}>
      <MarkdownInputPane />
      <MarkdownPreviewPane />
    </div>
  );
};

const MarkdownInputPane = () => {
  return (
    <div className={cx('markdown-input-pane')}>
      <div className={cx('input-header')}>
        <span className={cx('text', 'center-text-flow')}>
          <Icon icon="code" />
          <span className="icon-text-md">Markdown</span>
        </span>
      </div>
    </div>
  );
};


const MarkdownPreviewPane = () => {
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
          className={cx("preview-selectbox")}
        >
          <HTMLSelect minimal={true}>
            <option value='md'>Rendered Markdown</option>
            <option value='html'>HTML</option>
          </HTMLSelect>
        </FormGroup>
      </div>


      <MDPreview />

    </div>
  );
};

const mdit = new MarkdownIt();

const MDPreview = () => {
  var result = mdit.render(`# Test Title\nTest content`);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: result }}
      className={cx('preview-type-md')}
    />
  );
};
