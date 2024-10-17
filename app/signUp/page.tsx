import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "صحفه ثبت نام",
};
const ClientComponent = dynamic(
  () => import("../components/customSinupAndLogin/ClientFormComponent"),
  { ssr: false }
);

export default async function SignUpPage() {
  return <ClientComponent />;
}
