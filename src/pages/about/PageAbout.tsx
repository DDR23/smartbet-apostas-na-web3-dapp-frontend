import { Flex, Group, Image, List, Stack, Text } from "@mantine/core";
import { RiShareBoxFill } from "react-icons/ri";
import { SiPolygon } from "react-icons/si";

export default function PageAbout() {
  return (
    <Flex direction='column' justify='space-between' mx='auto'>
      <Stack w='60vw' justify="center" ta="center" mx='auto' gap='xs'>
        <Text ff='heading' fw={700} fz='h1' c='indigo'>Sobre Nossa Plataforma de Apostas</Text>
        <List ta='left' type="ordered">
          <Text fz='h2' fw={700} c='indigo' inline>Regras de Apostas</Text>
          <List.Item ml='sm'>A idade mínima para apostar é de 18 anos.</List.Item>
          <List.Item ml='sm'>Todas as apostas são finais e não podem ser canceladas após a confirmação.</List.Item>
          <List.Item ml='sm'>Apenas uma única aposta é permitida por carteira.</List.Item>
          <List.Item ml='sm'>As apostas devem ser feitas dentro do prazo estipulado para cada evento.</List.Item>
          <List.Item ml='sm'>Os valores ganhos precisam ser resgatados pelo usuário após a Sulgação do resultado.</List.Item>
        </List>
        <List ta='left' type="ordered">
          <Text fz='h2' fw={700} c='indigo' inline>Uso da Blockchain</Text>
          <Text fz='h4'>Nossa plataforma utiliza a tecnologia blockchain para garantir:</Text>
          <List.Item ml='sm'>Transparência nas transações e resultados.</List.Item>
          <List.Item ml='sm'>Segurança e imutabilidade dos registros de apostas.</List.Item>
          <List.Item ml='sm'>Pagamentos rápidos e sem intermediários.</List.Item>
          <List.Item ml='sm'>Verificabilidade das odds e dos resultados.</List.Item>
        </List>
        <List ta='left' type="ordered">
          <Text fz='h2' fw={700} c='indigo' inline>Contratos UtiTextzados</Text>
          <Text fz='h4'>Nossa plataforma utiTextza dois contratos inteTextgentes principais:</Text>
          <List.Item ml='sm'>
            <Text component="a" href="#" target="_blank">Contrato da Eleição Americana <RiShareBoxFill size={16} /></Text>
          </List.Item>
          <List.Item ml='sm'>
            <Text component="a" href="#" target="_blank">Contrato da Eleição Paulista <RiShareBoxFill size={16} /></Text>
          </List.Item>
        </List>
        <Stack gap={0}>
          <Flex gap='md' justify='center' align='center' c='indigo'>
            <SiPolygon size={20} />
            <Text>Polygon Amoy Testnet</Text>
          </Flex>
          <Text fz='h4' inline>Ambos os contratos são implementados na rede de teste da Polygon (Amoy Testnet), garantindo baixas taxas de transação e alta velocidade de processamento.</Text>
          <Text fz='h4' inline>Todos os nossos contratos são de código aberto e podem ser auditados para garantir transparência e segurança.</Text>
        </Stack>
      </Stack>
      <Flex direction='column' justify='center' align='center' gap='0' mt='xs'>
        <Group gap='xs' justify='center'>
          <Image src='/coin.png' alt="logo-smartbet" w={30} />
          <Text fz='h1' ff='heading' inline>SMART BET</Text>
        </Group>
        <Text fz='xs' ff='monospace'>Apostas on-chain com Confiança 💵🔥</Text>
      </Flex>
    </Flex>
  )
}