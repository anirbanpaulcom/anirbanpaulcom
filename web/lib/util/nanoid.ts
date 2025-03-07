import { customAlphabet } from 'nanoid';

export const nanoid = (chars?: number) => {
  return customAlphabet(
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    chars || 7,
  )();
};
