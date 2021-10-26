import React from 'react';
import './index.scss';

import { TopBar } from './components/topbar/TopBar';
import { Editor } from './editor';

export const App = () => {
  return (
    <React.Fragment>
      <TopBar />
      <Editor />
    </React.Fragment>
  );
};
