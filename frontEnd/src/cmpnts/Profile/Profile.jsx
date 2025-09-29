/* * * V i t a l s * * */
import * as React from 'react';
import APIaccess from '../../apiaccess';
import {useNavigate, useLocation} from 'react-router-dom';
import Log from '../Log/Log';

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

	const [data, setData] = React.useState();
	const [dataLoaded, setDataLoaded] = React.useState(false);
	const [userInfo, setUserInfo] = React.useState();
	const [posts, setPosts] = React.useState();
	const [collections, setCollections] = React.useState();
	// const userCity = data.user.settings.preferredLocation.city;
	// const userState = data.user.settings.preferredLocation.state;

	const updateProfilePage = async() => {
		let data = await accessAPI.getSingleUser(userID);
		setData(data);
		setUserInfo(data.user);
		// setPinnedPosts(data.pinnedPosts);
		setCollections(data.collections);

		let connectedUsers = data.user.connections.length + data.user.subscribers.length + data.user.subscriptions.length;
		setData({
			...data,
			connectedUsers: connectedUsers
		})
		/*
			Get user's posts and their pinned posts,
			add pinned Posts to top of user array,
			then modify all objects in joint array to have
			isPinned key, true value if post is pinned
		*/
		let allPosts = await accessAPI.pullUserLog({type: 'customLog', logNumber: current.log})
		const pinnedPostIDs = new Set(data.pinnedPosts.map(p => p._id));

		const processedPinned = data.pinnedPosts.map(post => ({
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
		console.log(postsCombined);
		setPosts(postsCombined);

		setDataLoaded(true);
	}

	const goToUserSettings = () => {}


	React.useEffect(()=> {

		document.title = 'Syncseq.xyz/profile'

		updateProfilePage()
	}, [])

	if(dataLoaded) {
		return (
			<div id="profile" className={ `${sectionClass.home}` } ref={refe}>


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
					<li id="location">
						<span>{data.user.settings.preferredLocation.city} | {data.user.settings.preferredLocation.state}</span>
					</li>
				</ul>

				{/*B I O*/}
				{userInfo.bio &&
					<div id="bio">
						<p id="bio">{userInfo.bio}</p>							
					</div>
				}


				{/*U S E R  S T A T S*/}
				<div id="stats">

					{/*v i e w  P O S T S*/}
					<button className={`buttonDefault`} onClick={async(e)=> {
						e.preventDefault();
					}}>
						{data.postCount}
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
				<div id="pinnedMedia">

					<h2>Pinned Media</h2>
					{userInfo.pinnedMedia.length < 1 &&
						<h2 className="none">None</h2>
					}

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


				{/*U S E R  P O S T S*/}
				<Log data={posts} 
				 	 current={current} 
				 	 setCurrent={setCurrent}
				 	 updateLog={setPosts}/>

			</div>
		)
	}
	
}