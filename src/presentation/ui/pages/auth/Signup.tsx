import { useEffect, useState } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import Input from '../../components/inputs/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Heading } from '../../components/inputs/TextInputs';
import { Controller, useForm } from 'react-hook-form';
import { InputErrorMessage } from '../../components/inputs/ErrorLabels';
import Button from '../../components/inputs/Button';
import { Link, useNavigate } from 'react-router-dom';
import validateInputs from '@/presentation/utils/validations.helper';
import { useCreateUser } from '@/core/application/hooks/user.hooks';

const Signup = () => {
  /**
   * STATE VARIABLES
   */
  const [showPassword, setShowPassword] = useState(false);

  /**
   * NAVIGATION
   */
  const navigate = useNavigate();

  /**
   * CREATE USER MUTATION
   */
  const {
    createUser,
    createUserIsLoading,
    createUserIsSuccess,
    createUserReset,
  } = useCreateUser();

  /**
   * REACT HOOK FORM
   */
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  // Watch password value for confirmation validation
  const { password } = watch();

  // HANDLE FORM SUBMISSION
  const onSubmit = handleSubmit((data) => {
    createUser({
      id: 0,
      email: data?.email,
      username: data?.username,
      password: data?.password,
    });
  });

  // HANDLE CREATE USER SUCCESS
  useEffect(() => {
    if (createUserIsSuccess) {
      navigate('/auth/login');
      createUserReset();
      reset({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        terms: false,
      });
    }
  }, [createUserIsSuccess, navigate, createUserReset, reset]);

  return (
    <AppLayout>
      <main className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <article className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
          <header className="text-center">
            <Heading type="h1" className="mb-2">
              Create Account
            </Heading>
            <p className="text-gray-600 mb-8">Join our community today</p>
          </header>

          <form onSubmit={onSubmit} className="space-y-6">
            {/* Email Field */}
            <fieldset className="space-y-2">
              <Controller
                name="email"
                control={control}
                rules={{
                  required: `Email is required`,
                  validate: (value) => {
                    return (
                      validateInputs(value, 'email') ||
                      'Please enter a valid email address'
                    );
                  },
                }}
                render={({ field }) => {
                  return (
                    <>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <span className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FontAwesomeIcon
                            icon={faEnvelope}
                            className="h-5 w-5 text-gray-400"
                          />
                        </span>
                        <Input
                          id="email"
                          type="email"
                          {...field}
                          placeholder="your@email.com"
                          className={`pl-10 w-full ${
                            errors.email ? 'border-red-500' : ''
                          }`}
                        />
                      </span>
                      <InputErrorMessage message={errors?.email?.message} />
                    </>
                  );
                }}
              />
            </fieldset>

            {/* Username Field */}
            <fieldset className="space-y-2">
              <Controller
                name="username"
                control={control}
                rules={{
                  required: `Username is required`,
                  minLength: {
                    value: 3,
                    message: 'Username must be at least 3 characters',
                  },
                }}
                render={({ field }) => {
                  return (
                    <>
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Username
                      </label>
                      <span className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FontAwesomeIcon
                            icon={faUser}
                            className="h-5 w-5 text-gray-400"
                          />
                        </span>
                        <Input
                          id="username"
                          type="text"
                          {...field}
                          placeholder="johndoe123"
                          className={`pl-10 w-full ${
                            errors.username ? 'border-red-500' : ''
                          }`}
                        />
                      </span>
                      <InputErrorMessage message={errors?.username?.message} />
                    </>
                  );
                }}
              />
            </fieldset>

            {/* Password Field */}
            <fieldset className="space-y-2">
              <Controller
                name="password"
                control={control}
                rules={{
                  required: `Password is required`,
                }}
                render={({ field }) => {
                  return (
                    <>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <span className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FontAwesomeIcon
                            icon={faLock}
                            className="h-5 w-5 text-gray-400"
                          />
                        </span>
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          className={`pl-10 pr-10 w-full ${
                            errors.password ? 'border-red-500' : ''
                          }`}
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            setShowPassword(!showPassword);
                          }}
                        >
                          {showPassword ? (
                            <FontAwesomeIcon
                              icon={faEyeSlash}
                              className="h-5 w-5 text-gray-400"
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faEye}
                              className="h-5 w-5 text-gray-400"
                            />
                          )}
                        </button>
                      </span>
                      <InputErrorMessage message={errors?.password?.message} />
                    </>
                  );
                }}
              />
            </fieldset>

            {/* Confirm Password Field */}
            <fieldset className="space-y-2">
              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  required: `Please confirm your password`,
                  validate: (value) =>
                    value === password || 'Passwords do not match',
                }}
                render={({ field }) => {
                  return (
                    <>
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Confirm Password
                      </label>
                      <span className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FontAwesomeIcon
                            icon={faLock}
                            className="h-5 w-5 text-gray-400"
                          />
                        </span>
                        <Input
                          id="confirmPassword"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          className={`pl-10 pr-10 w-full ${
                            errors.confirmPassword ? 'border-red-500' : ''
                          }`}
                          {...field}
                        />
                      </span>
                      <InputErrorMessage
                        message={errors?.confirmPassword?.message}
                      />
                    </>
                  );
                }}
              />
            </fieldset>

            {/* Terms and Conditions */}
            <fieldset className="space-y-2">
              <Controller
                name="terms"
                control={control}
                rules={{ required: 'You must accept the terms and conditions' }}
                render={({ field }) => (
                  <>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="terms"
                          type="checkbox"
                          className="h-4 w-4 cursor-pointer text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          {...field}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="text-gray-700">
                          I agree to the{' '}
                          <a href="#" className="text-primary hover:underline">
                            Terms of Service
                          </a>{' '}
                          and{' '}
                          <a href="#" className="text-primary hover:underline">
                            Privacy Policy
                          </a>
                        </label>
                      </div>
                    </div>
                    <InputErrorMessage message={errors?.terms?.message} />
                  </>
                )}
              />
            </fieldset>

            <menu className="flex flex-col items-center gap-4">
              <Button
                isLoading={createUserIsLoading}
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors duration-200"
              >
                Create Account
              </Button>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <p>Already have an account?</p>
                <Link to="/auth/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </div>
            </menu>
          </form>
        </article>
      </main>
    </AppLayout>
  );
};

export default Signup;
