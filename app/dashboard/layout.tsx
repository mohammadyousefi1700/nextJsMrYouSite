import SideBar from "./components/layout/SideBar";

export default function RootLayoutDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full  h-screen">
      <SideBar />
      <main>{children}</main>
    </div>
  );
}
