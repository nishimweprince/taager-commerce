import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';

const NotFound = () => {
  /**
   * NAVIGATION
   */
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center justify-center py-16 text-center">
      <h1 className="text-9xl font-bold text-muted">404</h1>
      <h2 className="text-3xl font-semibold mb-4 mt-6">Page Not Found</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <nav className="flex gap-4">
        <Button
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          Go Back
        </Button>
        <Button to="/">Return to Home</Button>
      </nav>
    </section>
  );
};

export default NotFound;
