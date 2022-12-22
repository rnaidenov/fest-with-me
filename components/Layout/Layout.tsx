import Preact from "preact";

export const Layout: Preact.FC<{ children: Preact.PreactNode }> = (
  { children },
) => {
  return (
    <div className="h-screen bg-gradient-to-b from-[#FFFFFF] via-[#F9F8F8] to-[#D4BEBE]">
      <div className="absolute w-full h-1/2 bg-hero-festival bg-cover filter drop-shadow-xl" />
      <div className="absolute w-full h-1/2 bg-black opacity-20" />
      {children}
    </div>
  );
};
