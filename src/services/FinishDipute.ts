import ProviderNotification from "../utils/ProviderNotification";
import ProviderContract from "./ProviderContract";
import ProviderWallet from "./ProviderWallet";

export default async function FinishDispute(disputeId: number, winner: number) {
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

    const tx = await contract.methods.finishDispute(disputeId, winner).send({ from: sender, gasPrice: adjustedGasPrice });

    ProviderNotification({
      title: "Success",
      message: "Dispute finished successfully",
    });
    return tx;
  } catch (error) {
    ProviderNotification({
      title: "Error",
      message: "Error finishing dispute",
    });
  }
}
