import {
  Authentication$Basic,
  Authentication$BearerToken,
  Authentication$Header,
  Authentication$Inherit,
  Authentication$None,
  Authentication$QueryString,
} from './generated_definitions';

declare module './generated_definitions' {
  interface Authentication {
    type: string;
  }
}

// 认证 类型
export type Authentication$Typed =
  | Authentication$None$Typed
  | Authentication$Inherit$Typed
  | Authentication$Basic$Typed
  | Authentication$Header$Typed
  | Authentication$QueryString$Typed
  | Authentication$BearerToken$Typed;


// 无需认证
export interface Authentication$None$Typed extends Authentication$None {
  type: 'none';
}

// 继承自父级的认证
export interface Authentication$Inherit$Typed extends Authentication$Inherit {
  type: 'inherit';
}

// 基于用户名和密码的认证
export interface Authentication$Basic$Typed extends Authentication$Basic {
  type: 'basic';
}

// 基于请求头的认证
export interface Authentication$Header$Typed extends Authentication$Header {
  type: 'header';
}

// 基于查询字符串的认证
export interface Authentication$QueryString$Typed extends Authentication$QueryString {
  type: 'query-string';
}

// 基于token的认证
export interface Authentication$BearerToken$Typed extends Authentication$BearerToken {
  type: 'bearer-token';
}
