export interface BetsDetails {
  disputeId: bigint;
  candidateNumber: bigint;
  amount: bigint;
  collectedAmount: bigint;
  collected: boolean;
}

export interface PostBetsDetails {
  _disputeId: number;
  _candidateNumber: number;
  _amount: number;
}
