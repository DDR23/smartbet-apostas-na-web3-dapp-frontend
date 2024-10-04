import { Button, Flex, Group, Image, Text } from "@mantine/core";
import CarouselBets from "../../components/_ui/carouselBets/CarouselBets";

export default function PageBet() {

  return (
    <Flex direction='column' justify='center'>
      <CarouselBets />
      <Flex direction='column' flex={1} justify='center' align='center' m='auto' maw='92vw'>
        <Group mb='xs' justify="center" gap={1}>
          <Button fz='xs' px='xs' variant="subtle">Regras</Button>
          <Button fz='xs' px='xs' variant="subtle">Termos e Condições</Button>
          <Button fz='xs' px='xs' variant="subtle">FAQ</Button>
          <Button fz='xs' px='xs' variant="subtle">Contate-nos</Button>
        </Group>
        <Group gap='xs'>
          <Image src='/coin.png' w={30} />
          <Text fz='h1' ff='heading' inline>SMART BET</Text>
        </Group>
        <Text fz='xs' ff='monospace'>Apostas on-chain com Confiança 💵🔥</Text>
        <Text fz='10px' ff='monospace'>© 2024–2024 Smart Bet. Todos direitos reservados</Text>
      </Flex>
    </Flex>
  );
}
