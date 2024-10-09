export const formatPOL = (value: number | '') => {
  if (value === '') return '0 POL';
  return (Number(value) / 1e18).toFixed(18) + ' POL';
};
