import SiteFooter from "@/components/common/footer/SiteFooter";
import SiteNavbar from "@/components/common/navbar/SiteNavbar";
import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router";

export default function SiteLayout() {
  return (
    <Flex direction="column" minHeight="vh">
      <SiteNavbar />
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
