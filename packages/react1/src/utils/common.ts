export const randomHEXColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

export const randomItemFromArray = <T = unknown>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
