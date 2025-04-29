import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { SkeletonLoader } from './Loader';

type CustomBreadcrumbProps = {
  navigationLinks: {
    route: string;
    label?: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    icon?: IconProp;
    isLoading?: boolean;
  }[];
};

const CustomBreadcrumb = ({ navigationLinks }: CustomBreadcrumbProps) => {
  const visibleLinks = navigationLinks?.slice(-3);
  const hiddenLinks = navigationLinks?.slice(0, -3);

  return (
    <Breadcrumb>
      <BreadcrumbList className="flex items-center gap-1">
        {hiddenLinks?.length > 0 && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1">
                  <BreadcrumbEllipsis className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {hiddenLinks?.map((link, index) => (
                    <Link
                      to={link.route}
                      onClick={link?.onClick}
                      key={index}
                      className="text-[14px] w-full hover:text-slate-700 transition-all ease-in-out duration-200 flex items-center gap-2 hover:bg-background rounded-md p-1 px-2"
                    >
                      {link.icon && <FontAwesomeIcon icon={link.icon} />}
                      {link.label}
                    </Link>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
          </>
        )}
        {visibleLinks?.map((link, index: number) => (
          <Fragment key={index}>
            {index > 0 && <BreadcrumbSeparator className="p-0 ml-[-4px]" />}
            <BreadcrumbItem>
              <Link
                to={link.route}
                onClick={link?.onClick}
                className="text-[14px] w-full hover:text-slate-700 transition-all ease-in-out duration-200 flex items-center gap-2 hover:bg-background rounded-md p-1 px-2"
              >
                {link?.isLoading ? (
                  <figure>
                    <SkeletonLoader type="text" />
                  </figure>
                ) : (
                  <>
                    {link.icon && (
                      <FontAwesomeIcon
                        icon={link.icon}
                        className="text-[12px] mb"
                      />
                    )}
                    {link.label}
                  </>
                )}
              </Link>
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;
