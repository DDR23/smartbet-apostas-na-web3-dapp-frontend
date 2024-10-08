import SmartbetDisputes from "../abis/SmartbetDisputes.json";
import ProviderWallet from "./ProviderWallet";

interface Contract {
  methods: {
    owner: () => {
      call: () => Promise<string>;
    };
  };
}

export default function ProviderContract(): Contract | null {
  const web3 = ProviderWallet();
  if (!web3) return null;

  const contractAddress = "0x001e4F4E8Cf257FB83EF8B37c3F139E102D4bF14";
  const contract = new web3.eth.Contract(SmartbetDisputes, contractAddress);
  return contract as unknown as Contract;
}
