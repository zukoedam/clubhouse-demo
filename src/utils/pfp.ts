import seedrandom from 'seedrandom';
import { PfpRecord } from 'types/records';

/**
 * If no background image exists on the record passed
 * then return a "random" PFP from 1 to 3. The row and
 * column indexes are used to seed the random number
 * generator so that the same number is always returned
 * for the specific position. This allows the placeholder
 * PFP to seamlessly transition to the regular PFP.
 */
export const getPfpPlaceholder = ({
  columnIndex,
  record,
  rowIndex,
}: {
  columnIndex: number;
  record?: Pick<PfpRecord, 'background'>;
  rowIndex: number;
}): string => {
  if (record?.background !== undefined) {
    return `/static/images/placeholders/${record.background.toLowerCase().replace(/[\s]+/g, '-')}.png`;
  } else {
    const rng = seedrandom(`${rowIndex * 100 + columnIndex}`);
    const pfp = Math.floor(rng() * 3) + 1;
    return `/static/images/placeholder${pfp}.png`;
  }
};
