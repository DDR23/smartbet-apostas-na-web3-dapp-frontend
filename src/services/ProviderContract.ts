import Web3 from "web3";
import SmartbetDisputes from "../abis/SmartbetDisputes.json"

export default function ProviderContract(web3: Web3) {
  const contract = new web3.eth.Contract(SmartbetDisputes, );
  return contract;
}
