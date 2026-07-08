/* * * V i t a l s * * */
import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import APIaccess from '../../apiaccess';
import { useUIC } from '../../UIcontext';


import './ManageConnections.css';


let accessAPI = APIaccess();


let twoWaySVG = 
	<svg 
		id="repost"
		xmlns="http://www.w3.org/2000/svg" 
		width="19.319" 
		height="18.766" 
		viewBox="0 0 19.319 18.766">
	  <g id="Group_540" data-name="Group 540" transform="translate(-3760.379 -882.706)">
	    <g id="Group_355" data-name="Group 355" transform="translate(3760.879 883.089)">
	      <path id="Path_2" data-name="Path 2" class="cls-1" d="M8.465,3.8S1.189,3.119-.208,5.264a9.3,9.3,0,0,0,0,8.58c1.4,2.145,5.591,1.37,5.591,1.37" transform="translate(1.257 -0.567)"/>
	      <line id="Line_215" data-name="Line 215" class="cls-2" x2="5.005" transform="translate(6.039 0) rotate(40)"/>
	      <line id="Line_216" data-name="Line 216" class="cls-2" x2="5.005" transform="translate(6.039 6.435) rotate(-40)"/>
	    </g>
	    <g id="Group_356" data-name="Group 356" transform="translate(3769.222 886.354)">
	      <path id="Path_3" data-name="Path 3" class="cls-1" d="M9.555.215S2.446-.747,1.048,1.4a9.3,9.3,0,0,0,0,8.58c1.4,2.145,5.591,1.37,5.591,1.37" transform="translate(9.976 11.484) rotate(-180)"/>
	      <line id="Line_217" data-name="Line 217" class="cls-2" x2="5.005" transform="translate(3.834 8.3) rotate(140)"/>
	      <line id="Line_218" data-name="Line 218" class="cls-2" x2="5.005" transform="translate(4.669 14.735) rotate(-140)"/>
	    </g>
	  </g>
	</svg>

let oneWaySVG = 
	<svg 
		xmlns="http://www.w3.org/2000/svg" 
		width="20.579" 
		height="15.466" 
		viewBox="0 0 20.579 15.466">
	  <g id="Group_605" data-name="Group 605" transform="translate(-323.535 -463.77)">
	    <path id="Path_12" data-name="Path 12" d="M0,.4H18.1c6.895,0-6.487-8.712-6.487-8.712" transform="translate(323.535 472.5)" fill="none" stroke="#707070" stroke-width="1"/>
	    <path id="Path_13" data-name="Path 13" d="M0-8.311H18.1C24.993-8.311,11.612,0,11.612,0" transform="translate(323.535 478.811)" fill="none" stroke="#707070" stroke-width="1"/>
	  </g>
	</svg>



