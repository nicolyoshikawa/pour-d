import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
// import OpenModalButton from "../OpenModalButton";
// import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul className='navBar'>
			{!sessionUser && (
				<li>
					<NavLink exact to="/">Pour'd Logo</NavLink>
				</li>
			)}
			{isLoaded && sessionUser && (
				<>
					<li>
						<NavLink exact to="/home">Pour'd Logo</NavLink>
					</li>
					<li>
						<NavLink exact to="/drinks">Drinks List</NavLink>
					</li>
					<li>
						<NavLink exact to="/drinks/top-rated">Top Drinks</NavLink>
					</li>
					<li>
						<ProfileButton user={sessionUser} />
					</li>
					<li>
						{/* <input type='text' placeholder='Find a beer...'></input> */}
						Search bar coming soon
					</li>
				</>
			)}
		</ul>
	);
}

export default Navigation;
