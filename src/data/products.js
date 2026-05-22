export const PRODUCTS_CACHE_KEY = 'collection-products-cache';

const assetContext = require.context('../assets', false, /\.webp$/);

export const productImageAssets = assetContext
  .keys()
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((key) => ({
    fileName: key.replace('./', ''),
    src: assetContext(key),
  }));

export const PRODUCT_IMAGE_COUNT = productImageAssets.length;

const categories = [
  'Living Room',
  'Dining',
  'Lighting',
  'Decor',
  'Textiles',
  'Home',
  'Office',
  'Wardrobe',
  'Storage',
  'Table',
  'Chair',
  'Sofa',
];

const featuredProductDetails = [
  {
    id: 'sample-sofa',
    name: 'Modern Linen Sofa',
    price: 24999,
    category: 'Living Room',
    description: 'A relaxed three-seat sofa with soft linen texture and deep cushions.',
    rating: 4.8,
    isNew: true,
  },
  {
    id: 'sample-dining',
    name: 'Oak Dining Set',
    price: 32999,
    category: 'Dining',
    description: 'Warm oak dining table made for everyday meals and easy hosting.',
    rating: 4.7,
  },
  {
    id: 'sample-lamp',
    name: 'Table Lamp',
    price: 1899,
    category: 'Lighting',
    description: 'Soft ambient lighting with a compact ceramic base.',
    rating: 4.6,
  },
  {
    id: 'sample-vase',
    name: 'Decor Vase',
    price: 1299,
    category: 'Decor',
    description: 'Minimal statement vase for shelves, consoles, and tabletops.',
    rating: 4.5,
  },
  {
    id: 'sample-cushion',
    name: 'Woven Cushion',
    price: 799,
    category: 'Textiles',
    description: 'Textured cushion cover with a calm neutral finish.',
    rating: 4.4,
  },
  {
    id: 'sample-chair',
    name: 'Accent Armchair',
    price: 8999,
    category: 'Living Room',
    description: 'A compact accent chair with curved arms and supportive padding.',
    rating: 4.9,
    isNew: true,
  },
  {
    id: 'sample-pendant',
    name: 'Pendant Light',
    price: 3499,
    category: 'Lighting',
    description: 'A warm hanging light for dining spaces and reading corners.',
    rating: 4.6,
  },
  {
    id: 'sample-rug',
    name: 'Cotton Area Rug',
    price: 4599,
    category: 'Textiles',
    description: 'Soft cotton rug with a durable flat-weave finish.',
    rating: 4.3,
  },
  {
    id: 'home-7',
    name: 'Console Cabinet',
    price: 6800,
    category: 'Home',
    description: 'A slim console cabinet with clean storage for entryways and living rooms.',
    rating: 4.6,
  },
  {
    id: 'home-8',
    name: 'Office Desk',
    price: 7800,
    category: 'Office',
    description: 'A practical office desk with a calm wood finish and plenty of work surface.',
    rating: 4.5,
  },
  {
    id: 'home-9',
    name: 'Work Chair',
    price: 5200,
    category: 'Office',
    description: 'Comfortable daily work chair with supportive padding and a modern profile.',
    rating: 4.4,
  },
  {
    id: 'home-10',
    name: 'Sliding Wardrobe',
    price: 18900,
    category: 'Wardrobe',
    description: 'Space-saving sliding wardrobe with generous storage for bedrooms.',
    rating: 4.7,
  },
  {
    id: 'home-11',
    name: 'Tall Wardrobe',
    price: 16400,
    category: 'Wardrobe',
    description: 'Tall wardrobe designed to keep clothing, linens, and accessories organized.',
    rating: 4.6,
  },
  {
    id: 'home-12',
    name: 'Storage Shelf',
    price: 3600,
    category: 'Storage',
    description: 'Open storage shelf for decor, books, baskets, and everyday essentials.',
    rating: 4.3,
  },
  {
    id: 'home-13',
    name: 'Drawer Unit',
    price: 4200,
    category: 'Storage',
    description: 'Compact drawer unit for tidy storage beside desks, beds, and sofas.',
    rating: 4.4,
  },
  {
    id: 'home-1',
    name: 'Wooden Stool',
    price: 1200,
    category: 'Chair',
    description: 'Simple wooden stool for flexible seating and easy side-table use.',
    rating: 4.2,
  },
  {
    id: 'home-2',
    name: 'Grey Armchair',
    price: 4500,
    category: 'Chair',
    description: 'Soft grey armchair with a relaxed shape for reading corners and lounges.',
    rating: 4.8,
  },
  {
    id: 'home-3',
    name: 'Bedside Table',
    price: 2500,
    category: 'Table',
    description: 'Neat bedside table with a warm finish and everyday storage.',
    rating: 4.5,
  },
  {
    id: 'home-4',
    name: 'Light Chair',
    price: 2100,
    category: 'Chair',
    description: 'Lightweight chair with a minimal profile for dining or accent seating.',
    rating: 4.3,
  },
  {
    id: 'home-5',
    name: 'Table Lamp',
    price: 1200,
    category: 'Home',
    description: 'Compact table lamp that brings soft light to desks, shelves, and bedsides.',
    rating: 4.6,
  },
  {
    id: 'home-6',
    name: 'Soft Desk',
    price: 3000,
    category: 'Table',
    description: 'Clean small desk for study spaces, bedrooms, and compact home offices.',
    rating: 4.4,
  },
  {
    id: 'home-14',
    name: 'Cloud Sofa',
    price: 28500,
    category: 'Sofa',
    description: 'Deep, relaxed sofa with a soft cloud-like sit for family spaces.',
    rating: 4.9,
    isNew: true,
  },
  {
    id: 'home-15',
    name: 'Compact Sofa',
    price: 19800,
    category: 'Sofa',
    description: 'Compact sofa made for apartments, studios, and cozy living rooms.',
    rating: 4.7,
  },
];

const makeGeneratedProduct = (asset, index) => {
  const productNumber = index + 1;
  const category = categories[index % categories.length];

  return {
    id: `asset-product-${productNumber}`,
    name: `${category} Product ${productNumber}`,
    price: 1200 + ((index * 375) % 28000),
    category,
    description: `Home furniture and decor item from ${asset.fileName}.`,
    rating: Number((4.2 + ((index % 8) * 0.1)).toFixed(1)),
    isNew: index % 17 === 0,
  };
};

export const fallbackProducts = productImageAssets.map((asset, index) => ({
  ...makeGeneratedProduct(asset, index),
  ...(featuredProductDetails[index] || {}),
  assetFileName: asset.fileName,
  image: asset.src,
}));

const productImageById = Object.fromEntries(
  fallbackProducts.map((product) => [product.id, product.image])
);

export const getProductImage = (product, index = 0) =>
  productImageById[product?.id] || productImageAssets[index % productImageAssets.length]?.src;

export const withLocalProductImages = (products = []) =>
  products.map((product, index) => ({
    ...product,
    image: getProductImage(product, index),
  }));

export const mergeLocalProducts = (products = []) => {
  const productMap = new Map();

  [...fallbackProducts, ...withLocalProductImages(products)].forEach((product, index) => {
    productMap.set(String(product.id || `product-${index}`), product);
  });

  return [...productMap.values()];
};

export const homeProducts = fallbackProducts;

export const getLocalProducts = () => fallbackProducts;
