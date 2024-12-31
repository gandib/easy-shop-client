import AllShopCard from "@/src/components/UI/AllShopCard";
import Container from "@/src/components/UI/Container";
import { getAllShop } from "@/src/services/ShopService";

const AllShop = async () => {
  const { data: allShop } = await getAllShop();

  return (
    <Container>
      <h1>Hello, AllShop!</h1>
      <AllShopCard shop={allShop} />
    </Container>
  );
};

export default AllShop;
