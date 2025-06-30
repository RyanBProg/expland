import { Tooltip } from "@/components/ui/tooltip";
import { Flex, ButtonGroup, Button, Menu, Portal, Span } from "@chakra-ui/react";
import { AirplaneInFlight, Compass, GlobeHemisphereWest, House, User } from "phosphor-react";
import { Link } from "react-router";

export default function DashboardNavbar() {
  return (
    <header>
      <Flex
        as="nav"
        aria-label="main navigation"
        justify="space-between"
        p="2.5"
        sm={{ padding: "4" }}
        alignItems="center"
      >
        <ButtonGroup as="ul" variant="subtle" gap="2" sm={{ gap: "3" }}>
          <li>
            <Tooltip openDelay={300} content="Dashboard">
              <Button asChild rounded="2xl">
                <Link to="/dashboard" aria-label="Dashboard Home">
                  <House aria-hidden="true" />
                  <Span display="none" md={{ display: "inline" }}>
                    Dashboard
                  </Span>
                </Link>
              </Button>
            </Tooltip>
          </li>
          <li>
            <Tooltip openDelay={300} content="My Travels">
              <Button asChild rounded="2xl">
                <Link to="/dashboard/trips" aria-label="My Travels">
                  <AirplaneInFlight aria-hidden="true" />
                  <Span display="none" md={{ display: "inline" }}>
                    Travels
                  </Span>
                </Link>
              </Button>
            </Tooltip>
          </li>
          <li>
            <Tooltip openDelay={300} content="Map View">
              <Button asChild rounded="2xl">
                <Link to="/dashboard/map-view" aria-label="Map View">
                  <GlobeHemisphereWest aria-hidden="true" />
                  <Span display="none" md={{ display: "inline" }}>
                    Map View
                  </Span>
                </Link>
              </Button>
            </Tooltip>
          </li>
          {/* <li>
            <Tooltip openDelay={300} content="Explore Destinations">
              <Button asChild rounded="2xl">
                <Link to="/dashboard" aria-label="Explore Destinations">
                  <Compass aria-hidden="true" />
                  <Span display="none" md={{ display: "inline" }}>
                    Explore
                  </Span>
                </Link>
              </Button>
            </Tooltip>
          </li> */}
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
                  <Link to="/dashboard/account/profile">My Profile</Link>
                </Menu.Item>
                <Menu.Item asChild value="account">
                  <Link to="/dashboard/account">Manage Account</Link>
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Flex>
    </header>
  );
}
