import { RootState, AppDispatch } from '@/core/application/state/store';
import { FC, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { toggleSidebar } from '@/core/application/state/slices/sidebarSlice';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  // STATE VARIABLES
  const { isOpen: isSidebarOpen } = useSelector(
    (state: RootState) => state.sidebar
  );
  const dispatch: AppDispatch = useDispatch();

  const sectionClasses = [
    'h-screen',
    'p-6 px-8',
    'mt-4',
    'transition-all duration-300 ease-in-out',
    isSidebarOpen ? 'ml-0 md:ml-[18vw]' : 'ml-16 md:ml-[6vw]',
  ].join(' ');

  return (
    <main className="relative">
      <Navbar />
      <Sidebar />
      {isSidebarOpen && (
        <aside
          className="fixed inset-0 top-0 left-0 bg-black/12 rounded-md z-[998] md:hidden"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(toggleSidebar(false));
          }}
          aria-hidden="true"
        />
      )}
      <section className={sectionClasses}>
        {children}
      </section>
    </main>
  );
};

export default DashboardLayout;
