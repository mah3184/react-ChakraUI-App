import { Todo } from "../api/todo";
import { GroupType } from "./GroupType";


export const ItemTypes = ['item' as const];
export type ItemType = (typeof ItemTypes)[number];
export type Contents = {
  title: string;
  memo?: string;
};
export type DnDItems = Todo & {
  group: GroupType,
}
export type DnDItemsWithIndex = DnDItems & {
  index: number;
};
export type MoveHandler = (dragIndex: number, targetIndex: number, groupType: GroupType) => void;
export const TitleMap = {
  ToDo: 'ToDo',
  InProgress: 'InProgress',
  InReview: 'InReview',
  Done: 'Done'
} as const;

export const TitleMapJA = {
  ToDo: '未実施タスク',
  InProgress: '進行中タスク',
  InReview: 'レビュー中タスク',
  Done: '完了タスク'
} as const;
