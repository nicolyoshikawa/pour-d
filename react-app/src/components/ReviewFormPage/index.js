import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as reviewActions from "../../store/reviews";
import "./ReviewForm.css"

function ReviewFormPage({user, drink}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [content, setContent] = useState("");
  const [stars, setStars] = useState(1);
  const [review_img_url, setReview_img_url] = useState("");
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { closeModal } = useModal();

  const user_id = user.id
  const drink_id = drink.id

  useEffect(() => {
    const errors = [];
    if(content && content.length > 500) errors.push("Your review needs to be less than 500 characters");
    if(stars && (stars > 5 || stars < 1)) errors.push("Stars needs to be between 1 and 5");
    if(review_img_url && (!review_img_url.endsWith(".png") &&
        !review_img_url.endsWith(".jpg") && !review_img_url.endsWith(".jpeg"))) {
        errors.push("Image URL must end in .png, .jpg, or .jpeg");
    }
    if(review_img_url && review_img_url.length > 255) {
        errors.push("Image URL needs to be under 255 characters");
    }
    setErrors(errors);
  }, [content, stars, review_img_url, hasSubmitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    const newReview = {content, stars, review_img_url, user_id, drink_id};

    if(Object.values(errors).length === 0){
        setErrors([]);

        const review = await dispatch(reviewActions.createNewReview(newReview, drink));
        if(review.errors){
          const errors = [];
          errors.push(review.errors);
          setErrors(errors);
        } else {
          reset();
          history.push(`/drinks/${review.drink_id}`);
          setErrors([]);
          closeModal();
        }
    }
  };
  const reset = () => {
    setContent("");
    setStars(1);
    setReview_img_url("");
    setErrors([]);
    setHasSubmitted(false);
  };

  return (
    <>
        <div>
        <div className="review-form-container">
            <div className="check-in">Leave A Review</div>
            {hasSubmitted && errors.length > 0 && (
            <div className="review-form-container-errors">
                <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
                </ul>
            </div>
            )}
            <form onSubmit={handleSubmit}>
            <div className="review-form-input-container">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    name='body'
                    placeholder="What did you think?"
                    required
                />
            </div>
            <div className="review-form-input-container">
              <i className="fa-solid fa-camera"></i>
                <input
                    type='text'
                    onChange={(e) => setReview_img_url(e.target.value)}
                    value={review_img_url}
                    placeholder='Review Image'
                    name='drink_img_url'
                />
            </div>
            <div className="review-form-input-container-ratings">
              <div className="ratings">
                <div className="rate">
                    <input type="radio" id="star5" name="rate" value={5} onChange={(e) => setStars(e.target.value)}/>
                    <label htmlFor="star5"></label>
                    <input type="radio" id="star4" name="rate" value={4} onChange={(e) => setStars(e.target.value)}/>
                    <label htmlFor="star4"></label>
                    <input type="radio" id="star3" name="rate" value={3} onChange={(e) => setStars(e.target.value)}/>
                    <label htmlFor="star3"></label>
                    <input type="radio" id="star2" name="rate" value={2} onChange={(e) => setStars(e.target.value)}/>
                    <label htmlFor="star2"></label>
                    <input type="radio" id="star1" name="rate" value={1} onChange={(e) => setStars(e.target.value)}/>
                    <label htmlFor="star1"></label>
                </div>
                <div className="ratings StarLabel"></div>
              </div>
            </div>
            <button type="submit" className="review-button">Confirm</button>
            </form>
        </div>
        </div>
    </>
  );
}

export default ReviewFormPage;
