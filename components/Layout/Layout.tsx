import Preact from "preact";

export const Layout: Preact.FC<{ children: Preact.PreactNode }> = (
  { children },
) => {
  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#F9F8F8] to-[#D4BEBE]">
      <div className="absolute w-full h-[50vh] bg-hero-festival bg-cover shadow-3xl" />
      <div className="absolute w-full h-[50vh] bg-black opacity-20" />
      {children}
    </div>
  );
};
