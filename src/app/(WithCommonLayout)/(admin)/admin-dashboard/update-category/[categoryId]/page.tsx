import CategoryManagementCard from "@/src/components/UI/CategoryManagementCard";
import { getCategoryById } from "@/src/services/CategoryService";

const UpdateCategory = async ({
  params,
}: {
  params: { categoryId: string };
}) => {
  const { data: category } = await getCategoryById(params.categoryId);

  return (
    <div>
      <CategoryManagementCard title="Update" category={category} />
    </div>
  );
};

export default UpdateCategory;
