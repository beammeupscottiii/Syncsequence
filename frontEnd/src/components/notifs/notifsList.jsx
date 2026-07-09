import * as React from 'react';
import {useNavigate, Link } from 'react-router-dom';
import APIaccess from '../../apiaccess';
import { useUIC } from '../../UIcontext';

import '../../components/base/home.css';
import './notifs.css';

let accessAPI = APIaccess();


export default function NotificationList({
	setNotifList, 
	unreadCount, 
	setUnreadCount, 
	setSocketMessage, 
	socketMessage, 
	accessID, 
	setAccessID,
	current,
	setCurrent
}) {

	let [notifs, setNotifs] = React.useState([]);
	let username = sessionStorage.getItem('userName');
	let userID = sessionStorage.getItem('userID');
	let navigate = useNavigate();
	const { logout, triggerPopup } = useUIC();

	console.log(username);

	let updateList = async() => {
		let data = await accessAPI.getInteractions(); 

		let count = 0;
	     for(let i = 0; i < data.length; i++) {
	        if(data[i].isRead == false) {
	            count++;
	        }
	      }
	    // if(count < 10) {
	    //   count = '0' + count;
	    // } else if (count > 99) {
	    //   count = '99';
	    // }
	    setUnreadCount(count);
		setNotifs(data);
	}

	let interact = async(arg, notif, postID) => {

		/* 
			set middle two arguments as 'undefined' when using
			function for posts / comments
		*/

		if(arg == 'accept') {

			//07. 04. 2026
			//updating this now even though component needs to be redone
			console.log('running accept request...')
			console.log(notif);

			let sm = {
				type: 'request',
				recipients: [notif.sender],
				message: 'connectionAcceptedSent',
				originalNotif: notif._id
			};
			console.log(sm);
			// setSocketMessage(sm);

			let request = await accessAPI.newInteraction(sm);
			if(request.confirm == true) {
				triggerPopup({
					message: `You are now connected`
				})
			}
		} 
		else if(arg == 'markRead') {

				let sm = {
					type: 'markRead',
					notifID: notif._id,
				};
				let request = await accessAPI.newInteraction(sm)

				if(request) {
					let delay = setTimeout(()=> {
						updateList();
					}, 200)
				}		
		}
		else if(arg == 'accessGranted') {

			let accessGrantedNotif = await accessAPI.newInteraction({
				type: 'request',
				message: 'accessGranted',
				senderID: userID,
				recipients: [notif.sender],
				recipientUsernames: notif.senderUsername,
				groupName: notif.details.groupName,
				groupID: notif.details.groupID,
				originalID: notif._id
			}).then(data=> {
				if(data.confirmation) {
					updateList();
					setSocketMessage({
						// message: `Access granted to @${macroInfo.ownerUsername}`,
						recipients: [notif.sender],
						action: 'updateNotifs'
					})
				}
			})

			// let request = await accessAPI.manageGroup('addUser', {
			// 	userID: notif.sender,
			// 	groupID: notif.details.groupID
			// })
		}
		else if(arg == 'subscriptionAccepted') {

			let body = {
				type: 'request',
				senderID: userID,
				senderUsername: username,
				recipients: [notif.sender],
				recipientUsername: notif.senderUsername,
				message: 'subscriptionAccepted'
			}

			let sm = {
					type: 'markRead',
					notifID: notif._id,
					userID: userID,
					// senderUsername: username
				};
			let request = await accessAPI.newInteraction(sm)

			setSocketMessage(body);
			console.log(body);

			let delay = setTimeout(()=> {
				updateList()
			}, 200)
		}
	}

	let goToUserProfile = async() => {

		let data = await accessAPI.getSingleUser(userID);
		
		let delay = setTimeout(()=> {
			navigate(`/user/${username}/${userID}`)
		}, 150)
	}

	let goToUserSettings = async() => {

		let settings = await accessAPI.userSettings({option: 'getUserSettings'});

		let delay = setTimeout(()=> {
			navigate(`/${username}/settings`, {
				state: {
					data: settings
				}
			})
		}, 150)
	}

	let goToPost = async(postID, commentID) => {

		let post = await accessAPI.getBlogPost(postID);
		setTimeout(()=> {
			navigate(`/post/${postID}`, {
					state: {commentID: commentID}
				})
		}, 300)
	}

	let goToMacrosPage = async(macroID, macroName) => {

		let tagInfo = await accessAPI.getTagData(macroID, macroName);
		let posts = await accessAPI.groupPosts({action: 'getPosts', groupID: macroID, groupName: macroName});
		let postsCount = posts.length;

		let doesHaveAccess;
		if(tagInfo.hasAccess) {
			doesHaveAccess = tagInfo.hasAccess.filter(el => el == userID);
			doesHaveAccess = doesHaveAccess.length > 0 ? true : false;
		}
		
		console.log(tagInfo);
									
		setTimeout(()=> {
			navigate(`/macros/${macroName}`, {
					state: {
						name: macroName,
						posts: posts,
						macroID: macroID,
						isPrivate: tagInfo.isPrivate,
						hasAccess: doesHaveAccess,
						ownerUsername: tagInfo.adminUsernames ? tagInfo.adminUsernames[0] : null,
						ownerID: tagInfo.admins ? tagInfo.admins[0] : null,
						type: tagInfo.type == undefined ? 'topic' : tagInfo.type,
						userCount: tagInfo.hasAccess ? tagInfo.hasAccess.length : null,
						postCount: postsCount ? postsCount : 0
					}
				})
		}, 200)
	}

	React.useEffect(()=> {
		updateList();

		return ()=> {
			setCurrent(prev => ({
				...prev,
				updateToggle: prev.updateToggle ? false : true
			}));
		}
	}, [])

	React.useEffect(()=> {
		updateList();
	}, [socketMessage])



	let returnNotifType = (notif) => {

		let postTitle;
		if(!notif.details) {
			postTitle = undefined; 
		}
		else postTitle = notif.details.postTitle 
		
		// save notif._id as key
		return <li className="notif" key={notif._id}>
				{notif.isRead == false &&
					<span className="unread">!</span>
				}

				<div id="body">
					{(notif.message == 'connectionRequestSent') &&
						<p>You sent @{notif.recipientUsernames[0]} a request !</p>
					}
					{(notif.message == 'connectionRequestRecieved') &&
						<p>You recieved a connection request from {notif.senderUsername}</p>
					}
					{(notif.message == 'connectionAcceptedSent') &&
						<p>You and @{notif.recipientUsernames[0]} are now connected!</p>
					}
					{(notif.message == 'connectionAcceptedRecieved') &&
						<p>You and @{notif.senderUsername} are now connected!</p>
					}
					{(notif.message == 'initial') &&
						<p>{notif.senderUsername} left a comment on your post "{postTitle}"</p>
					}
					{(notif.message == 'response') &&
						<p>{notif.senderUsername} responded to your comment on "{postTitle}"</p>
					}
					{(notif.message == 'recieved') &&
						<p>{notif.senderUsername} tagged you in a post "{postTitle}"</p>
					}
					{(notif.message == 'accessRequested') &&
						<p>{notif.senderUsername} is requesting access to "{notif.details.groupName}"</p>
					}
					{(notif.message == 'subscriptionRequest') &&
						<p>You requested subscription to @{notif.recipientUsernames[0]}</p>
					}
					{(notif.message == 'subscriptionRequested') &&
						<p>{notif.senderUsername} wishes to subscribe</p>
					}
					{(notif.message == 'subscriptionAccepted') &&
						<p>{notif.recipientUsernames[0]} is now a subscriber!</p>
					}
					{(notif.message == 'subscribed') &&
						<p>You are now subscribed to @{notif.senderUsername}</p>
					}
					{(notif.message == 'accessGranted') &&
						<p>{notif.senderUsername} has granted you access to "{notif.details.groupName}"</p>
					}

					{notif.message == 'comment' && 
						<div className="options">
							<button className="buttonDefault" onClick={(e)=> {
								e.preventDefault()
								goToPost(notif.url, notif.details.commentID)
							}}>See Comment</button>
							<button className="buttonDefault"
									onClick={()=> {interact('markRead', notif._id, username )}}>
								Mark Read
							</button>
						</div>
					}

					{notif.message == 'tagging' &&
						<div className="options">
							<button className="buttonDefault" onClick={()=> {
								goToPost(notif.url)
								if(notif.isRead == false) {
									interact('markRead', notif._id, username )
								}
							}}>See Post</button> 
							<button className="buttonDefault"
									onClick={()=> {interact('markRead', notif._id )}}>
								Mark Read
							</button>
						</div>
					}

					{(notif.message == 'connectionRequestRecieved') &&
						<div className="options">
							<button className="buttonDefault" 
									onClick={()=> {
										interact('accept', notif)
										interact('markRead', notif)
									}}>
								Accept
							</button>
							<button className="buttonDefault" 
									onClick={()=> {interact('markRead', notif)}}>
								Ignore
							</button>
						</div>
					}
					{(notif.message == 'connectionRequestSent') &&
						<div className="options">
							<button className="buttonDefault"
									onClick={()=> {interact('markRead', notif )}}>
								Mark Read
							</button>
						</div>
					}

					{(notif.message == 'connectionAcceptedSent') &&
						<div className="options">
							<button className="buttonDefault"
									onClick={()=> {interact('markRead', notif )}}>
								Mark Read
							</button>
						</div>
					}

					{(notif.message == 'connectionAcceptedRecieved') &&
						<div className="options">
							<button className="buttonDefault"
									onClick={()=> {interact('markRead', notif )}}>
								Mark Read
							</button>
						</div>
					}

					{(notif.message == 'accept') &&
						<div className="options">
							<button className="buttonDefault"
									onClick={()=> {interact('markRead', notif )}}>
								Mark Read
							</button>
						</div>
					}
					{(notif.message == 'accessGranted') &&
						<div className="options">
							<button className="buttonDefault"
									onClick={()=> {goToMacrosPage(notif.details.groupID, notif.details.groupName)}}>
								Go To Macro
							</button>
							<button className="buttonDefault"
									onClick={()=> {interact('markRead', notif )}}>
								Mark Read
							</button>
						</div>
					}
					{(notif.message == 'accessRequested') &&
						<div className="options">
							<button className="buttonDefault" 
									onClick={()=> {
										console.log(notif)
										interact('accessGranted', notif)}}>
								Give Access
							</button>
							<button className="buttonDefault" 
									onClick={()=> {
										console.log(notif)
										interact('markRead', notif )
									}}>
								Ignore
							</button>
						</div>
					}
					{(notif.message == 'subscriptionRequested') &&
						<div className="options">
							<button className="buttonDefault" 
									onClick={()=> {
										console.log(notif)
										interact('subscriptionAccepted', notif.recipients[0], undefined, undefined, notif)}}>
								Accept
							</button>
							<button className="buttonDefault" 
									onClick={()=> {
										console.log(notif)
										interact('markRead', notif )
									}}>
								Ignore
							</button>
						</div>
					}
					{(notif.message == 'subscriptionAccepted') &&
						<div className="options">
							<button className="buttonDefault" 
									onClick={()=> {
										console.log(notif)
										interact('markRead', notif )
									}}>
								Mark Read
							</button>
						</div>
					}
				</div>
			   </li>
	}

	let modal = React.useRef();
	React.useEffect(()=> {
		let modalCurrent = modal.current;
		let delay = setTimeout(()=> {
			modalCurrent.classList.remove('_enter');	
		}, 200)
	}, [])

	return (
		// <div id="interactionsList" ref={el} className={`${enter == true ? '_enter' : ''}`}>
		<div id="interactionsList" ref={modal} className={`_enter`}> 

			<div id="header">
				<h2>Interactions
					{/*<span id='username'>{username}'s</span>*/}
				</h2>
				
				<button onClick={(e)=> {
							e.preventDefault();

							let modalCurrent = modal.current;
							modalCurrent.classList.add('_enter');
							
							let delay = setTimeout(()=> {
								setNotifList();
							}, 300)
				}}>
					<p>{unreadCount}</p>
					<span>⨉</span>
				</button>
			</div>


			<ul id="notifList">
				{notifs.map(notif => (
					returnNotifType(notif)
				))}
			</ul>


			<div id="buttonBar">
				<button className="buttonDefault"
						onClick={goToUserProfile}>PROFILE</button>
				<button className="buttonDefault" 
						onClick={goToUserSettings}>SETTINGS</button>
			</div>
		</div>
	)

}


/***
 * Format for socketMessage object
 * 
 * type: confirmation, request, comment, tagging
 * sender:
 * recipients:
 * message: 
 * 
 * 
 * if comment: see comment & mark read
 * if tag: see post & mark read
 * if request: accept & ignore (both mark read)
 */







