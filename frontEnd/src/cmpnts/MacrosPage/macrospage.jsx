/* * * V I T A L S * * */
import * as React from 'react';
import {useParams, useLocation, useLoaderData} from 'react-router-dom';
import APIaccess from '../../apiaccess';
import {useNavigate} from 'react-router-dom';


/* * * C O M P O N E N T S * * */
import Log from '../Log/Log'
import FullList from '../../components/base/fullList';
import DragSlider from '../../components/base/dragSlider';

import { useUIC } from '../../UIcontext';

import './macrospage.css';

const accessAPI = APIaccess(); 




export default function Macrospage({
	sectionClass,
    selectedDate,
    set_selectedDate,
    current,
    setCurrent,
    tags,
    setTags,
    userTopics,
    setUserTopics
}) {

	const userID = sessionStorage.getItem('userID');
	let userSettings = sessionStorage.getItem('settings');
	const data = useLoaderData();
	const navigate = useNavigate();
	const [postData, setPostData] = React.useState(data.macroPosts);
	const [macroInfo, setMacroInfo] = React.useState(data.macroInfo);
	const macroID = macroInfo._id;
	const { baseRef, setPrevSection, prevSection } = useUIC();

	console.log(macroInfo)
	console.log(postData)


	let goToProfile = async(userID) => {

		let elCurrent = el.current;
		elCurrent.classList.add('_enter');

		let data = await accessAPI.getSingleUser(userID);
		
		let delay = setTimeout(()=> {
			navigate(`/user/${data.user.userName}/${data.user._id}`, {
				state: {
					user: data.user,
					pinnedPosts: data.pinnedPosts,
					collections: data.collections
				}
			})
		}, 150)
	}
	
	let updatePosts = async() => {
		let posts = await accessAPI.groupPosts({
			action: 'getPosts', 
			type: macroInfo.type, 
			groupID: macroInfo._id ? macroInfo._id : 'topic',
			groupName: macroInfo.name
		});
		if(posts.length > 0) {
			setPostData(posts);
			setMacroInfo({
				...macroInfo,
				postCount: posts.length
			})
		}
	}

	/* Element Related */
	const [notifList, setNotifList] = React.useReducer(state => !state, false);
	const [menu, toggleMenu] = React.useReducer(state => !state, false);
	const [fullList, toggleFullList] = React.useReducer(state => !state, false);
	const source = macroInfo.name == 'BOOKMARKS' ? `${macroInfo.ownerUsername}'s ${macroInfo.name}` : macroInfo.name;
	let [ARRD, setARRD] = React.useState();

	let addRemoveRequestDelete = async() => {
		if(ARRD == 'delete') {
			let request = await accessAPI.manageGroup('deleteGroup', {
				type: 'tag',
				groupID: macroInfo._id,
			});

			if(request.confirmation) {
				navigate(-1);
				let delay = setTimeout(()=> {
					// setSocketMessage({
					// 	type: 'simpleNotif',
					// 	message: `Deleted "${macroInfo.name}"`
					// })
				}, 200)
			}
		}

		else if(ARRD == 'remove') {

			if(macroInfo.type == 'topic') {

				let request = await accessAPI.manageGroup('removeUser', {
					topic: macroInfo.name
				}).then((data) => {
					if(data.confirmation == true) {
						setARRD('add')
					}
				})
				// setSocketMessage({
				// 	type: 'simpleNotif',
				// 	message: `Removed "${macroInfo.name}" from your topics`
				// })
			}
			else {
				let request = await accessAPI.manageGroup('removeUser', {
					groupID: macroInfo._id,
				}).then((data) => {
					if(data.confirmation == true) {
						if(macroInfo.isMacroPrivate) {
							setARRD('request')
							// ARRD = 'request'
						}
						else {
							setARRD('add')
							// ARRD = 'add'
						}
					}
				})
				// setSocketMessage({
				// 	type: 'simpleNotif',
				// 	message: `Removed "${macroInfo.name}" to your tags`
				// })
			}
		}

		else if(ARRD == 'request') {

			let request = accessAPI.newInteraction({
				type: 'request',
				message: 'accessRequested',
				senderID: userID,
				recipients: [macroInfo.ownerID],
				recipientUsernames: macroInfo.ownerUsername,
				groupID: macroID,
				groupName: macroInfo.name
			}).then(data => {
				if(data.confirmation == true) {
					console.log('request sent')

					// setSocketMessage({
					// 	message: `Request for access sent to @${macroInfo.ownerUsername}`,
					// 	recipients: [macroInfo.ownerID],
					// 	action: 'updateNotifs'
					// })
				}
				else {
					// setSocketMessage({
					// 	type: 'error',
					// 	message: data.message
					// })
				}
			})
		}

		else if(ARRD == 'add') {
			if(macroInfo.type == 'topic') {
				let request = await accessAPI.manageGroup('addUser', {
					topic: macroInfo.name
				}).then((data) => {
					if(data.confirmation == true) {
						setARRD('remove')
					}
				})
				// setSocketMessage({
				// 	type: 'simpleNotif',
				// 	message: `Added "${macroInfo.name}" to your topics`
				// })
			}
			else {
				let request = accessAPI.manageGroup('addUser', {
					groupID: macroInfo._id,
				}).then((data) => {
					if(data.confirmation == true) {
						setARRD('remove')
					}
				})
				// setSocketMessage({
				// 	type: 'simpleNotif',
				// 	message: `Added "${macroInfo.name}" to your tags`
				// })
			}
		}
	}


	const onInitialLoad = () => {

		setPrevSection(current.section);
		console.log(current.section);

		setCurrent({
			...current,
			section: 'Macro'
		})

		let baseElement = baseRef.current; 

		let delay1 = setTimeout(()=> {
	      baseElement.classList.remove('leave');
	    }, 300)


	    let delay2 = setTimeout(()=> {
	      baseElement.classList.add('enter');
	    }, 600)
    }

	React.useEffect(()=> {

		onInitialLoad();

		document.title = `Resync'd | Macro`

		console.log(macroInfo.name)
		console.log(userTopics.includes(macroInfo.mame))
		if(userTopics.includes(macroInfo.mame)) {
			setMacroInfo({
				...macroInfo,
				userHasAccess: true
			})
		}
		console.log(macroInfo);
	}, [])

	let el = React.useRef();
	React.useEffect(()=> {
		let elCurrent = el.current;
		let delay = setTimeout(()=> {
			elCurrent.classList.remove('_enter');	
		}, 300)

		if(macroInfo.ownerID == userID) { 
			setARRD('delete')
			// ARRD = 'delete'
		}
		// if hasAccess and not owner -> remove
		else if(macroInfo.userHasAccess == true) {
			setARRD('remove')
			// ARRD = 'remove'
		}
		// if noaccess and is not private -> add
		else if(!macroInfo.userHasAccess && macroInfo.admins) {
			setARRD('request')
			// ARRD = 'request'
		}
		// if no access and is private -> request
		else if(!macroInfo.userHasAccess && !macroInfo.isMacroPrivate) {
			setARRD('add')
			// ARRD = 'add'
		}
	}, []);

	// Update posts when fullList is closed
	React.useEffect(()=> {
		updatePosts()
	}, [fullList])

		
	return (
		<section id="MACROSPAGE" ref={el} className={`${sectionClass.macrospage}`}>

			<div id="mainWrapper">
				
				<div id="pageHeader">
					
					<h3 id="subHeading">
						{/*	
							Topic: public
							Tag, Private or Not: username
							Collection: username
						*/}
						<span className={`${macroInfo.type != 'topic' ? "toUserProfile" : ''}`}
							  onClick={()=> {
							  	if(macroInfo.type != 'topic') {
							  		goToProfile(macroInfo.ownerID)	
							  	}
							  	else return;
							  }}>
							{macroInfo.type != 'topic' ? '@' : null}
							{macroInfo.type != 'topic' ? macroInfo.ownerUsername : 'PUBLIC'}
						</span> / {macroInfo.type} /
					</h3>

					<h2 id="macroName">{macroInfo.name}</h2>

					<div id="infoWrapper">
						<h4 id="postCount">
							{macroInfo.postCount}
							<span>Posts</span>
						</h4>

						{(macroInfo.type != 'topic' && macroInfo.name != 'BOOKMARKS') &&
							<h4 id="userCount">
								{macroInfo.userCount}
								<span>Users Engaged</span>
							</h4>
						}
					</div>
				</div>

				{(macroInfo.isMacroPrivate && !macroInfo.userHasAccess) &&
					<h2 id='noAccess'>Private</h2>
				}

				{(macroInfo.isMacroPrivate && macroInfo.userHasAccess) &&
					<Log data={postData} 
						 section={"user"}  
						 current={current} 
						 setCurrent={setCurrent}
						 />
				}
				{!macroInfo.isMacroPrivate &&
					<Log data={postData} 
						 section={"user"}  
						 current={current} 
						 setCurrent={setCurrent}
						 />
				}
				
			</div>

			<div id="menuBar">
						
				{(macroInfo.type == 'tag' || macroInfo.type == 'topic') &&
					<button className="buttonDefault" id="return"
							onClick={()=> {
								setTimeout(()=> {
									navigate(-1)
								}, 300);
							}}>return</button>
				}				
			</div>

			{current.gallery.length > 0 &&
	          <DragSlider current={current} setCurrent={setCurrent} siteLocation={'home'}/>
	        }
		</section>
	)
}

// state {
// 	posts: resultingArrayFromAPI
// 	macroID: is macro _id
//	isPrivate: macro.isPrivate
//	hasAccess: is macro.hasAccess
//  	to check whether user is included or not, 
//		for add button and privacy

//	Run filter on hasAccess before navigate() to page
// }