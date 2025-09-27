// src/components/Login.jsx
import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
} from '@chakra-ui/react';

export default function Login({ onLogin, onSwitchToRegister, error }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <Box width="350px" p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
      <VStack spacing={4}>
        <Heading>Login</Heading>
        {error && <Text color="red.500">{error}</Text>}
        
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </FormControl>
            <Button type="submit" colorScheme="teal" width="full">
              Login
            </Button>
          </VStack>
        </form>
        
        <Button onClick={onSwitchToRegister} variant="link" colorScheme="teal">
          Don't have an account? Register
        </Button>
      </VStack>
    </Box>
  );
}