import React, { useState, useReducer, useEffect } from 'react';
import useWebSocket, {ReadyState} from 'react-use-websocket';
import {useNavigate} from 'react-router-dom';
import APIaccess from '../../apiaccess';
import './Instants.css';
import { useUIC } from '../../UIcontext';

const accessAPI = APIaccess();

export default function Instant({ isOpen, config, close }) {

	if(!isOpen) return null;

	const { message, onConfirm, onInteract, interactMessage, isOpenClass } = config;

	return (
	    <div id="Instants" className={`${isOpenClass ? 'active' : 'nonActive'}`}>

	        <p id="message">{message}</p>
	        
	        <div className="actions" onClick={(e) => e.stopPropagation()}>
	          {/* Cancel: Simply closes */}
	          <button className={`buttonDefault`} onClick={close}>Close</button>

	          {/* Confirm: Runs passed function + closes */}
	          {onConfirm && (
	            <button className={`buttonDefault`} onClick={() => { onConfirm(); close(); }}>
	              Confirm
	            </button>
	          )}

	          {/* Interact/Accept: Runs different logic */}
	          {onInteract && (
	            <button className={`buttonDefault`} onClick={(e) => { e.preventDefault(); onInteract(); close();}}>
	              {interactMessage}
	            </button>
	          )}
	        </div>
	    </div>
	  );





	/* 
		this element is a pop up which takes the 
		- message
		- confirmation function
		- or interaction function 
		from an external component, and provides a confirm button, 
		an accept or interact button and a cancel button.
		Cancel button simply closes the pop up.

		I suppose it should have some internal functions for when
		it is prompted externally
	*/

	// let InstantNotifier = (message, func, intOacc) => {

	// 	//if intOacc is true: it is interaction
	// 	//if int0acc is false: it is accept

	// 	let el = React.useRef();
  	// 	let element = el.current
  	// 	let [activated, setActivated] = React.useReducer(state => !state, true);

	// 	return (
	// 		<div id='InstantNotifier' 
	// 			 ref={element} 
	// 			 className={`${activated ? 'on' : 'off'}`}>

	// 			<p id="message">
	// 				{message}
	// 			</p>

	// 			<ul id="options">
	// 				<li><button className={`buttonDefault`}>Confirm</button></li>
	// 				<li>
	// 					<button className={`buttonDefault`}>
	// 						{`${intOacc = true ? 'Interact' : 'Accept'}`}
	// 					</button>
	// 				</li>
	// 				<li><button className={`buttonDefault`}>Cancel</button></li>
	// 			</ul>
	// 		</div>
	// 	)
	// }

	// return (
	// 	InstantNotifier(message, func);
	// )
}