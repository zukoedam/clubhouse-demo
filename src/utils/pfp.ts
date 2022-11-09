import seedrandom from 'seedrandom';

/**
 * This returns a "random" PFP from 1 to 3. The row and
 * column indexes are used to seed the random number
 * generator so that the same number is always returned
 * for the specific position. This allows the placeholder
 * PFP to seamlessly transition to the regular PFP.
 */
export const getRandomPfp = (rowIndex: number, columnIndex: number): string => {
  const rng = seedrandom(`${rowIndex * 100 + columnIndex}`);
  const pfp = Math.floor(rng() * 3) + 1;
  return `/static/images/placeholder${pfp}.png`;
};
