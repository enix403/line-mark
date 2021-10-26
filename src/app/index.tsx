import './index.scss';

import { TopBar } from './components/topbar/TopBar';
import { Editor } from './editor';

export const App = () => {
  return (
    <div className="app-main">
      <TopBar />
      <Editor />
    </div>
  );
};
