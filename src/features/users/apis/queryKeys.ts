export const queryKeys = {
  root: ["users"],
  byUserId: (userId?: number) => [...queryKeys.root, userId],
};
