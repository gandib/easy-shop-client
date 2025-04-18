import { useEffect, useState } from "react";
import { getAllProducts } from "@/src/services/ProductService";
import { IProduct } from "@/src/types";
import VendorProductCard, { IMeta } from "../Dashboard/VendorProductCard";
import RealtedProductsDisplayCard from "./RealtedProductsDisplayCard";
import Loading from "../Shared/Loading";

const RelatedProduct = ({
  categoryName,
  fromShop,
}: {
  categoryName: string;
  fromShop?: string;
}) => {
  const [relatedProducts, setRelatedProducts] = useState<{
    meta: IMeta;
    data: IProduct[];
  }>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const { data } = await getAllProducts([
          { name: "category", value: categoryName },
        ]);
        setRelatedProducts(data);
      } catch (error) {
        console.error("Failed to fetch related products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [categoryName]);

  // if (loading) return <p>Loading related products...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold my-4">Suggested Products</h2>
      {loading && <Loading />}

      {!loading && (
        <RealtedProductsDisplayCard
          products={relatedProducts!}
          category={categoryName}
          fromShop={fromShop}
        />
      )}
    </div>
  );
};

export default RelatedProduct;
