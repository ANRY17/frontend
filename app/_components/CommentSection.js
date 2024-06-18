'use client';
import { useState, useEffect } from 'react';
import {
  postCommentAndRating,
  getCommentsAndRatingsBySlug,
} from '@/app/_lib/api';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function CommentSection({ blogId }) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [error, setError] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [averageRating, setAverageRating] = useState(null);
  const [existingReview, setExistingReview] = useState(null);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [loading, setLoading] = useState(true); // Initial loading state

  useEffect(() => {
    const fetchCommentsAndRatings = async () => {
      console.log(`Fetching comments and ratings for blogId: ${blogId}`);
      const data = await getCommentsAndRatingsBySlug(blogId);
      if (data) {
        console.log('Fetched data:', data);
        setComments(data.comments);
        setAverageRating(data.averageScore);

        // Check if user already submitted a review
        const user = JSON.parse(localStorage.getItem('user'));
        const userReview = data.comments.find(
          (review) => review.author && review.author.username === user?.username
        );
        setExistingReview(userReview);
        if (userReview) {
          setUserRating(userReview.score);
        }

        // Disable input if user already submitted a review
        setInputDisabled(!!userReview);
        setLoading(false); // Set loading to false after data fetch
      } else {
        console.error('Failed to fetch comments and ratings');
        setLoading(false); // Set loading to false on error
      }
    };
    fetchCommentsAndRatings();
  }, [blogId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to comment and rate.');
      return;
    }

    // Check if user already submitted a review
    if (existingReview) {
      setError('You have already submitted a review for this content.');
      return;
    }

    try {
      const response = await postCommentAndRating(
        blogId,
        comment,
        parseInt(userRating, 10),
        token
      );
      if (response && response.id) {
        const user = JSON.parse(localStorage.getItem('user'));
        const newComment = {
          id: response.id,
          comment: comment,
          createdAt: new Date().toISOString(),
          author: user,
          score: parseInt(userRating, 10),
        };
        setComments([...comments, newComment]);
        setComment('');
        setUserRating(0);
        setError('');
        setExistingReview(newComment);
        // Disable input after submitting a review
        setInputDisabled(true);
      } else {
        setError('Failed to post comment and rating.');
      }
    } catch (err) {
      setError('Failed to post comment and rating.');
    }
  };

  const handleRatingClick = (score) => {
    if (!inputDisabled) {
      setUserRating(score);
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-4">
        Leave a Comment and Rating
      </h2>
      {loading ? ( // Show skeleton loading if still loading
        <div className="space-y-4">
          <Skeleton height={50} />
          <Skeleton height={150} count={3} />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="rating">
              Rating:
            </label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  onClick={() => handleRatingClick(star)}
                  className={`h-8 w-8 cursor-pointer ${
                    userRating >= star ? 'text-yellow-500' : 'text-gray-300'
                  } ${inputDisabled ? 'cursor-not-allowed' : ''}`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="comment">
              Comment:
            </label>
            <textarea
              id="comment"
              rows="4"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              disabled={inputDisabled}
              placeholder="Write your comment here..."
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            disabled={inputDisabled}
          >
            Submit
          </button>
        </form>
      )}
      {error && <p className="text-red-500">{error}</p>}
      <h3 className="text-xl font-semibold mb-4">
        Average Rating:{' '}
        {averageRating !== null ? averageRating : 'No ratings yet'}
      </h3>
      {loading ? ( // Show skeleton loading for comments if still loading
        <div className="space-y-4">
          <Skeleton height={100} count={3} />
        </div>
      ) : (
        <ul>
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="mb-4 p-4 border border-gray-300 rounded-md"
            >
              <div className="flex items-center mb-2">
                <strong className="mr-2">
                  {comment.author?.username || 'Anonymous'}:
                </strong>
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`h-5 w-5 ${
                      comment.score >= star
                        ? 'text-yellow-500'
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p>{comment.comment}</p>
              <em className="text-gray-500 text-sm">
                {new Date(comment.createdAt).toLocaleString()}
              </em>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
