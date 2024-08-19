export const fontSizeByValueLength = (
  value: string,
  { fontSizeMin, fontSizeMax, maxLength }: { fontSizeMin: number; fontSizeMax: number; maxLength: number },
) => {
  if (value?.length < maxLength) {
    return fontSizeMax;
  }

  const dynamicSize = fontSizeMax - Math.max(0, value.length - maxLength) * 1.1;

  return dynamicSize <= fontSizeMin ? fontSizeMin : dynamicSize;
};
