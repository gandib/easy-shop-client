"use client";
import Container from "@/src/components/UI/Container";
import FlashSaleManagementCard from "@/src/components/UI/FlashSaleManagementCard";
import { useUser } from "@/src/context/user.provider";
import { getShopById } from "@/src/services/ShopService";
import { useEffect, useState } from "react";

const CreateFlashSale = () => {
  const [shop, setShop] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, isLoading } = useUser();

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        setLoading(true);
        const { data: shop } = await getShopById(user?.id!);
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

  if (loading || isLoading) {
    return <div>Loading shop data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!shop) {
    return <div>No shop data found.</div>;
  }

  return (
    <Container>
      <FlashSaleManagementCard title="Create" shop={shop} />
    </Container>
  );
};

export default CreateFlashSale;
