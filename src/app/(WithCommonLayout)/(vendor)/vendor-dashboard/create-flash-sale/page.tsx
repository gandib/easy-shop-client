"use client";
import FlashSaleManagementCard from "@/src/components/UI/FlashSaleManagementCard";
import { getShopById } from "@/src/services/ShopService";
import { useEffect, useState } from "react";

const CreateFlashSale = () => {
  const [shop, setShop] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        setLoading(true);
        const { data: shop } = await getShopById(
          "4f12f217-92be-43f3-9be7-a095213ffbe6"
        );
        setShop(shop);
      } catch (err: any) {
        console.error("Failed to fetch shop data:", err);
        setError(err.message || "An error occurred while fetching shop data.");
      } finally {
        setLoading(false);
      }
    };

    fetchShopData();
  }, []);

  if (loading) {
    return <div>Loading shop data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!shop) {
    return <div>No shop data found.</div>;
  }

  return (
    <div>
      <FlashSaleManagementCard title="Create" shop={shop} />
    </div>
  );
};

export default CreateFlashSale;
