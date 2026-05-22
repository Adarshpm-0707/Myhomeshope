import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, PackageCheck, ShoppingBag, Star, Trash2, Truck } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useCart } from '../context/CartContext';
import {
  getLocalProducts,
  getProductImage,
  mergeLocalProducts,
  PRODUCTS_CACHE_KEY,
  withLocalProductImages,
} from '../data/products';

const fallbackImage = getProductImage({}, 0);

const formatPrice = (price) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(price || 0));

const getCachedProducts = () => {
  try {
    const cached = localStorage.getItem(PRODUCTS_CACHE_KEY);
    return cached ? mergeLocalProducts(JSON.parse(cached)) : [];
  } catch (error) {
    return [];
  }
};

export default function ProductDetails() {
  const { id } = useParams();
  const location = useLocation();
  const { addToCart } = useCart();
  const [remoteProduct, setRemoteProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState([]);

  const decodedId = decodeURIComponent(id || '');
  const reviewsStorageKey = `product-reviews-${decodedId}`;
  const localProduct = useMemo(() => {
    const cachedProducts = getCachedProducts();
    return [...cachedProducts, ...getLocalProducts()].find(
      (product) => String(product.id) === String(decodedId)
    );
  }, [decodedId]);

  const product = location.state?.product || remoteProduct || localProduct;

  useEffect(() => {
    try {
      const savedReviews = localStorage.getItem(reviewsStorageKey);
      setReviews(savedReviews ? JSON.parse(savedReviews) : []);
    } catch (error) {
      setReviews([]);
    }
  }, [reviewsStorageKey]);

  useEffect(() => {
    if (product || !decodedId) {
      return;
    }

    const firebaseOptions = db.app?.options;
    const hasFirebaseConfig =
      firebaseOptions?.apiKey &&
      firebaseOptions.apiKey !== 'YOUR_API_KEY' &&
      firebaseOptions.projectId &&
      firebaseOptions.projectId !== 'YOUR_PROJECT_ID';

    if (!hasFirebaseConfig) {
      return;
    }

    let isMounted = true;
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const productSnapshot = await getDoc(doc(db, 'products', decodedId));
        if (isMounted && productSnapshot.exists()) {
          setRemoteProduct(
            withLocalProductImages([{ id: productSnapshot.id, ...productSnapshot.data() }])[0]
          );
        }
      } catch (error) {
        console.warn('Product details could not be loaded: ', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [decodedId, product]);

  if (!product && loading) {
    return (
      <div className="pt-28 md:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 animate-pulse">
          <div className="aspect-[4/5] rounded-[2rem] bg-brand-light" />
          <div className="space-y-5 pt-4">
            <div className="h-4 w-32 rounded bg-brand-beige" />
            <div className="h-12 w-3/4 rounded bg-brand-beige" />
            <div className="h-28 w-full rounded bg-brand-beige" />
            <div className="h-14 w-48 rounded bg-brand-beige" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-28 md:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto min-h-screen text-center">
        <p className="text-brand-brown font-bold text-xs uppercase tracking-[0.3em] mb-4">Product Details</p>
        <h1 className="font-serif text-3xl md:text-5xl text-brand-text font-bold mb-5">Product not found</h1>
        <p className="text-brand-muted mb-8">This product is not available right now.</p>
        <Link
          to="/collection"
          className="inline-flex items-center justify-center gap-2 bg-brand-brown text-white px-7 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-brand-brown-dark transition-all"
        >
          <ArrowLeft size={16} />
          Back to Collection
        </Link>
      </div>
    );
  }

  const details = [
    { label: 'Category', value: product.category || 'Furniture' },
    { label: 'Availability', value: product.stock || 'In Stock' },
    { label: 'Delivery', value: product.delivery || 'Home delivery available' },
    { label: 'Material', value: product.material || 'Premium home-grade finish' },
  ];

  const handlePostReview = (event) => {
    event.preventDefault();

    const trimmedReview = reviewText.trim();
    if (!trimmedReview) {
      return;
    }

    const newReview = {
      id: Date.now(),
      rating: reviewRating,
      text: trimmedReview,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    };
    const updatedReviews = [newReview, ...reviews];

    setReviews(updatedReviews);
    localStorage.setItem(reviewsStorageKey, JSON.stringify(updatedReviews));
    setReviewText('');
    setReviewRating(5);
  };

  const handleDeleteReview = (reviewId) => {
    const updatedReviews = reviews.filter((review) => review.id !== reviewId);

    setReviews(updatedReviews);
    localStorage.setItem(reviewsStorageKey, JSON.stringify(updatedReviews));
  };

  return (
    <div className="pt-24 md:pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <Link
        to="/collection"
        className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-brown text-xs md:text-sm font-bold uppercase tracking-widest mb-8 md:mb-12 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Collection
      </Link>

      <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 md:gap-14 items-start">
        <div className="bg-white rounded-[2rem] md:rounded-[3rem] border border-brand-beige overflow-hidden shadow-sm">
          <div className="relative aspect-[4/5] md:aspect-[5/4] bg-brand-light">
            <img
              src={product.image || fallbackImage}
              alt={product.name}
              onError={(event) => {
                event.currentTarget.src = fallbackImage;
              }}
              className="w-full h-full object-cover"
            />
            {product.isNew && (
              <div className="absolute top-5 left-5 bg-brand-brown text-white text-[9px] font-bold px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
                New Arrival
              </div>
            )}
          </div>
        </div>

        <section className="lg:pt-4">
          <div className="flex items-center justify-between gap-4 mb-4">
            <p className="text-brand-brown font-bold text-[10px] md:text-xs uppercase tracking-[0.3em]">
              {product.category || 'Furniture'}
            </p>
            {product.rating && (
              <div className="flex items-center gap-1.5 bg-white border border-brand-beige px-3 py-2 rounded-xl">
                <Star size={14} className="fill-brand-accent text-brand-accent" />
                <span className="text-xs font-bold text-brand-text">{product.rating}</span>
              </div>
            )}
          </div>

          <h1 className="font-serif text-3xl md:text-6xl text-brand-text font-bold mb-5 md:mb-7 leading-tight">
            {product.name}
          </h1>

          <p className="text-brand-muted text-sm md:text-lg leading-relaxed mb-8">
            {product.description || 'Premium quality furniture designed for your modern home sanctuary.'}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-5 md:gap-8 mb-8 md:mb-10">
            <div>
              <p className="text-[10px] text-brand-muted font-bold uppercase tracking-widest mb-1">Price</p>
              <p className="font-serif text-3xl md:text-5xl text-brand-text font-bold">{formatPrice(product.price)}</p>
            </div>
            <button
              type="button"
              onClick={() => addToCart(product)}
              className="inline-flex items-center justify-center gap-3 bg-brand-brown hover:bg-brand-brown-dark text-white px-7 md:px-9 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all active:scale-95 shadow-xl"
            >
              <ShoppingBag size={18} />
              Add to Cart
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 md:gap-4 mb-8 md:mb-10">
            {details.map((item) => (
              <div key={item.label} className="bg-white border border-brand-beige rounded-2xl p-4 md:p-5">
                <p className="text-[9px] text-brand-muted font-bold uppercase tracking-widest mb-1">{item.label}</p>
                <p className="text-sm md:text-base text-brand-text font-bold">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { icon: CheckCircle2, label: 'Quality checked' },
              { icon: Truck, label: 'Fast delivery' },
              { icon: PackageCheck, label: 'Secure packing' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 text-brand-muted bg-brand-light rounded-2xl px-4 py-3">
                <item.icon size={18} className="text-brand-brown shrink-0" />
                <span className="text-xs font-bold">{item.label}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-12 md:mt-20 grid lg:grid-cols-[0.9fr_1.1fr] gap-8 md:gap-12 items-start">
        <div className="bg-white border border-brand-beige rounded-[2rem] md:rounded-[3rem] p-5 md:p-8 shadow-sm">
          <p className="text-brand-brown font-bold text-[10px] md:text-xs uppercase tracking-[0.3em] mb-3">
            Customer Review
          </p>
          <h2 className="font-serif text-2xl md:text-4xl text-brand-text font-bold mb-6">
            Rate this product
          </h2>

          <form onSubmit={handlePostReview} className="space-y-5">
            <div>
              <p className="text-[10px] text-brand-muted font-bold uppercase tracking-widest mb-3">Your rating</p>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setReviewRating(rating)}
                    aria-label={`Rate ${rating} star`}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-brand-light hover:bg-brand-beige flex items-center justify-center transition-all active:scale-95"
                  >
                    <Star
                      size={22}
                      className={
                        rating <= reviewRating
                          ? 'fill-brand-accent text-brand-accent'
                          : 'text-brand-muted'
                      }
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="reviewText" className="block text-[10px] text-brand-muted font-bold uppercase tracking-widest mb-3">
                Review text
              </label>
              <textarea
                id="reviewText"
                value={reviewText}
                onChange={(event) => setReviewText(event.target.value)}
                rows={5}
                placeholder="Write your experience with this product..."
                className="w-full resize-none bg-brand-light border border-brand-beige rounded-2xl px-4 py-4 text-sm text-brand-text placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-brown/20 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={!reviewText.trim()}
              className="w-full inline-flex items-center justify-center bg-brand-brown hover:bg-brand-brown-dark disabled:bg-brand-muted disabled:cursor-not-allowed text-white px-7 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all active:scale-95"
            >
              Post Review
            </button>
          </form>
        </div>

        <div className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-brand-brown font-bold text-[10px] md:text-xs uppercase tracking-[0.3em] mb-2">
                Reviews
              </p>
              <h2 className="font-serif text-2xl md:text-4xl text-brand-text font-bold">
                Customer feedback
              </h2>
            </div>
            <span className="bg-white border border-brand-beige rounded-xl px-4 py-2 text-xs font-bold text-brand-muted">
              {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
            </span>
          </div>

          {reviews.length === 0 ? (
            <div className="bg-white border border-brand-beige rounded-[2rem] p-6 md:p-8 text-center">
              <p className="text-brand-muted text-sm md:text-base">
                No customer reviews yet. Be the first to review this product.
              </p>
            </div>
          ) : (
            reviews.map((review) => (
              <article key={review.id} className="bg-white border border-brand-beige rounded-[2rem] p-5 md:p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <Star
                        key={rating}
                        size={16}
                        className={
                          rating <= review.rating
                            ? 'fill-brand-accent text-brand-accent'
                            : 'text-brand-muted'
                        }
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-[10px] text-brand-muted font-bold uppercase tracking-widest">{review.date}</p>
                    <button
                      type="button"
                      onClick={() => handleDeleteReview(review.id)}
                      aria-label="Delete review"
                      className="w-9 h-9 rounded-xl bg-brand-light hover:bg-brand-beige text-brand-muted hover:text-brand-brown flex items-center justify-center transition-all active:scale-95"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
                <p className="text-sm md:text-base text-brand-text leading-relaxed">{review.text}</p>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
