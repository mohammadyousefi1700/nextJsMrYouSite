import SideBar from "./components/layout/SideBar";

export default function RootLayoutDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full h-screen">
      <div className="flex-none relative">
        <SideBar />
      </div>

      <main className="pr-28 w-full mt-12">{children}</main>
    </div>
  );
}
