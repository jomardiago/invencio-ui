export const queryKeys = {
  root: ["profile"],
  byUserId: (userId: number | undefined) => [...queryKeys.root, userId],
};
