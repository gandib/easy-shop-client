import Footer from "@/src/components/UI/Shared/Footer";
import Hero from "@/src/components/UI/Hero";
import { Navbar } from "@/src/components/UI/Shared/navbar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col min-h-screen ">
      <Navbar />
      {/* <Hero /> */}
      <main>{children}</main>
      <Footer />
    </div>
  );
}
