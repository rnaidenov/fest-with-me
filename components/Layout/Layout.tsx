import { FCWithChildren } from "../../types.ts";
import Footer from "../../islands/Footer.tsx";

export const Layout: FCWithChildren = ({ children }: FCWithChildren) => {
  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#F9F8F8] to-[#D4BEBE]">
      <img
        src="/logo.svg"
        alt="FestWithMe logo"
        className="absolute top-0 left-[50%] translate-x-[-50%] scale(75) z-10"
      />
      <div className="absolute w-full h-[45vh] bg-hero-festival bg-cover bg-center shadow-3xl" />
      <div className="absolute w-full h-[45vh] bg-black opacity-20" />
      {children}
      <Footer />
    </div>
  );
};
