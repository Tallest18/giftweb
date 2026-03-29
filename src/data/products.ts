import { Product } from '../types';

export const products: Product[] = [
  { id:'1', name:'Eternal Rose Bouquet', description:'A stunning arrangement of 24 premium long-stem roses, hand-tied with satin ribbon and nestled in our signature gift box. Perfect for anniversaries, birthdays, or just because.', price:15000, originalPrice:18000, image:'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=600&q=80', category:'flowers', tags:['romantic','anniversary','birthday'], rating:4.9, reviews:128, inStock:true, isBestseller:true, badge:'Bestseller' },
  { id:'2', name:'Luxury Chocolate Hamper', description:'An indulgent collection of 20 premium handcrafted chocolates, truffles, and confectionery presented in our gold-ribboned luxury hamper box.', price:22000, image:'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=600&q=80', category:'chocolates', tags:['sweet','luxury','birthday'], rating:4.8, reviews:95, inStock:true, isNew:true, badge:'New' },
  { id:'3', name:'Gold Pearl Necklace', description:'Elegant 18k gold-plated necklace adorned with freshwater pearls. A timeless piece that speaks volumes about your love and care.', price:35000, originalPrice:42000, image:'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80', category:'jewelry', tags:['elegant','anniversary','mother'], rating:4.7, reviews:64, inStock:true, isFeatured:true },
  { id:'4', name:'Premium Gift Hamper', description:'A curated selection of artisanal treats including wine, cheese, crackers, preserves, and gourmet snacks — beautifully presented in a wicker basket.', price:45000, image:'https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?w=600&q=80', category:'hampers', tags:['corporate','celebration','festive'], rating:4.9, reviews:210, inStock:true, isBestseller:true, badge:'Top Rated' },
  { id:'5', name:'Spa & Wellness Experience', description:'A blissful 2-hour spa experience including full body massage, facial treatment, and aromatherapy. Redeemable at partner spas nationwide.', price:28000, image:'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80', category:'experiences', tags:['relaxation','birthday','self-care'], rating:4.6, reviews:47, inStock:true, isNew:true, badge:'Experience' },
  { id:'6', name:'Custom Jewellery Box', description:'A beautifully crafted wooden jewellery box personalised with an engraved name or message. A keepsake that will be treasured forever.', price:18500, image:'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80', category:'personalised', tags:['personalised','keepsake','birthday'], rating:4.8, reviews:83, inStock:true },
  { id:'7', name:'Celebration Cake Delight', description:'A 3-tier custom celebration cake with your choice of flavors — red velvet, chocolate truffle, or vanilla bean — adorned with fresh florals.', price:25000, image:'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&q=80', category:'cakes', tags:['birthday','celebration','custom'], rating:4.9, reviews:156, inStock:true, badge:'Popular', variants:[{id:'v1',name:'Flavor',value:'Red Velvet'},{id:'v2',name:'Flavor',value:'Chocolate Truffle',priceModifier:2000},{id:'v3',name:'Flavor',value:'Vanilla Bean'}] },
  { id:'8', name:'Sunflower Bouquet', description:'A vibrant and cheerful bouquet of seasonal sunflowers, mixed greens, and white daisies — guaranteed to brighten any room.', price:8500, image:'https://images.unsplash.com/photo-1490750967868-88df5691cc0a?w=600&q=80', category:'flowers', tags:['cheerful','friendship','get-well'], rating:4.5, reviews:72, inStock:true },
  { id:'9', name:'Sterling Silver Bracelet', description:'A delicate sterling silver charm bracelet with intricate heart and star motifs. Comes in an elegant jewellery pouch and box.', price:12000, originalPrice:15000, image:'https://images.unsplash.com/photo-1573408301185-9519f94816b6?w=600&q=80', category:'jewelry', tags:['romantic','birthday','teen'], rating:4.6, reviews:39, inStock:true },
  { id:'10', name:'Artisan Tea & Honey Set', description:'A sophisticated gift set featuring 6 premium single-origin teas, raw forest honey, and a handmade ceramic mug — perfect for tea lovers.', price:16000, image:'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600&q=80', category:'hampers', tags:['cosy','get-well','corporate'], rating:4.7, reviews:58, inStock:true, isNew:true },
  { id:'11', name:'White Lily Bouquet', description:'Serene and sophisticated — pristine white lilies and blush roses perfect for condolences, weddings, or as a thank-you gift.', price:12000, image:'https://images.unsplash.com/photo-1487530811015-780e50e0c9f3?w=600&q=80', category:'flowers', tags:['wedding','condolence','thank-you'], rating:4.8, reviews:44, inStock:true },
  { id:'12', name:'Personalised Star Map', description:'A stunning framed print of the night sky as it appeared on your special date — birth, anniversary, or first meeting. Fully customisable.', price:14500, image:'https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=600&q=80', category:'personalised', tags:['romantic','anniversary','unique'], rating:4.9, reviews:91, inStock:true, isFeatured:true },
];

export const categories = [
  { id:'all', label:'All Gifts', emoji:'✨' },
  { id:'flowers', label:'Flowers', emoji:'🌹' },
  { id:'hampers', label:'Hampers', emoji:'🧺' },
  { id:'jewelry', label:'Jewellery', emoji:'💎' },
  { id:'experiences', label:'Experiences', emoji:'🌟' },
  { id:'personalised', label:'Personalised', emoji:'✍️' },
  { id:'cakes', label:'Cakes', emoji:'🎂' },
  { id:'chocolates', label:'Chocolates', emoji:'🍫' },
];

export const testimonials = [
  { id:1, name:'Amara Okonkwo', role:'Ordered for anniversary', avatar:'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80', comment:'The roses arrived perfectly fresh and beautifully arranged. My wife was absolutely speechless! Delivery was right on time and the packaging was gorgeous.', rating:5 },
  { id:2, name:'Chidinma Eze', role:'Ordered for birthday', avatar:'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=100&q=80', comment:"I ordered the hamper for my mum's birthday and she couldn't stop raving about it! Everything was premium quality. Will definitely order again.", rating:5 },
  { id:3, name:'Tunde Adeyemi', role:'Corporate gifting', avatar:'https://images.unsplash.com/photo-1614679651773-fc7b4c1d01fe?w=100&q=80', comment:"Used Giftly for our company's client appreciation gifts. The quality exceeded expectations and the team handled our bulk order seamlessly.", rating:5 },
];

export const occasions = [
  { label:'Birthday', emoji:'🎂', color:'from-pink-100 to-rose-100' },
  { label:'Anniversary', emoji:'💕', color:'from-red-100 to-pink-100' },
  { label:'Wedding', emoji:'💍', color:'from-purple-100 to-pink-100' },
  { label:'New Baby', emoji:'👶', color:'from-blue-100 to-cyan-100' },
  { label:'Get Well', emoji:'🌻', color:'from-yellow-100 to-orange-100' },
  { label:'Corporate', emoji:'💼', color:'from-slate-100 to-gray-100' },
];
