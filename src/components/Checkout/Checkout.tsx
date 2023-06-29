import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { isConnected, sendPayment } from '@gemwallet-beta/api';
import { useNavbar } from '../../contexts/NavbarContext';
import { Modal } from '../Modal';

const products = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '9.00XRP',
    quantity: 1,
    imageSrc: 'img/orangebag.jpeg',
    imageAlt:
      'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.'
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '3.20XRP',
    quantity: 1,
    imageSrc: 'img/bagpack.jpeg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.'
  }
  // More products...
];

export function Checkout() {
  const { isOpen, setIsOpen } = useNavbar();
  const [paymentStatus, setPaymentStatus] = useState('');

  const handlePayment = () => {
    isConnected().then((isConnected) => {
      if (isConnected) {
        const transaction = {
          amount: '26.20',
          destination: 'rNvFCZXpDtGeQ3bVas95wGLN6N2stGmA9o'
        };
        sendPayment(transaction)
          .then((trHash) => {
            console.log('Transaction Hash: ', trHash);
            setPaymentStatus('success');
          })
          .catch((e) => {
            console.log('THE ERROR: ', e);
          });
      } else {
        setPaymentStatus('fail');
      }
    });
  };

  return (
    <>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={setIsOpen}>
          <div className="absolute inset-0 overflow-hidden">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Checkout
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setIsOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul className="-my-6 divide-y divide-gray-200">
                            {products.map((product) => (
                              <li key={product.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product.imageSrc}
                                    alt={product.imageAlt}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href={product.href}> {product.name} </a>
                                      </h3>
                                      <p className="ml-4">{product.price}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                  </div>
                                  <div className="flex flex-1 text-sm">
                                    <p className="text-gray-500">Qty {product.quantity}</p>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>26.20XRP</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        We accept payments with{' '}
                        <a
                          href="https://gemwallet.app"
                          className="text-indigo-600 font-medium  hover:text-indigo-700"
                        >
                          GemWallet
                        </a>
                        .
                      </p>
                      <p className="mt-0.5 text-sm text-gray-500">
                        This demo is using the testnet.
                      </p>
                      <div className="mt-6">
                        <button
                          onClick={handlePayment}
                          className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          PAY
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {paymentStatus === 'fail' && (
        <Modal
          icon="fail"
          title="Payment failed"
          description="Please get GemWallet: https://gemwallet.app"
          button="Close"
        />
      )}
      {paymentStatus === 'success' && (
        <Modal
          icon="success"
          title="Payment successful"
          description="Your payment of 26.20XRP has been successful"
          button="Close"
        />
      )}
    </>
  );
}
