import UserManagementCard from "@/src/components/UI/UserManagementCard";
import { getAllUser } from "@/src/services/UserService";

const UserManagement = async () => {
  const { data: allUsers } = await getAllUser();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <UserManagementCard users={allUsers} />
    </div>
  );
};

export default UserManagement;
