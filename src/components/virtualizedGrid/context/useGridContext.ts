import { useContext } from 'react';
import { BaseGridRecordType, GridContext, GridContextValue } from './GridContext';

export const useGridContext = <RecordType extends BaseGridRecordType>(): GridContextValue<RecordType> => {
  return useContext(GridContext);
};
