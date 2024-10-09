import * as yup from 'yup'

export const SchemaCreateBet = yup.object().shape({
  _disputeName: yup
    .string()
    .required(),
  _disputeWallpaper: yup
    .string()
    .required(),
  _disputeCandidate1: yup
    .string()
    .required(),
  _disputeCandidateImage1: yup
    .string()
    .required(),
  _disputeCandidate2: yup
    .string()
    .required(),
  _disputeCandidateImage2: yup
    .string()
    .required()
});
