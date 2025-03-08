import CategoryManagementCard from "@/src/components/UI/Dashboard/CategoryManagementCard";
import Container from "@/src/components/UI/Shared/Container";
import { getCategoryById } from "@/src/services/CategoryService";

type Params = Promise<{ categoryId: string }>;

const UpdateCategory = async (params: { params: Params }) => {
  const categoryId = (await params.params).categoryId;
  const { data: category } = await getCategoryById(categoryId);

  return (
    <Container>
      <CategoryManagementCard title="Update" category={category} />
    </Container>
  );
};

export default UpdateCategory;
