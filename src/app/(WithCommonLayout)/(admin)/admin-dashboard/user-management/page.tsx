import UserManagementCard from "@/src/components/UI/UserManagementCard";
import { getAllUser } from "@/src/services/UserService";

const UserManagement = async () => {
  const { data: allUsers } = await getAllUser();

  return (
    <div>
      <UserManagementCard users={allUsers} />
    </div>
  );
};

export default UserManagement;
