// pages/guide/GuideReviews.tsx
import { useState } from 'react';

interface Review {
  id: string;
  customerName: string;
  customerAvatar: string;
  tourName: string;
  tourDate: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  response?: string;
}

export default function GuideReviews() {
  const [reviews, setReviews] = useState<Review[]>([
    { id: '1', customerName: 'Rahul Sharma', customerAvatar: '👨', tourName: 'Waterfall Trekking Tour', tourDate: '2024-04-20', rating: 5, comment: 'Excellent tour guide! Very knowledgeable and friendly. Made the trip memorable.', date: '2024-04-21', helpful: 12, response: 'Thank you for your kind words! Hope to see you again.' },
    { id: '2', customerName: 'Priya Singh', customerAvatar: '👩', tourName: 'Waterfall Trekking Tour', tourDate: '2024-04-22', rating: 4, comment: 'Good experience overall. The guide was professional and punctual.', date: '2024-04-23', helpful: 5 },
    { id: '3', customerName: 'Amit Kumar', customerAvatar: '👨', tourName: 'Wildlife Safari Tour', tourDate: '2024-04-25', rating: 5, comment: 'Amazing safari experience! Saw many animals. The guide was very informative.', date: '2024-04-26', helpful: 18, response: 'Glad you enjoyed the safari! It was a pleasure guiding you.' },
    { id: '4', customerName: 'Sneha Gupta', customerAvatar: '👩', tourName: 'Wildlife Safari Tour', tourDate: '2024-04-18', rating: 4, comment: 'Great tour, well organized. Would recommend.', date: '2024-04-19', helpful: 3 },
  ]);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [responseText, setResponseText] = useState('');
  const [filterRating, setFilterRating] = useState(0);
  const [sortBy, setSortBy] = useState('latest');

  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const ratingDistribution = { 5: reviews.filter(r => r.rating === 5).length, 4: reviews.filter(r => r.rating === 4).length, 3: reviews.filter(r => r.rating === 3).length, 2: reviews.filter(r => r.rating === 2).length, 1: reviews.filter(r => r.rating === 1).length };

  const handleAddResponse = (reviewId: string) => {
    setReviews(reviews.map(r => r.id === reviewId ? { ...r, response: responseText } : r));
    setSelectedReview(null);
    setResponseText('');
  };

  const filteredReviews = reviews.filter(r => filterRating === 0 || r.rating === filterRating);
  const sortedReviews = [...filteredReviews].sort((a, b) => sortBy === 'latest' ? new Date(b.date).getTime() - new Date(a.date).getTime() : b.rating - a.rating);

  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="min-h-screen bg-secondary py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-2">Customer Reviews</h1>
        <p className="text-gray-600 mb-8">See what customers say about your tours</p>

        {/* Rating Summary */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
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
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div className="flex gap-2">
              {[0,5,4,3,2,1].map(rating => (
                <button key={rating} onClick={() => setFilterRating(rating)} className={`px-4 py-2 rounded-lg transition ${filterRating === rating ? 'bg-accent text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{rating === 0 ? 'All' : `${rating} ★`}</button>
              ))}
            </div>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent">
              <option value="latest">Latest First</option>
              <option value="highest">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {sortedReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-2xl">{review.customerAvatar}</div>
                  <div><h3 className="font-bold text-primary">{review.customerName}</h3><p className="text-sm text-gray-500">{review.tourName} • {new Date(review.tourDate).toLocaleDateString()}</p></div>
                </div>
                <div className="text-right"><div className="text-accent text-lg">{renderStars(review.rating)}</div><p className="text-xs text-gray-400">{new Date(review.date).toLocaleDateString()}</p></div>
              </div>
              <p className="text-gray-700 mt-4">{review.comment}</p>
              <div className="flex justify-between items-center mt-4">
                <button className="text-sm text-gray-500 hover:text-accent transition">👍 Helpful ({review.helpful})</button>
                <button onClick={() => setSelectedReview(review)} className="text-sm text-accent hover:underline">Reply</button>
              </div>
              {review.response && <div className="mt-4 p-4 bg-primary/5 rounded-lg"><p className="text-sm font-medium text-primary">Your Response:</p><p className="text-sm text-gray-600 mt-1">{review.response}</p></div>}
            </div>
          ))}
        </div>

        {/* Reply Modal */}
        {selectedReview && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6">
              <h3 className="text-xl font-bold text-primary mb-4">Reply to {selectedReview.customerName}</h3>
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