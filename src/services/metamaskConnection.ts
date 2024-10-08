import { notifications } from "@mantine/notifications";
import Web3 from "web3";

declare global {
  interface Window {
    ethereum?: any // Mudado de Window para any
  }
}

export default async function metamaskConnection(): Promise<Web3> {
  if (!window.ethereum) {
    notifications.show({
      title: 'MetaMask not installed',
      message: 'Please install MetaMask to connect to the blockchain',
      color: 'red',
    })
  }

  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.requestAccounts();

  if (!accounts || !accounts.length) {
    notifications.show({
      title: 'No accounts found',
      message: 'Please connect to MetaMask to continue',
      color: 'red',
    });
  }

  return web3;
}



// TODO - começar daqui, refatorar?