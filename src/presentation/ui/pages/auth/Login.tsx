import { useState } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import Input from '../../components/inputs/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import { Heading } from '../../components/inputs/TextInputs';
import { Controller, useForm } from 'react-hook-form';
import { InputErrorMessage } from '../../components/inputs/ErrorLabels';
import Button from '../../components/inputs/Button';
import { useLogin } from '@/core/application/hooks/auth.hooks';
import { Link } from 'react-router-dom';

const Login = () => {
  /**
   * STATE VARIABLES
   */
  const [showPassword, setShowPassword] = useState(false);

  /**
   * LOGIN MUTATION
   */
  const { login, loginIsLoading } = useLogin();

  /**
   *
   * REACT HOOK FORM
   */
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // HANDLE FORM SUBMISSION
  const onSubmit = handleSubmit((data) => {
    login({
      username: data?.username,
      password: data?.password,
    });
  });

  return (
    <AppLayout>
      <main className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <article className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
          <header className="text-center">
            <Heading type="h1" className="mb-2">
              Welcome Back
            </Heading>
            <p className="text-gray-600 mb-8">Sign in to your account</p>
          </header>

          <form onSubmit={onSubmit} className="space-y-6">
            <fieldset className="space-y-2">
              <Controller
                name="username"
                control={control}
                rules={{ required: `Please enter your username` }}
                render={({ field }) => {
                  return (
                    <>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Username
                      </label>
                      <span className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FontAwesomeIcon
                            icon={faEnvelope}
                            className="h-5 w-5 text-gray-400"
                          />
                        </span>
                        <Input
                          id="username"
                          type="text"
                          {...field}
                          placeholder="your username"
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

            <fieldset className="space-y-2">
              <Controller
                name="password"
                control={control}
                rules={{ required: `Please enter your password` }}
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
                          placeholder="••••••"
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
                    </>
                  );
                }}
              />
            </fieldset>

            <menu className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
              <label className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 cursor-pointer text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="ml-2 block text-xs sm:text-sm text-gray-700">
                  Remember me
                </span>
              </label>
            </menu>

            <menu className="flex flex-col items-center gap-4">
              <Button
                isLoading={loginIsLoading}
                type="submit"
                primary
                className="w-full"
              >
                Sign in
              </Button>
              <ul className="flex items-center gap-2 text-sm text-gray-700">
                <p className="">Don't have an account?</p>
                <Link
                  to="/auth/register"
                  className="text-primary hover:underline"
                >
                  Register
                </Link>
              </ul>
            </menu>
          </form>
        </article>
      </main>
    </AppLayout>
  );
};

export default Login;
