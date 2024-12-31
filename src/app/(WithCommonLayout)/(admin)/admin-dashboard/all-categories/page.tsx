import CategoryDisplayCard from "@/src/components/UI/CategoryDisplayCard";
import { getAllCategory } from "@/src/services/CategoryService";
import { ICategory } from "@/src/types";

const AllCategories = async () => {
  const { data: allCategories } = await getAllCategory();

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3  gap-2">
      {allCategories && allCategories?.length > 0
        ? allCategories?.map((category: ICategory) => (
            <CategoryDisplayCard category={category} key={category?.id} />
          ))
        : "No category to show!"}
    </div>
  );
};

export default AllCategories;
