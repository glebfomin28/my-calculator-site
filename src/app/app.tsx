import ErrorBoundary from '@/app/error-boundary';
import { MainPage } from '@/pages/main-page';
import { fontSizeByValueLength } from '@/shared/utils/font-size-by-value-length';

function App() {
  console.log(fontSizeByValueLength('123456789012345678901234567890'));
  return (
    <ErrorBoundary>
      <MainPage />
    </ErrorBoundary>
  );
}

export default App;
