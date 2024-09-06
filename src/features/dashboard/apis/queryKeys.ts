export const queryKeys = {
  root: ["dashboard"],
  byWidgetType: (userId: number | undefined, widgetType: string) => [
    ...queryKeys.root,
    userId,
    widgetType,
  ],
};
