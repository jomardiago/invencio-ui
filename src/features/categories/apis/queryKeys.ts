export const queryKeys = {
  root: ["categories"],
  byUserId: (userId: number | undefined) => [...queryKeys.root, userId],
};
