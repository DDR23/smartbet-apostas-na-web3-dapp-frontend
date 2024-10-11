import { useEffect, useState } from "react";
import { DisputesDetails } from "../../types/DisputesDetails";
import GetAllDisputes from "../../services/GetAllDisputes";
import GetDisputeById from "../../services/GetDisputeById";
import ProviderNotification from "../../utils/ProviderNotification";
import { ActionIcon, Badge, Button, Center, Group, Loader, Menu, Modal, Paper, SimpleGrid, Stack, Table, Text } from "@mantine/core";
import { HiDotsHorizontal } from "react-icons/hi";
import { formatPOL } from "../../utils/FormatPol";
import { AiOutlineHome } from "react-icons/ai";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { useDisclosure } from "@mantine/hooks";
import { TbListDetails } from "react-icons/tb";

export default function PageAdmin() {
  const { isOwner, isInitializing } = useAuth();
  const navigate = useNavigate();
  const [detailedDisputes, setDetailedDisputes] = useState<DisputesDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [totalBets, setTotalBets] = useState(0);
  const [totalNetPrizes, setTotalNetPrizes] = useState(0);
  const [totalFees, setTotalFees] = useState(0);
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    if (!isInitializing && !isOwner) {
      navigate('/');
    }
  }, [isInitializing, isOwner, navigate]);
  
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
        const filteredDisputes = resolvedDetailedDisputes.filter((dispute): dispute is DisputesDetails => dispute !== null);

        setDetailedDisputes(filteredDisputes);
        setTotalBets(filteredDisputes.length);
        setTotalNetPrizes(filteredDisputes.reduce((acc, dispute) => acc + Number(dispute.disputeNetPrize), 0));
        setTotalFees(filteredDisputes.reduce((acc, dispute) => acc + Number(dispute.disputeFee), 0));
      }
    } catch (error) {
      ProviderNotification({ title: 'Error', message: 'Failed to load disputes' });
    } finally {
      if (showLoading) {
        setIsLoading(false);
      }
    }
  }

  const betList = detailedDisputes.map((row, index) => (
    <Table.Tr key={index}>
      <Table.Td>{row.disputeName}</Table.Td>
      <Table.Td visibleFrom="md">{formatPOL(Number(row.disputeNetPrize))}</Table.Td>
      <Table.Td visibleFrom="md">{Number(row.disputeWinner) === 1 ? (<>{row.disputeCandidate1}</>) : Number(row.disputeWinner) === 2 ? (<>{row.disputeCandidate2}</>) : '-'}</Table.Td>
      <Table.Td>
        <Group fz="sm">{Number(row.disputeStatus) ? <Badge variant='default' c="green">active</Badge> : <Badge variant='default' c='dimmed'>disabled</Badge>}</Group>
      </Table.Td>
      <Table.Td >
        <Group gap={0} justify="flex-end" mr={10}>
          <Menu transitionProps={{ transition: 'pop' }} withArrow position="bottom-end" withinPortal>
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray">
                <HiDotsHorizontal />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item component='a' href={`/admin/bet/${index + 1}`} leftSection={<TbListDetails size={20} />}>Details</Menu.Item>
              <Menu.Item onClick={open} leftSection={<HiOutlineCog6Tooth size={20} />}>Toggle Status</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Table.Td>
    </Table.Tr>
  ))

  return (
    <>
      <Stack w='100vw' gap='xs'>
        <Group w='100vw' justify='flex-start' p='xs' px='lg' gap='xs'>
          <ActionIcon component="a" href="/" size='lg' variant="default" c='indigo'>
            <AiOutlineHome />
          </ActionIcon>
          <Button size='compact-lg' component="a" href="/bets" variant="default" c='indigo'>Bets</Button>
        </Group>
        {isLoading ? (
          <Center w='100vw' h='57vh'>
            <Loader size="md" />
          </Center>
        ) : (
          <>
            <Stack w='90vw' align="center" mx='auto' gap='lg'>
              <Paper withBorder radius='md' w='100%' p='lg'>
                <Text ta='center' fw={700} fz='h2' inline c='indigo' p='md' pt={0}>Overview</Text>
                <SimpleGrid cols={{ base: 1, md: 3 }}>
                  <Stack gap='0' ta="center">
                    <Text inline>{totalBets}</Text>
                    <Text fz='sm' c='dimmed'>Total disputes</Text>
                  </Stack>
                  <Stack gap='0' ta="center">
                    <Text inline>{formatPOL(totalNetPrizes)}</Text>
                    <Text fz='sm' c='dimmed'>Total bets</Text>
                  </Stack>
                  <Stack gap='0' ta="center">
                    <Text inline>{formatPOL(totalFees)}</Text>
                    <Text fz='sm' c='dimmed'>Total fees</Text>
                  </Stack>
                </SimpleGrid>
              </Paper>
              <Paper w='100%' withBorder radius='md' style={{ overflow: 'hidden' }}>
                <Table.ScrollContainer minWidth={300} h='auto' mah='50vh' type='native' >
                  <Table verticalSpacing="sm" striped highlightOnHover withRowBorders={false}>
                    <Table.Thead pos='sticky' style={{ backdropFilter: `blur(100px)` }} >
                      <Table.Tr>
                        <Table.Th>Dispute</Table.Th>
                        <Table.Th visibleFrom="md">Total Prize</Table.Th>
                        <Table.Th visibleFrom="md">Winner</Table.Th>
                        <Table.Th>status</Table.Th>
                        <Table.Th ta='end' />
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{betList}</Table.Tbody>
                  </Table>
                </Table.ScrollContainer>
              </Paper>
            </Stack>
          </>
        )}
      </Stack>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3
        }}
      >
        <>Modal de alterar o status da disputa</>
      </Modal>
    </>
  );
}
