import { Box, Button, Card, Flex, Heading, Separator, Text, Timeline } from "@chakra-ui/react";
import { AirplaneTilt } from "phosphor-react";
import ReactCountryFlag from "react-country-flag";

export default function TimelineComp() {
  return (
    <Flex direction="column">
      <Heading as="h2">Travel Timeline</Heading>
      <Timeline.Root size="lg" maxW="600px" mt="6">
        <Timeline.Item>
          <Timeline.Connector>
            <Timeline.Separator />
            <Timeline.Indicator bg="transparent">
              <ReactCountryFlag
                countryCode="FR"
                svg
                style={{
                  width: "20px",
                  height: "20px",
                }}
                aria-label="France"
              />
            </Timeline.Indicator>
          </Timeline.Connector>
          <Timeline.Content>
            <Timeline.Title>France</Timeline.Title>
            <Timeline.Description>13th May 2024</Timeline.Description>
            <Button size="xs" variant="outline" rounded="md" width="fit-content" mt="3">
              View Trip
            </Button>
          </Timeline.Content>
        </Timeline.Item>

        <Box mt="1" mb="3">
          <Text color="fg.muted" fontSize="0.8rem" textAlign="right">
            Past Trips
          </Text>
          <Separator my="1" />
          <Text color="fg.muted" fontSize="0.8rem" textAlign="right">
            Future Trips
          </Text>
        </Box>

        <Timeline.Item>
          <Timeline.Connector>
            <Timeline.Separator />
            <Timeline.Indicator bg="cyan.solid" color="cyan.contrast">
              <AirplaneTilt />
            </Timeline.Indicator>
          </Timeline.Connector>
          <Timeline.Content>
            <Timeline.Title textStyle="lg">South America</Timeline.Title>
            <Timeline.Description>8th July 2025</Timeline.Description>
            <Card.Root size="sm" mt="1" rounded="2xl">
              <Card.Body textStyle="md" lineHeight="tall">
                <Flex direction="column">
                  <Text fontSize="sm" color="fg.muted">
                    Countries
                  </Text>
                  <Flex gap="3" alignItems="center">
                    <Flex alignItems="center" gap="2">
                      <ReactCountryFlag
                        countryCode="BR"
                        svg
                        style={{
                          width: "16px",
                          height: "16px",
                        }}
                        aria-label="Brazil"
                      />
                      <Text>Brazil</Text>
                    </Flex>
                    <Separator orientation="vertical" height="4" />
                    <Flex alignItems="center" gap="2">
                      <ReactCountryFlag
                        countryCode="CO"
                        svg
                        style={{
                          width: "16px",
                          height: "16px",
                        }}
                        aria-label="Colombia"
                      />
                      <Text>Colombia</Text>
                    </Flex>
                    <Separator orientation="vertical" height="4" />
                    <Flex alignItems="center" gap="2">
                      <ReactCountryFlag
                        countryCode="AR"
                        svg
                        style={{
                          width: "16px",
                          height: "16px",
                        }}
                        aria-label="Argentina"
                      />
                      <Text>Argentina</Text>
                    </Flex>
                    <Separator orientation="vertical" height="4" />
                    <Flex alignItems="center" gap="2">
                      <ReactCountryFlag
                        countryCode="PE"
                        svg
                        style={{
                          width: "16px",
                          height: "16px",
                        }}
                        aria-label="Peru"
                      />
                      <Text>Peru</Text>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex direction="column">
                  <Text fontSize="sm" color="fg.muted">
                    Cities
                  </Text>
                  <Flex gap="3" alignItems="center">
                    <Text>Rio</Text>
                    <Separator orientation="vertical" height="4" />
                    <Text>Bogota</Text>
                    <Separator orientation="vertical" height="4" />
                    <Text>Buenos Aires</Text>
                    <Separator orientation="vertical" height="4" />
                    <Text>Cusco</Text>
                    <Separator orientation="vertical" height="4" />
                    <Text>Lima</Text>
                  </Flex>
                </Flex>
              </Card.Body>
              <Card.Footer>
                <Button size="xs" variant="surface" rounded="md" width="fit-content" mt="4">
                  View Trip
                </Button>
              </Card.Footer>
            </Card.Root>
          </Timeline.Content>
        </Timeline.Item>

        <Timeline.Item>
          <Timeline.Connector>
            <Timeline.Separator />
            <Timeline.Indicator bg="transparent">
              <ReactCountryFlag
                countryCode="ES"
                svg
                style={{
                  width: "20px",
                  height: "20px",
                }}
                aria-label="Spain"
              />
            </Timeline.Indicator>
          </Timeline.Connector>
          <Timeline.Content>
            <Timeline.Title textStyle="lg">Spain</Timeline.Title>
            <Timeline.Description>18th December 2025</Timeline.Description>
            <Card.Root size="sm" mt="1" rounded="2xl">
              <Card.Body textStyle="md" lineHeight="tall">
                <Flex direction="column">
                  <Text fontSize="sm" color="fg.muted">
                    Cities
                  </Text>
                  <Flex gap="3" alignItems="center">
                    <Text>Madrid</Text>
                    <Separator orientation="vertical" height="4" />
                    <Text>Valencia</Text>
                    <Separator orientation="vertical" height="4" />
                    <Text>Barcelona</Text>
                    <Separator orientation="vertical" height="4" />
                    <Text>Gerona</Text>
                  </Flex>
                </Flex>
              </Card.Body>
              <Card.Footer>
                <Button size="xs" variant="surface" rounded="md" width="fit-content" mt="3">
                  View Trip
                </Button>
              </Card.Footer>
            </Card.Root>
          </Timeline.Content>
        </Timeline.Item>
      </Timeline.Root>
    </Flex>
  );
}
