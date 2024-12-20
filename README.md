# smartbet-apostas-na-web3-dapp-frontend
Obs: projeto foi finalizado, porem agora ele apresenta erro 404 nas rotas que interagem com o contrato
TODO - verificar motivo do 404 na rota /bets

## Sobre o projeto

**Smart Bet** é uma plataforma de apostas que permite aos usuários participar de disputas de forma segura e transparente, utilizando tecnologia blockchain, garantindo que todas as transações sejam registradas de maneira imutável e auditável. O projeto foi desenvolvido para fins educacionais.

<!-- TODO - resolver erro: (404: NOT_FOUND) -->
<!-- Projeto hospedado em: https://smartbetdisputes.vercel.app/ -->

## Sobre o contrato

- **Rede**: Polygon Amoy Testnet
- **Endereço do Contrato**: 0x89674AA4a4d729605a4C6B1484d61401cC45341C
- **Hash da Transação**: 0xe2d5a52af17e65448040f9050e77f0c7914294df8186458ab601670ded3685ee
- **Bloco**: 13064581
- **Codigo fonte do contrato em**: [Polygon PoS Chain Amoy Testnet Explorer](https://amoy.polygonscan.com/address/0x89674AA4a4d729605a4C6B1484d61401cC45341C#code)
- **Repositório do contrato**: [atividade---SMARTCONTRACT---meu-primeiro-smartcontract---LUIZTOOLS](https://github.com/DDR23/atividade---SMARTCONTRACT---meu-primeiro-smartcontract---LUIZTOOLS)

Projeto hospedado em: 

## Tecnologias Utilizadas

- **Frontend**: O frontend foi desenvolvido utilizando React, com a biblioteca Mantine para componentes de interface. A aplicação é responsiva e adaptável a diferentes dispositivos, proporcionando uma experiência de usuário fluida.
- **Backend**: A lógica de negócios é implementada em contratos inteligentes escritos em Solidity, que são implantados na rede Polygon (Amoy Testnet). Isso permite transações rápidas e com taxas reduzidas.
- **Gerenciamento de Estado**: Utilizamos o React Context API para gerenciar o estado da autenticação do usuário e as interações com a blockchain.
- **Integração com Web3**: A biblioteca Web3.js é utilizada para interagir com a blockchain, permitindo que os usuários conectem suas carteiras e realizem transações de forma segura.

## Funcionalidades

- **Apostas em Disputas**: Usuários podem apostar em candidatos, visualizar detalhes das apostas e acompanhar o status das disputas.
- **Criação de Disputas**: Administradores têm a capacidade de criar novas disputas, definindo candidatos e detalhes relevantes.
- **Notificações**: O sistema de notificações informa os usuários sobre o status das suas apostas e disputas.
- **Interface Intuitiva**: A interface foi projetada para ser amigável e acessível, facilitando a navegação e a interação com a plataforma.

## Como Rodar o Projeto

Para rodar o projeto localmente, siga os passos abaixo:

1. Clone o repositório:
   ```bash
   git clone https://github.com/DDR23/atividade---DAPP---meu-primeiro-smartcontract---LUIZTOOLS
   cd atividade---DAPP---meu-primeiro-smartcontract---LUIZTOOLS
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## Screenshots
<!-- ![App Screenshot](/public/picture_01.png) -->

## Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
