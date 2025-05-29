import SiteFooter from "@/components/common/footer/SiteFooter";
import DashboardNavbar from "@/components/common/navbar/DashboardNavbar";
import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <Flex direction="column" minHeight="vh">
      <DashboardNavbar />
      <main
        css={{
          flexGrow: "1",
        }}
      >
        <Outlet />
      </main>
      <SiteFooter />
    </Flex>
  );
}
