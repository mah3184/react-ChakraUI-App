import React from 'react';
import { useDrop } from 'react-dnd';

import { DnDItems as _Item, DnDItemsWithIndex, TitleMap, ItemTypes, MoveHandler, TitleMapJA } from '../../../types/items/DnDItems';
import { GroupType } from '../../../types/items/GroupType';

import Draggable from './Draggable';
import { KanbanBox } from '../feature/KanbanBox';
import { MediumBox } from '../feature/MediumBox';
import { Divider } from '@chakra-ui/react';

export const DnDGroup: React.FC<{
  items: _Item[];
  groupType: GroupType;
  firstIndex: number;
  onMove: MoveHandler;
}> = ({ items, groupType, firstIndex, onMove }) => {
  const [, ref] = useDrop({
    accept: ItemTypes,
    hover(dragItem: DnDItemsWithIndex) {
      return;
      // const dragIndex = dragItem.index;
      // if (dragItem.group === groupType) return;
      // const targetIndex = dragIndex < firstIndex ?
      //   // forward
      //   firstIndex + items.length - 1 :
      //   // backward
      //   firstIndex + items.length;
      // console.log(`DnDGroup>dragIndex:${dragIndex}_targetIndex:${targetIndex}`);
      // onMove(dragIndex, targetIndex, groupType);
      // dragItem.index = targetIndex;
      // dragItem.group = groupType;
    }
  });

  return (
    <MediumBox
      title={TitleMap[groupType]}
      element={TitleMapJA[groupType]}
      className={['group', groupType].join(' ')}
      listSize={items.length}
    >
      <Divider borderColor={"gray.300"} my={2} />
      <ul className='list' ref={ref} style={{ listStyle: `none` }}>
        {items.map((item, i) => {
          return (
            <li key={item.id} className="item-wrapper" >
              <Draggable key={`${item.group}-${item.id}-${i}`} className='item-wrapper' dndItem={item} index={firstIndex + i} onMove={onMove}>
                <KanbanBox id={item.id} kanbanText={item.title} />
              </Draggable>
            </li>
          );
        })}
      </ul>
    </MediumBox>
  );
};

