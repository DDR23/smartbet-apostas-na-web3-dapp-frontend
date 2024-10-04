import { Button, Group, Image, Text, UnstyledButton } from "@mantine/core";
import iconMetamask from '../../../../public/iconmetamask.svg'

export default function Header() {
  return (
    <Group w='100vw' px="lg" justify="space-between" bg='background' py='xs' gap={0} style={{ borderBottom: '1px solid #23232320' }}>
      <UnstyledButton component="a" href="/">
        <Group>
          <Image src='coin.png' style={{ width: '2rem' }} />
          <Text ff='heading' fw={700} visibleFrom="xs">SMART BET</Text>
        </Group>
      </UnstyledButton>
      <Group>
        <Text inline>0x14...z12D</Text>
        <Button px='xs'>
          <Image src={iconMetamask} w={32} />
          <Text visibleFrom="xs" pl='5'>Conectar Wallet</Text>
        </Button>
      </Group>
    </Group>
  );
}
