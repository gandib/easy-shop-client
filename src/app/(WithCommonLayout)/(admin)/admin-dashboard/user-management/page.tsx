import Container from "@/src/components/UI/Container";
import UserManagementCard from "@/src/components/UI/UserManagementCard";
import { getAllUser } from "@/src/services/UserService";

const UserManagement = async () => {
  const { data: allUsers } = await getAllUser();

  return (
    <Container>
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      <UserManagementCard users={allUsers} />
    </Container>
  );
};

export default UserManagement;
