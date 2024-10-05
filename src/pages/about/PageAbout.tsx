import { Flex, Group, Image, List, Stack, Text } from "@mantine/core";
import { RiShareBoxFill } from "react-icons/ri";
import { SiPolygon } from "react-icons/si";

export default function PageAbout() {
  return (
    <Stack maw='90vw' gap='lg' ta='center' mx='auto' mt='xl'>
      <Text ff='heading' fw={700} fz='h1' c='indigo'>Sobre Nossa Plataforma de Apostas</Text>

      <List ta='left' type="ordered" pr='xs'>
        <Text fz='h2' fw={700} c='indigo' inline>Regras de Apostas</Text>
        <List.Item pl='xs'><Text fz='sm'>A idade mínima para apostar é de 18 anos.</Text></List.Item>
        <List.Item pl='xs'><Text fz='sm'>Todas as apostas são finais e não podem ser canceladas após a confirmação.</Text></List.Item>
        <List.Item pl='xs'><Text fz='sm'>Apenas uma única aposta é permitida por carteira.</Text></List.Item>
        <List.Item pl='xs'><Text fz='sm'>As apostas devem ser feitas dentro do prazo estipulado para cada evento.</Text></List.Item>
        <List.Item pl='xs'><Text fz='sm'>Os valores ganhos precisam ser resgatados pelo usuário após a divulgação do resultado.</Text></List.Item>
      </List>

      <List ta='left' type="ordered" pr='xs'>
        <Text fz='h2' fw={700} c='indigo' inline>Uso da Blockchain</Text>
        <Text fz='h4'>Nossa plataforma utiliza a tecnologia blockchain para garantir:</Text>
        <List.Item pl='xs'><Text fz='sm'>Transparência nas transações e resultados.</Text></List.Item>
        <List.Item pl='xs'><Text fz='sm'>Segurança e imutabilidade dos registros de apostas.</Text></List.Item>
        <List.Item pl='xs'><Text fz='sm'>Pagamentos rápidos e sem intermediários.</Text></List.Item>
        <List.Item pl='xs'><Text fz='sm'>Verificabilidade das odds e dos resultados.</Text></List.Item>
      </List>

      <List ta='left' type="ordered" pr='xs'>
        <Text fz='h2' fw={700} c='indigo' inline>Contratos Utilizados</Text>
        <Text fz='h4'>Nossa plataforma utiliza dois contratos inteligentes principais:</Text>
        <List.Item pl='xs'><Text component="a" href="#" target="_blank" fz='sm'>Contrato da Eleição Americana <RiShareBoxFill size={16} /></Text></List.Item>
        <List.Item pl='xs'><Text component="a" href="#" target="_blank" fz='sm'>Contrato da Eleição Paulista <RiShareBoxFill size={16} /></Text></List.Item>
      </List>

      <Stack gap='xs'>
        <Flex gap='md' justify='center' align='center' c='dimmed'>
          <SiPolygon size={20} />
          <Text fz='sm'>Polygon Amoy Testnet</Text>
        </Flex>
        <Text fz='sm' inline>Ambos os contratos são implementados na rede de teste da Polygon (Amoy Testnet), garantindo baixas taxas de transação e alta velocidade de processamento.</Text>
        <Text fz='sm' inline>Todos os nossos contratos são de código aberto e podem ser auditados para garantir transparência e segurança.</Text>
      </Stack>

      <Flex direction='column' justify='center' align='center' gap='0' mt='xs'>
        <Group gap='xs' justify='center'>
          <Image src='/coin.png' alt="logo-smartbet" w={30} />
          <Text fz='h1' ff='heading' inline>SMART BET</Text>
        </Group>
        <Text fz='xs' ff='monospace'>Apostas on-chain com Confiança 💵🔥</Text>
      </Flex>
    </Stack>
  )
}

