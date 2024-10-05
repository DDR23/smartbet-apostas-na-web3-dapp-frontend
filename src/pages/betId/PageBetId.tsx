import { ActionIcon, Avatar, Button, Flex, Group, Image, Progress, Stack, Text } from "@mantine/core";
import { AiOutlineArrowLeft } from "react-icons/ai";
import ProviderDevice from "../../utils/ProviderDevice";

export default function PageBetId() {
  const { isDesktop } = ProviderDevice();

  return (
    <Stack w='100vw' gap='0' ta='center' align='center'>
      <Group w='100vw' justify='space-between' p='xs' px='lg'>
        <ActionIcon size='lg' variant="default" c='indigo' onClick={() => window.history.back()}>
          <AiOutlineArrowLeft />
        </ActionIcon>
      </Group>
      <Stack w='90vw' flex={1} align='center' justify='center' p='0' pb='md' gap='xl'>
        <Stack w='max-content' maw='100%' gap='0' align='center'>
          <Flex direction='column' mb='xs'>
            <Text fw={700} fz={isDesktop ? 'h1' : 'h2'} mb='sm' inline>Eleiçoes americanas 2024</Text>
            <Text fz='lg' inline>🔥</Text>
            <Text fz='xs'>Total accumulated</Text>
            <Text fw={700} fz='md' inline>0.0001312300049101 POL</Text>
          </Flex>
          <Progress.Root w='15rem'>
            <Progress.Section value={63} color="blue">
            </Progress.Section>
            <Progress.Section value={37} color="red">
            </Progress.Section>
          </Progress.Root>
        </Stack>
        <Flex gap={isDesktop ? '100px' : 'xl'} w='100%' justify='center'>
          <Stack flex={1} gap='xs' align='center' maw={isDesktop ? '15rem' : '8rem'}>
            <Avatar src='/coin_02.png' size={isDesktop ? '15rem' : '8rem'} radius='xl' />
            <Text fz='sm' fw={700} inline>Guilherme Boulos</Text>
            <Button fullWidth bg='green'>Bet now</Button>
          </Stack>
          <Stack flex={1} gap='xs' align='center' maw={isDesktop ? '15rem' : '8rem'}>
            <Avatar src='/coin_07.png' size={isDesktop ? '15rem' : '8rem'} radius='xl' />
            <Text fz='sm' fw={700} inline>Pablo Marçal</Text>
            <Button fullWidth bg='green'>Bet now</Button>
          </Stack>
        </Flex>
      </Stack>
      <Image src='/coin.png' alt="logo-smartbet" w={30} />
    </Stack >
  );
}
