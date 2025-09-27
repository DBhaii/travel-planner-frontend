// src/pages/DosAndDontsPage.jsx
import { Box, Heading, Text, VStack, List, ListItem, ListIcon } from '@chakra-ui/react';
import { CheckCircle2, XCircle } from 'lucide-react';

const dos = [
  'Learn a few basic phrases in the local language (like "Hello", "Please", "Thank you").',
  'Try the local cuisine, including street food from reputable vendors.',
  'Keep a copy of your important documents (passport, visa) separate from the originals.',
  'Be aware of your surroundings, especially in crowded tourist areas.',
];

const donts = [
  'Assume everyone speaks English. A little effort goes a long way.',
  'Display expensive items like jewelry or large amounts of cash in public.',
  'Forget to research local customs and etiquette regarding dress code and behavior.',
  'Rely solely on credit cards; always carry some local currency for small purchases.',
];

export default function DosAndDontsPage() {
  return (
    <Box className="max-w-4xl mx-auto py-12 px-6">
      <VStack spacing={8} align="start">
        <Heading as="h1" size="2xl">Travel Do's & Don'ts</Heading>
        <Text color="gray.600" fontSize="lg">
          Following local customs and practicing common-sense safety will make your trip smoother and more enjoyable. Here are some general tips.
        </Text>

        <Box width="100%">
          <Heading as="h2" size="lg" mb={4} color="green.600">Do</Heading>
          <List spacing={3}>
            {dos.map((item, index) => (
              <ListItem key={index}>
                <ListIcon as={CheckCircle2} color='green.500' />
                {item}
              </ListItem>
            ))}
          </List>
        </Box>

        <Box width="100%">
          <Heading as="h2" size="lg" mb={4} color="red.600">Don't</Heading>
          <List spacing={3}>
            {donts.map((item, index) => (
              <ListItem key={index}>
                <ListIcon as={XCircle} color='red.500' />
                {item}
              </ListItem>
            ))}
          </List>
        </Box>
      </VStack>
    </Box>
  );
}