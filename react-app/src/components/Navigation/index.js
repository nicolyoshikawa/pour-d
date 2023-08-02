import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul>
			<li>
				<NavLink exact to="/">Pour'd</NavLink>
			</li>
			{isLoaded && !sessionUser && (
				<>
					<li>
						<OpenModalButton
							buttonText="SIGN IN"
							modalComponent={<LoginFormModal />}
						/>
					</li>
					<li>
						<OpenModalButton
						buttonText="CREATE AN ACCOUNT"
						modalComponent={<SignupFormModal />}
						/>
					</li>
				</>
			)}
			{isLoaded && sessionUser && (
				<>
					<li>
						<NavLink exact to="/">Top Beers</NavLink>
					</li>
					<li>
						<ProfileButton user={sessionUser} />
					</li>
					<li>
						Search Bar
					</li>
				</>
			)}
		</ul>
	);
}

export default Navigation;
