import { ActionIcon, Avatar, Badge, Button, Center, Flex, Group, Image, Loader, Modal, NumberInput, Progress, Stack, Text } from "@mantine/core";
import { AiOutlineArrowLeft } from "react-icons/ai";
import ProviderDevice from "../../utils/ProviderDevice";
import { useParams } from "react-router-dom";
import GetDisputeById from "../../services/GetDisputeById";
import { useEffect, useState } from "react";
import { DisputesDetails } from "../../types/DisputesDetails";
import { useDisclosure } from "@mantine/hooks";
import { BetsDetails, PostBetsDetails } from "../../types/BetsDetails";
import { postBet } from "../../services/PostBet";
import { FaRegCircleCheck } from "react-icons/fa6";
import { RiShareBoxFill } from "react-icons/ri";
import { useAuth } from "../../contexts/AuthContext";
import { GetBetDetails } from "../../services/GetBetDetails";
import { formatPOL } from "../../utils/FormatPol";
import FinishDispute from "../../services/FinishDipute";
import { ClaimPrize } from "../../services/ClaimPrize";

export default function PageBetId() {
  const { isDesktop } = ProviderDevice();
  const { walletAddress, isOwner } = useAuth();
  const { id } = useParams();
  const [dispute, setDispute] = useState<DisputesDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedCandidate, setSelectedCandidate] = useState<{
    name: string;
    image: string;
    number: number;
  } | null>(null);
  const [amount, setAmount] = useState<number | ''>(1000000);
  const [txHashBet, setTxHashBet] = useState<string | null>(null);
  const [isPosted, setIsPosted] = useState(false);
  const [isLoadingTx, setIsLoadingTx] = useState(false);
  const [betDetails, setBetDetails] = useState<BetsDetails | null>(null);

  useEffect(() => {
    const fetchData = (isInitialLoad = false) => {
      if (isInitialLoad) {
        setIsLoading(true);
      }
      if (id && walletAddress) {
        GetDisputeById(id).then((dispute) => {
          setDispute(dispute);
        }).finally(() => {
          GetBetDetails(walletAddress, id).then((bet) => {
            if (bet) {
              setBetDetails(bet);
            }
          }).finally(() => {
            if (isInitialLoad) {
              setIsLoading(false);
            }
          });
        });
      }
    };
    fetchData(true);
    const intervalId = setInterval(() => fetchData(false), 1000);
    return () => clearInterval(intervalId);
  }, [id, walletAddress]);

  const onSubmit = async (data: PostBetsDetails) => {
    try {
      setIsLoadingTx(true);
      const tx = await postBet(data);
      setTxHashBet(tx.transactionHash);
      setIsPosted(true);
    } catch (error) {
      return;
    } finally {
      setAmount(1000000);
      setIsLoadingTx(false);
    }
  };

  const stopDispute = async (winner: number) => {
    try {
      setIsLoadingTx(true);
      await FinishDispute(Number(id), winner);
    } catch (error) {
      return;
    } finally {
      setIsLoadingTx(false);
    }
  };

  const getPrize = async () => {
    try {
      setIsLoadingTx(true);
      await ClaimPrize(Number(id));
    } catch (error) {
      return;
    } finally {
      setIsLoadingTx(false);
    }
  }

  const handleOpen = (candidate: 'candidate1' | 'candidate2') => {
    const candidateData = {
      name: candidate === 'candidate1' ? dispute?.disputeCandidate1 : dispute?.disputeCandidate2,
      image: candidate === 'candidate1' ? dispute?.disputeCandidateImage1 : dispute?.disputeCandidateImage2,
      number: candidate === 'candidate1' ? 1 : 2
    };
    setSelectedCandidate({
      name: candidateData.name ?? '',
      image: candidateData.image ?? '',
      number: candidateData.number
    });
    open();
  }

  const totalBets = Number(dispute?.disputeCandidateBet1) + Number(dispute?.disputeCandidateBet2);
  const candidate1Percentage = totalBets > 0 ? (Number(dispute?.disputeCandidateBet1) / totalBets) * 100 : 0;
  const candidate2Percentage = totalBets > 0 ? (Number(dispute?.disputeCandidateBet2) / totalBets) * 100 : 0;

  return (
    <>
      <Stack w='100vw' gap='0' ta='center' align='center'>
        <Group w='100vw' justify='space-between' p='xs' px='lg'>
          <ActionIcon size='lg' variant="default" c='indigo' onClick={() => window.history.back()}>
            <AiOutlineArrowLeft />
          </ActionIcon>
        </Group>
        <Flex direction={isDesktop ? 'row-reverse' : 'column'} w='90vw' flex={1} align='center' justify={isDesktop ? 'center' : 'flex-start'} p='0' pb='md' gap='xl'>
          {isLoading ? (
            <Loader size='md' />
          ) : (
            <>
              <Stack align='center'>
                {Number(dispute?.disputeWinner) === 1 ? (
                  <Stack gap='xs' align='center' maw='15rem'>
                    <Text fz='h1' fw={700} inline>winner</Text>
                    <Text fz='sm' fw={700} inline>{dispute?.disputeCandidate1}</Text>
                    <Avatar src={dispute?.disputeCandidateImage1} size={isDesktop ? '15rem' : '8rem'} radius='xl' />
                    {!isOwner &&
                      <Stack gap={2}>
                        <Text fz='xs' c='dimmed' inline>bets on this candidate</Text>
                        <Text fz='sm' c='dimmed' inline>{formatPOL(Number(dispute?.disputeCandidateBet1))}</Text>
                      </Stack>
                    }
                  </Stack>
                ) : Number(dispute?.disputeWinner) === 2 ? (
                  <Stack gap='xs' align='center' maw='15rem'>
                    <Text fz='h1' fw={700} inline>winner</Text>
                    <Text fz='sm' fw={700} inline>{dispute?.disputeCandidate2}</Text>
                    <Avatar src={dispute?.disputeCandidateImage2} size={isDesktop ? '15rem' : '8rem'} radius='xl' />
                    {!isOwner &&
                      <Stack gap={2}>
                        <Text fz='xs' c='dimmed' inline>bets on this candidate</Text>
                        <Text fz='sm' c='dimmed' inline>{formatPOL(Number(dispute?.disputeCandidateBet2))}</Text>
                      </Stack>
                    }
                  </Stack>
                ) : (
                  <Flex gap={isDesktop ? '60px' : 'md'} w='100%' justify='center'>
                    <Stack justify="space-between" flex={1} gap='xs' align='center' maw={isDesktop ? '15rem' : '10rem'}>
                      <Text fz='lg' fw={700} inline>{dispute?.disputeCandidate1}</Text>
                      <Avatar src={dispute?.disputeCandidateImage1} size={isDesktop ? '15rem' : '8rem'} radius='xl' />
                      {!isOwner && Number(betDetails?.amount) === 0 && (
                        <Button fullWidth bg='green' onClick={() => handleOpen('candidate1')}>Bet now</Button>
                      )}
                      {isOwner && (
                        <Button fullWidth onClick={() => stopDispute(1)} loading={isLoadingTx}>Declare winner</Button>
                      )}
                    </Stack>
                    <Stack justify="space-between" flex={1} gap='xs' align='center' maw={isDesktop ? '15rem' : '10rem'}>
                      <Text fz='lg' fw={700} inline>{dispute?.disputeCandidate2}</Text>
                      <Avatar src={dispute?.disputeCandidateImage2} size={isDesktop ? '15rem' : '8rem'} radius='xl' />
                      {!isOwner && Number(betDetails?.amount) === 0 && (
                        <Button fullWidth bg='green' onClick={() => handleOpen('candidate2')}>Bet now</Button>
                      )}
                      {isOwner && (
                        <Button fullWidth onClick={() => stopDispute(2)} loading={isLoadingTx}>Declare winner</Button>
                      )}
                    </Stack>
                  </Flex>
                )}
              </Stack>
              <Stack w={isDesktop ? '30rem' : '100%'} maw='100%' gap='0' align='center'>
                <Flex direction='column' mb='xs' align='center'>
                  <Badge mb='xs' variant="outline" color={Number(!dispute?.disputeWinner) ? 'green' : 'red.7'}>{Number(!dispute?.disputeWinner) ? 'running' : 'finished'}</Badge>
                  <Text fw={700} fz={isDesktop ? 'h1' : 'h2'} mb='sm' inline>{dispute?.disputeName}</Text>
                  <Text fz='lg' inline>🔥</Text>
                  <Text fz='sm' c='dimmed'>Total accumulated</Text>
                  <Text fw={700} fz='md' inline>{Number(dispute?.disputeNetPrize) >= 0 ? formatPOL(Number(dispute?.disputeNetPrize)) : 0}</Text> {/* TODO - ajustar para receber campo com valor nao subitraivel */}
                </Flex>
                <Progress.Root w='15rem' size='xl' mb='sm'>
                  <Progress.Section value={candidate1Percentage} color="blue">
                    <Progress.Label>{candidate1Percentage.toFixed(2)}%</Progress.Label>
                  </Progress.Section>
                  <Progress.Section value={candidate2Percentage} color="red">
                    <Progress.Label>{candidate2Percentage.toFixed(2)}%</Progress.Label>
                  </Progress.Section>
                </Progress.Root>
                {isOwner &&
                  <Stack gap='0'>
                    <Text inline fz='md' c='green'>{formatPOL(Number(dispute?.disputeFee))}</Text>
                    <Text fz='xs' c='green'>Fees collected</Text>
                    <Text fz='xs' c='dimmed'>Bets on {dispute?.disputeCandidate1}</Text>
                    <Text inline fz='sm' c='dimmed'>{formatPOL(Number(dispute?.disputeCandidateBet1))}</Text>
                    <Text fz='xs' c='dimmed'>Bets on {dispute?.disputeCandidate2}</Text>
                    <Text inline fz='sm' c='dimmed'>{formatPOL(Number(dispute?.disputeCandidateBet2))}</Text>
                  </Stack>
                }
                {Number(betDetails?.amount) > 0 ? (
                  <Stack gap='xs'>
                    <Stack gap={0} >
                      {Number(dispute?.disputeWinner) === 0 ? (
                        <>
                          <Text fz='h2' c='green' inline>Your bet has been confirmed</Text>
                          <Text inline fz='sm' c='dimmed'>wait for the dispute to finish to claim your prize</Text>
                        </>
                      ) : betDetails?.collected ? (
                        <Stack gap='4' mt='xs' >
                          <Text fz='h2' c='green' inline>🤑🤑</Text>
                          <Text fz='h2' inline c='green'>You already claimed your prize</Text>
                        </Stack>
                      ) : Number(betDetails?.candidateNumber) !== Number(dispute?.disputeWinner) ? (
                        <Text fz='h2' c='red.7' mt='lg'>😭 You lose 😭</Text>
                      ) : (
                        <Stack gap='xs'>
                          <Text fz='h2' c='green'>🤑 You win 🤑</Text>
                          <Button
                            disabled={Number(dispute?.disputeWinner) === 0 || betDetails?.collected || Number(betDetails?.candidateNumber) !== Number(dispute?.disputeWinner)}
                            color='green'
                            leftSection={<Image src='/coin.png' alt="logo-smartbet" w={20} />}
                            onClick={() => getPrize()}
                            loading={isLoadingTx}
                          >
                            claim now
                          </Button>
                        </Stack>
                      )}
                    </Stack>
                  </Stack>
                ) : !isOwner && Number(betDetails?.amount) <= 0 && Number(dispute?.disputeWinner) !== 0 && (
                  <>
                    <Text fz='h2' c='red.7' inline mt='lg'>Bet closed</Text>
                    <Text inline fz='sm' c='dimmed'>You don't have bet on this dispute</Text>
                  </>
                )}
              </Stack>
            </>
          )}
        </Flex>
      </Stack >
      <Modal
        size='auto'
        opened={opened}
        onClose={() => {
          close();
        }}
        withCloseButton={false}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3
        }}>
        {selectedCandidate && (
          <Flex direction='column' align='center' gap='md'>
            {isPosted ? (
              <>
                <Text ta='center' fw={700} fz='h1' c='indigo'>Bet created successfully</Text>
                <Center m='lg'>
                  <FaRegCircleCheck size={130} color='green' />
                </Center>
                <Text>
                  Transaction Hash:
                  <Text ml='2' fz='sm' c='indigo' ff='monospace' component='a' href={`https://amoy.polygonscan.com/tx/${txHashBet}`} target="_blank">
                    {txHashBet?.slice(0, 6)}...{txHashBet?.slice(-4)}<RiShareBoxFill size={16} />
                  </Text>
                </Text>
              </>
            ) : (
              <>
                <Avatar src={selectedCandidate.image} size={isDesktop ? '15rem' : '8rem'} radius='xl' />
                <form>
                  <Stack gap='md' w='280'>
                    <NumberInput
                      w='100%'
                      value={amount}
                      onChange={(value) => setAmount(Number(value))}
                      description="Amount"
                      decimalScale={18}
                      allowDecimal={true}
                      error={Number(amount) < 1000000 ? 'minimum bet is 1000000' : ''}
                    />
                    <Button disabled={Number(amount) < 1000000} h='max-content' p='xs' color='green' loading={isLoadingTx} onClick={() => onSubmit({
                      _disputeId: Number(id),
                      _candidateNumber: selectedCandidate.number,
                      _amount: Number(amount)
                    })}>
                      <Flex direction='column' align='center' gap='0'>
                        <Text truncate w='255'>{formatPOL(amount)}</Text>
                        Bet now on {selectedCandidate.name}
                      </Flex>
                    </Button>
                  </Stack>
                </form>
              </>
            )}
          </Flex>
        )}
      </Modal >
    </>
  );
}
