import { Flex, ButtonGroup, Button, Menu, Portal } from "@chakra-ui/react";
import { AirplaneInFlight, Compass, House, User } from "phosphor-react";
import { Link } from "react-router";

export default function DashboardNavbar() {
  return (
    <header>
      <Flex as="nav" aria-label="main navigation" justify="space-between" p="4" alignItems="center">
        <ButtonGroup as="ul" variant="subtle">
          <li>
            <Button asChild rounded="2xl">
              <Link to="/dashboard" aria-label="Dashboard Home">
                <House aria-hidden="true" />
                Dashboard
              </Link>
            </Button>
          </li>
          <li>
            <Button asChild rounded="2xl">
              <Link to="/dashboard" aria-label="My Trips">
                <AirplaneInFlight aria-hidden="true" />
                Trips
              </Link>
            </Button>
          </li>
          <li>
            <Button asChild rounded="2xl">
              <Link to="/dashboard" aria-label="Explore Destinations">
                <Compass aria-hidden="true" />
                Explore
              </Link>
            </Button>
          </li>
        </ButtonGroup>

        <Menu.Root>
          <Menu.Trigger asChild>
            <Button rounded="2xl" size="md" colorPalette="cyan" aria-label="Open user menu">
              <User />
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner mt="1">
              <Menu.Content aria-label="user menu">
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
