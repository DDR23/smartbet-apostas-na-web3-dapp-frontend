import { notifications } from "@mantine/notifications";
import { PostDisputesDetails } from "../types/DisputesDetails";
import ProviderContract from "./ProviderContract";
import ProviderWallet from "./ProviderWallet";

export async function postDispute(data: PostDisputesDetails) {
  try {
    const web3 = ProviderWallet();
    if (!web3) {
      notifications.show({
        title: "Error",
        message: "Error getting wallet",
      });
      return;
    }

    const contract = ProviderContract();
    if (!contract) {
      notifications.show({
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

    notifications.show({
      title: "Success",
      message: "Dispute created successfully",
    });
    return tx.transactionHash;
  } catch (error) {
    notifications.show({
      title: "Error",
      message: "Error creating dispute",
    });
  }
}
