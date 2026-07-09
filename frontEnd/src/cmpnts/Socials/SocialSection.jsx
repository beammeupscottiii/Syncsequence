/* * * V i t a l s * * */
import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import APIaccess from '../../apiaccess';
import { useUIC } from '../../UIcontext';

import './SocialSection.css';

let accessAPI = APIaccess();

let arrowSVG = 
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


export default function SocialSection({
	current,
	setCurrent,
	sectionClass,
	refe,
	socialPaddingAdjust
}) {	

	const userID = sessionStorage.getItem('userID'),
		  navigate = useNavigate(),
		  {triggerPopup, baseRef} = useUIC();
	let [firstSection, setFirstSection] = React.useReducer(state => !state, true);
	let [connectionsVisibleCount, setConnectionsVisibleCount] = React.useState(6);
	let [secondSection, setSecondSection] = React.useReducer(state => !state, false);
	let [activityState, setActivityState] = React.useReducer(state => !state, true);

	let [taggedPosts, setTaggedPosts] = React.useState([
		//dummy posts
		  {
		    author:"@tech_guru",
		    title: "Understanding React Server Components",
		    postedOn_month: 2, // March (0-indexed)
		    postedOn_day: 15,
		    postedOn_year: 2026
		  },
		  {
		    author:"@node_master",
		    title: "Express.js Middleware Deep Dive",
		    postedOn_month: 2,
		    postedOn_day: 10,
		    postedOn_year: 2026
		  },
		  {
		    author:"@db_wizard",
		    title: "MongoDB Aggregation Pipelines for Beginners",
		    postedOn_month: 1, // February
		    postedOn_day: 28,
		    postedOn_year: 2026
		  },
		  {
		    author:"@frontend_fan",
		    title: "Tailwind CSS vs Styled Components",
		    postedOn_month: 11, // December
		    postedOn_day: 12,
		    postedOn_year: 2025
		  },
		  {
		    author:"@backend_dev",
		    title: "Securing your Node.js API with JWT",
		    postedOn_month: 1, // January
		    postedOn_day: 5,
		    postedOn_year: 2026
		  },
		  {
		    author:"@ui_ux_designer",
		    title: "Design Systems in 2026",
		    postedOn_month: 2,
		    postedOn_day: 20,
		    postedOn_year: 2026
		  }
	]);
	// let [connections, setConnections] = React.useState([
	//   {
	//     userName: "coder_jake",
	//     fullName: "Jake Montgomery",
	//     isConnection: true,
	//     isSubscription: false,
	//     isSubscriber: false,
	//     isAvailable: 'yes',
	//   },
	//   {
	//     userName: "alice_dev",
	//     fullName: "Alice Vance",
	//     isConnection: true,
	//     isSubscription: false,
	//     isSubscriber: false,
	//     isAvailable: 'no',
	//   },
	//   {
	//     userName: "pixel_pioneer",
	//     fullName: "Sarah Chen",
	//     isConnection: false,
	//     isSubscription: true,
	//     isSubscriber: false,
	//     isAvailable: 'yes',
	//   },
	//   {
	//     userName: "backEnd_beast",
	//     fullName: "Marcus Holloway",
	//     isConnection: false,
	//     isSubscription: true,
	//     isSubscriber: false,
	//     isAvailable: 'offline',
	//   },
	//   {
	//     userName: "data_detective",
	//     fullName: "Elena Rodriguez",
	//     isConnection: false,
	//     isSubscription: false,
	//     isSubscriber: true,
	//     isAvailable: 'yes',
	//   },
	//   {
	//     userName: "ux_spirit",
	//     fullName: "Liam O'Brian",
	//     isConnection: false,
	//     isSubscription: false,
	//     isSubscriber: true,
	//     isAvailable: 'yes',
	//   },
	//   {
	//     userName: "coder_jake",
	//     fullName: "Jake Montgomery",
	//     isConnection: true,
	//     isSubscription: false,
	//     isSubscriber: false,
	//     isAvailable: 'no',
	//   },
	//   {
	//     userName: "alice_dev",
	//     fullName: "Alice Vance",
	//     isConnection: true,
	//     isSubscription: false,
	//     isSubscriber: false,
	//     isAvailable: 'offline',
	//   },
	//   {
	//     userName: "pixel_pioneer",
	//     fullName: "Sarah Chen",
	//     isConnection: false,
	//     isSubscription: true,
	//     isSubscriber: false,
	//     isAvailable: 'offline',
	//   },
	//   {
	//     userName: "backEnd_beast",
	//     fullName: "Marcus Holloway",
	//     isConnection: false,
	//     isSubscription: true,
	//     isSubscriber: false,
	//     isAvailable: 'yes',
	//   },
	//   {
	//     userName: "data_detective",
	//     fullName: "Elena Rodriguez",
	//     isConnection: false,
	//     isSubscription: false,
	//     isSubscriber: true,
	//     isAvailable: 'no',
	//   },
	//   {
	//     userName: "ux_spirit",
	//     fullName: "Liam O'Brian",
	//     isConnection: false,
	//     isSubscription: false,
	//     isSubscriber: true,
	//     isAvailable: 'offline',
	//   },
	//   {
	//     userName: "backEnd_beast",
	//     fullName: "Marcus Holloway",
	//     isConnection: false,
	//     isSubscription: true,
	//     isSubscriber: false,
	//     isAvailable: 'offline',
	//   },
	//   {
	//     userName: "data_detective",
	//     fullName: "Elena Rodriguez",
	//     isConnection: false,
	//     isSubscription: false,
	//     isSubscriber: true,
	//     isAvailable: 'yes',
	//   },
	//   {
	//     userName: "ux_spirit",
	//     fullName: "Liam O'Brian",
	//     isConnection: false,
	//     isSubscription: false,
	//     isSubscriber: true,
	//     isAvailable: 'yes',
	//   },
	//   {
	//     userName: "coder_jake",
	//     fullName: "Jake Montgomery",
	//     isConnection: true,
	//     isSubscription: false,
	//     isSubscriber: false,
	//     isAvailable: 'no',
	//   },
	//   {
	//     userName: "alice_dev",
	//     fullName: "Alice Vance",
	//     isConnection: true,
	//     isSubscription: false,
	//     isSubscriber: false,
	//     isAvailable: 'no',
	//   },
	//   {
	//     userName: "pixel_pioneer",
	//     fullName: "Sarah Chen",
	//     isConnection: false,
	//     isSubscription: true,
	//     isSubscriber: false,
	//     isAvailable: 'offline',
	//   },
	// ]);
	let [connections, setConnections] = React.useState([]);


	let updateTaggedPosts = async() => {
		let data = await accessAPI.pullSocialLog();
		setTaggedPosts(data);
	};

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

	const connectionsShowMore = () => {
		setConnectionsVisibleCount(prevCount => prevCount + 20);
	}

	const updateActivityStatus = async() => {

		setActivityState();

		let body = {
			action: 'updateActivityStatus',
			state: activityState ? 'away' : 'available'
		}

		let request = await accessAPI.userSettings(body);
		if(request) {
			triggerPopup({
	            message: `Activity Status Updated to ${activityState ? 'Away' : 'Available'}`, 
	        });
		}
	}

	let goToPost = async(postData) => {
		setTimeout(()=> {
			navigate(`/post/${postData._id}`);
		}, 600)
	}

	let goToProfile = async(userid, username) => {
		navigate(`/user/${username}/${userid}`);
	}

	React.useEffect(()=> {
		// updateTaggedPosts();
	 	updateConnections();
	}, [])

	React.useEffect(()=> {
		updateConnections();
		// updateTaggedPosts();
	}, [current.updateToggle])


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

	React.useEffect(() => {
	    const handleClickOutside = (event) => {
	        // If the click is on the main container (not an LI), clear selection
	        // We check if the clicked element has the 'results-list' ID or class
	        if (event.target.id === 'SOCIALS' || event.target.tagName === 'SECTION') {
	            setConnections(prev => prev.map(u => ({ ...u, selected: false })));
	        }
	    };

	    window.addEventListener('click', handleClickOutside);
	    return () => window.removeEventListener('click', handleClickOutside);
	}, []);


	return (

		<section id="SOCIALS" 
				className={`${sectionClass.social} ${socialPaddingAdjust ? 'up' : 'down'}`} ref={refe}>

			{/*Connections*/}
			<div id="connections" className={`${firstSection == true ? 'open' : 'closed'} section`}>
				<div className={`headerWrapper`}>
					<h2>Connections</h2>
					<button className={`buttonDefault`} onClick={(e)=> {
						e.preventDefault()
						setFirstSection();
					}}>+</button>
				</div>

				{/* Activity Button */}
				<div id='userActivityState' >	
					<div id="wrapper">
						<p>I am currently</p>
						<button className={`buttonDefault`}
								onClick={updateActivityStatus}>
							{`${activityState == true ? 'Active' : 'Unavailable'}`} 
						</button>
					</div>
				</div>

				{/* Connections List */}
				<ul>
					{connections.slice(0, connectionsVisibleCount).map((connect, index)=> (
						<li key={index} 
							className={`${connect.selected == true ? 'selected' : ''}`}
							onClick={(e)=> {
								e.preventDefault()
								selectConnection(connect._id)
						}}>

							<div id="imgWrapper">
								<img src={connect.profilePhoto} />
								<div id="dot" className={` ${connect.isAvailable == 'yes' && 'active'}
									${connect.isAvailable == 'no' && 'away'}
								`}/>
							</div>

							<div className="text">
								<h4>{connect.userName}</h4>
								<span>{`${connect.fullName}`}</span>
							</div>

							<div id="svgWrapper"
								className={`${connect.isConnection == true ? 'connection' : ''} ${connect.isSubscriber == true ? 'subscriber' : ''} ${connect.isSubscription == true ? 'subscription' : ''}`}>
								{connect.isConnection == true ? twoWaySVG : null}
								{connect.isSubscription || connect.isSubscriber ? arrowSVG : null}
							</div>

							{/* Options Wrapper */}
							<div id="optionsWrapper">
								<button className={`buttonDefault`}
										onClick={()=> {goToProfile(connect._id, connect.userName)}}>
									Profile
								</button>
								<button className={`buttonDefault`}
										onClick={()=> {
										}}>
									Message
								</button>
							</div>
						</li>
					))}
				</ul>

				{/*Show More Button*/}
				{connectionsVisibleCount < connections.length && (
					<button id="showMore" 
							className={`buttonDefault`}
							onClick={connectionsShowMore}>
						Show More
					</button>
				)}
			</div>

			{/*Tagged Posts*/}
			<div id="taggedPosts" className={`${secondSection == true ? 'open' : 'closed'} section`}>
				<div className={`headerWrapper`}>
					<h2>Tagged Posts</h2>
					<button className={`buttonDefault`} onClick={(e)=> {
						e.preventDefault()
						setSecondSection();
					}}>+</button>
				</div>

				<ul className={``}>
					{taggedPosts.map(post => (
						<li onClick={()=> {goToPost(post)}}>
							<h4>{post.author}</h4>
							<h3>{post.title}</h3>
							<p>{post.postedOn_month}. {post.postedOn_day}. {post.postedOn_year}</p>
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}