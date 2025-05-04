import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DashboardLayout from '../../components/layout/DashboardLayout';
import {
  faChartLine,
  faMapPin,
  faUser,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import { Heading } from '../../components/inputs/TextInputs';
import CustomBreadcrumb from '../../components/common/CustomBreadcrumb';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/inputs/Button';
import { useGetUserById } from '@/core/application/users/user.hooks';
import { useEffect } from 'react';
import { SkeletonLoader } from '../../components/inputs/Loader';

const UserProfile = () => {
  /**
   * NAVIGATION
   */

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams();

  // GET USER BY ID
  const { getUserById, user, getUserByIdIsFetching } = useGetUserById();

  useEffect(() => {
    getUserById(id ? Number(id) : Math.floor(Math.random() * 7) + 1);
  }, [getUserById, id]);

  // NAVIGATION LINKS
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
    {
      label: 'User Profile',
      route: pathname,
      icon: faUser,
      isLoading: getUserByIdIsFetching,
    },
  ];

  // GOOGLE MAPS URL
  const googleMapsUrl = `https://www.google.com/maps?q=${user?.address?.geolocation?.lat},${user?.address?.geolocation?.long}`;

  return (
    <DashboardLayout>
      <main className="w-full flex flex-col gap-4">
        <nav className="w-full flex flex-col gap-4">
          <CustomBreadcrumb navigationLinks={navigationLinks} />
        </nav>
        {getUserByIdIsFetching ? (
          <section className="w-full flex flex-col gap-4">
            <menu className="w-full grid grid-cols-2 gap-4">
              {Array.from({ length: 10 }).map((_, index) => (
                <figure key={index} className="w-full flex items-center gap-2">
                  <SkeletonLoader className="w-full h-full" />
                </figure>
              ))}
            </menu>
          </section>
        ) : (
          <article className="w-full bg-white rounded-xl mx-auto">
            <section className="mb-6">
              <Heading className="text-xl font-semibold text-gray-700 mb-2">
                Personal Information
              </Heading>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                <dt className="font-medium text-gray-500">Full Name</dt>
                <dd className="text-gray-800">{user?.name}</dd>
                <dt className="font-medium text-gray-500">Username</dt>
                <dd className="text-gray-800">{user?.username}</dd>
                <dt className="font-medium text-gray-500">Email</dt>
                <dd className="text-gray-800">{user?.email}</dd>
                <dt className="font-medium text-gray-500">Phone</dt>
                <dd className="text-gray-800">{user?.phone}</dd>
                <dt className="font-medium text-gray-500">User ID</dt>
                <dd className="text-gray-800">{user?.id}</dd>
              </dl>
            </section>
            <section className="mb-6">
              <Heading className="text-xl font-semibold text-gray-700 mb-2">
                Address
              </Heading>
              <address className="not-italic text-gray-800">
                {user?.address?.number} {user?.address?.street},<br />
                {user?.address?.city}, {user?.address?.zipcode}
              </address>
            </section>
            <section>
              <ul className="flex items-center gap-2 justify-between">
                <Heading className="text-xl font-semibold text-gray-700 mb-2">
                  Geolocation
                </Heading>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 bg-primary hover:bg-primary text-white text-sm font-medium px-2 py-1 rounded transition-colors"
                  aria-label="View location on Google Maps"
                >
                  <FontAwesomeIcon icon={faMapPin} />
                  View on Google Maps
                </a>
              </ul>
              <dl className="grid grid-cols-2 gap-x-8 gap-y-2 mb-4">
                <dt className="font-medium text-gray-500">Latitude</dt>
                <dd className="text-gray-800">
                  {user?.address?.geolocation?.lat}
                </dd>
                <dt className="font-medium text-gray-500">Longitude</dt>
                <dd className="text-gray-800">
                  {user?.address?.geolocation?.long}
                </dd>
              </dl>
            </section>
          </article>
        )}
        <menu className="w-full flex items-center gap-3 justify-between">
          <Button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            Back
          </Button>
        </menu>
      </main>
    </DashboardLayout>
  );
};

export default UserProfile;
