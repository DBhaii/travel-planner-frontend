// src/pages/TransportPage.jsx
import { Box, Heading, Text, VStack, SimpleGrid, Card, CardHeader, CardBody } from '@chakra-ui/react';
// CORRECTED: Replaced Taxi with Car
import { TramFront, Car, Bus } from 'lucide-react';

const transportData = [
  {
    type: 'Metro / Subway',
    icon: <TramFront size={24} />,
    description: 'Often the fastest and most cost-effective way to navigate large cities. Look for multi-day tourist passes for the best value.',
  },
  {
    type: 'Ride-Sharing / Taxis',
    // CORRECTED: Replaced Taxi with Car
    icon: <Car size={24} />,
    description: 'Convenient but can be expensive. Apps like Uber, Lyft, or local equivalents (e.g., Grab in SE Asia) are typically cheaper than hailing a cab.',
  },
  {
    type: 'Public Buses',
    icon: <Bus size={24} />,
    description: 'Excellent for reaching areas not covered by the metro. Can be confusing for first-time visitors. Use apps like Google Maps for live routes.',
  },
];

export default function TransportPage() {
  return (
    <Box className="max-w-4xl mx-auto py-12 px-6">
      <VStack spacing={8} align="start">
        <Heading as="h1" size="2xl">Local Transport Guide</Heading>
        <Text color="gray.600" fontSize="lg">
          Understanding local transport can save you time and money. Here’s a breakdown of common options you'll find in major cities.
        </Text>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} width="100%">
          {transportData.map((item) => (
            <Card key={item.type} borderWidth="1px" borderRadius="lg" boxShadow="md">
              <CardHeader>
                <VStack>
                  {item.icon}
                  <Heading size='md'>{item.type}</Heading>
                </VStack>
              </CardHeader>
              <CardBody>
                <Text>{item.description}</Text>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
}