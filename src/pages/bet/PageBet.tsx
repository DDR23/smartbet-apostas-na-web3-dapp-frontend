import { Flex, Group, Image, Text } from "@mantine/core";
import CarouselBets from "../../components/_ui/carouselBets/CarouselBets";

export default function PageBet() {

  return (
    <Flex direction='column' justify='space-between'>
      <CarouselBets />
      <Flex direction='column' justify='center' align='center' gap='0'>
        <Group gap='xs' justify='center'>
          <Image src='/coin.png' alt="logo-smartbet" w={30} />
          <Text fz='h1' ff='heading' inline>SMART BET</Text>
        </Group>
        <Text fz='xs' ff='monospace'>Apostas on-chain com Confiança 💵🔥</Text>
      </Flex>
    </Flex>
  );
}
