import { PostBetsDetails } from "../types/BetsDetails";
import ProviderNotification from "../utils/ProviderNotification";
import ProviderContract from "./ProviderContract";
import ProviderWallet from "./ProviderWallet";

export async function postBet(data: PostBetsDetails) {
  try {
    const web3 = ProviderWallet();
    if (!web3) {
      ProviderNotification({
        title: "Error",
        message: "Error getting wallet",
      });
      return;
    }

    const contract = ProviderContract();
    if (!contract) {
      ProviderNotification({
        title: "Error",
        message: "Error getting contract",
      });
      return;
    }

    const accounts = await web3.eth.getAccounts();
    const sender = accounts[0];

    const gasPrice = await web3.eth.getGasPrice();

    const adjustedGasPrice = Math.round(Number(gasPrice) * 1.2).toString();

    const tx = await contract.methods.createBet(
      data._disputeId.toString(),
      data._candidateNumber.toString()
    ).send({
      from: sender,
      value: data._amount,
      gasPrice: adjustedGasPrice
    });

    ProviderNotification({
      title: "Success",
      message: "Bet created successfully",
    });
    return tx;
  } catch (error) {
    ProviderNotification({
      title: "Error",
      message: "Error creating bet",
    });
  }
}
