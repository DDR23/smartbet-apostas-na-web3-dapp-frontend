import { Button, Flex, Group, Image, Stack, Text } from "@mantine/core";
import ProviderDevice from "../../utils/ProviderDevice";
import './index.css'

const coins = [
  '/coin_01.png',
  '/coin_02.png',
  '/coin_03.png',
  '/coin_04.png',
  '/coin_05.png',
  '/coin_06.png',
  '/coin_07.png',
  '/coin_08.png',
  '/coin_09.png',
  '/coin_02.png'
]

export default function PageHome() {
  const { isDesktop } = ProviderDevice();

  const animationCoins = coins.map((image) => (
    <li key={image}>
      <Image src={image} />
    </li>
  ))

  return (
    <Stack justify='center' ml={isDesktop ? '10vw' : '0'}>
      <ul className="circles">
        {animationCoins}
      </ul>
      <Flex flex={1} gap='xl' justify={isDesktop ? 'start' : 'center'} h='max-content' direction={isDesktop ? 'row' : 'column'}>
        <Group justify="start" align="center">
          <Image src='coin.png' w={isDesktop ? '17vw' : '35vw'} />
        </Group>
        <Stack justify="center" gap="0">
          <Group h='max-content'>
            <Text inline ff='heading' fz={isDesktop ? '6vw' : '10vw'} fw={700} c='indigo'>SMART BET</Text>
          </Group>
          <Stack mx={isDesktop ? 'lg' : '0'} gap={0} mb='md' mt={isDesktop ? '0' : 'sm'}>
            <Text fz={isDesktop ? '1.5vw' : 'md'} fw='bold' c='indigo'>Apostas on-chain com Confiança 💵🔥</Text>
            <Text fz={isDesktop ? '1.2vw' : 'sm'} w={isDesktop ? '30vw' : '80vw'}>
              Faça suas apostas com segurança e transparência. <Text span c="indigo" inherit fw='500'>Revolucione sua experiência de apostas</Text> na blockchain.</Text>
            <Button variant="filled" component="a" href="/bets" mt='lg' w={isDesktop ? 'max-content' : 'auto'} px='5vw' size="md">Ir para o painel de apostas</Button>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
}
