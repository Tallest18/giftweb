export interface Product {
  id: string; name: string; description: string; price: number; originalPrice?: number;
  image: string; images?: string[]; category: Category; tags: string[];
  rating: number; reviews: number; inStock: boolean; isNew?: boolean;
  isBestseller?: boolean; isFeatured?: boolean; badge?: string;
  variants?: ProductVariant[];
}
export interface ProductVariant { id: string; name: string; value: string; priceModifier?: number; }
export type Category = 'all'|'flowers'|'hampers'|'jewelry'|'experiences'|'personalised'|'cakes'|'chocolates';
export interface CartItem { product: Product; quantity: number; selectedVariant?: ProductVariant; giftWrap?: boolean; giftMessage?: string; }
export interface Address { line1: string; line2?: string; city: string; state: string; postalCode: string; country: string; }
export interface Order { id: string; items: CartItem[]; total: number; subtotal: number; deliveryFee: number; giftWrapFee: number; status: string; createdAt: Date; deliveryAddress: Address; paymentRef?: string; recipientName?: string; recipientPhone?: string; giftMessage?: string; }
declare global { interface Window { PaystackPop: { setup: (opts: any) => { openIframe: () => void } } } }
