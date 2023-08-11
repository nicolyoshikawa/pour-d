import React, { useState } from "react";
import OpenModalButton from "../OpenModalButton";
import ReviewFormPage from "./index";
import beer_icon_check from "../../assets/beer_icon_check.png";

function ReviewModal({user, drink}) {
    const [showMenu, setShowMenu] = useState(true);
    const closeMenu = () => setShowMenu(false);
    return (
        <>
            { showMenu && (
                <div className="check-in-button tooltip">
                    <span></span>
                    <OpenModalButton
                        buttonText={<img src={beer_icon_check} alt="Leave A Review" className="check-box"/>}
                        onItemClick={closeMenu}
                        modalComponent={<ReviewFormPage drink={drink} user={user}/>}
                    />
                    <span className="tooltiptext">Leave A Review</span>
                </div>
            )}
        </>
    )
}

export default ReviewModal;
