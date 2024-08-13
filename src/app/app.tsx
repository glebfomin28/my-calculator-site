import ErrorBoundary from '@/app/error-boundary';
import { MainPage } from '@/pages/main-page';

function App() {
  return (
    <ErrorBoundary>
      <MainPage />
    </ErrorBoundary>
  );
}

export default App;
