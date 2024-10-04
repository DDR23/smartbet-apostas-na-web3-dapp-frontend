import { Button, Group, Image, Stack, Text } from "@mantine/core";
import { AiOutlineSafety } from "react-icons/ai";
export default function ModalConnect() {

  return (
    <Stack align="center" gap="xs" w='14rem'>
      <Text>Conectar Wallet</Text>
      <Button justify="center" fullWidth px='lg' leftSection={<Image src='/metamask.png' alt='metamask' width={26} height={26} />}>Metamask</Button>
      <Button disabled justify="center" fullWidth px='lg' leftSection={<Image src='/phantom.png' alt='phantom' width={26} height={26} />}>Phantom</Button>
      <Group gap={4} c='green' mt='xs'>
        <AiOutlineSafety size={16} />
        <Text fz="xs" inline>Conexao segura</Text>
      </Group>
    </Stack>
  )
}
