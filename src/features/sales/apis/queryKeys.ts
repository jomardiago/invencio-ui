export const salesQueryKeys = {
  root: ["sales"],
  byUserId: (userId: number | undefined) => [...salesQueryKeys.root, userId],
};
