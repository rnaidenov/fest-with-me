import { FCWithChildren } from "../../types.ts";
import Footer from "../../islands/Footer.tsx";

export const Layout: FCWithChildren = ({ children }: FCWithChildren) => {
  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#F9F8F8] to-[#D4BEBE]">
      <div className="absolute w-full h-[45vh] bg-hero-festival bg-cover shadow-3xl" />
      <div className="absolute w-full h-[45vh] bg-black opacity-20" />
      {children}
      <Footer />
    </div>
  );
};
