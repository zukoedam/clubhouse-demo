import produce from 'immer';
import React, { useRef } from 'react';
import { BaseGridRecordType, GridContext, GridContextValue } from './GridContext';

export type GridProviderProps<RecordType extends BaseGridRecordType> = GridContextValue<RecordType> & {
  children: React.ReactNode;
};

export function GridProvider<RecordType extends BaseGridRecordType>({
  cardHeight,
  cardWidth,
  children,
  columnCount,
  component,
  leftShift,
  mx,
  my,
  placeholder,
  raised,
  topShift,
}: GridProviderProps<RecordType>): JSX.Element {
  const previousValue = useRef<GridContextValue<RecordType>>({} as GridContextValue<RecordType>);

  const value = produce(previousValue.current, draftState => {
    draftState.cardHeight = cardHeight;
    draftState.cardWidth = cardWidth;
    draftState.columnCount = columnCount;
    draftState.component = component;
    draftState.leftShift = leftShift;
    draftState.mx = mx;
    draftState.my = my;
    draftState.placeholder = placeholder;
    draftState.raised = raised;
    draftState.topShift = topShift;
  });
  previousValue.current = value;

  return <GridContext.Provider value={value}>{children}</GridContext.Provider>;
}

GridProvider.displayName = 'GridProvider';
