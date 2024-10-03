import { Flex, Text, Avatar, Stack } from "@mantine/core";
import { useEffect, useState } from "react";

interface User {
  name: string;
  avatar: string;
}

export default function Footer() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch('https://api.github.com/users/DDR23')
      .then(res => res.json())
      .then(data => setUser({
        name: data.name,
        avatar: data.avatar_url,
      }));
  }, []);

  return (
    <Flex align="center" justify="center" gap="xs" m='lg'>
      {user && (
        <>
          <Avatar component="a" href="https://github.com/DDR23" target="_blank" src={user.avatar} alt={user.name} />
          <Stack gap={0}>
            <Text ff='monospace' fz='12px'>Desenvolvido por</Text>
            <Text ff='monospace' fz='12px'>{user.name}</Text>
          </Stack>
        </>
      )}
    </Flex>
  );
}
