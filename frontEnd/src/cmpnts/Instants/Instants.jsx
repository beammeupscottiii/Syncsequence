import React, { useState, useReducer, useEffect } from 'react';
import useWebSocket, {ReadyState} from 'react-use-websocket';
import {useNavigate} from 'react-router-dom';
import APIaccess from '../../apiaccess';
import './notifs.css';

const accessAPI = APIaccess();

export default function Instants({
	sendMessage, 
	socketMessage, 
	setSocketMessage, 
	setActive, 
	isActive, 
	accessID, 
	setAccessID, 
	getUnreadCount,
	current,
	setCurrent
}) {


	/* 
		this element is a pop up which takes the 
		- message
		- function 
		from the component, and provides a confirm message
		or a confirm button within it

		I suppose it should have some internal functions for when
		it is prompted externally
	*/

	let InstantNotifier = (message, func, intOacc) => {

		//if intOacc is true: it is interaction
		//if int0acc is false: it is accept

		let el = React.useRef();
  		let element = el.current
  		let [activated, setActivated] = React.useReducer(state => !state, true);

		return (
			<div id='InstantNotifier' 
				 ref={element} 
				 className={`${activated ? 'on' : 'off'}`}>

				<p id="message">
					{message}
				</p>

				<ul id="options">
					<li><button className={`buttonDefault`}>Confirm</button></li>
					<li>
						<button className={`buttonDefault`}>
							{`${intOacc = true ? 'Interact' : 'Accept'}`}
						</button>
					</li>
					<li><button className={`buttonDefault`}>Cancel</button></li>
				</ul>
			</div>
		)
	}


	return (
		InstantNotifier(message, func);
	)
}