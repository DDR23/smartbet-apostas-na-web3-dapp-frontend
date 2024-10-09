import SmartbetDisputes from "../abis/SmartbetDisputes.json";
import { DisputesDetails } from "../types/DisputesDetails";
import ProviderWallet from "./ProviderWallet";

interface Contract {
  methods: {
    owner: () => {
      call: () => Promise<string>;
    };
    getAllDisputeIds: () => {
      call: () => Promise<DisputesDetails[]>;
    };
    createDispute: (
      disputeName: string,
      disputeWallpaper: string,
      disputeCandidate1: string,
      disputeCandidateImage1: string,
      disputeCandidate2: string,
      disputeCandidateImage2: string
    ) => {
      send: (args: any) => Promise<any>;
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
