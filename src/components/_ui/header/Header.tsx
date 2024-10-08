import { ActionIcon, Button, Group, Image, Modal, Text, UnstyledButton } from "@mantine/core";
import ProviderDevice from "../../../utils/ProviderDevice";
import { HiOutlineCog6Tooth, HiOutlineWallet } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useAuth } from "../../../contexts/AuthContext";
import ModalConnect from "../modals/ModalConnect";

export default function Header() {
  const { isDesktop } = ProviderDevice();
  const [opened, { open, close }] = useDisclosure(false);
  const [modalContent, setModalContent] = useState<'connect' | ''>('');
  const { walletAddress, isOwner } = useAuth();

  const handleModalContent = (content: 'connect' | '') => {
    setModalContent(content);
    open();
  }

  useEffect(() => {
    if (walletAddress) {
      setModalContent('');
      close();
    }
  }, [walletAddress]);

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
          {isOwner && (
            <ActionIcon size="lg" component="a" href="/admin">
              <HiOutlineCog6Tooth size={22} />
            </ActionIcon>
          )}
          {walletAddress ? (
            <Group>
              <Text inline>{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</Text>
            </Group>
          ) : (
            <Button px={isDesktop ? 'xs' : '8'} onClick={() => handleModalContent('connect')}>
              <HiOutlineWallet size={22} />
              <Text visibleFrom="xs" pl='8'>Connect wallet</Text>
            </Button>
          )}
        </Group>
      </Group>
      {modalContent === 'connect' && modalConnect()}
    </>
  );
}
