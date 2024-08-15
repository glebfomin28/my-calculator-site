import { Calculator } from '@/calculator';
import cls from './main-page.module.scss';

export const MainPage = () => {
  return (
    <main className={cls.page}>
      <div className={cls.page_card}>
        <Calculator />
      </div>
    </main>
  );
};
