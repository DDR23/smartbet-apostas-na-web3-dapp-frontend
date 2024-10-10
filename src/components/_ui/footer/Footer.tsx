import { Flex, Text, Avatar, Stack, Group, Image } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { HiMiniComputerDesktop, HiMiniDevicePhoneMobile, HiMiniDeviceTablet } from "react-icons/hi2";

interface User {
  login: string;
  avatar: string;
}

export default function Footer() {
  const [user, setUser] = useState<User | null>(null);
  const { hovered, ref } = useHover();

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
        <Text ff='monospace' fz='12px' ta='center' c='dimmed' inline>Available on: <HiMiniComputerDesktop size={16} /> <HiMiniDeviceTablet size={16} /> <HiMiniDevicePhoneMobile size={16} /></Text>
        <Group my='xs' justify="center" gap={1}>
          <Text component="a" href="/about" fz='xs' px='8' c='indigo'>About</Text>
          <Text fz='xs' px='8' c='dimmed' style={{ cursor: 'default' }}>Terms and Conditions</Text>
          <Text fz='xs' px='8' c='dimmed' style={{ cursor: 'default' }}>FAQ</Text>
          <Text component="a" href="https://wa.me/5581981708405" target='_blank' fz='xs' px='8' c='indigo'>Contact Us</Text>
        </Group>
        <Text fz='10px' ff='monospace'>© 2024–2024 SmartBet. All rights reserved</Text>
      </Flex>
      {user && (
        <Group justify="center" gap='xs'>
          <Avatar component="a" href="https://github.com/DDR23" target="_blank" src={user.avatar} alt={user.login} />
          <Stack gap={0} >
            <Group gap='6px'>
              <Text ff='monospace' fz='12px' c='dimmed'>powered by {user.login}</Text>
              <Image src='/br.png' w={16} alt="brazil-flag" />
            </Group>
            <Group ref={ref}>
              <Text fz='10px' c={hovered ? 'indigo' : 'dimmed'} component="a" href="https://polygonscan.com/address/0x1F8D637B3d3fa444882A89d20445E202eD5AA319" target="_blank" ff='monospace'>Donations: 0x1F8D...A319 ❤️</Text>
            </Group>
          </Stack>
        </Group>
      )}
    </Flex>
  );
}
