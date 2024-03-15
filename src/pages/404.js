import Link from 'next/link'

const ErrorPage = () => {
  return (
    <div className="flex flex-col w-full max-w-xl text-center">
      <img
        className="object-contain w-auto h-64 mb-8"
        src="/images/404.svg"
        alt="svg"
      />
      <h1 className="text-6xl text-teal-600 mb-4">404</h1>

      <div className="mb-8 text-center text-gray-900">
        We're sorry. The page you requested could not be found. Please go back
        to the homepage or contact us
      </div>
      <div className="flex w-full">
        <Link legacyBehavior href="/">
          <a className="w-full brounded btn-block bg-teal-500 hover:bg-teal-400 text-white mx-2 py-3 rounded md:mx-0">
            Go back
          </a>
        </Link>
      </div>
    </div>
  )
}

export default ErrorPage