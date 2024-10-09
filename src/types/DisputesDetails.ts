export interface DisputesDetails {
  disputeName: string;
  disputeWallpaper: string;
  disputeCandidate1: string;
  disputeCandidateImage1: string;
  disputeCandidateBet1: bigint;
  disputeCandidate2: string;
  disputeCandidateImage2: string;
  disputeCandidateBet2: bigint;
  disputeWinner: bigint;
  disputeNetPrize: bigint;
  disputeFee: bigint;
}

export interface PostDisputesDetails {
  _disputeName: string;
  _disputeWallpaper: string;
  _disputeCandidate1: string;
  _disputeCandidateImage1: string;
  _disputeCandidate2: string;
  _disputeCandidateImage2: string;
}
