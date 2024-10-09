import { ActionIcon, Button, Divider, Flex, Group, Image, LoadingOverlay, SimpleGrid, Stack, Text, TextInput } from "@mantine/core";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { SchemaCreateBet } from "../../schemas/SchemaCreateBet";
import { yupResolver } from "@hookform/resolvers/yup";
import { PostDisputesDetails } from "../../types/DisputesDetails";
import { postDispute } from "../../services/PostDispute";
import { RiShareBoxFill } from "react-icons/ri";
import { notifications } from "@mantine/notifications";

export default function PageAdminCreateBet() {
  const { register, handleSubmit, reset } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(SchemaCreateBet)
  });
  const { isOwner, isLoading, isInitializing, walletAddress, connectWallet } = useAuth();
  const navigate = useNavigate();
  const [isPosted, setIsPosted] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [isLoadingTx, setIsLoadingTx] = useState(false);

  useEffect(() => {
    if (!isInitializing && !isLoading && !walletAddress) {
      connectWallet().catch(() => {
        navigate('/');
      });
    }
  }, [isInitializing, isLoading, walletAddress, connectWallet, navigate]);

  if (isInitializing || isLoading) {
    return <LoadingOverlay visible={true} />;
  }

  if (!isOwner && !isLoading) {
    return <Navigate to='/' replace />;
  }

  const onSubmit = async (data: PostDisputesDetails) => {
    try {
      setIsLoadingTx(true);
      const tx = await postDispute(data);
      setTxHash(tx.transactionHash);
      setIsPosted(true);
      reset();
    } catch (error) {
      notifications.show({
        title: "Falha na criação da aposta",
        message: "Ocorreu um erro ao tentar criar a aposta. Verifique os detalhes abaixo.",
      });
    } finally {
      setIsLoadingTx(false);
    }
  };

  return (
    <Stack w='100vw' gap='0' ta='center' align='center'>
      <Group w='100vw' justify='flex-start' p='xs' px='lg' gap='xs'>
        <ActionIcon component="a" href="/" size='lg' variant="default" c='indigo'>
          <AiOutlineHome />
        </ActionIcon>
        <Button size='compact-lg' component="a" href="/bets" variant="default" c='indigo'>Bets</Button>
      </Group>


      <Stack flex={1} miw='70vw' maw='90vw' gap='lg' ta='center' mx='auto' justify="space-between">


        <Stack gap='xs' w='100%'>
          {isPosted ? (
            <>
              <Text ff='heading' fw={700} fz='h1' c='indigo'>Bet created successfully</Text>
              <Text>
                Transaction Hash:
                <Text ml='2' fz='sm' c='indigo' ff='monospace' component='a' href={`https://amoy.polygonscan.com/tx/${txHash}`} target="_blank">
                  {txHash?.slice(0, 6)}...{txHash?.slice(-4)}<RiShareBoxFill size={16} />
                </Text>
              </Text>

              <Button onClick={() => setIsPosted(false)}>Create another bet</Button>
            </>
          ) : (
            <>
              <Text ff='heading' fw={700} fz='h1' c='indigo'>Create Bet</Text>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack ta='left'>
                  <Divider />
                  <Text ta='center' c='indigo' inline>Dispute Details</Text>
                  <SimpleGrid cols={{ base: 1, sm: 2 }} w='100%'>
                    <TextInput {...register('_disputeName')} required label="Dispute Name" />
                    <TextInput {...register('_disputeWallpaper')} required label="Dispute Wallpaper" />
                  </SimpleGrid>
                  <Text ta='center' c='indigo' inline>Dispute Candidates</Text>
                  <SimpleGrid cols={{ base: 1, sm: 2 }} w='100%'>
                    <TextInput {...register('_disputeCandidate1')} required label="Name Candidate 1" />
                    <TextInput {...register('_disputeCandidate2')} required label="Name Candidate 2" />
                    <TextInput {...register('_disputeCandidateImage1')} required label="Image Candidate 1" />
                    <TextInput {...register('_disputeCandidateImage2')} required label="Image Candidate 2" />
                  </SimpleGrid>
                  <Divider />
                  <Button fullWidth type="submit" color="green" loading={isLoadingTx}>Create Bet</Button>
                </Stack>
              </form>
            </>
          )}
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
  );
}
