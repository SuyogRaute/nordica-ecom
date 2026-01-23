import React, { useState } from 'react';
import { Star, Check, ChevronDown } from 'lucide-react';

const CustomerReviewsSection = ({ 
  overallRating = 4.8,
  totalReviews = 564,
  ratingBreakdown = [
    { stars: 5, percentage: 75, count: 423 },
    { stars: 4, percentage: 15, count: 85 },
    { stars: 3, percentage: 6, count: 34 },
    { stars: 2, percentage: 3, count: 17 },
    { stars: 1, percentage: 1, count: 5 },
  ],
  reviews = [],
  onWriteReview = () => {},
  onLoadMore = () => {}
}) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const renderStars = (rating, size = 'w-4 h-4') => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`${size} ${
          i < Math.floor(rating)
            ? 'fill-orange-400 text-orange-400'
            : i < rating
            ? 'fill-orange-400 text-orange-400'
            : 'fill-none text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section>
      <div className="container mx-auto px-4 mt-16">
        <div className="max-w-6xl mx-auto">

          {/* Section Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Customer Reviews</h2>
            <p className="text-gray-600">See what our customers are saying about this product</p>
          </div>

          {/* Rating Overview */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Left Side - Overall Rating */}
              <div className="flex flex-col items-center justify-center text-center border-r-0 md:border-r border-gray-200">
                <div className="mb-4">
                  <div className="text-5xl font-bold text-gray-900 mb-2">
                    {overallRating.toFixed(1)}
                  </div>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {renderStars(overallRating, 'w-6 h-6')}
                  </div>
                  <p className="text-sm text-gray-600">
                    Based on {totalReviews.toLocaleString()} reviews
                  </p>
                </div>
                <button 
                  onClick={onWriteReview}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Star className="w-4 h-4" />
                  Write a Review
                </button>
              </div>

              {/* Right Side - Rating Breakdown */}
              <div className="space-y-3">
                {ratingBreakdown.map((rating) => (
                  <div key={rating.stars} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-16">
                      <span className="text-sm font-medium text-gray-900">{rating.stars}</span>
                      <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                    </div>
                    <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-orange-400 transition-all duration-500"
                        style={{ width: `${rating.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-16 text-right">
                      {rating.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Filter and Sort */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-900">Filter by:</span>
              <button 
                onClick={() => setSelectedFilter('all')}
                className={`px-3 py-1.5 text-sm border rounded-lg transition-colors ${
                  selectedFilter === 'all' 
                    ? 'bg-gray-900 text-white border-gray-900' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                All Stars
              </button>
              <button 
                onClick={() => setSelectedFilter('verified')}
                className={`px-3 py-1.5 text-sm border rounded-lg transition-colors ${
                  selectedFilter === 'verified' 
                    ? 'bg-gray-900 text-white border-gray-900' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Verified Purchase
              </button>
              <button 
                onClick={() => setSelectedFilter('photos')}
                className={`px-3 py-1.5 text-sm border rounded-lg transition-colors ${
                  selectedFilter === 'photos' 
                    ? 'bg-gray-900 text-white border-gray-900' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                With Photos
              </button>
            </div>
            <div className="ml-auto">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900"
              >
                <option value="recent">Most Recent</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
                <option value="helpful">Most Helpful</option>
              </select>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-semibold text-blue-600">
                      {getInitials(review.name)}
                    </span>
                  </div>

                  {/* Review Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{review.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex">
                            {renderStars(review.rating)}
                          </div>
                          <span className="text-sm font-semibold text-gray-900">
                            {review.title}
                          </span>
                        </div>
                      </div>
                      <span className="text-sm text-gray-600">{review.date}</span>
                    </div>

                    {review.verified && (
                      <div className="mb-3">
                        <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          <Check className="w-3 h-3 mr-1" />
                          Verified Purchase
                        </span>
                      </div>
                    )}

                    <p className="text-sm text-gray-900 leading-relaxed mb-4">
                      {review.comment}
                    </p>

                    {/* Review Images */}
                    {review.images && review.images.length > 0 && (
                      <div className="flex gap-2 mb-4">
                        {review.images.map((image, imgIndex) => (
                          <div 
                            key={imgIndex}
                            className="w-20 h-20 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden"
                          >
                            <img 
                              src={image} 
                              alt={`Review ${imgIndex + 1}`} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Helpful Actions */}
                    <div className="flex items-center gap-4 pt-3 border-t border-gray-200">
                      <button className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1">
                        <Check className="w-4 h-4" />
                        Helpful ({review.helpfulCount || 0})
                      </button>
                      <button className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                        Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-8">
            <button 
              onClick={onLoadMore}
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ChevronDown className="w-4 h-4" />
              Load More Reviews
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};export default CustomerReviewsSection;