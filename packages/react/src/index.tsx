import { createRoot } from 'react-dom/client';
import { App } from '@/components/App';
import '@styles/index.scss';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('app') as HTMLElement;

  const root = createRoot(container);

  root.render(<App />);
});
