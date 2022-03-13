import { ShoppingBagIcon } from '@heroicons/react/outline';
import { useNavbar } from '../../contexts/NavbarContext';

const product = {
  name: 'Basic Tee 6-Pack',
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'Men', href: '#' },
    { id: 2, name: 'Clothing', href: '#' }
  ]
};

export function Navbar() {
  const { setIsOpen } = useNavbar();
  return (
    <nav className="pt-6 flex justify-between" aria-label="Breadcrumb">
      <div>
        <ol
          role="list"
          className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8"
        >
          {product.breadcrumbs.map((breadcrumb) => (
            <li key={breadcrumb.id}>
              <div className="flex items-center">
                <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                  {breadcrumb.name}
                </a>
                <svg
                  width={16}
                  height={20}
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="w-4 h-5 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>
          ))}
          <li className="text-sm">
            <a
              href={product.href}
              aria-current="page"
              className="font-medium text-gray-500 hover:text-gray-600"
            >
              {product.name}
            </a>
          </li>
        </ol>
      </div>
      <div>
        <button
          className="group -m-2 p-2 flex items-center px-4 sm:px-6 lg:px-8"
          onClick={() => setIsOpen(true)}
        >
          <ShoppingBagIcon
            className="flex-shrink-0 h-6 w-6 text-indigo-500 group-hover:text-indigo-600"
            aria-hidden="true"
          />
          <span className="ml-2 text-sm font-medium text-indigo-500 group-hover:text-indigo-600">
            2
          </span>
          <span className="sr-only">items in cart, view bag</span>
        </button>
      </div>
    </nav>
  );
}
