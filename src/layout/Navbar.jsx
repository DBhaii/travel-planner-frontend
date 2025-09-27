// src/layout/Navbar.jsx
import { Box, Flex, Heading, Link as ChakraLink } from '@chakra-ui/react';
import { Plane } from 'lucide-react';
// Import the Link component from react-router-dom
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <Box bg="gray.900" px={6} py={4} color="white" className="shadow-md">
      <Flex alignItems="center" justifyContent="space-between" className="max-w-7xl mx-auto">
        <Link to="/">
          <Flex alignItems="center">
            <Plane color="#61dafb" size={32} />
            <Heading as="h1" size="lg" ml={3} _hover={{ color: 'gray.300' }}>
              Trip Planner
            </Heading>
          </Flex>
        </Link>
        <Flex as="nav" gap={4}>
          <ChakraLink as={Link} to="/" _hover={{ textDecoration: 'underline' }}>
            Search
          </ChakraLink>
          <ChakraLink as={Link} to="/transport" _hover={{ textDecoration: 'underline' }}>
            Transport
          </ChakraLink>
          <ChakraLink as={Link} to="/visa" _hover={{ textDecoration: 'underline' }}>
            Visa
          </ChakraLink>
          <ChakraLink as={Link} to="/dos-and-donts" _hover={{ textDecoration: 'underline' }}>
            Do's & Don'ts
          </ChakraLink>
        </Flex>
      </Flex>
    </Box>
  );
}