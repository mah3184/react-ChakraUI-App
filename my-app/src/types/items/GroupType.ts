export const GroupTypes = ['ToDo', 'InProgress', 'InReview', 'Done'] as const;
export type GroupType = (typeof GroupTypes)[number];
