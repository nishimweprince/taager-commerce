import { useGetUserById } from '@/core/application/users/user.hooks';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SkeletonLoader } from '../inputs/Loader';

const TableUserLabel = ({ userId }: { userId?: number }) => {
  const { getUserById, user, getUserByIdIsFetching } = useGetUserById();

  useEffect(() => {
    if (userId) {
      getUserById(userId);
    }
  }, [getUserById, userId]);

  if (getUserByIdIsFetching) return <span><SkeletonLoader /></span>;

  return (
    <Link
      to={`/dashboard/users/${user?.id}`}
      className="flex flex-col p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors w-fit"
    >
      <span className="font-semibold text-gray-800 flex items-center gap-2">
        <FontAwesomeIcon
          icon={faUser}
          className="bg-gray-200 rounded-full p-[6px]"
        />
        <span className="text-sm text-gray-500">@{user?.username}</span>
      </span>
    </Link>
  );
};

export default TableUserLabel;
