import { Flex, Text, Avatar, Stack, Group } from "@mantine/core";
import { useEffect, useState } from "react";
import { HiMiniComputerDesktop, HiMiniDevicePhoneMobile, HiMiniDeviceTablet } from "react-icons/hi2";

interface User {
  login: string;
  avatar: string;
}

export default function Footer() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch('https://api.github.com/users/DDR23')
      .then(res => res.json())
      .then(data => setUser({
        login: data.login,
        avatar: data.avatar_url,
      }));
  }, []);

  return (
    <Flex direction='column' align="center" justify="center" gap="xs" m='lg' mt='xs'>
      <Flex direction='column' align='center' mx='auto' maw='92vw' ta='center'>
        <Text ff='monospace' fz='12px' ta='center' c='dimmed' inline>Disponivel em: <HiMiniComputerDesktop size={16} /> <HiMiniDeviceTablet size={16} /> <HiMiniDevicePhoneMobile size={16} /></Text>
        <Group my='xs' justify="center" gap={1}>
          <Text component="a" href="/about" fz='xs' px='8' c='indigo'>Regras</Text>
          <Text fz='xs' px='8' c='dimmed' style={{ cursor: 'default' }}>Termos e Condições</Text>
          <Text fz='xs' px='8' c='dimmed' style={{ cursor: 'default' }}>FAQ</Text>
          <Text component="a" href="https://wa.me/5581981708405" target='_blank' fz='xs' px='8' c='indigo'>Contate-nos</Text>
        </Group>
        <Text fz='10px' ff='monospace'>© 2024–2024 Smart Bet. Todos direitos reservados</Text>
      </Flex>
      {user && (
        <Group justify="center">
          <Avatar component="a" href="https://github.com/DDR23" target="_blank" src={user.avatar} alt={user.login} />
          <Stack gap={0} >
            <Text ff='monospace' fz='12px'>powered by {user.login}</Text>
            <Text fz='10px' c='dimmed' component="a" href="https://polygonscan.com/address/0x1F8D637B3d3fa444882A89d20445E202eD5AA319" target="_blank" ff='monospace'>Donations: 0x1F8D...A319 ❤️</Text>
          </Stack>
        </Group>
      )}
    </Flex>
  );
}
