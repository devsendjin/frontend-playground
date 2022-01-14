import ReactDOM from 'react-dom';
import '@styles/index.scss';
import { App } from '@/components/App';

document.addEventListener('DOMContentLoaded', () => {
  const root: HTMLElement | null = document.getElementById('app');

  ReactDOM.render(<App />, root);
});
