export const getBrandItemCount = (productBrands: string[]) => {
  let count = 0;
  let dict: { [brand: string]: number } = {};

  for (let i = 0; i < productBrands.length; i++) {
    if (
      productBrands[i] === productBrands[i + 1] &&
      productBrands[i + 1] !== null
    ) {
      count += 1;
    } else {
      dict[productBrands[i]] = count + 1;
      count = 0;
      continue;
    }
  }
  return dict;
};

export const getUniqueBrands = (productBrands: string[]) => {
  return productBrands.filter(
    (value, index, array) => array.indexOf(value) === index
  );
};
