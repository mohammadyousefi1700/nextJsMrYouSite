import SideBar from "./components/layout/SideBar";

export default function RootLayoutDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" md:flex-col sm:flex-col xs:flex-col h-screen">
      <div className="flex-none relative">
        <SideBar />
      </div>

      <main className="xl:pr-28  lg:pr-20 md:pr-28   w-full mt-12">
        {children}
      </main>
    </div>
  );
}
