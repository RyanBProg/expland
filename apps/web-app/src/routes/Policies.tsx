import { Box, Card, Flex, Heading, Link, Text, Stack } from "@chakra-ui/react";

export default function Policies() {
  return (
    <Flex direction="column" maxW="4xl" mx="auto" p="8" gap="12">
      {/* Header */}
      <Box textAlign="center">
        <Heading size="2xl" mb="4">
          Privacy & Policies
        </Heading>
        <Text color="gray.500" fontSize="lg">
          Last updated: {new Date().toLocaleDateString()}
        </Text>
      </Box>

      <Card.Root rounded="2xl">
        <Card.Body p="8">
          <Stack gap="8">
            {/* Privacy Policy */}
            <Section
              title="Privacy Policy"
              content={`At Worldly, we take your privacy seriously. This policy outlines how we collect, use, and protect your personal information when you use our service.

We collect information that you provide directly to us, including your name, email address, and travel preferences. We also automatically collect certain information about your device and how you interact with our platform.`}
            />

            {/* Cookie Policy */}
            <Section
              title="Cookie Policy"
              content={`We use cookies and similar tracking technologies to track the activity on our platform and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier.

You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our platform.`}
            />

            {/* Terms of Service */}
            <Section
              title="Terms of Service"
              content={`By accessing or using Worldly, you agree to be bound by these terms and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform.

We reserve the right to terminate or suspend access to our platform immediately, without prior notice, for any reason whatsoever.`}
            />

            {/* Data Protection */}
            <Section
              title="Data Protection"
              content={`We implement security measures to maintain the safety of your personal information when you enter, submit, or access your personal information.

We offer the use of a secure server. All supplied sensitive information is transmitted via Secure Socket Layer (SSL) technology and then encrypted into our Database to be only accessed by those authorized with special access rights to our systems.`}
            />

            {/* Contact */}
            <Box>
              <Heading size="md" mb="4">
                Questions About Our Policies?
              </Heading>
              <Text color="gray.500">
                If you have any questions about these policies, please{" "}
                <Link href="/contact" color="cyan.500">
                  contact us
                </Link>
                .
              </Text>
            </Box>
          </Stack>
        </Card.Body>
      </Card.Root>
    </Flex>
  );
}

// Helper component for policy sections
function Section({ title, content }: { title: string; content: string }) {
  return (
    <Box>
      <Heading size="md" mb="4">
        {title}
      </Heading>
      <Text color="gray.500" whiteSpace="pre-line">
        {content}
      </Text>
    </Box>
  );
}
