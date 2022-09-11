import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-xl border border-kinda-teal bg-darker-beige shadow-sm dark:border-blood-red dark:bg-lighter-purple">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <div className="mb-4 inline-block rounded-full bg-white p-2 text-kinda-teal dark:bg-pale-gold dark:text-blood-red">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
            </div>
            <h1 className="block text-2xl font-bold text-dark-navy dark:text-pale-gold">
              Forgot password?
            </h1>
            <p className="mt-2 text-sm text-dark-navy dark:text-pale-gold">
              We will send you reset instructions.
            </p>
          </div>

          <div className="mt-6">
            <form>
              <div className="grid gap-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm text-dark-navy dark:text-pale-gold"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      placeholder="Email Address"
                      type="email"
                      id="email"
                      name="email"
                      className="peer block w-full rounded-md border border-gray-200 bg-darker-beige bg-gray-50 py-3 px-4 text-sm outline-none ring-offset-1 focus:border-kinda-teal focus:bg-white focus:ring-2 focus:ring-kinda-teal dark:bg-incorrectInput dark:focus:border-blood-red dark:focus:ring-blood-red "
                      required
                      aria-describedby="email-error"
                    />
                    <div className="pointer-events-none absolute top-3 right-0 hidden items-center px-3 peer-invalid:flex">
                      <svg
                        className="h-5 w-5 text-blood-red"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                    </div>
                    <p
                      className="mt-2 hidden text-xs text-blood-red peer-invalid:block"
                      id="email-error"
                    >
                      Valid email address required for the account recovery process
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-sky-500 py-3 px-4 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Reset password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <p className="mt-3 flex items-center justify-center gap-3 divide-x divide-gray-300 text-center">
        <Link
          className="pl-3 text-sm text-dark-navy decoration-2 hover:text-blood-red hover:underline dark:text-pale-gold"
          to="/"
        >
          {' '}
          FAQs{' '}
        </Link>
        <span className="inline pl-3 text-sm text-dark-navy dark:text-pale-gold">
          Remember your password?
          <Link
            to="/login"
            className="font-medium text-blue-600 decoration-2 hover:underline"
            href="#"
          >
            {' '}
            Sign in{' '}
          </Link>
        </span>
        <Link
          className="pl-3 text-sm text-dark-navy decoration-2 hover:text-blood-red hover:underline dark:text-pale-gold"
          to="/"
          target="_blank"
        >
          {' '}
          Contact Support{' '}
        </Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
