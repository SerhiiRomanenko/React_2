// Генератор випадкового кольору:

const getRandomHexColor = () => {
  const randomNum = Math.floor(Math.random() * 16777216),
    hexString = randomNum.toString(16),
    paddedHexString = hexString.padStart(6, "0");
  return `#${paddedHexString}`;
};

export default getRandomHexColor;
