import Container from "@/src/components/UI/Shared/Container";
import ShopDetail from "@/src/components/UI/Home/Cards/ShopDetail";
import { getShopById } from "@/src/services/ShopService";

type Params = Promise<{ shopId: string }>;

const ShopPage = async (params: { params: Params }) => {
  const shopId = (await params.params).shopId;
  const { data: shop } = await getShopById(shopId);
  return (
    <Container>
      <ShopDetail shop={shop} />
    </Container>
  );
};

export default ShopPage;
