import { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { Loader } from './components/Loader/Loader';

const App = lazy(() => import('./App'));

console.log('🚀 App is starting...');

const apiUrl = process.env.API_URL || 'http://localhost:5000/api';
console.log(`🌍 API URL: ${apiUrl}`);

console.log(`🛠 Mode: ${process.env.NODE_ENV || 'development'}`);

const cacheTestKey = '__test_cache__';
localStorage.setItem(cacheTestKey, JSON.stringify({ test: 'Cache Working' }));
const cacheTestData = JSON.parse(localStorage.getItem(cacheTestKey) || '{}');

if (cacheTestData?.test === 'Cache Working') {
  console.log('✅ Cache is working properly');
} else {
  console.warn('⚠️ Cache may not be working as expected');
}

const container = document.getElementById('root');
if (container) {
  console.log('✅ Root element found, rendering app...');
  const root = createRoot(container);
  root.render(
    <Suspense fallback={<Loader />}>
      <App />
    </Suspense>
  );
} else {
  console.error('❌ No se encontró el elemento root en el HTML.');
}
