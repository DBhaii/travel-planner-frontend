// src/pages/VisaPage.jsx
import { Box, Heading, Text, Link, VStack, Alert, AlertIcon } from '@chakra-ui/react';
import { ExternalLink } from 'lucide-react';

export default function VisaPage() {
  return (
    <Box className="max-w-4xl mx-auto py-12 px-6">
      <VStack spacing={8} align="start">
        <Heading as="h1" size="2xl">Visa & Entry Guidance</Heading>
        <Text color="gray.600" fontSize="lg">
          Navigating visa requirements is a critical part of international travel. While this tool provides general guidance, it is essential to verify information with official embassy or consulate websites.
        </Text>

        <Alert status="warning" borderRadius="md">
          <AlertIcon />
          This information is for guidance only and is not legal advice. Always check the official government source for your destination country.
        </Alert>

        <Box>
          <Heading as="h2" size="lg" mb={4}>How It Works</Heading>
          <Text mb={4}>
            Our goal is to provide a quick estimate of visa requirements. In a future version, you would select your nationality and destination to see the likely visa needed (e.g., Visa-Free, E-Visa, Visa on Arrival, Consular Visa).
          </Text>
          <Link href="https://www.passportindex.org/" isExternal color="indigo.600" fontWeight="bold">
            Check a resource like Passport Index <ExternalLink size={16} className="inline-block ml-1" />
          </Link>
        </Box>

         <Box>
          <Heading as="h2" size="lg" mb={4}>Example: Schengen Area (Europe)</Heading>
          <Text>
            Many countries are part of the Schengen Agreement, allowing for short-term travel across member states with a single visa. For example, a tourist visa for Spain typically allows you to visit France, Germany, Italy, and others for up to 90 days within a 180-day period.
          </Text>
        </Box>
      </VStack>
    </Box>
  );
}