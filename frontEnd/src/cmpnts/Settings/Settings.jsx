/* * * V i t a l s * * */
import * as React from 'react';
import {useNavigate, useLocation, useLoaderData} from 'react-router-dom';
import { useUIC } from '../../UIcontext';
import APIaccess from '../../apiaccess';

import './Settings.css';

let accessAPI = APIaccess();


export default function Settings({ 
	current,
	setCurrent,
	sectionClass, 
	refe,
	socketMessage,
	setSocketMessage,
	isLogout,
	setLogout 
}) {

	let navigate = useNavigate();
	// const location = useLocation();
	// const data = useLoaderData();
	const { logout } = useUIC();
	const username = sessionStorage.getItem('userName');
	const [currentSettings, setCurrentSettings] = React.useState();
	const [privacyOption, setPrivacyOption] = React.useState();

	const [exit, setExit] = React.useReducer(state => !state, false)
	const [section, setSection] = React.useState([
		{
			profile: false,	
		},
		{
			photo: false,	
		},
		{
			username: false,	
		},
		{
			biography: false,	
		},
		{
			changePassword: false,
		},
		{
			privacy: false,
		},
		{
			invitation: false,
		}
	])
	const [changedUsername, setChangedUsername] = React.useState("");
	const [biography, setBiography] = React.useState("");
	const [currentPass, setCurrentPass] = React.useState("");
	const [newPass, setNewPass] = React.useState("");
	const [profilePhoto, setProfilePhoto] = React.useState({
		url: null,
		content: ''
	});

	const [dataLoaded, setDataLoaded] = React.useState(false);

	const updateUserSettings = async() => {

		let data = await accessAPI.userSettings({option: 'getUserSettings'});
        setCurrentSettings(data);
        setPrivacyOption(data.privacy);
        setDataLoaded(true);
	}

	const openSection = (selection) => {
		if(selection == 'profile') {
			if(section.profile) {
				setSection({
					...section,
					profile: false
				}) 
			} else {
				setSection({
					...section,
					profile: true,
					privacy: false,
					invitation: false,
					changePassword: false,
					biography: false,
					username: false,
					photo: false,
				})
			}
		}

		else if(selection == 'photo') {

			if (section.photo) {
				setSection({
					...section,
					photo: false,
					username: false,
					biography: false,
					changePassword: false
				})
			}
			else {
				setSection({
					...section,
					photo: true,
					username: false,
					biography: false,
					changePassword: false
				}) 
			} 
		}

		else if(selection == 'username') {

			if(section.username) {
				setSection({
					...section,
					username: false,
					photo: false,
					biography: false,
					changePassword: false
				})
			}
			else {
				setSection({
					...section,
					username: true,
					photo: false,
					biography: false,
					changePassword: false
				}) 
			} 
		}
		
		else if(selection == 'biography') {
			
			if(section.biography) {
				setSection({
					...section,
					biography: false,
					username: false,
					photo: false,
					changePassword: false
				})
			}
			else {
				setSection({
					...section,
					biography: true,
					username: false,
					photo: false,
					changePassword: false
				})
			}
		}

		else if(selection == 'changePassword') {

			if(section.changePassword) {
				setSection({
					...section,
					changePassword: false,
					biography: false,
					username: false,
					photo: false,
				})
			}
			else {
				setSection({
					...section,
					changePassword: true,
					biography: false,
					username: false,
					photo: false,
				}) 
			}
		}	



		else if(selection == 'privacy') {
			if(section.privacy) {
				setSection({
					...section,
					privacy: false
				}) 
			} 
			else {
				setSection({
					...section,
					privacy: true,
					profile: false,
					invitation: false
				})
			}
		} 
		else if(selection == 'invitation') {
			if(section.invitation) {
				setSection({
					...section,
					invitation: false
				}) 
			} 
			else {
				setSection({
					...section,
					invitation: true,
					profile: false,
					privacy: false
				})
			}
		} 
	}

	const handleChange = (event) => {
 
		if(event.target.name == 'image') {
			setProfilePhoto({
				url: URL.createObjectURL(event.target.files[0]),
				content: event.target.files[0]
			});
		} 

		else if(event.target.name == 'username') {
			setChangedUsername(event.target.value)
			// console.log(event.target.value)
		}

		else if(event.target.name == 'biography') {
			setBiography(event.target.value)
		}

		else if(event.target.name == 'password') {
			setCurrentPass(event.target.value)
		}
		else if(event.target.name == 'newPass') {
			setNewPass(event.target.value)
		}
	}

	const handleSubmit = (event) => {

		//sends necessary data over via socketMessage
		if(event.target.name == 'photoSubmit') {
			if(profilePhoto.content == "") {
				setSocketMessage({
					type: 'error',
					message: 'Please upload a photo'
				})
			}
			else {
				setSocketMessage({
					content: profilePhoto.content,
					action: 'profilePhoto'
				})
			}
		}

		else if(event.target.name == 'usernameUpdate') {
			if(changedUsername == "") {
				setSocketMessage({
					type: 'error',
					message: 'Please enter a new username'
				})
			} else {
				setSocketMessage({
					action: 'usernameUpdate',
					newUsername: changedUsername
				})
			}
		}

		else if(event.target.name == 'bioUpdate') {
			setSocketMessage({
					action: 'bioUpdate',
					biography: biography,
					option: 'biography'
				})
		}

		else if(event.target.name == 'changePassword') {
			if(currentPass == ''|| newPass == '') {
				setSocketMessage({
					type: 'error',
					message: 'One or both of the fields are empty'
				})
			}
			else {
				setSocketMessage({
					action: 'changePassword',
					currentPassword: currentPass,
					newPassword: newPass
				})
			}
		}

		else if(event.target.name == 'privacyOn') {
			setSocketMessage({
				action: 'privacy',
				option: 'privacy',
				state: 'On'
			})
		}

		else if(event.target.name == 'privacyHalf') {
			setSocketMessage({
				action: 'privacy',
				option: 'privacy',
				state: 'Half'
			})
		}

		else if(event.target.name == 'privacyOff') {
			setSocketMessage({
				action: 'privacy',
				option: 'privacy',
				state: 'Off'
			})
		}
	}

	React.useEffect(()=> {
		updateUserSettings();
	},[])


	if(dataLoaded) {
		return (
			<div id="settings" className={ `${sectionClass.settings}` } ref={refe}>
					
				<ul id="mainMenu">
				
				{/*P R O F I L E*/}
				<li id="profile" className={`${section.profile == true ? 'open' : 'close'}`}>
					<button className={`buttonDefault`} onClick={(e)=> {
								e.preventDefault()
								openSection('profile');
					}}>Edit Profile</button>
				</li>

				{/*P R I V A C Y*/}
				<li id="privacy" className={`${section.privacy == true ? 'open' : 'close'}`}>
					<button className={`buttonDefault ${section.privacy == true ? 'open' : 'close'}`} onClick={(e)=> {
								e.preventDefault()
								openSection('privacy');
					}}>Privacy</button>

					<div id="optionsWrapper">
						
						<ul id="options">
							<li>
								<button 
									name="privacyOn"
									className={`buttonDefault ${privacyOption == 'On' ? '' : '_inactive'}`}
									onClick={(e)=> {	
										e.preventDefault()
										setPrivacyOption("On");
										handleSubmit(e)
										sessionStorage.setItem('privacySetting', "On")
									}}>
									ON</button>	
							</li>
							<li>
								<button 
									name="privacyHalf"
									className={`buttonDefault ${privacyOption == 'Half' ? '' : '_inactive'}`}
									onClick={(e)=> {	
										e.preventDefault()
										setPrivacyOption("Half");
										handleSubmit(e)
										sessionStorage.setItem('privacySetting', "Half")
									}}>
									1 / 2</button>	
							</li>
							<li>
								<button 
									name="privacyOff"
									className={`buttonDefault ${privacyOption == 'Off' ? '' : '_inactive'}`}
									onClick={(e)=> {	
										e.preventDefault()
										setPrivacyOption("Off");
										handleSubmit(e)
										sessionStorage.setItem('privacySetting', "Off")
									}}>
									OFF</button>	
							</li>
						</ul>

						{privacyOption == 'On' &&
							<p>
								Only Connections see <span>full name</span>{`\n`}
								Only Connections see <span>Profile Metrics</span>{`\n`}
								No Subscribers{`\n`} 
								All Posts visible only to Connections{`\n`}
								Pinned Posts and Media only visible to Connections
							</p>
						}
						{privacyOption == 'Half' &&
							<p>
								Only Connections see <span>full name</span>{`\n`}
								Only Connections, Subscribers see <span>Profile Metrics</span>{`\n`}
								Subscribers Can Request{`\n`}
								All Posts visible only to Connections & Subscribers{`\n`}
								Pinned Posts and Media visible to Everyone
							</p>
						}
						{privacyOption == 'Off' &&
							<p>
								Everyone can see <span>full name</span>{`\n`}
								Everyone can see <span>Profile Metrics</span>{`\n`}
								Subscribers need not Request{`\n`}
								All Posts visible to Everyone{`\n`}
								Pinned Posts and Media visible to Everyone
							</p>
						}
					</div>
				</li>

				{/*I N V I T A T I O N*/}
				<li id="invites" className={`${section.invitation == true ? 'open' : 'close'}`}>
					<button className={`buttonDefault ${section.invitation == true ? 'open' : 'close'}`} onClick={(e)=> {
								e.preventDefault()
								openSection('invitation');
					}}>Invitation</button>

					<div id="mainWrapper">
							
						<h3 id="inviteCount"><span>{currentSettings.invites}</span>Users Invited</h3>

						<h3 id="referralHeader">Referral Link</h3>
						<button className={`buttonDefault`} id="referralLink">CLICK TO COPY</button>
					</div>
				</li>

				{/*A B O U T  P R O J E C T*/}
				<li>
					<button className={`buttonDefault`} 
							id="aboutProject"
							onClick={(e)=> {
								e.preventDefault();
								setExit()
								let delay = setTimeout(()=> {
									navigate('/about')
								}, 500)
							}}>
						<p>About Project</p>
						<svg 
							xml version="1.0"
							viewBox="109.21 220.42 140.874 69.937" 
							xmlns="http://www.w3.org/2000/svg"
							id="return">
					  		<polyline 
					  			id="top"
					  			points="249.644 250.369 109.21 250.393 159.165 220.42" 
					  			transform="matrix(0.9999999999999999, 0, 0, 0.9999999999999999, 0, 1.4210854715202004e-14)"/>
					  		<polyline 
					  			id="bottom"
					  			points="250.084 260.408 109.65 260.384 159.605 290.357" 
					  			transform="matrix(0.9999999999999999, 0, 0, 0.9999999999999999, 0, 1.4210854715202004e-14)"/>
						</svg>
					</button>
				</li>

				{/*L O G O U T*/}
				<li>
					<button className={`buttonDefault`} onClick={setLogout}>Log Out</button>
				</li>
			</ul>

			</div>
		)
	}
	
}