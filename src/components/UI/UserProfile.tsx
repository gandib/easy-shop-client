import { getUserByEmail } from "@/src/services/UserService";

const UserProfile = async () => {
  const { data: userData } = await getUserByEmail();

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          User Profile
        </h2>

        <div className="flex items-center space-x-8 border-b pb-6 mb-6">
          <div className="w-24 h-24">
            <img
              src="https://res.cloudinary.com/dvka5l5tj/image/upload/v1735646311/user_xxxb8h.png"
              alt="User Avatar"
              className="w-full h-full rounded-full border-4 border-indigo-500 shadow-xl object-cover"
            />
          </div>

          <div>
            <div className="text-2xl font-semibold text-gray-800">
              {userData?.name}
            </div>
            <div className="text-lg text-gray-600 mt-1">{userData?.email}</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Full Name:</span>
            <span className="font-normal">{userData?.name}</span>
          </div>

          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Email Address:</span>
            <span className="font-normal">{userData?.email}</span>
          </div>

          {/* <div className="flex justify-between text-gray-700">
          <span className="font-medium">Phone Number:</span>
          <span className="font-normal">{user?.phone}</span>
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
