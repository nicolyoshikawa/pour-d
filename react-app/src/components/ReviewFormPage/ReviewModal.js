import React, { useState } from "react";
import OpenModalButton from "../OpenModalButton";
import ReviewFormPage from "./index";

function ReviewModal({user, drink}) {
    const [showMenu, setShowMenu] = useState(true);
    const closeMenu = () => setShowMenu(false);
    return (
        <>
            { showMenu && (
                <div>
                    <OpenModalButton
                        buttonText="Check Box"
                        onItemClick={closeMenu}
                        modalComponent={<ReviewFormPage drink={drink} user={user}/>}
                    />
                </div>
            )}
        </>
    )
}

export default ReviewModal;
