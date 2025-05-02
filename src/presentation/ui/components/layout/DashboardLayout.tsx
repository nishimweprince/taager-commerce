import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAppSelector } from '@/core/application/state/hooks';
import { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { isOpen } = useAppSelector((state) => state.sidebar);

  return (
    <article className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <section className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main
          className={`flex-1 overflow-auto transition-all py-6 duration-300 ease-in-out pt-6 px-4 md:px-6 ${
            isOpen ? 'md:ml-72' : 'md:ml-16'
          }`}
        >
          <section className="container p-6 bg-white rounded-md">
            {children}
          </section>
        </main>
      </section>
    </article>
  );
};

export default DashboardLayout;
