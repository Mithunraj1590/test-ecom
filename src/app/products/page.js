import ProductsBanner from "@/widgets/ProductsBanner";
import ProductList from "@/widgets/ProductList";

export default function Products() {
  return (
    <main className="min-h-screen">
      {/* Hero Banner */}
        <ProductsBanner />
    
      {/* Products Section */}
      <ProductList />
    </main>
  );
}
