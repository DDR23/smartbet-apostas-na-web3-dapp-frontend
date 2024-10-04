import { Button, Group, Image, Text, UnstyledButton } from "@mantine/core";
import ProviderDevice from "../../../utils/ProviderDevice";
import { IconWallet } from "@tabler/icons-react";

export default function Header() {
  const { isDesktop } = ProviderDevice();

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
        <Button px={isDesktop ? 'xs' : '8'}>
          <IconWallet size={22} />
          <Text visibleFrom="xs" pl='8'>Conectar Wallet</Text>
        </Button>
      </Group>
    </Group>
  );
}
