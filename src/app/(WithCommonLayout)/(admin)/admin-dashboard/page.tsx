import CategoryDisplayCard from "@/src/components/UI/CategoryDisplayCard";
import { getAllCategory } from "@/src/services/CategoryService";
import { ICategory } from "@/src/types";

const AdminDashboard = async () => {
  const { data: allCategories } = await getAllCategory();

  return (
    <div className="grid grid-cols-2 gap-2">
      {allCategories?.map((category: ICategory) => (
        <CategoryDisplayCard category={category} key={category?.id} />
      ))}
    </div>
  );
};

export default AdminDashboard;
