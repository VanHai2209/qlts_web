import { Layout } from "@/components/shared/layouts/Layout";

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutAdmin = ({ children }: LayoutProps) => {
  return <Layout>{children}</Layout>;
};

export default LayoutAdmin;
