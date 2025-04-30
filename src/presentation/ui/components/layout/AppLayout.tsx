import { ReactNode } from 'react'
import Navbar from './Navbar';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {

  /**
   * NAVIGATION
   */
  const { pathname } = useLocation();

  return (
    <>
      <Navbar />
      <main className='container mx-auto px-4 py-8 flex-grow'>{children}</main>
      {!pathname.includes(`auth`) && <Footer />}
      <Toaster />
    </>
  )
}

export default AppLayout;
