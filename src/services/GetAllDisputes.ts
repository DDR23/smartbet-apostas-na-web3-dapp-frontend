import ProviderContract from "./ProviderContract";

export default async function GetAllDisputes() {
  const contract = ProviderContract();
  if (!contract) return;
  console.log('contract', contract)
  const disputes = await contract.methods.getAllDisputeIds().call();
  return disputes;
}
