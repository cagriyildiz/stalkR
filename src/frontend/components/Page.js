import { ScrapeProvider } from './ScrapeContext';

export default function Page({children}) {
  return (
    <ScrapeProvider>
      <div className="page">{children}</div>
    </ScrapeProvider>
  );
}