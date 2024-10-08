import { Button, Group, Image, Stack, Text } from "@mantine/core";
import { AiOutlineSafety } from "react-icons/ai";
import { useAuth } from "../../../contexts/AuthContext";
import { Window } from "../../../types/web3config";

export default function ModalConnect() {
  const { connectWallet, isLoading } = useAuth();

  return (
    <Stack align="center" gap="xs" w='16rem'>
      <Text>Connect Wallet</Text>
      <Button
        justify="center"
        fullWidth
        px='lg'
        leftSection={<Image src='/metamask.png' alt='metamask' width={26} height={26} />}
        onClick={connectWallet}
        loading={isLoading}
      >
        Metamask
        <Text fz='12' c='green' ml='xs' inline>{(window as Window).ethereum ? 'detected' : ''}</Text>
      </Button>
      <Button disabled justify="center" fullWidth px='lg' leftSection={<Image src='/phantom.png' alt='phantom' width={26} height={26} />}>Phantom - Coming soon</Button>
      <Group gap={4} c='green' mt='xs'>
        <AiOutlineSafety size={16} />
        <Text fz="xs" inline>Secure connection</Text>
      </Group>
    </Stack>
  )
}
