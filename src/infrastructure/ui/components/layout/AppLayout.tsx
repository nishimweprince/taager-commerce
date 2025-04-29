import { ReactNode } from 'react'
import Navbar from './Navbar';
import Footer from './Footer';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <>
      <Navbar />
      <main className='container mx-auto px-4 py-8 flex-grow'>{children}</main>
      <Footer />
    </>
  )
}

export default AppLayout;
