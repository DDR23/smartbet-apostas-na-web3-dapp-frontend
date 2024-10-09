import { PostDisputesDetails } from "../types/DisputesDetails";
import ProviderContract from "./ProviderContract";
import ProviderWallet from "./ProviderWallet";
import ProviderNotification from "../utils/ProviderNotification";

export async function postDispute(data: PostDisputesDetails) {
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

    const tx = await contract.methods.createDispute(
      data._disputeName,
      data._disputeWallpaper,
      data._disputeCandidate1,
      data._disputeCandidateImage1,
      data._disputeCandidate2,
      data._disputeCandidateImage2
    ).send({ from: sender });

    ProviderNotification({
      title: "Success",
      message: "Dispute created successfully",
    });
    return tx;
  } catch (error) {
    ProviderNotification({
      title: "Error",
      message: "Error creating dispute",
    });
  }
}
