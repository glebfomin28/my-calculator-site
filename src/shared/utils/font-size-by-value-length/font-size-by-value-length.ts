export const fontSizeByValueLength = (value: string) => {
  if (value?.length < 17) {
    return 32;
  }

  const dynamicSize = 32 - (value.length - 14) * 0.75;

  return dynamicSize <= 12 ? 12 : dynamicSize;
};
