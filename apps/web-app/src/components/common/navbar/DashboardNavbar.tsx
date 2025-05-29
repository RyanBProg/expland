import { Avatar, Flex, ButtonGroup, Button, IconButton, Menu, Portal } from "@chakra-ui/react";
import { AirplaneInFlight, Compass, House } from "phosphor-react";
import { Link } from "react-router";

const ringCss = {
  outlineWidth: "2px",
  outlineColor: "colorPalette.500",
  outlineOffset: "2px",
  outlineStyle: "solid",
};

export default function DashboardNavbar() {
  return (
    <header>
      <Flex as="nav" justify="space-between" p="4" alignItems="center">
        <ButtonGroup as="ul" variant="subtle">
          <Button asChild rounded="2xl">
            <Link to="/dashboard">
              <House />
              Dashboard
            </Link>
          </Button>
          <Button asChild rounded="2xl">
            <Link to="/dashboard">
              <AirplaneInFlight />
              Trips
            </Link>
          </Button>
          <Button asChild rounded="2xl">
            <Link to="/dashboard">
              <Compass />
              Explore
            </Link>
          </Button>
        </ButtonGroup>

        <Menu.Root>
          <Menu.Trigger asChild>
            <IconButton variant="plain" rounded="full" size="xs">
              <Avatar.Root size="md" shape="full" css={ringCss} colorPalette="cyan">
                <Avatar.Fallback />
              </Avatar.Root>
            </IconButton>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner mt="1">
              <Menu.Content>
                <Menu.Item asChild value="profile">
                  <Link to="/account/profile">My Profile</Link>
                </Menu.Item>
                <Menu.Item asChild value="account">
                  <Link to="/account">Manage Account</Link>
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Flex>
    </header>
  );
}