export default function ManageConnections({
	setCurrent, 
	current, 
	setSocketMessage,
	setManageConnectionsToggle,
	sectionClass,
    setSectionClass
}) {

	const navigate = useNavigate(),
		  {triggerPopup, baseRef} = useUIC(),
		  userID = sessionStorage.getItem('userID'),
		  userName = sessionStorage.getItem('userName'),
		  [connections, setConnections] = React.useState([]),
		  [searchQuery, setSearchQuery] = React.useState(''),	
		  [searchResults, setSearchResults] = React.useState([]),
		  [searchFocus, setSearchFocus] = React.useState(false),
		  [results, toggleResults] = React.useReducer(state => !state, false),
		  [showFilter, setShowFilter] = React.useReducer(state => !state, false),
		  [filterMode, setFilterMode] = React.useState('');
		  //typeConn, typeSubber, typeSubbed, mostRecent, leastRecent, AZalpha, ZAalpha

	const onChange = async(e) => {
		e.preventDefault();
		setSearchQuery(e.target.value);
	}

	React.useEffect(() => {
	    if (searchQuery.length < 2) {
	        setSearchResults([]);
	        return;
	    }

	    const delayDebounceFn = setTimeout(async () => {
	        try {
	            let results = await accessAPI.searchUsers(searchQuery);

	            const formattedResults = results.map(user => ({
	                ...user,
	                selected: false
	            }));

	            setSearchResults(formattedResults);

	        } catch (err) {
	            console.error("Search failed:", err);
	        }
	    }, 400); 

	    // If the user types another letter before 400ms is up, 
	    // this clears the previous timer and starts a new one.
	    return () => clearTimeout(delayDebounceFn);
	}, [searchQuery]);


	const requestConnection = async(recipientID, username) => {
		let notif = {
			type: 'request',
			senderID: userID,
			senderUsername: userName,
			recipients: [recipientID],
			message: 'sent',
			recipientUsername: username
		}
		setSocketMessage(notif);
	}

	const removeConnection = async(userID, username) => {
		let remove = await accessAPI.removeConnection(userID);
		
		updateConnections();

		// if(remove == true) {
		// 	setSocketMessage({
		// 		type: 'confirmation',
		// 		message: 'removal',
		// 		username: username,
		// 	})
		// }
	}

	const removeSubscription = async(userID, username, direction) => {
		// let removeRequest = await accessAPI.removeSubscription(userID, direction).then((data)=> {

		// })
		let removeRequest = await accessAPI.removeSubscription(userID, direction);

		updateConnections();

		// if(removeRequest == true) {
		// 	setSocketMessage({
		// 		type: 'confirmation',
		// 		message: 'removal',
		// 		username: username,
		// 	})
		// }
	}

	const updateConnections = async()=> {
		let connections = await accessAPI.getConnections(userID);

		connections = connections.map(user => {
			return {
				...user,
				selected: false
			}
		})

		setConnections(connections);
	}

	let selectConnection = (id) => {

		let newList = connections.map(user => {
			if(user._id == id) {

				return {
					...user,
					selected: !user.selected
				}
			}
			else {

				return {
					...user,
					selected: false
				}
			}
		})
		setConnections(newList)
	}

	let selectResult = (id) => {

		let newList = searchResults.map(user => {
			if(user.id == id) {

				return {
					...user,
					selected: true
				}
			}
			else {

				return {
					...user,
					selected: false
				}
			}
		})
		setSearchResults(newList)
	}

	//deselects menu item when clicking outside of li
	React.useEffect(() => {
	    const handleClickOutside = (event) => {
	        // If the click is on the main container (not an LI), clear selection
	        // We check if the clicked element has the 'results-list' ID or class
	        if (event.target.id === 'manageConnections' || event.target.tagName === 'SECTION') {
	            setConnections(prev => prev.map(u => ({ ...u, selected: false })));
	            setSearchResults(prev => prev.map(u => ({ ...u, selected: false })));
	        }
	    };

	    window.addEventListener('click', handleClickOutside);
	    return () => window.removeEventListener('click', handleClickOutside);
	}, []);

	// let goToProfile = async(userid) => {

	// 	let modalCurrent = modal.current;
	// 	let data = await accessAPI.getSingleUser(userid);
	// 	navigate(`/user/${data.user.userName}/${data.user._id}`);
	// 	baseElement.classList.add('leave');

	// 	let delay1 = setTimeout(()=> {
	// 		modalCurrent.style.display = 'none';
	// 		baseElement.classList.add('return');
	// 	}, 600)

	// 	let delay = setTimeout(()=> {
	// 		baseElement.classList.remove('return');
	// 		baseElement.classList.remove('leave');
	// 		// setCurrent({
	// 		// 	...current,
	// 		// 	manageConnections: false,
	// 		// })
			
	// 		setSectionClass({
	// 			...sectionClass,
	// 			manageConnections: ''
	// 		})

	// 		setManageConnectionsToggle();
	// 	}, 1100)
	// }

	// let goToProfile = async(userid) => {
	//     let modalCurrent = modal.current;
	    
	//     // 1. START THE LEAVE ANIMATION IMMEDIATELY 
	//     // This gives the user instant visual feedback while the network loads
	//     baseElement.classList.add('leave');

	//     try {
	//         // 2. KICK OFF THE API FETCH (Runs concurrently while the screen animates)
	//         const dataPromise = accessAPI.getSingleUser(userid);
	        
	//         // 3. CREATE A GUARANTEED MINIMUM TIMER PROMISE (e.g., 600ms for your leave animation)
	//         const animationPromise = new Promise(resolve => setTimeout(resolve, 600));

	//         // 4. WAIT FOR BOTH: The data MUST be loaded AND the 600ms animation must finish
	//         const [data] = await Promise.all([dataPromise, animationPromise]);

	//         // 5. DATA IS LOADED & ANIMATION IS DONE -> UPDATE URL
	//         navigate(`/user/${data.user.userName}/${data.user._id}`);

	//         // 6. SWAP STYLES RIGHT away (No extra timeout needed!)
	//         modalCurrent.style.display = 'none';
	//         baseElement.classList.add('return');

	//         // 7. FINAL CLEANUP DELAY (The remaining 500ms for the return animation)
	//         setTimeout(() => {
	//             baseElement.classList.remove('return');
	//             baseElement.classList.remove('leave');
	            
	//             setSectionClass({
	//                 ...sectionClass,
	//                 manageConnections: ''
	//             });

	//             setManageConnectionsToggle();
	//         }, 500); // 1100ms total - 600ms elapsed = 500ms left

	//     } catch (error) {
	//         console.error("Failed to load profile data:", error);
	//         // Error fallback: clean up class names so the UI doesn't get permanently frozen
	//         baseElement.classList.remove('leave');
	//     }
	// };

	let goToProfile = (userID, username) => {

		navigate(`/user/${username}/${userID}`);
	}

	let filter_byType = () => {
		//if filterType nothing, type conn
		//if typeConn, then typeSubbed
		//if typeSubbed, then typeSubber
	}

	let filter_byRecency = () => {
		//mostRecent, if filterType is anything else
		//if mostRecent, then leastRecent

	}

	let filter_byAlphabet = () => {
		//first AZalpha,
		//if filterType is AZalpha, then ZAalpha 
	}

	//update main data on every reload
	React.useEffect(()=> {
		updateConnections();
	}, [searchFocus])


	// Enter / Exit Animation
	let modal = React.useRef();
	React.useEffect(()=> {
		let modalCurrent = modal.current;
		let delay = setTimeout(()=> {
			modalCurrent.classList.remove('_enter');	
		}, 200)
	}, [])

	let baseElement = baseRef.current;

	return (
		<div id="manageConnections" ref={modal} className={`${sectionClass.manageConnections}`}>

			{/* 
				S E A R C H  
				B A R
			*/}
			<form id="searchWrapper">
				<input type="text" 
				   id="search"
				   value={searchQuery}
				   onChange={onChange} 
				   onKeyDown={(e) => {
				   	if(e.key === 'Enter') {
				   		e.preventDefault();
				   	}
				   }}
				   placeholder="Search Users" 
				   onFocus={()=> {setSearchFocus(true)}}
				   onBlur={()=> {
				   	if(results.length < 1) {
				   		setSearchFocus(false);
				   		toggleResults();
				   	}
				   }}
				/>
			</form>
			
			{/* 
				C O N N E C T I O N S 
			*/}
			{(searchResults.length < 1 && !searchFocus) &&
					<div id="currentConnections">
						<ul>
							{connections.map((user, i) => (
								<li key={i} 
									data-id={user._id} 
									className={`${user.selected == true ? 'selected' : ''}`}
									onClick={(e)=> {
										e.preventDefault()
										selectConnection(user._id)
									}}>

									<div id="mainWrapper">
										<div id="imgWrapper">
											<img src={user.profilePhoto} />
											<div id="dot" 
											className={`${user.isAvailable == 'yes' ? 'active' : ''}
															${user.isAvailable == 'no' ? 'away' : ''}`}/>
										</div>
										
										<p>{user.userName} <span>{user.fullName}</span></p>

										<div id="svgWrapper"
											className={`${user.isConnection == true ? 'connection' : ''} ${user.isSubscriber == true ? 'subscriber' : ''} ${user.isSubscription == true ? 'subscription' : ''}`}>
											{user.isConnection == true ? twoWaySVG : null}
											{user.isSubscription || user.isSubscriber ? oneWaySVG : null}
										</div>
									</div>
									
									<div id="optionsWrapper">
										<button className={`buttonDefault`}
												onClick={()=> {goToProfile(user._id, user.userName)}}>
											Profile
										</button>
										<button className={`buttonDefault`}
												onClick={()=> {
													console.log(baseElement);
												}}>
											Message
										</button>
										<button className={`buttonDefault`}
												onClick={()=> {

													if(user.isConnection == true) {
														removeConnection(user._id, user.userName);
													}
													if(user.isSubscriber == true) {
														removeSubscription(user._id, user.userName, 'from');
													}
													if(user.isSubscription == true) {
														removeSubscription(user._id, user.userName, 'to');	
													}}}>
											Remove
										</button>
									</div>
								</li>
								/*use dataset.id to get and use it*/
							))}
						</ul>
					</div>
			}

			{/* S E A R C H   R E S U L T S*/}
			{searchResults.length > 0 &&
				<div id="searchResults">
					<ul>
						{searchResults.map((user, i) => (
							<li key={i} 
								data-id={user.id}
								className={`${user.selected == true ? 'selected' : ''}`}
								onClick={(e)=> {
									e.preventDefault()
									selectResult(user.id)
								}}>

								<div id="mainWrapper">
									<div id="imgWrapper">
										<img src={user.profilePhoto} />
									</div>
									
									<p>{user.username} <span>{user.fullname}</span></p>

									<div id="svgWrapper"
										className={`${user.isConnection == true ? 'connection' : ''} ${user.isSubscriber == true ? 'subscriber' : ''} ${user.isSubscription == true ? 'subscription' : ''}`}>
										{user.isConnection == true ? twoWaySVG : null}
										{user.isSubscription || user.isSubscriber ? oneWaySVG : null}
									</div>
								</div>
								
								<div id="optionsWrapper">
									<button className={`buttonDefault`}
											onClick={()=> {goToProfile(user.id)}}>
										Profile
									</button>
									<button className={`buttonDefault`}
											onClick={()=> {requestConnection(user.id, user.username)}}>
										Request
									</button>
								</div>
							</li>
						))}
					</ul>
				</div>
			}

			{/*
				O p t i o n s  W r a p p e r
			*/}
			<div id="optionsWrapper" 
				className={`${showFilter ? 'up' : ''}`}>
				
				{searchFocus &&
					<button className={`buttonDefault ${searchFocus ? 'open' : ''}`}
							id="return"
							onClick={(e)=> {
								e.preventDefault();
								setSearchResults([]); //empties results
								setSearchFocus(false);
								setSearchQuery('');

								if(searchResults < 1) {
									setSearchFocus(false);
								}
					}}>Return</button>
				}
				{/*{!searchFocus &&
					<div id="filtersWrapper">
						<p onClick={setShowFilter}>Filter Users By</p>
						<div id="filters">
							<button className={`buttonDefault`}>Type</button>
							<button className={`buttonDefault`}>Recency</button>
							<button className={`buttonDefault`}>Alphabet</button>
						</div>
					</div>
				}*/}
			</div>

			<div id="exitButtonWrapper">
				<button id="exit" 
						className={"buttonDefault"} 
						onClick={(e)=> {
					e.preventDefault();

					setSectionClass({
						...sectionClass,
						manageConnections: 'leave'
					});

					let delay = setTimeout(()=> {
						setCurrent({
							...current,
							manageConnections: false,
						})
					}, 300)
					let delay2 = setTimeout(()=> {
						setSectionClass({
							...sectionClass,
							manageConnections: ''
						})
						setManageConnectionsToggle();
					}, 600)	
				}}>✕</button>
			</div>
			
		</div>
	)
}