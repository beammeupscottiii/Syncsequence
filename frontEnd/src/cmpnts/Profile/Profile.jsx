/* * * V i t a l s * * */
import * as React from 'react';
import APIaccess from '../../apiaccess';
import {useNavigate, useLocation, useLoaderData, useParams, useOutletContext } from 'react-router-dom';
import Log from '../Log/Log';

import { useUIC } from '../../UIcontext';

import './Profile.css';

let accessAPI = APIaccess();


export default function Profile({ 
	current,
	setCurrent,
	sectionClass,
	refe,
	accessID,
    setAccessID,
    log,
    setLog 
}) {

	const userID = sessionStorage.getItem('userID');
	const username = sessionStorage.getItem('userName');
	const navigate = useNavigate();
	const location = useLocation();
	const dataData = useLoaderData();
	const { removeConnectionRef, requestConnectionRef, subscriptionRequestRef } = useOutletContext() || {};

	const { userid } = useParams();
	const { prevSection, setPrevSection, triggerPopup, baseRef } = useUIC();

	const [data, setData] = React.useState();
	const [dataLoaded, setDataLoaded] = React.useState(false);
	const [userInfo, setUserInfo] = React.useState();
	const [posts, setPosts] = React.useState();
	const [collections, setCollections] = React.useState();

	const isSubPage = location.pathname.includes('/post/') ||
                    location.pathname.includes('/macros') ||
                    location.pathname.includes('/user');

	const updateProfilePage = async() => {

		//for currentUser's profile
		if(userid == undefined) {
			let data = await accessAPI.getSingleUser(userID);
			setData(data);
			setUserInfo(data.user);
			setCollections(data.collections);

			let connectedUsers = data.user.connections.length + data.user.subscribers.length + data.user.subscriptions.length;
			setData({
				...data,
				connectedUsers: connectedUsers,
			})

			/*
				Get user's posts and their pinned posts,
				add pinned Posts to top of user array,
				then modify all objects in joint array to have
				isPinned key, true value if post is pinned
			*/

			/* 
				05. 01. 2026
				as this line below current is,
				the log that a currentUser will see on their
				profile is the same as whatever custom log they currently have loaded

				dunno whether to change this?
				
				Okay, new line gets a default log include privates, for currentUser
				viewing their own profile. includes private posts
			*/
			//let allPosts = await accessAPI.pullUserLog({type: 'customLog', logNumber: current.log})
			let allPosts = await accessAPI.pullUserLog({type: 'user'});

			console.log(data.pinnedPosts.length)
			if(data.pinnedPosts.length > 0) {
				const pinnedPostIDs = new Set(data.pinnedPosts.map(p => p._id));

				const processedPinned = data.pinnedPosts.map(post => ({
					...post,
					isPinned: true
				}));
				console.log(processedPinned);

				const processedAllPosts = allPosts
				.filter(post => !pinnedPostIDs.has(post._id))
				.map(post => ({
					...post,
					isPinned: false
				}));

				const postsCombined = [...processedPinned, ...processedAllPosts];
				setPosts(postsCombined);
			}
			else {
				setPosts(allPosts);
			}

			setDataLoaded(true);
		}

		//for viewedUser's profile
		else {
			setUserInfo(dataData.user);
			let connectedUsers = 
				dataData.user.connections.length + dataData.user.subscribers.length + dataData.user.subscriptions.length;
			setData({
				...dataData,
				connectedUsers: connectedUsers
			});
			setCollections(dataData.collections);
			
			

			setCurrent(prev => ({
				...prev,
				isConnected: dataData.isConnected,
				isSubscribed: dataData.isSubscribed,
				hasSubscription: dataData.hasSubscription,
				section: 'User'
			}));

			let allPosts = await accessAPI.pullUserLog({type: 'user', userID: userid});

			//if viewedUser has pinned posts
			if(dataData.pinnedPosts && dataData.pinnedPosts.length > 0) {
				const pinnedPostIDs = new Set(dataData.pinnedPosts.map(p => p._id) || []);
				const processedPinned = dataData.pinnedPosts.map(post => ({
					...post,
					isPinned: true
				}));

				const processedAllPosts = allPosts
				.filter(post => !pinnedPostIDs.has(post._id))
				.map(post => ({
					...post,
					isPinned: false
				}));

				const postsCombined = [...processedPinned, ...processedAllPosts];
				setPosts(postsCombined);
			}
			else {
				setPosts(allPosts)
			}

			//final check
			setDataLoaded(true);

			let baseElement = baseRef.current; 

			let delay1 = setTimeout(()=> {
		      baseElement.classList.remove('leave');
		    }, 300)


		    let delay2 = setTimeout(()=> {
		      baseElement.classList.add('enter');
		    }, 600)
		}
	}

	const goToUserSettings = () => {}

	const removeConnection = (e) => {
		
		// e.preventDefault();

		triggerPopup({
			message: `Are you sure you wish to remove @${userInfo.userName}?`,
			onConfirm: async()=> {

				let remove = await accessAPI.removeConnection(userid);
				if(remove == true) {
					updateProfilePage();

					triggerPopup({
						message: `@${userInfo.userName} removed`
					})
				}
			}
		})

		return true;
	}

	const requestConnection = async(e) => {

		// e.preventDefault();

		let notif = {
			type: 'request',
			recipients: [userid],
			recipientUsername: userInfo.userName,
			message: 'connectionRequestSent'
		}

		await accessAPI.newInteraction(notif).then((request)=> {

			if(request.confirmation == false) {

				triggerPopup({
					message: `You have already sent @${notif.recipientUsername} this kind of request`
				})

			}
			else if(request.confirmation == true) {

				triggerPopup({
					message: `Connection Request sent to @${userInfo.userName}`
				})

			}
			else if(request.message == 'connectionAcceptedSent') {

				updateProfilePage();

				triggerPopup({
					message: `You and @${userInfo.userName} are now connected!`
				})
			}
		})
	}

	const subscriptionRequest = async(e) => {

		e.preventDefault();

		let notif = {
			type: 'request', //type is request initially, switches to confirmation
			senderID: userID,
			senderUsername: username,
			recipients: [userid],
			recipientUsername: userInfo.userName,
			message: userInfo.privacySetting == 'Off' ? 'subscribed' : 'subscriptionRequestSent'
		}

		await accessAPI.newInteraction(notif).then((request)=> { 

			if(request.message == 'subscribed') {

				updateProfilePage();

				triggerPopup({
					message: `You are now subscribed to @${userInfo.userName}`
				})
			}

			else if(request.message == 'subscriptionRequestSent') {
				triggerPopup({
					message: `Subscription request sent to @${userInfo.userName}`
				})
			}
		})
	}

	//07. 04. 2026
	//Need to add 'removeSubscriber' and 'removeSubscription'


	React.useLayoutEffect(() => {
	    if(current.section == 'User') {
	    	if (removeConnectionRef) {
		        removeConnectionRef.current = removeConnection;
		    }

		    // Register Draft Logic
		    if (requestConnectionRef) {
		        requestConnectionRef.current = requestConnection;
		    }

		    if(subscriptionRequestRef) {
		    	subscriptionRequestRef.current = subscriptionRequest;
		    }

		    // Cleanup both on unmount
		    return () => {

		       	if (removeConnectionRef) removeConnection.current = null;
				if (requestConnectionRef) requestConnection.current = null;
				if (subscriptionRequestRef) subscriptionRequest.current = null;
		    };
	    }
	}, [removeConnectionRef, requestConnectionRef, subscriptionRequestRef,
		removeConnection, requestConnection, subscriptionRequest ]);



	React.useEffect(()=> {

		if(userid) {
			//catches the current section BEFORE updating it to 'User'
			setPrevSection(current.section);
			console.log(current.section);

			setCurrent({
				...current,
				section: 'User'
			})
		}

		document.title = 'Syncseq.xyz/profile'

		updateProfilePage()

		return ()=> {
			setCurrent(prev => ({
				...prev,
				isConnected: null,
				isSubscribed: null,
				hasSubscription: null
			}));
		};
	}, [])

	React.useEffect(()=> {
		updateProfilePage()
	}, [current.updateToggle])


	if(dataLoaded) {
		return (
			<div id="profile" className={ `${sectionClass.home} ${isSubPage ? 'subpageAdjust' : ''}` } ref={refe}>


				{/*{data.profileHeader &&
					<div id="profileHeader"></div>
				}*/}

				{/*P R O F I L E   P H O T O*/}
				<div id="profilePhotoWrapper">
					<img id="userPhoto" src={userInfo.profilePhoto}/>	
				</div>

				{/*U S E R  &  R E A L  N A M E  & L O C A T I O N*/}
				<ul id="nameWrapper">
					<li id="name">
						<h2>@{userInfo.userName}</h2>
						<h3>{`${userInfo.firstName} ${userInfo.lastName}`}</h3>
					</li>
					{

					}
					<li id="location">
						<span>{userInfo.settings.preferredLocation.city} | {userInfo.settings.preferredLocation.state}</span>
					</li>
				</ul>

				{/*B I O*/}
				
				<div id="bio">
					{userInfo.bio &&
						<p id="bio">{userInfo.bio}</p>
					}							
				</div>


				{/*U S E R  S T A T S*/}
				<div id="stats">

					{/*v i e w  P O S T S*/}
					<button className={`buttonDefault`} onClick={async(e)=> {
						e.preventDefault();
					}}>
						{data.postCount || dataData.postCount}
						<span>Posts</span>
					</button>


					{/* A C T I O N  C O U N T*/}
					<button className={`buttonDefault`} onClick={async(e)=> {
						e.preventDefault();
					}}>
						{userInfo.interactionCount}
						<span>Actions</span>
					</button>


					{/*v i e w  C O N N E C T I O N S*/}
					<button className={`buttonDefault`} onClick={async(e)=> {
						// let data = await accessAPI.getConnections(userInfo._id);

						// setFullListData({
						// 	data: data,
						// 	mode: 'allConnections',
						// 	source: `@${userInfo.userName}` 
						// });

						// setFullList();
					}}>
						{data.connectedUsers}
						<span>USER{data.connectedUsers > 1 ? 'S' : ''}</span>
					</button>
				</div>



				{/* P I N N E D  M E D I A */}
				{userInfo.pinnedMedia.length > 1 &&
					<div id="pinnedMedia">

						<h2>Pinned Media</h2>

							{/*<h2 className="none">None</h2>*/} 

						{userInfo.pinnedMedia.length > 0 && 
							<ul>
								{userInfo.pinnedMedia.map((data, index) => (
									<li key={index}>
										<img src={data.url} onClick={(e)=> {
											e.stopPropagation();

											let gallery = userInfo.pinnedMedia.map(data => ({
			  										content: data.url,
			  										postID: data.postID,
			  										type: 'media'
			  									}));

											setCurrent({
												...current,
												gallery: gallery
											})
										}}/>
									</li>	
								))}
							</ul>
						}
					</div>
				}


				{/*U S E R  P O S T S*/}
				<Log data={posts} 
				 	 current={current} 
				 	 setCurrent={setCurrent}
				 	 updateLog={setPosts}/>

			</div>
		)
	}
	
}