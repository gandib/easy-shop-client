import Container from "@/src/components/UI/Container";
import ShopDetail from "@/src/components/UI/ShopDetail";
import { getShopById } from "@/src/services/ShopService";

const ShopPage = async ({ params }: { params: { shopId: string } }) => {
  const { data: shop } = await getShopById(params.shopId);
  return (
    <Container>
      <ShopDetail shop={shop} />
    </Container>
  );
};

export default ShopPage;
