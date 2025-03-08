import Container from "@/src/components/UI/Shared/Container";
import NewsletterManagementCard from "@/src/components/UI/Dashboard/NewsletterManagementCard";
import { getAllNewsletter } from "@/src/services/NewsletterService";

const Newsletter = async () => {
  const { data: allNewsletter } = await getAllNewsletter();
  return (
    <Container>
      <h1 className="text-2xl font-bold mb-6">Newsletter Management</h1>
      <NewsletterManagementCard newsletter={allNewsletter} />
    </Container>
  );
};

export default Newsletter;
