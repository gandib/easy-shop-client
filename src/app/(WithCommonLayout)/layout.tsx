import Footer from "@/src/components/UI/Footer";
import { Navbar } from "@/src/components/UI/navbar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col min-h-screen ">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}