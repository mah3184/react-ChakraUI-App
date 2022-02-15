import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { GroupType, GroupTypes } from '../types/items/GroupType';
import { DnDItems } from '../types/items/DnDItems';

type GroupedItems = {
  [k in GroupType]?: DnDItems[]
};
type UseGroupedItems = (items: DnDItems[]) => [GroupedItems, DnDItems[], Dispatch<SetStateAction<DnDItems[]>>];

const useGroupedItems: UseGroupedItems = (items) => {
  const [dndItems, setDnDItems] = useState<DnDItems[]>(items);
  const [groupedItems, setGroupedItems] = useState<GroupedItems>({});
  useEffect(() => {
    setGroupedItems(
      GroupTypes.reduce<GroupedItems>((acc, group) => {
        acc[group] = dndItems.filter(v => v.group === group);
        return acc;
      }, {})
    );
  }, [dndItems])
  return [groupedItems, dndItems, setDnDItems];
};

export default useGroupedItems;