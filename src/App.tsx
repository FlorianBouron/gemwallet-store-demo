/* This example requires Tailwind CSS v2.0+ */
import { Checkout } from './components/Checkout';
import { Navbar } from './components/Navbar';
import { ProductOverview } from './components/ProductOverview';

export default function App() {
  return (
    <>
      <Navbar />
      <ProductOverview />
      <Checkout />
    </>
  );
}
