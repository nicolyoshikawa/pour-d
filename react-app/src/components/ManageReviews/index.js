import OpenModalButton from "../OpenModalButton";
import { useState } from "react";
import { useSelector } from "react-redux";
import DeleteReview from "../DeleteReview";
import EditReview from "../EditReview";

const ManageReview = ({review, drink}) => {
    const [showMenu, setShowMenu] = useState(true);
    const user = useSelector(state => state.session.user);
    const closeMenu = () => setShowMenu(false);

    let ownReview = false;
    if(user?.id === review?.user_id){
        ownReview = true;
    }

    return (
        <>
        {showMenu && ownReview && (
            <>
                <div className="review-edit">
                    <div className="review-edit-button">
                        <OpenModalButton
                            buttonText="Edit"
                            onItemClick={closeMenu}
                            modalComponent={<EditReview drink={drink} review={review}/>}
                        />
                    </div>
                    <div className="review-edit-button">
                        <OpenModalButton
                            buttonText="Delete"
                            onItemClick={closeMenu}
                            modalComponent={<DeleteReview drink={drink} review={review}/>}
                        />
                    </div>
                </div>
            </>
        )}
    </>
    )
}

export default ManageReview;
