import { Carousel } from "@mantine/carousel";
import { useRef, useEffect, useState } from "react";
import Autoplay from 'embla-carousel-autoplay';
import { BackgroundImage, Button, Flex, Modal, Paper, Stack, Text } from "@mantine/core";
import ProviderDevice from "../../../utils/ProviderDevice";
import './index.css'
import GetAllDisputes from "../../../services/GetAllDisputes";
import { DisputesDetails } from "../../../types/DisputesDetails";
import { useAuth } from "../../../contexts/AuthContext";
import { HiOutlineWallet } from "react-icons/hi2";
import ModalConnect from "../modals/ModalConnect";
import { useDisclosure } from "@mantine/hooks";

const bets = [
  {
    BET_ID: '0001',
    BET_TITLE: 'American Election',
    BET_WALLPAPER: 'eleicao-americana.png',
    BET_OPTION_1: 'Donald Trump',
    BET_OPTION_2: 'Kamala Harris',
    BET_TOTAL_PRIZE: '$ 36,129.39'
  },
  {
    BET_ID: '0002',
    BET_TITLE: 'São Paulo Election',
    BET_WALLPAPER: 'eleicao-americana.png',
    BET_OPTION_1: 'Pablo Marçal',
    BET_OPTION_2: 'Guilherme Boulos',
    BET_TOTAL_PRIZE: '$ 578,430.91'
  }
]

export default function CarouselBets() {
  const { isDesktop } = ProviderDevice();
  const { walletAddress } = useAuth();
  const autoplay = useRef(Autoplay({ delay: 3000 }));
  const [disputes, setDisputes] = useState<DisputesDetails[]>([]);
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    getDisputes();
  }, []);

  useEffect(() => {
    if (walletAddress) {
      close();
    }
  }, [walletAddress]);

  const getDisputes = async () => {
    try {
      const disputes = await GetAllDisputes();
      if (disputes) {
        setDisputes(disputes);
      }
    } catch (error) {
      console.error('Error getting disputes:', error);
    }
  }

  console.log(disputes);
  // TODO - adicionar get em disputa por id

  useEffect(() => {
    const autoplayInstance = autoplay.current;
    return () => {
      autoplayInstance.stop();
    };
  }, []);


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

  const slides = bets.map((row) => (
    <Carousel.Slide key={row.BET_ID}>
      <BackgroundImage src={row.BET_WALLPAPER} w='100vw' h='57vh' style={{ objectFit: 'contain', backgroundPosition: 'center' }}>
        <Flex direction='column' maw='90vw' ta='center' mx='auto' py='2.5rem' align='center' justify='flex-end' h='100%'>
          <Paper p='lg' bg='#23232350' style={{ backdropFilter: `blur(2px)` }}>
            <Stack px='md' c='white'>
              <Flex direction='column'>
                <Text fw={700} fz={isDesktop ? 'h1' : 'h2'} mb='sm' inline>{row.BET_TITLE.toLocaleUpperCase()}</Text>
                <Text fz='lg' inline>🔥</Text>
                <Text fz='xs'>Total accumulated</Text>
                <Text fw={700} fz='md' inline>{row.BET_TOTAL_PRIZE}</Text>
              </Flex>
              <Flex justify="center" direction={isDesktop ? 'row' : 'column'}>
                <Text fw={700} fz='h3' inline>{row.BET_OPTION_1}</Text>
                <Text mx='md' inline>vs</Text>
                <Text fw={700} fz='h3' inline>{row.BET_OPTION_2}</Text>
              </Flex>
              {walletAddress ? (
                <Button component="a" href={`/bet/${row.BET_ID}`} fullWidth bg='green'>Bet now</Button>
              ) : (
                <Button px={isDesktop ? 'xs' : '8'} onClick={open}>
                  <HiOutlineWallet size={22} />
                  <Text visibleFrom="xs" pl='8'>Connect wallet</Text>
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
      {modalConnect()}
    </>
  );
}
