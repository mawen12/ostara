// 对象是否非空
export const notEmpty = <TValue>(value: TValue | null | undefined): value is TValue => {
  return !(value === null || value === undefined);
};

// 类型检查
export const typeCheck = <T>(arg: T): T => {
  return arg;
};
