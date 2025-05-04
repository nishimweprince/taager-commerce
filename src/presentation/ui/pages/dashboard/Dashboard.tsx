import { SIDEBAR_NAV_ITEMS } from '@/presentation/constants/sidebar.constants';
import DashboardLayout from '@/presentation/ui/components/layout/DashboardLayout';
import Card from '@/presentation/ui/components/common/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8 text-primary text-center">Welcome to Your Dashboard</h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {SIDEBAR_NAV_ITEMS.map((item, index) => (
          <Link to={item.path} key={index} className="group">
            <Card className="h-full cursor-pointer transition-transform transform hover:-translate-y-2 hover:shadow-2xl border-2 border-transparent hover:border-primary bg-gradient-to-br from-white via-gray-50 to-primary/5">
              <article className="flex flex-col items-center justify-center h-40 gap-4">
                <span className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <FontAwesomeIcon icon={item.icon} className="text-3xl text-primary group-hover:scale-110 transition-transform" />
                </span>
                <span className="text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors">
                  {item.title}
                </span>
              </article>
            </Card>
          </Link>
        ))}
      </section>
    </DashboardLayout>
  );
};

export default Dashboard;
