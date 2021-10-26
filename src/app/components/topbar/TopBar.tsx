import styles from './TopBar.module.scss';
import classNames from 'classnames/bind';
import { Icon } from '@blueprintjs/core';

const cx = classNames.bind(styles);

export const TopBar = () => {
  return (
    <div className={cx('top-bar')}>
      <Icon icon="menu" size={18} className={cx('menu-handle')} />
      <h1 className={cx("title")}>LineMark</h1>
    </div>
  );
};
