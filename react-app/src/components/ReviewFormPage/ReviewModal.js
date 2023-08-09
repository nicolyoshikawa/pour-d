import React, { useEffect, useState } from "react";
import OpenModalButton from "../OpenModalButton";
import ReviewFormPage from "./index";

function ReviewModal({drink}) {
    const [showMenu, setShowMenu] = useState(true);
    const closeMenu = () => setShowMenu(false);
    return (
        <>
            <div>
                <OpenModalButton
                    buttonText="Check-In"
                    onItemClick={closeMenu}
                    modalComponent={<ReviewFormPage drink={drink}/>}
                />
            </div>
        </>
    )
}

export default ReviewModal;
