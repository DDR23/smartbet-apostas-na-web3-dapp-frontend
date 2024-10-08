import { Button, Group, Image, Stack, Text } from "@mantine/core";
import { AiOutlineSafety } from "react-icons/ai";
import metamaskConnection from "../../../services/metamaskConnection";
import { useState } from "react";

export default function ModalConnect() {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleMetamaskConnection = async () => {
    setIsConnecting(true);
    try {
      const web3 = await metamaskConnection();
      if (web3) {
        console.log("Conectado com sucesso!");
        // Aqui você pode adicionar lógica adicional após a conexão bem-sucedida
      }
    } catch (error) {
      console.error("Erro ao conectar:", error);
      // Aqui você pode adicionar lógica para exibir uma mensagem de erro para o usuário
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Stack align="center" gap="xs" w='16rem'>
      <Text>Connect Wallet</Text>
      <Button 
        justify="center" 
        fullWidth 
        px='lg' 
        leftSection={<Image src='/metamask.png' alt='metamask' width={26} height={26} />}
        onClick={handleMetamaskConnection}
        loading={isConnecting}
      >
        Metamask
      </Button>
      <Button disabled justify="center" fullWidth px='lg' leftSection={<Image src='/phantom.png' alt='phantom' width={26} height={26} />}>Phantom - Coming soon</Button>
      <Group gap={4} c='green' mt='xs'>
        <AiOutlineSafety size={16} />
        <Text fz="xs" inline>Secure connection</Text>
      </Group>
    </Stack>
  )
}
