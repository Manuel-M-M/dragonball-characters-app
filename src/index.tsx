import { createRoot } from 'react-dom/client';

const App = () => {
  return <h1>Dragon Ball Characters App</h1>;
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
} else {
  console.error('No se encontró el elemento root en el HTML.');
}
