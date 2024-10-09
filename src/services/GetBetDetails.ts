import { BetsDetails } from "../types/BetsDetails";
import ProviderContract from "./ProviderContract";

export async function GetBetDetails(wallet: string, disputeId: string): Promise<BetsDetails | null> {
  const contract = ProviderContract();
  if (!contract) return null;

  const bet = await contract.methods.getBetDetails(wallet, disputeId).call();
  return bet;
}
