import { Box, Button, Card, Flex, Heading, Input, Stack, Text, Textarea } from "@chakra-ui/react";
import { EnvelopeSimple, Globe, MapPin } from "phosphor-react";

export default function Contact() {
  return (
    <Flex direction="column" maxW="6xl" mx="auto" p="8" gap="12">
      {/* Header */}
      <Box textAlign="center">
        <Heading size="2xl" mb="4">
          Get in Touch
        </Heading>
        <Text color="gray.500" fontSize="lg">
          Have a question or suggestion? We'd love to hear from you.
        </Text>
      </Box>

      <Flex gap="8" direction={{ base: "column", lg: "row" }}>
        {/* Contact Form */}
        <Card.Root flex="1" rounded="2xl">
          <Card.Body as="form" p="8">
            <Stack gap="6">
              <Box>
                <Text mb="2">Name</Text>
                <Input type="text" placeholder="Your name" size="lg" rounded="xl" />
              </Box>

              <Box>
                <Text mb="2">Email</Text>
                <Input type="email" placeholder="your@email.com" size="lg" rounded="xl" />
              </Box>

              <Box>
                <Text mb="2">Message</Text>
                <Textarea placeholder="How can we help?" size="lg" rounded="xl" minHeight="200px" />
              </Box>

              <Button size="lg" colorScheme="cyan" rounded="xl">
                Send Message
              </Button>
            </Stack>
          </Card.Body>
        </Card.Root>

        {/* Contact Info */}
        <Flex direction="column" gap="6" flex="1">
          <Card.Root rounded="2xl">
            <Card.Body p="8">
              <Flex gap="4" alignItems="center">
                <Box p="4" rounded="full" bg="cyan.500" color="white">
                  <EnvelopeSimple size={24} />
                </Box>
                <Box>
                  <Text color="gray.500">Email</Text>
                  <Text fontSize="lg">support@worldly.com</Text>
                </Box>
              </Flex>
            </Card.Body>
          </Card.Root>

          <Card.Root rounded="2xl">
            <Card.Body p="8">
              <Flex gap="4" alignItems="center">
                <Box p="4" rounded="full" bg="cyan.500" color="white">
                  <Globe size={24} />
                </Box>
                <Box>
                  <Text color="gray.500">Website</Text>
                  <Text fontSize="lg">worldly.com</Text>
                </Box>
              </Flex>
            </Card.Body>
          </Card.Root>

          <Card.Root rounded="2xl">
            <Card.Body p="8">
              <Flex gap="4" alignItems="center">
                <Box p="4" rounded="full" bg="cyan.500" color="white">
                  <MapPin size={24} />
                </Box>
                <Box>
                  <Text color="gray.500">Location</Text>
                  <Text fontSize="lg">Perth, Australia</Text>
                </Box>
              </Flex>
            </Card.Body>
          </Card.Root>
        </Flex>
      </Flex>
    </Flex>
  );
}
