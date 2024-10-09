import { DisputesDetails } from "../types/DisputesDetails";
import ProviderContract from "./ProviderContract";

export default async function GetDisputeById(id: string): Promise<DisputesDetails | null> {
  const contract = ProviderContract();
  if (!contract) return null;

  const dispute = await contract.methods.disputes(id).call();
  return dispute;
}
