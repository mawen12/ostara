import React, { FunctionComponent, PropsWithChildren, useCallback, useContext, useEffect, useRef } from 'react';
import { Client, IMessage } from '@stomp/stompjs';
import { StompTopicKey, StompTopics } from './stompTopics';
import { forEach } from 'lodash';
import { generatePath } from 'react-router-dom';
import { PathParam } from '../../utils/urlUtils';

// 定义 STOMP 协议上下文属性
export type StompContextProps = {
  // 订阅方法
  subscribe: <SubscribeTopic extends StompTopicKey>(
    topic: SubscribeTopic, // 订阅的主题
    params: { [key in PathParam<SubscribeTopic>]: string }, // 订阅的参数
    callback: (message: StompTopics[SubscribeTopic]) => void // 回调函数
  ) => () => void;
};

// 创建共享的上下文数据
const StompContext = React.createContext<StompContextProps>(undefined!);

interface StompProviderProps extends PropsWithChildren<any> {}

// 函数组件
const StompProvider: FunctionComponent<StompProviderProps> = ({ children }) => {
  // 订阅信息
  const subscriptions = useRef<{ [key: string]: ((message: StompTopics[StompTopicKey]) => void)[] }>({});

  // 如果该组件依赖项没有发生变化的话，就不需要重新渲染
  const getTopicCallback = useCallback((topic: string): ((message: IMessage) => void) => {
    
    return (message: IMessage): void => {
      // 获取指定主题的订阅信息
      const callbacksForTopic = subscriptions.current[topic];
      // 订阅信息如果存在，则执行回调
      if (callbacksForTopic) {
        for (const callback of callbacksForTopic) {
          callback(JSON.parse(message.body));
        }
      }
    };
  }, []);

  // 默认创建一个STOMP协议的客户端，
  const stompClient = useRef<Client>(
    new Client({
      brokerURL: window.daemonWsAddress,
      onConnect: () => {
        // 订阅
        forEach(subscriptions.current, (callbacks, topic) => {
          stompSubscribe(topic);
        });
      },
    })
  );
  
  // STOMP订阅主题
  const stompSubscribe = useCallback((topic: string): void => {
    if (stompClient.current.connected) {
      stompClient.current.subscribe(topic, getTopicCallback(topic));
    }
  }, []);

  // 取消对主题的STOMP订阅
  const stompUnsubscribe = useCallback((topic: string): void => {
    if (stompClient.current.connected) {
      stompClient.current.unsubscribe(topic);
    }
  }, []);

  // 在组件挂载时，设置当前状态为活跃，在组件卸载的时候，设置当前状态为不活跃
  useEffect(() => {
    stompClient.current.activate();
    return () => {
      stompClient.current.deactivate();
    };
  }, []);

  // 
  const subscribe = useCallback(
    <SubscribeTopic extends StompTopicKey>(
      // 订阅主题
      topic: SubscribeTopic,
      // 参数
      params: { [key in PathParam<SubscribeTopic>]: string },
      // 回调
      callback: (message: StompTopics[SubscribeTopic]) => void
    ): (() => void) => {
      // 生成主题
      const generatedTopic = generatePath(topic, params as any);
      // 获取回回调的主题
      const topicCallbacks = subscriptions.current[generatedTopic] || [];
      // 如果需要回调的主题不存在，则执行订阅
      if (topicCallbacks.length === 0) {
        stompSubscribe(generatedTopic);
      }
      subscriptions.current[generatedTopic] = [...topicCallbacks, callback as any];

      return () => {
        // 如果在订阅中，主题没有订阅，那么就删除订阅者，并取消订阅
        subscriptions.current[generatedTopic] = subscriptions.current[generatedTopic].filter((cb) => cb !== callback);
        if (subscriptions.current[generatedTopic].length === 0) {
          delete subscriptions.current[generatedTopic];
          stompUnsubscribe(generatedTopic);
        }
      };
    },
    []
  );

  return (
    // 向子组件共享订阅方法，并将子组件嵌套
    <StompContext.Provider
      value={{
        subscribe,
      }}
    >
      {children}
    </StompContext.Provider>
  );
};

// 提供获取STOMP上下文你的入口
const useStomp = (): StompContextProps => {
  const context = useContext(StompContext);

  if (!context) throw new Error('StompContext must be used inside StompProvider');

  return context;
};

export { StompContext, StompProvider, useStomp };
