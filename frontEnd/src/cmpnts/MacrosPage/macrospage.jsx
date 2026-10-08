/* * * V I T A L S * * */
import * as React from 'react';
import { 
	useParams, 
	useLocation, 
	useLoaderData, 
	useOutletContext, 
	useNavigate 
} from 'react-router-dom';
import APIaccess from '../../apiaccess';


/* * * C O M P O N E N T S * * */
import Log from '../Log/Log'
import FullList from '../../components/base/fullList';
import DragSlider from '../../components/base/dragSlider';

import './macrospage.css';
import { useUIC } from '../../UIcontext';
const accessAPI = APIaccess(); 





export default function Macrospage({
	sectionClass,
    selectedDate,
    set_selectedDate,
    current,
    setCurrent,
    // tags,
    // setTags,
    // userTopics,
    // setUserTopics
}) {

	const userID = sessionStorage.getItem('userID');
	const data = useLoaderData();
	const navigate = useNavigate();
	const [postData, setPostData] = React.useState(data.macroPosts);
	const [macroInfo, setMacroInfo] = React.useState(data.macroInfo);
	const macroID = macroInfo._id;
	const { baseRef, setPrevSection, prevSection, userSettings, triggerPopup } = useUIC();
	const {arrd, setArrd, arrdFunctionRef } = useOutletContext() || {}

	console.log(macroInfo)
	console.log(postData)


	let goToProfile = async(userID) => {

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

	let addRemoveRequestDelete = async() => {

		console.log('it does run');

		if(arrd == 'delete') {
			// let request = await accessAPI.manageGroup('deleteGroup', {
			// 	type: 'tag',
			// 	groupID: macroInfo._id,
			// });

			// if(request.confirmation) {
			// 	navigate(-1);
			// 	let delay = setTimeout(()=> {

			// 		triggerPopup({
			// 			message: `Deleted macro "${macroInfo.name}"`
			// 		})
			// 	}, 400)
			// }
			triggerPopup({
				message: `Deleted macro "${macroInfo.name}"`
			})
		}

		else if(arrd == 'remove') {

			if(macroInfo.type == 'topic') {

				// let request = await accessAPI.manageGroup('removeUser', {
				// 	topic: macroInfo.name
				// }).then((data) => {
				// 	if(data.confirmation == true) {
				// 		setArrd('add')
				// 	}
				// })
				setArrd('add')
				triggerPopup({
					message: `Removed "${macroInfo.name}" from your topics`
				})
			}

			else {
				// let request = await accessAPI.manageGroup('removeUser', {
				// 	groupID: macroInfo._id,
				// }).then((data) => {
				// 	if(data.confirmation == true) {
				// 		setArrd('add')
				// 	}
				// })
				setArrd('add')
				triggerPopup({
					message: `Removed "${macroInfo.name}" from your tags`
				})
			}
		}

		else if(arrd == 'add') {
			if(macroInfo.type == 'topic') {
				// let request = await accessAPI.manageGroup('addUser', {
				// 	topic: macroInfo.name
				// }).then((data) => {
				// 	if(data.confirmation == true) {
				// 		setArrd('remove')
				// 	}
				// })
				setArrd('remove')
				triggerPopup({
					message: `Added "${macroInfo.name}" to your topics`
				})
			}

			else {
				// let request = accessAPI.manageGroup('addUser', {
				// 	groupID: macroInfo._id,
				// }).then((data) => {
				// 	if(data.confirmation == true) {
				// 		setArrd('remove')
				// 	}
				// })
				setArrd('remove')
				triggerPopup({
					message: `Added "${macroInfo.name}" to your tags`
				})
			}
		}

		// else if(arrd == 'request') {

		// 	let request = accessAPI.newInteraction({
		// 		type: 'request',
		// 		message: 'accessRequested',
		// 		senderID: userID,
		// 		recipients: [macroInfo.ownerID],
		// 		recipientUsernames: macroInfo.ownerUsername,
		// 		groupID: macroID,
		// 		groupName: macroInfo.name
		// 	}).then(data => {
		// 		if(data.confirmation == true) {
		// 			console.log('request sent')

		// 			// setSocketMessage({
		// 			// 	message: `Request for access sent to @${macroInfo.ownerUsername}`,
		// 			// 	recipients: [macroInfo.ownerID],
		// 			// 	action: 'updateNotifs'
		// 			// })
		// 		}
		// 		else {
		// 			// setSocketMessage({
		// 			// 	type: 'error',
		// 			// 	message: data.message
		// 			// })
		// 		}
		// 	})
		// }
	}

	React.useLayoutEffect(()=> {
		if(arrdFunctionRef) {
			arrdFunctionRef.current = addRemoveRequestDelete
		}

		return () => {
			if(arrdFunctionRef) arrdFunctionRef.current = null
		}
	}, [arrdFunctionRef, addRemoveRequestDelete])


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
		console.log(macroInfo);


		if(macroInfo.admins[0]._id == userID) { 
			setArrd('delete')
		}

		else if(macroInfo.userHasAccess == true) {
			setArrd('remove')
		}
		else if(!macroInfo.userHasAccess && !macroInfo.isMacroPrivate) {
			setArrd('add')
		}
	}, []);




	return (
		<section id="MACROSPAGE" className={`${sectionClass.macrospage}`}>

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