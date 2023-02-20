export const fetchCartDetail = async (
  cartId: string | string[] | undefined
) => {
  const response = await fetch(`https://dummyjson.com/carts/${cartId}`);
  const data = await response.json();
  return data;
};

export const fetchUserInfo = async (userId: string | string[] | undefined) => {
  const response = await fetch(`https://dummyjson.com/users/${userId}`);
  const data = await response.json();
  return data;
};
