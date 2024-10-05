import { Flex, Group, Image, Text } from "@mantine/core";
import CarouselBets from "../../components/_ui/carouselBets/CarouselBets";

export default function PageBets() {

  return (
    <Flex direction='column' justify='space-between'>
      <CarouselBets />
      <Flex direction='column' justify='center' align='center' gap='0' mt='xs'>
        <Group gap='xs' justify='center'>
          <Image src='/coin.png' alt="logo-smartbet" w={30} />
          <Text fz='h1' ff='heading' inline>SMART BET</Text>
        </Group>
        <Text fz='xs' ff='monospace'>On-chain Betting with Confidence 💵🔥</Text>
      </Flex>
    </Flex>
  );
}
