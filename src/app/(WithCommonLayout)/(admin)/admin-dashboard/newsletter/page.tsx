import NewsletterManagementCard from "@/src/components/UI/NewsletterManagementCard";
import { getAllNewsletter } from "@/src/services/NewsletterService";

const Newsletter = async () => {
  const { data: allNewsletter } = await getAllNewsletter();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Newsletter Management</h1>
      <NewsletterManagementCard newsletter={allNewsletter} />
    </div>
  );
};

export default Newsletter;
