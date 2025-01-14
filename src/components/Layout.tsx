

import Footer from './Footer';
import Header from './Header';

export default function Layout({ children }: { children: React.ReactNode }) {


  return (
    <div className="min-h-screen bg-background sm:px-6">
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
}