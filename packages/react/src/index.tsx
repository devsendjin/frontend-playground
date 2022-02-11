import ReactDOM from 'react-dom';
import { App } from '@/components/App';
import '@styles/index.scss';

document.addEventListener('DOMContentLoaded', () => {
  const root: HTMLElement | null = document.getElementById('app');

  ReactDOM.render(<App />, root);
});
