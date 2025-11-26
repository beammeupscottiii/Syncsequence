/* * * V I T A L S * * */
import * as React from 'react';

import './OptionsButton.css';
// Profile = 0, Social = 1, Home = 2, Macros = 3, Map = 4
	// there will be more for other pages: Post, UserProfile, Global, etc

export default function OptionsButton({
	current, 
	setCurrent,
	selectedDate, 
	setSelectedDate,
	setSectionClass,
	sectionClass,
	createPostToggle,
	setCreatePostToggle
}) {

	// each object is option name and function
	const profileOptions = [
		/* 
			edit profile
			settings
		*/
		{
			name: 'editProfile',
			function: null,
			class: ''
		},
		{
			name: 'settings',
			function: null,
			class: ''
		}
	];
	const socialOptions = [
		/*
			Add to Stream
			Find & Manage
			Calendar
			Map
		*/
		{
			name: 'Find & Manage',
			function: null,
			class: ''
		},
		{
			name: 'Add to Stream',
			function: null,
			class: ''
		},
		{
			name: 'Calendar',
			function: null,
			class: ''
		},
		{
			name: 'Map',
			function: null,
			class: ''
		}
	];
	const homeOptions = [
		/*
			View Stream
			New Post
			Calendar
			Map
			Custom Feeds
		*/
		{
			name: 'New Post',
			function: ()=> {
				setCreatePostToggle();

				setCurrent({
					...current,
					createPost: true
				})

				setOptionsOpen(false);
			},
			class: ''
		},
		{
			name: 'View Stream',
			function: null,
			class: ''
		},
		{
			name: 'Calendar',
			function: ()=> {
				const hajime = new Date();

				setSelectedDate({
					day: hajime.getDate(),
					month: hajime.getMonth(),
					year: hajime.getFullYear()
				})

				setCurrent({
					...current,
					calendar: true
				})

				setOptionsOpen(false);
			},
			class: ''
		},
		{
			name: 'Map',

			function: ()=> {
				const hajime = new Date();
				
				setSelectedDate({
					day: hajime.getDate(),
					month: hajime.getMonth(),
					year: hajime.getFullYear()
				})
				setCurrent({
					...current,
					map: true,
					transition: false
				})

				console.log(current);
				setOptionsOpen(false);
			},
			class: ''
		},
		{
			name: `Custom Log: ${current.log}`,
			function: null,
			class: ''
		},
	];
	const macrosOptions = [
		/*
			Create Tag
			Delete Tags
			New Collection
			Manage Collections
		*/
		{
			name: 'Create Tag',
			function: null,
			class: ''
		},
		{
			name: 'Delete Tags',
			function: null,
			class: ''
		},
		{
			name: 'New Collection',
			function: null,
			class: ''
		},
		{
			name: 'Manage Collections',
			function: null,
			class: ''
		},
	];
	const mapOptions = [
		{
			name: 'Post',
			function: null,
			class: ''
		},
		{
			name: 'Settings',
			function: ()=> {

				if(!current.modal) {
					console.log('response2');

					setCurrent({
						...current, 
						modal: true,
						map: true
					})

					setOptionsOpen(false);
					let delay = setTimeout(()=> {
						document.getElementById('mapSettings').classList.remove('_enter');			
					}, 300)
					
					// setSectionClass({
					// 	...sectionClass,
					// 	mapSettings: ''
					// })	
				}
				if(current.modal) {
					// setSectionClass({
					// 	...sectionClass,
					// 	mapSettings: '_enter'
					// })
					console.log('response');

					document.getElementById('mapSettings').classList.add('_enter');

					setOptionsOpen(false);

					setCurrent({
						...current, 
						modal: false,
						map: true
					})

					// let delay = setTimeout(()=> {
									
					// }, 300)
				}
			},
			class: ''
		},
		{
			name: 'Close',
			function: ()=> {
				console.log(current);
				if(current.section == 'social') {
					setActiveSection(1)
				}
				else if(current.section == 'home') {
					setActiveSection(2)
				}
				setOptionsOpen(false);

				setSectionClass({
					...sectionClass,
					map: 'leave'
				})
				let delay = setTimeout(()=> {
					setCurrent({
						...current,
						map: false,
						transition: false
					})
				}, 300)
				let delay2 = setTimeout(()=> {
						setSectionClass({
						...sectionClass,
						map: ''
					})
				}, 600)
			},
			class: ''
		},
	]
	const calendarOptions = [
		{
			name: 'Post',
			function: null,
			class: ''
		},
		{
			name: 'Settings',
			function: ()=> {
			},
			class: ''
		},
		{
			name: 'Close',
			function: ()=> {
				console.log(current);
				if(current.section == 'social') {
					setActiveSection(1)
				}
				else if(current.section == 'home') {
					setActiveSection(2)
				}
				setOptionsOpen(false);

				setSectionClass({
					...sectionClass,
					calendar: 'leave'
				})
				let delay = setTimeout(()=> {
					setCurrent({
						...current,
						calendar: false,
						transition: false
					})
				}, 300)
				let delay2 = setTimeout(()=> {
						setSectionClass({
						...sectionClass,
						calendar: ''
					})
				}, 600)
			},
			class: ''
		},
	];

	const createPostOptions = [
		{
			name: 'Close',
			function: ()=> {
				setActiveSection(2);
				setOptionsOpen(false);
				setSectionClass({
					...sectionClass,
					createPost: 'leave'
				});

				let delay = setTimeout(()=> {
					setCurrent({
						...current,
						createPost: false,
					})
				}, 300)
				let delay2 = setTimeout(()=> {
					setSectionClass({
						...sectionClass,
						createPost: ''
					})
					setCreatePostToggle();
				}, 600)

			},
			class: ''
		},
		{
			name: 'Draft',
			function: null,
			class: ''
		},
		{
			name: 'Post',
			function: null,
			class: ''
		},
		
	]
	
	const currentRef = React.useRef(current);
	const [activeSection, setActiveSection] = React.useState(2);
	const [optionsGroup, setOptionsGroup] = React.useState([
		profileOptions, 
		socialOptions, 
		homeOptions, 
		macrosOptions,
		mapOptions,
		calendarOptions,
		createPostOptions
	]);
	const activeGroup = optionsGroup[activeSection];
	const [optionsOpen, setOptionsOpen] = React.useState(false);

	const [mapClassToggle, setMapClassToggle] = React.useReducer(state => !state, true);

	const hajime = new Date();

	const launchOptions = () => {

		if(optionsOpen == false) {

			setOptionsOpen(true);

			const newOptionsGroup = optionsGroup.map((group, index) => {
				if(index == activeSection) {
					const classifiedGroup = group.map((item, index) => ({
						...item,
						class: `active${index+1}`
					}));
					return classifiedGroup;
				}
				return group;
			})

			let delay = setTimeout(()=> {
				setOptionsGroup(newOptionsGroup);
			}, 100)
			
		}
		else if(optionsOpen == true) {
			const newOptionsGroup = optionsGroup.map((group, index) => {
				if(index == activeSection) {
					const classifiedGroup = group.map((item, index) => ({
						...item,
						class: ""
					}));
					return classifiedGroup;
				}
				return group;
			})
			setOptionsGroup(newOptionsGroup);
			setOptionsOpen(false);
		}
	}

	//Changes the activeGroup value based on current.section 
	React.useEffect(()=> {
		if(current.section == 'profile') {
			setActiveSection(0)
		}
		else if(current.section == 'social') {
			setActiveSection(1)
		}
		else if(current.section == 'home') {
			setActiveSection(2)
		}
		else if(current.section == 'macros') {
			setActiveSection(3)
		}
		if(current.map == true) {
			setActiveSection(4)
		}
		if(current.calendar == true) {
			setActiveSection(5)
		}
		if(current.createPost == true) {
			setActiveSection(6)
		}
	}, [current])


	return (

		<div id="optionsButtonWrapper">

			{optionsOpen &&
				<ul id="options">
					{activeGroup.map(option => (
						<li className={`${option.class}`} key={option.name}>
							<button className={`buttonDefault`}
									onClick={option.function}>{option.name}</button>
						</li>
					))}
				</ul>
			}
			
			<button id="main" onClick={launchOptions}></button>
		</div>

		
	)
} 