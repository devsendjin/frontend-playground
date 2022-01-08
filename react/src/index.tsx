import React from 'react';
import ReactDOM from 'react-dom';
import '@/assets/styles/index.scss';

const App: React.FC = () => {
  return <div>App</div>
};

document.addEventListener('DOMContentLoaded', () => {
  const root: HTMLElement | null = document.getElementById('app');

  ReactDOM.render(<App />, root);
});
