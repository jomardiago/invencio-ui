export const queryKeys = {
  root: ["products"],
  byUserId: (userId: number | undefined) => [...queryKeys.root, userId],
};
