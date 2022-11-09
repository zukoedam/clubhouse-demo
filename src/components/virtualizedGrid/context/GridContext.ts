/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
import { CardProps } from '@phork/phorkit';
import { PlaceholderRecord } from 'types/records';

export type BaseGridRecordType = { id: React.Key };

export type GridChildComponentProps<RecordType extends BaseGridRecordType> = {
  columnIndex: number;
  record: RecordType;
  rowIndex: number;
};

export type GridContextValue<RecordType extends BaseGridRecordType> = {
  cardHeight?: number;
  cardWidth?: number;
  columnCount: number;
  component: React.ComponentType<GridChildComponentProps<RecordType>>;
  leftShift: number;
  mx?: number;
  my?: number;
  placeholder?: React.ComponentType<GridChildComponentProps<PlaceholderRecord>>;
  raised?: CardProps['raised'];
  topShift: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GridContext = createContext<GridContextValue<any>>({} as GridContextValue<any>);
