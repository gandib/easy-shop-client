import CategoryDisplayCard from "@/src/components/UI/CategoryDisplayCard";
import Container from "@/src/components/UI/Container";
import { getAllCategory } from "@/src/services/CategoryService";
import { ICategory } from "@/src/types";

const AllCategories = async () => {
  const { data: allCategories } = await getAllCategory();

  return (
    <Container>
      <h1 className="text-2xl font-bold mb-6">All Categories</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3  gap-2">
        {allCategories && allCategories?.length > 0
          ? allCategories?.map((category: ICategory) => (
              <CategoryDisplayCard category={category} key={category?.id} />
            ))
          : "No category to show!"}
      </div>
    </Container>
  );
};

export default AllCategories;
