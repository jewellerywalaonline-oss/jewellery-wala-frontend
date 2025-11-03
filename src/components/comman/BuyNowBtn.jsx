export function BuyNowButton({ product, selectedColor }) {
  const handleBuyNow = () => {
    const directPurchaseItem = {
      productId: product._id,
      colorId: selectedColor._id,
      quantity: 1,
      isPersonalized: false,
      personalizedName: null
    };

    // Store in sessionStorage and redirect to checkout
    sessionStorage.setItem('directPurchase', JSON.stringify([directPurchaseItem]));
    window.location.href = '/checkout?type=direct';
  };

  return (
    <button onClick={handleBuyNow}>
      Buy Now
    </button>
  );
}