import { Dispatch, SetStateAction, useState } from 'react';
import { isFunction, isNil } from 'lodash';

// 使用本地存储管理状态
export const useLocalStorageState = <S>(key: string, initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>] => {
  // state: 
  const [item, setInnerValue] = useState<S>(() => {
    // 从本地存储获取值
    const valueItemString = localStorage.getItem(key);
    if (!isNil(valueItemString)) {
      return JSON.parse(valueItemString);
    }
    return isFunction(initialState) ? initialState() : initialState;
  });

  // 定义设置值的方法
  const setValue = (value: SetStateAction<S>): void => {
    setInnerValue((currentInnerValue) => {
      const valueToStore = isFunction(value) ? value(currentInnerValue) : value;

      // 如果值非空，则向本地存储中设置，否则从本地存储中移除
      if (!isNil(valueToStore)) {
        localStorage.setItem(key, JSON.stringify(valueToStore));
      } else {
        localStorage.removeItem(key);
      }

      return valueToStore;
    });
  };

  return [item, setValue];
};
