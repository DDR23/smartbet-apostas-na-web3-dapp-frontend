import { Flex, Group, Image, Text, UnstyledButton } from "@mantine/core";
import CarouselBets from "../../components/_ui/carouselBets/CarouselBets";

export default function PageBet() {

  return (
    <Flex direction='column' justify='center'>
      <CarouselBets />
      <Flex direction='column' flex={1} justify='center' align='center' m='auto' maw='92vw'>
        <Group mb='xs' justify="center" gap={1}>
          <UnstyledButton component="a" href="#" fz='xs' px='8' c='indigo'>Regras</UnstyledButton> {/* TODO - deve redirecionar para uma pagina de sobre /about*/}
          <UnstyledButton fz='xs' px='8' c='dimmed' style={{cursor: 'default'}}>Termos e Condições</UnstyledButton>
          <UnstyledButton fz='xs' px='8' c='dimmed' style={{cursor: 'default'}}>FAQ</UnstyledButton>
          <UnstyledButton component="a" href="#" fz='xs' px='8' c='indigo'>Contate-nos</UnstyledButton> {/* TODO - adicionar meu wpp*/}
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
