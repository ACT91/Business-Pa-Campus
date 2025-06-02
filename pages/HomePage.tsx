import Header from '../components/layout/Header';
import MobileHeader from '../components/layout/MobileHeader';
import Footer from '../components/layout/Footer';
import MainContent from '../components/layout/IndexMainContent';
import BottomNav from '../components/layout/BottomNav';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <MobileHeader />
      <Header />
      <MainContent />
      <Footer />
      <BottomNav />
    </div>
  );
};

export default HomePage;