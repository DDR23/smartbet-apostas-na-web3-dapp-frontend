import { ActionIcon, Button, Flex, Group, Image, List, Stack, Text } from "@mantine/core";
import { AiOutlineHome } from "react-icons/ai";
import { RiShareBoxFill } from "react-icons/ri";
import { SiPolygon } from "react-icons/si";

export default function PageAbout() {
  return (
    <Stack w='100vw' gap='0' ta='center' align='center'>
      <Group w='100vw' justify='flex-start' p='xs' px='lg' gap='xs'>
        <ActionIcon component="a" href="/" size='lg' variant="default" c='indigo'>
          <AiOutlineHome />
        </ActionIcon>
        <Button size='compact-lg' component="a" href="/bets" variant="default" c='indigo'>Bets</Button>
      </Group>
      <Stack maw='90vw' gap='lg' ta='center' mx='auto'>
        <Text ff='heading' fw={700} fz='h1' c='indigo'>About Our Betting Platform</Text>

        <List ta='left' type="ordered" pr='xs'>
          <Text fz='h2' fw={700} c='indigo' inline>Betting Rules</Text>
          <List.Item pl='xs'><Text fz='sm'>The minimum age to bet is 18 years old.</Text></List.Item>
          <List.Item pl='xs'><Text fz='sm'>All bets are final and cannot be canceled after confirmation.</Text></List.Item>
          <List.Item pl='xs'><Text fz='sm'>Only a single bet is allowed per wallet.</Text></List.Item>
          <List.Item pl='xs'><Text fz='sm'>Bets must be placed within the stipulated deadline for each event.</Text></List.Item>
          <List.Item pl='xs'><Text fz='sm'>Winnings need to be claimed by the user after the result is announced.</Text></List.Item>
        </List>

        <List ta='left' type="ordered" pr='xs'>
          <Text fz='h2' fw={700} c='indigo' inline>Use of Blockchain</Text>
          <Text fz='h4'>Our platform uses blockchain technology to ensure:</Text>
          <List.Item pl='xs'><Text fz='sm'>Transparency in transactions and results.</Text></List.Item>
          <List.Item pl='xs'><Text fz='sm'>Security and immutability of betting records.</Text></List.Item>
          <List.Item pl='xs'><Text fz='sm'>Fast payments without intermediaries.</Text></List.Item>
          <List.Item pl='xs'><Text fz='sm'>Verifiability of odds and results.</Text></List.Item>
        </List>

        <List ta='left' type="ordered" pr='xs'>
          <Text fz='h2' fw={700} c='indigo' inline>Contracts Used</Text>
          <Text fz='h4'>Our platform uses two main smart contracts:</Text>
          <List.Item pl='xs'><Text component="a" href="#" target="_blank" fz='sm'>American Election Contract <RiShareBoxFill size={16} /></Text></List.Item>
          <List.Item pl='xs'><Text component="a" href="#" target="_blank" fz='sm'>São Paulo Election Contract <RiShareBoxFill size={16} /></Text></List.Item>
        </List>

        <Stack gap='xs'>
          <Flex gap='md' justify='center' align='center' c='dimmed'>
            <SiPolygon size={20} />
            <Text fz='sm'>Polygon Amoy Testnet</Text>
          </Flex>
          <Text fz='sm' inline>Both contracts are implemented on the Polygon test network (Amoy Testnet), ensuring low transaction fees and high processing speed.</Text>
          <Text fz='sm' inline>All our contracts are open-source and can be audited to ensure transparency and security.</Text>
        </Stack>

        <Flex direction='column' justify='center' align='center' gap='0' mt='xs'>
          <Group gap='xs' justify='center'>
            <Image src='/coin.png' alt="logo-smartbet" w={30} />
            <Text fz='h1' ff='heading' inline>SMART BET</Text>
          </Group>
          <Text fz='xs' ff='monospace'>On-chain Betting with Confidence 💵🔥</Text>
        </Flex>
      </Stack>
    </Stack>
  )
}

