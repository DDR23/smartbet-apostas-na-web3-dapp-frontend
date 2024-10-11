import ProviderNotification from "../utils/ProviderNotification";
import ProviderContract from "./ProviderContract";
import ProviderWallet from "./ProviderWallet";

export async function ToggleDisputeStatus(disputeId: number ,status: boolean) {
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

    const tx = await contract.methods.toggleDisputeStatus(disputeId, status).send({ from: sender, gasPrice: adjustedGasPrice });

    ProviderNotification({
      title: "Success",
      message: "Dispute updated successfully",
    });
    return tx;
  } catch (error) {
    console.log(error)
    if ((error as any).code === 100) {
      ProviderNotification({
        title: "Rejected",
        message: "Connection was refused by the user",
      });
    } else {
      ProviderNotification({
        title: "Error",
        message: "Error updated dispute",
      });
    }
  }
}
