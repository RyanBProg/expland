import { Avatar, Box, Flex, Heading, Span, Timeline, Text, Button } from "@chakra-ui/react";
import { AirplaneTakeoff, TrendUp } from "phosphor-react";
import ReactCountryFlag from "react-country-flag";

export default function Feed() {
  return (
    <Flex direction="column" mt="10">
      <Heading as="h2">Activity Feed</Heading>
      <Timeline.Root size="xl" variant="subtle" maxW="md" mt="6" maxWidth="full">
        <Timeline.Item>
          <Timeline.Connector>
            <Timeline.Separator />
            <Timeline.Indicator bg="red.solid" color="red.contrast">
              10
            </Timeline.Indicator>
          </Timeline.Connector>
          <Timeline.Content>
            <Flex gap="2" alignItems="center">
              <Avatar.Root size="2xs">
                <Avatar.Image src="https://i.pravatar.cc/150?u=a" />
                <Avatar.Fallback />
              </Avatar.Root>
              <Text fontWeight="medium" fontSize="1rem" flexGrow="1">
                Lucas Moras
              </Text>
              <Span color="fg.muted" fontSize="0.8rem">
                Jan 1, 2024
              </Span>
            </Flex>

            <Timeline.Description fontSize="sm" mt="1">
              Was promoted to
              <Span ml="1" fontWeight="medium" color="white">
                Weekend Warrior
              </Span>
            </Timeline.Description>

            <Flex gap="5" alignItems="center">
              <Box mt="2">
                <TrendUp size={26} />
              </Box>
              <Button size="xs" variant="outline" rounded="md" width="fit-content" mt="3">
                ❤️
              </Button>
            </Flex>
          </Timeline.Content>
        </Timeline.Item>

        <Timeline.Item>
          <Timeline.Connector>
            <Timeline.Separator />
            <Timeline.Indicator bg="red.solid" color="red.contrast">
              10
            </Timeline.Indicator>
          </Timeline.Connector>
          <Timeline.Content>
            <Flex gap="2" alignItems="center">
              <Avatar.Root size="2xs">
                <Avatar.Image src="https://i.pravatar.cc/150?u=a" />
                <Avatar.Fallback />
              </Avatar.Root>
              <Text fontWeight="medium" fontSize="1rem" flexGrow="1">
                Lucas Moras
              </Text>
              <Span color="fg.muted" fontSize="0.8rem">
                Jan 1, 2024
              </Span>
            </Flex>

            <Timeline.Description fontSize="sm" mt="1">
              Completed a trip to
              <Span ml="1" fontWeight="medium" color="white">
                France
              </Span>
            </Timeline.Description>

            <Flex gap="5" alignItems="center">
              <Box mt="2">
                <ReactCountryFlag
                  countryCode="FR"
                  svg
                  style={{
                    width: "20px",
                    height: "20px",
                  }}
                  aria-label="France"
                />
              </Box>
              <Button size="xs" variant="outline" rounded="md" width="fit-content" mt="3">
                ❤️ <Span ml="0.5">20</Span>
              </Button>
              <Button size="xs" variant="outline" rounded="md" width="fit-content" mt="3">
                View Trip
              </Button>
            </Flex>
          </Timeline.Content>
        </Timeline.Item>

        <Timeline.Item>
          <Timeline.Connector>
            <Timeline.Separator />
            <Timeline.Indicator bg="yellow.solid" color="yellow.contrast">
              34
            </Timeline.Indicator>
          </Timeline.Connector>
          <Timeline.Content>
            <Flex gap="2" alignItems="center">
              <Avatar.Root size="2xs">
                <Avatar.Image src="https://i.pravatar.cc/150?u=a" />
                <Avatar.Fallback />
              </Avatar.Root>
              <Text fontWeight="medium" fontSize="1rem" flexGrow="1">
                Steve Banner
              </Text>
              <Span color="fg.muted" fontSize="0.8rem">
                Dec 1, 2023
              </Span>
            </Flex>

            <Timeline.Description fontSize="sm" mt="1">
              Completed a trip to
              <Span ml="1" fontWeight="medium" color="white">
                Spain
              </Span>
            </Timeline.Description>

            <Flex gap="5" alignItems="center">
              <Box mt="2">
                <ReactCountryFlag
                  countryCode="ES"
                  svg
                  style={{
                    width: "20px",
                    height: "20px",
                  }}
                  aria-label="France"
                />
              </Box>
              <Button size="xs" variant="outline" rounded="md" width="fit-content" mt="3">
                ❤️ <Span ml="0.5">8</Span>
              </Button>
              <Button size="xs" variant="outline" rounded="md" width="fit-content" mt="3">
                View Trip
              </Button>
            </Flex>
          </Timeline.Content>
        </Timeline.Item>

        <Timeline.Item>
          <Timeline.Connector>
            <Timeline.Separator />
            <Timeline.Indicator bg="white" color="black">
              5
            </Timeline.Indicator>
          </Timeline.Connector>
          <Timeline.Content>
            <Flex gap="2" alignItems="center">
              <Avatar.Root size="2xs">
                <Avatar.Image src="https://i.pravatar.cc/150?u=x" />
                <Avatar.Fallback />
              </Avatar.Root>
              <Text fontWeight="medium" fontSize="1rem" flexGrow="1">
                Erica Schaulz
              </Text>
              <Span color="fg.muted" fontSize="0.8rem">
                Dec 1, 2023
              </Span>
            </Flex>

            <Timeline.Description fontSize="sm" mt="1">
              Completed a trip to
              <Span ml="1" fontWeight="medium" color="white">
                Brazil
              </Span>
            </Timeline.Description>

            <Flex gap="5" alignItems="center">
              <Box mt="2">
                <ReactCountryFlag
                  countryCode="BR"
                  svg
                  style={{
                    width: "20px",
                    height: "20px",
                  }}
                  aria-label="Brazil"
                />
              </Box>
              <Button size="xs" variant="outline" rounded="md" width="fit-content" mt="3">
                ❤️ <Span ml="0.5">5</Span>
              </Button>
              <Button size="xs" variant="outline" rounded="md" width="fit-content" mt="3">
                View Trip
              </Button>
            </Flex>
          </Timeline.Content>
        </Timeline.Item>

        <Timeline.Item>
          <Timeline.Connector>
            <Timeline.Separator />
            <Timeline.Indicator bg="black" color="white">
              106
            </Timeline.Indicator>
          </Timeline.Connector>
          <Timeline.Content>
            <Flex gap="2" alignItems="center">
              <Avatar.Root size="2xs">
                <Avatar.Image src="https://i.pravatar.cc/150?u=y" />
                <Avatar.Fallback />
              </Avatar.Root>
              <Text fontWeight="medium" fontSize="1rem" flexGrow="1">
                Manu Natubo
              </Text>
              <Span color="fg.muted" fontSize="0.8rem">
                Aug 7, 2023
              </Span>
            </Flex>

            <Timeline.Description fontSize="sm" mt="1">
              Added a future trip to
              <Span ml="1" fontWeight="medium" color="white">
                Kenya
              </Span>
            </Timeline.Description>

            <Flex gap="5" alignItems="center">
              <Box mt="2">
                <AirplaneTakeoff size={26} />
              </Box>
              <Button size="xs" variant="outline" rounded="md" width="fit-content" mt="3">
                ❤️ <Span ml="0.5">5</Span>
              </Button>
              <Button size="xs" variant="outline" rounded="md" width="fit-content" mt="3">
                View Trip
              </Button>
            </Flex>
          </Timeline.Content>
        </Timeline.Item>

        <Timeline.Item>
          <Timeline.Connector>
            <Timeline.Separator />
            <Timeline.Indicator bg="black" color="white">
              106
            </Timeline.Indicator>
          </Timeline.Connector>
          <Timeline.Content>
            <Flex gap="2" alignItems="center">
              <Avatar.Root size="2xs">
                <Avatar.Image src="https://i.pravatar.cc/150?u=y" />
                <Avatar.Fallback />
              </Avatar.Root>
              <Text fontWeight="medium" fontSize="1rem" flexGrow="1">
                Manu Natubo
              </Text>
              <Span color="fg.muted" fontSize="0.8rem">
                Jul 16, 2023
              </Span>
            </Flex>

            <Timeline.Description fontSize="sm" mt="1">
              Was promoted to
              <Span ml="1" fontWeight="medium" color="white">
                Globe Trotter
              </Span>
            </Timeline.Description>

            <Flex gap="5" alignItems="center">
              <Box mt="2">
                <TrendUp size={26} />
              </Box>
              <Button size="xs" variant="outline" rounded="md" width="fit-content" mt="3">
                ❤️
              </Button>
            </Flex>
          </Timeline.Content>
        </Timeline.Item>
      </Timeline.Root>
    </Flex>
  );
}
