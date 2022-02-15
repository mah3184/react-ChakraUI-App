import React, { ReactNode, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { DnDItems, DnDItemsWithIndex, ItemTypes, MoveHandler } from '../../../types/items/DnDItems';

type Props = {
  className: string,
  dndItem: DnDItems,
  index: number,
  onMove: MoveHandler,
  children: ReactNode

}

const Draggable: React.VFC<Props> = ({
  className, dndItem, index, onMove, children
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    // acceptに指定したtypeだけがコールバックへの対象となる (本サンプルでは ['todo', 'doing', 'done'])
    accept: ItemTypes,
    // マウスドラッグをしたときにhoverした部分でのコールバックを定義
    hover(dragItem: DnDItemsWithIndex, monitor) {
      if (!ref.current) return;
      const dragIndex = dragItem.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      if (dndItem.group === dragItem.group) {
        // グループ内での並び替えの場合は入れ替え方向とhover位置に応じて入れ替えるかを確定
        const hoverRect = ref.current.getBoundingClientRect();

        // (334 - 278) / 2 = 28(hoverMiddleY)
        const hoverMiddleY = (hoverRect.bottom - hoverRect.top) / 2;
        const mousePosition = monitor.getClientOffset();
        if (!mousePosition) return;
        const hoverClientY = mousePosition.y - hoverRect.top;

        // 14を超えたら移動判定
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY * 0.5) return;

        // 42を超えたら移動判定
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY * 1.5) return;
      }

      // 内部のデータも変更しつつ、onMoveでstate変更を依頼する
      console.log("====")
      console.log(`Draggable>dragIndex:${dragIndex}_hoverIndex:${hoverIndex}`);
      console.log(`dndItem>${dndItem.id}_${dndItem.group}_${dndItem.title}`);
      console.log(`dragItem>${dragItem.id}_${dragItem.group}_${dragItem.title}`);

      onMove(dragIndex, hoverIndex, dndItem.group);
      dragItem.index = hoverIndex;
      dragItem.group = dndItem.group;
    }
  });

  // collectでmonitorから取得したデータのみが戻り値として利用できる (collectに指定することで型補完も適用される)
  const [{ isDragging, canDrag }, drag] = useDrag(() => ({
    type: "item",
    item: { ...dndItem, index } as DnDItemsWithIndex,
    // isDragging: monitor => monitor.getItem().id === dndItem.id,
    collect: monitor => ({
      isDragging: monitor.isDragging(),
      canDrag: monitor.canDrag(),
    })
  }))

  // refをconnectorと呼ばれる関数(drag,drop)に渡すことで、対象refと↑のuseDrag,useDropでの処理を結びつける
  drag(drop(ref));

  return (
    <div
      className={className}
      ref={ref}
      style={{
        opacity: isDragging ? 0.4 : 1,
        cursor: canDrag ? 'move' : 'default',
      }}
    >
      {children}
    </div>
  );
};

export default Draggable;