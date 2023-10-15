import { Link, Outlet } from 'react-router-dom';
import { useColorMode, useColorModeValue } from '@chakra-ui/react';
import { Box, Button, Flex } from '@chakra-ui/react';

export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box bg={useColorModeValue('gray.200', 'gray.600')} px={4}>
        <Flex h={16} alignItems="center" justifyContent="center" gap={10}>
          <Button
            backgroundColor={'transparent'}
            _hover={{ backgroundColor: 'transparent' }}
          >
            <Link to="/">
              <img src="/home.png" alt="home" height={30} width={30} />
            </Link>
          </Button>
          <Button
            onClick={toggleColorMode}
            backgroundColor={'transparent'}
            _hover={{ backgroundColor: 'transparent' }}
          >
            <img
              src={colorMode === 'light' ? '/dark.png' : 'light.png'}
              alt="theme"
              height={30}
              width={30}
            />
          </Button>
          <Button
            backgroundColor={'transparent'}
            _hover={{ backgroundColor: 'transparent' }}
          >
            <Link to="/scores">
              <img src="/score.png" alt="score" height={32} width={32} />
            </Link>
          </Button>
        </Flex>
      </Box>
      <Outlet />
    </>
  );
}
