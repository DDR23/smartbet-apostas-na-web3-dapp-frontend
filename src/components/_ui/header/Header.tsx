import { Button, Group, Image, Modal, Text, UnstyledButton } from "@mantine/core";
import ProviderDevice from "../../../utils/ProviderDevice";
import { HiOutlineWallet } from "react-icons/hi2";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import ModalConnect from "../modalConnect/ModalConnect";

export default function Header() {
  const { isDesktop } = ProviderDevice();
  const [opened, { open, close }] = useDisclosure(false);
  const [modalContent, setModalContent] = useState<'connect' | ''>('');

  const handleModalContent = (content: 'connect' | '') => {
    setModalContent(content);
    open();
  }

  const modalConnect = () => {
    return (
      <Modal
        size='auto'
        opened={opened}
        onClose={close}
        withCloseButton={false}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3
        }}>
        <ModalConnect />
      </Modal>
    )
  }

  return (
    <>
      <Group pos='sticky' top='0' w='100%' px="lg" justify="space-between" bg='background' py='xs' gap={0} style={{ borderBottom: '1px solid #23232320' }}>
        <UnstyledButton component="a" href="/">
          <Group>
            <Image src='/coin.png' alt="logo-smartbet" style={{ width: '2rem' }} />
            <Text ff='heading' fw={700} visibleFrom="xs">SMART BET</Text>
          </Group>
        </UnstyledButton>
        <Group>
          <Text inline>0x14...z12D</Text> {/* TODO - adicionar condicional, key so deve aparecer se a carteira estiver conectada */}
          <Button px={isDesktop ? 'xs' : '8'} onClick={() => handleModalContent('connect')}>
            <HiOutlineWallet size={22} />
            <Text visibleFrom="xs" pl='8'>Connect wallet</Text>
          </Button>
        </Group>
      </Group>
      {modalContent === 'connect' && modalConnect()}
    </>
  );
}
