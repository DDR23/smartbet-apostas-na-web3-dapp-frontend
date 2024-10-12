import { Carousel } from "@mantine/carousel";
import { useRef, useEffect, useState } from "react";
import Autoplay from 'embla-carousel-autoplay';
import { BackgroundImage, Button, Center, Flex, Modal, Paper, Stack, Text, Loader, Badge } from "@mantine/core";
import ProviderDevice from "../../../utils/ProviderDevice";
import './index.css'
import GetAllDisputes from "../../../services/GetAllDisputes";
import { DisputesDetails } from "../../../types/DisputesDetails";
import { useAuth } from "../../../contexts/AuthContext";
import { HiOutlineWallet } from "react-icons/hi2";
import ModalConnect from "../modals/ModalConnect";
import { useDisclosure } from "@mantine/hooks";
import GetDisputeById from "../../../services/GetDisputeById";
import { formatPOL } from "../../../utils/FormatPol";
import ProviderNotification from "../../../utils/ProviderNotification";

export default function CarouselBets() {
  const { isDesktop } = ProviderDevice();
  const { walletAddress, isOwner } = useAuth();
  const autoplay = useRef(Autoplay({ delay: 3000 }));
  const [detailedDisputes, setDetailedDisputes] = useState<DisputesDetails[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState(true);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    getDisputes(true);

    const id = setInterval(() => {
      getDisputes(false);
    }, 1000);
    setIntervalId(id);
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  useEffect(() => {
    if (walletAddress) {
      close();
    }
  }, [walletAddress]);

  const getDisputes = async (showLoading: boolean) => {
    if (showLoading) {
      setIsLoading(true);
    }
    try {
      const disputes = await GetAllDisputes();
      if (disputes) {
        const detailedDisputesPromises = disputes.map((index) =>
          GetDisputeById(index.toString())
        );
        const resolvedDetailedDisputes = await Promise.all(detailedDisputesPromises);
        setDetailedDisputes(
          resolvedDetailedDisputes.filter((dispute): dispute is DisputesDetails => dispute !== null && typeof dispute.disputeStatus === 'boolean' && dispute.disputeStatus)
        );
      }
    } catch (error) {
      ProviderNotification({ title: 'Error', message: 'Failed to load disputes' });
    } finally {
      if (showLoading) {
        setIsLoading(false);
      }
    }
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
    );
  }

  const slides = detailedDisputes.map((row, index) => (
    <Carousel.Slide key={index}>
      <BackgroundImage src={row.disputeWallpaper} w='100vw' h='57vh' style={{ objectFit: 'contain', backgroundPosition: 'center' }}>
        <Flex direction='column' maw='90vw' ta='center' mx='auto' py='2.5rem' align='center' justify='flex-end' h='100%'>
          <Paper p='lg' bg='#23232350' style={{ backdropFilter: `blur(2px)` }}>
            <Stack px='md' c='white'>
              <Flex direction='column' align='center'>
                <Badge mb='xs' variant="outline" color={Number(!row.disputeWinner) ? 'green' : 'red.7'}>{Number(!row.disputeWinner) ? 'running' : 'finished'}</Badge>
                <Text fw={700} fz={isDesktop ? 'h1' : 'h2'} mb='sm' inline>{row.disputeName.toLocaleUpperCase()}</Text>
                <Text fz='lg' inline>🔥</Text>
                <Text fz='xs'>Total accumulated</Text>
                <Text fw={700} fz='md' inline>{row.disputeNetPrize ? formatPOL(Number(row.disputeNetPrize)) : '0 POL'}</Text>
              </Flex>
              <Flex justify="center" direction={isDesktop ? 'row' : 'column'}>
                <Text fw={700} fz='h3' inline>{row.disputeCandidate1}</Text>
                <Text mx='md' inline>vs</Text>
                <Text fw={700} fz='h3' inline>{row.disputeCandidate2}</Text>
              </Flex>
              {walletAddress ? (
                <>
                  {isOwner ? (
                    <Button component="a" href={`/bet/${index + 1}`} color={Number(row.disputeWinner) === 0 ? 'green' : 'red'} fullWidth>Bet details</Button>
                  ) : (
                    <Button component="a" href={`/bet/${index + 1}`} color={Number(row.disputeWinner) === 0 ? 'green' : 'red'} fullWidth>{Number(row.disputeWinner) === 0 ? 'Bet now' : 'More details'}</Button>
                  )}
                </>
              ) : (
                <Button px={isDesktop ? 'xs' : '8'} onClick={open}>
                  <HiOutlineWallet size={22} />
                  <Text pl='8'>Connect wallet</Text>
                </Button>
              )}
            </Stack>
          </Paper>
        </Flex>
      </BackgroundImage>
    </Carousel.Slide>
  ));

  return (
    <>
      {isLoading ? (
        <Center bg='dimmed' w='100vw' h='57vh'>
          <Loader size="md" />
        </Center>
      ) : detailedDisputes.length > 0 ? (
        <Carousel
          w='100vw'
          h='57vh'
          loop
          withControls={false}
          withIndicators
          plugins={[autoplay.current]}
          onMouseEnter={() => autoplay.current.stop()}
          onMouseLeave={() => autoplay.current.play()}
          onPointerDown={() => autoplay.current.stop()}
          classNames={{ indicator: 'indicator' }}
        >
          {slides}
        </Carousel>
      ) : !(window as any).ethereum ? (
        <Center bg='dimmed' w='100vw' h='57vh'>
          <Text fz='h1'>Install Metamask first</Text>
        </Center>
      ) : (
        <Center bg='dimmed' w='100vw' h='57vh' ta='center' p='lg'>
          <Text fz='h1'>No disputes available at the moment</Text>
        </Center>
      )}
      {modalConnect()}
    </>
  );
}
