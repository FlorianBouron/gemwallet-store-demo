/* This example requires Tailwind CSS v2.0+ */
import { Checkout } from './components/Checkout';
import { Navbar } from './components/Navbar';
import { ProductOverview } from './components/ProductOverview';
import { NavbarProvider } from './contexts/NavbarContext';

export default function App() {
  return (
    <>
      <NavbarProvider>
        <Navbar />
        <Checkout />
      </NavbarProvider>
      <ProductOverview />
    </>
  );
}
