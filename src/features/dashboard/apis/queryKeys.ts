export const queryKeys = {
  root: ["dashboard"],
  byUserId: (userId: number | undefined) => [...queryKeys.root, userId],
};
