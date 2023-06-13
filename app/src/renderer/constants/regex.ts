// 邮箱正则表达式
export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
// URL正则表达式
export const URL_REGEX = /^https?:\/\/[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(:[0-9]+)?\/?(\/[A-Za-z0-9._~-]*)*$/;
// 正整数表达式
export const DIGITS_REGEX = /^[0-9]+$/i;
// 整数表达式
export const INTEGER_REGEX = /^[+-]?[0-9]+$/i;
// 小数表达式
export const FLOAT_REGEX = /^[+-]?([0-9]*[.])?[0-9]+$/i;
