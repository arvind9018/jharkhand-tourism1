// pages/vendor/VendorReviews.tsx
import { useState } from 'react';

interface Review {
  id: string;
  productName: string;
  customerName: string;
  customerAvatar: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  response?: string;
  images?: string[];
}

export default function VendorReviews() {
  const [reviews, setReviews] = useState<Review[]>([
    { id: '1', productName: 'Dokra Tribal Horse', customerName: 'Rahul Sharma', customerAvatar: '👨', rating: 5, comment: 'Beautiful craftsmanship! The detailing is amazing. Worth every penny.', date: '2024-04-10', helpful: 24, response: 'Thank you for your appreciation! We take pride in our traditional craft.' },
    { id: '2', productName: 'Paitkar Scroll Painting', customerName: 'Priya Singh', customerAvatar: '👩', rating: 5, comment: 'Authentic tribal art. Colors are vibrant and it looks stunning on my wall.', date: '2024-04-08', helpful: 18 },
    { id: '3', productName: 'Bamboo Hand Basket', customerName: 'Amit Kumar', customerAvatar: '👨', rating: 4, comment: 'Good quality product. Perfect for daily use. Delivery was on time.', date: '2024-04-05', helpful: 12, response: 'Thank you for your feedback! We\'re glad you liked it.' },
    { id: '4', productName: 'Dokra Tribal Horse', customerName: 'Sneha Gupta', customerAvatar: '👩', rating: 5, comment: 'Excellent piece of art. Very happy with the purchase.', date: '2024-04-03', helpful: 9 },
    { id: '5', productName: 'Wooden Mask', customerName: 'Vikram Singh', customerAvatar: '👨', rating: 3, comment: 'Product is good but packaging could be better.', date: '2024-04-01', helpful: 5, response: 'Sorry for the inconvenience. We will improve our packaging.' },
  ]);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [responseText, setResponseText] = useState('');
  const [productFilter, setProductFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState(0);

  const products = ['all', 'Dokra Tribal Horse', 'Paitkar Scroll Painting', 'Bamboo Hand Basket', 'Wooden Mask'];

  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const ratingDistribution = { 5: reviews.filter(r => r.rating === 5).length, 4: reviews.filter(r => r.rating === 4).length, 3: reviews.filter(r => r.rating === 3).length, 2: reviews.filter(r => r.rating === 2).length, 1: reviews.filter(r => r.rating === 1).length };
  const totalHelpful = reviews.reduce((sum, r) => sum + r.helpful, 0);

  const handleAddResponse = (reviewId: string) => {
    setReviews(reviews.map(r => r.id === reviewId ? { ...r, response: responseText } : r));
    setSelectedReview(null);
    setResponseText('');
  };

  const filteredReviews = reviews.filter(r => {
    if (productFilter !== 'all' && r.productName !== productFilter) return false;
    if (ratingFilter !== 0 && r.rating !== ratingFilter) return false;
    return true;
  });

  const renderStars = (rating: number) => '★'.repeat(rating) + '☆'.repeat(5 - rating);

  return (
    <div className="min-h-screen bg-secondary py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-2">Customer Reviews</h1>
        <p className="text-gray-600 mb-8">See what customers say about your products</p>

        {/* Rating Summary */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-6xl font-bold text-primary mb-2">{averageRating.toFixed(1)}</div>
              <div className="text-2xl text-accent mb-2">{renderStars(Math.round(averageRating))}</div>
              <p className="text-gray-500">Based on {reviews.length} reviews</p>
            </div>
            <div className="space-y-2">
              {[5,4,3,2,1].map(star => (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-sm w-12">{star} ★</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: `${(ratingDistribution[star] / reviews.length) * 100}%` }}></div>
                  </div>
                  <span className="text-sm text-gray-500 w-12">{ratingDistribution[star]}</span>
                </div>
              ))}
            </div>
            <div className="text-center border-l border-gray-200 pl-8">
              <div className="text-3xl font-bold text-primary mb-2">{totalHelpful}</div>
              <p className="text-gray-500">Helpful Votes Received</p>
              <div className="mt-4 flex justify-center gap-4">
                <div><span className="text-2xl block">⭐</span><span className="text-sm text-gray-500">5-Star: {ratingDistribution[5]}</span></div>
                <div><span className="text-2xl block">💬</span><span className="text-sm text-gray-500">Responses: {reviews.filter(r => r.response).length}</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div className="flex gap-2">
              <select value={productFilter} onChange={(e) => setProductFilter(e.target.value)} className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent">
                {products.map(p => <option key={p} value={p}>{p === 'all' ? 'All Products' : p}</option>)}
              </select>
              <select value={ratingFilter} onChange={(e) => setRatingFilter(parseInt(e.target.value))} className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent">
                <option value={0}>All Ratings</option>
                <option value={5}>5 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={2}>2 Stars</option>
                <option value={1}>1 Star</option>
              </select>
            </div>
            <button onClick={() => { setProductFilter('all'); setRatingFilter(0); }} className="text-accent text-sm hover:underline">Clear Filters</button>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {filteredReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-2xl">{review.customerAvatar}</div>
                  <div>
                    <h3 className="font-bold text-primary">{review.customerName}</h3>
                    <p className="text-sm text-gray-500">{review.productName} • {new Date(review.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-accent text-lg">{renderStars(review.rating)}</div>
                  <button className="text-sm text-gray-400 hover:text-accent transition mt-1">👍 {review.helpful}</button>
                </div>
              </div>
              <p className="text-gray-700 mt-4">{review.comment}</p>
              {review.images && review.images.length > 0 && (
                <div className="flex gap-2 mt-3">
                  {review.images.map((img, idx) => <img key={idx} src={img} alt="Review" className="w-16 h-16 rounded-lg object-cover" />)}
                </div>
              )}
              <div className="flex justify-end mt-4">
                <button onClick={() => setSelectedReview(review)} className="text-accent text-sm hover:underline">Reply to Review</button>
              </div>
              {review.response && (
                <div className="mt-4 p-4 bg-primary/5 rounded-lg">
                  <p className="text-sm font-medium text-primary">Your Response:</p>
                  <p className="text-sm text-gray-600 mt-1">{review.response}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Reply Modal */}
        {selectedReview && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6">
              <h3 className="text-xl font-bold text-primary mb-4">Reply to {selectedReview.customerName}</h3>
              <p className="text-sm text-gray-500 mb-3">Product: {selectedReview.productName}</p>
              <p className="text-sm text-gray-600 mb-3 p-3 bg-gray-50 rounded-lg">"{selectedReview.comment}"</p>
              <textarea value={responseText} onChange={(e) => setResponseText(e.target.value)} rows={4} placeholder="Write your response..." className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent mb-4" />
              <div className="flex gap-3">
                <button onClick={() => handleAddResponse(selectedReview.id)} className="flex-1 bg-accent text-white py-2 rounded-lg font-semibold hover:bg-accent-dark transition">Send Response</button>
                <button onClick={() => setSelectedReview(null)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}