import Container from "@/src/components/UI/Container";
import NewsletterManagementCard from "@/src/components/UI/NewsletterManagementCard";
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
