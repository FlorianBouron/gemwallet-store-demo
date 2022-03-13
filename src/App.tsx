/* This example requires Tailwind CSS v2.0+ */
import { Checkout } from './components/Checkout';
import ProductView from './components/ProductOverview/ProductOverview';

export default function App() {
  return (
    <>
      <ProductView />
      <Checkout />
    </>
  );
}
