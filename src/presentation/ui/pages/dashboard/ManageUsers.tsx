import { faChartLine, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { Heading } from '../../components/inputs/TextInputs';
import DashboardLayout from '../../components/layout/DashboardLayout';
import CustomBreadcrumb from '../../components/common/CustomBreadcrumb';
import { useFetchAllUsers } from '@/core/application/users/user.hooks';
import { useEffect } from 'react';
import Table from '../../components/table/Table';
import { useAppSelector } from '@/core/application/state/hooks';
import { useUserColumns } from '@/core/application/users/columns.users';
import DeleteUser from '../../components/users/DeleteUser';

const ManageUsers = () => {
  /**
   * STATE VARIABLES
   */
  const { usersList } = useAppSelector((state) => state.user);

  /**
   * NAVIGATION
   */
  const navigationLinks = [
    {
      label: 'Dashboard',
      route: '/dashboard',
      icon: faChartLine,
    },
    {
      label: 'Manage Users',
      route: '/dashboard/users',
      icon: faUserGroup,
    },
  ];

  /**
   * USER HOOKS
   */

  // FETCH ALL USERS
  const { fetchAllUsers, usersIsFetching } = useFetchAllUsers();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  // USER COLUMNS
  const { userColumns } = useUserColumns();

  return (
    <DashboardLayout>
      <main className="w-full flex flex-col gap-4">
        <nav className="w-full flex flex-col gap-4">
          <CustomBreadcrumb navigationLinks={navigationLinks} />
          <Heading>Manage Users</Heading>
        </nav>
        <section className="w-full flex flex-col gap-4">
          <Table
            columns={userColumns}
            data={usersList}
            isLoading={usersIsFetching}
          />
        </section>
      </main>
      <DeleteUser />
    </DashboardLayout>
  );
};

export default ManageUsers;
