async function getCart() {
  const cookie = await cookies();
  const token = cookie.get("user");

  if (!token) return null;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/website/cart/view`,
    {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      method: "post",
    }
  );
  if (!response.ok) {
    return null;
  }
  const data = await response.json();
  if (!response.ok || !data._status) {
    return null;
  }
  return data;
}

async function getWishlist() {
  const cookie = await cookies();
  const token = cookie.get("user");

  if (!token) return null;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/website/wishlist/view`,
    {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      method: "post",
    }
  );
  if (!response.ok) {
    return null;
  }
  const data = await response.json();
  if (!response.ok || !data._status) {
    return null;
  }
  return data;
}