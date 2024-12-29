import CategoryManagementCard from "@/src/components/UI/CategoryManagementCard";
import { getCategoryById } from "@/src/services/CategoryService";

type Params = Promise<{ categoryId: string }>;

const UpdateCategory = async (params: { params: Params }) => {
  const categoryId = (await params.params).categoryId;
  const { data: category } = await getCategoryById(categoryId);

  return (
    <div>
      <CategoryManagementCard title="Update" category={category} />
    </div>
  );
};

export default UpdateCategory;
