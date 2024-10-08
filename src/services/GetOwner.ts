import ProviderContract from "./ProviderContract";

export default async function GetOwner(): Promise<string | undefined> {
  try {
    const contract = ProviderContract();
    if (!contract) return undefined
    const owner = await contract.methods.owner().call();
    return owner;
  } catch (error) {
    return undefined
  }
}
