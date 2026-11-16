import * as React from 'react';
import APIaccess from '../../apiaccess';
import './manageMacros.css';

import { useUIC } from '../../UIcontext';
let accessAPI = APIaccess();


export default function ManageMacross({
	current,
	setCurrent,
	sectionClass,
	setSectionClass,
	set_ManageMacrosToggle,
	createTagToggle,
	deleteTagsToggle,
	newCollectionToggle,
	manageCollectionsToggle
}) {

	const {
		triggerPopup,
		userSettings,
		setUserSettings
	} = useUIC();

	const [userTags, setUserTags] = React.useState([]);
	const [userCollections, setUserCollections] = React.useState([
		// {
		// 	name: 'This is a Collection',
		// 	_id: 1234,
		// 	selected: false,
		// 	delete: null,
		// 	rename: null,
		// 	isPrivate: false,
		// 	makePrivate: null
		// },
	])
	const [newTag_value, setNewTag_value] = React.useState({
		name: '',
		isPrivate: null
	});
	const [newCollection, setNewCollection] = React.useState({
		name: '',
		isPrivate: false,
		description: ''
	});


	let updateMacros = async() => {

		let tags = await accessAPI.getMacros('tags');
		tags = tags.filter(Boolean);
		console.log(tags);

		tags = tags.filter(tag => tag.type == 'tag');
		tags = tags.map(tag => {
			return {
				name: tag.name,
				selected: false,
				id: tag._id
			}
		})

		let collections = await accessAPI.getMacros('collections');
		collections = collections.map(el => {
			return {
				name: el.name,
				_id: el._id,
				selected: false,
				delete: null,
				rename: null,
				isPrivate: el.isPrivate,
				makePrivate: null
			}
		})

		setUserTags(tags);
		setUserCollections(collections); 
	}


	// C r e a t e  T a g s  F u n c t i o n s
	const createTag = async () => {
		let body = {
	       type: "tag",
	       name: newTag_value.name,
	       isPrivate: newTag_value.isPrivate,
	       action: 'newTag'
	    }

	    let request = await accessAPI.newGroup(body);

	    if(request.alreadyExists) {

	      // setCreatingTag(false);

	      triggerPopup({
	          message: `A tag with the name ${newTag_value.name} already exists`, 
	      });
	    }
	    else if (request.confirm) {
	        triggerPopup({
	          message: `New Tag ${newTag_value.name} created!` 
	        })
	    }
	}
	let newTag_onChange = (e) => {
		const input = e.currentTarget.value;
		setNewTag_value({
			...newTag_value,
			name: e.currentTarget.value
		});
	}


	// D e l e t e  T a g s  F u n c t i o n s
	let selectDeleteTag = (name, index) => {
		let tags = userTags.map(ele => {
			if(ele.name == name) {
				
				if(ele.selected == false) {
					return {
						...ele,
						selected: true
					}
				}
				else if(ele.selected == true) {
					return {
						...ele,
						selected: false
					}
				} 
			} else {
				return {
					...ele,
					selected: false
				}
			}
		})
		setUserTags(tags);
		console.log(tags);
		// console.log(deleteTags[index].selected)
	}
	let deleteTag_submit = async(id) => {

		let body = {
			type: 'tag',
			groupID: id,
			action: 'deleteTag'
		}
		
		let request = await accessAPI.manageGroup('deleteGroup', body);

		if(request.confirmation == true) {
			triggerPopup({
				message: `${request.groupName} has been deleted`
			})
		}
		else if(request.message) {
			triggerPopup({
				message: `${request.message}`
			})
		}
	}


	// C r e a t e  C o l l e c t i o n s
	let newCollection_submit = async() => {

		let body = {
			type: 'collection',
            name: newCollection.name,
            isPrivate: newCollection.isPrivate == true ? true : false,
            details: newCollection.description,
            action: 'newCollection'
		}

		let request = await accessAPI.newGroup(body);

		if(request.confirmation == true) {
			triggerPopup({
				message: `Created new collection, '${request.name}'`
			})
		}
		else if(request.alreadyExists) {
			triggerPopup({
				message: `A collection with this name already exists`
			})
		}
		else if(request.message) {
			triggerPopup({
				message: `${request.message}`
			})
		}

		setNewCollection({
			name: '',
			description: '',
			isPrivate: false
		})
	}
	let newCollectionName_onChange = (e) => {

		const input = e.currentTarget.value;
		setNewCollection({
			...newCollection,
			name: e.currentTarget.value
		});
	}
	let newCollectionDescription_onChange = (e) => {

		const input = e.currentTarget.value;
		setNewCollection({
			...newCollection,
			description: e.currentTarget.value
		});
	}


	// M a n a g e  C o l l e c t i o n s
	let manageCollections = (name, type, value) => {
		
		let newVer = userCollections.map(ele => {
			if(ele.name == name) {

				if(type == 'selected') {
					return {
						...ele,
						selected: value 
					}
				}
				else if(type == 'rename') {
					return {
						...ele,
						selected: false,
						rename: value
					}
				}
				else if(type == 'makePrivate') {
					return {
						...ele,
						selected: false,
						makePrivate: value 
					}
				}
				else if(type == 'delete') {
					return {
						...ele,
						selected: false,
						delete: value 
					}
				}
			} else {
				return {
					...ele,
					selected: false,
					rename: false,
					delete: false,
					makePrivate: false 
				}
			}
		})
		setUserCollections(newVer);
	}

	let [editCollection, setEditCollection] = React.useState({
		newName: '',
		isPrivate: null,
		id: null
	})
	let editCollectionName_onChange = (e) => {

		const input = e.currentTarget.value;
		setEditCollection({
			...editCollection,
			newName: e.currentTarget.value
		});
	}
	let renameCollection = async(groupID) => {

		let body = {
			newName: editCollection.newName,
			groupID: groupID,
			action: 'renameCollection'
		}

		let request = await accessAPI.manageGroup('renameGroup', body);

		if(request == true) {
			triggerPopup({
				message: `Renamed collection to ${editCollection.newName}`
			})
		}
		else if(request.message) {
			triggerPopup({
				message: `${request.message}`
			})
		}

		setEditCollection({
			...editCollection,
			newName: ''
		})
	}
	let privatizeCollection = async(isPrivate, groupID) => {

		let body = {
			isPrivate: isPrivate,
			groupID: groupID,
			action: 'privatizeCollection',
		}

		let request = await accessAPI.manageGroup('privatizeGroup', body);
		
		if(request.confirmation == true) {

			triggerPopup({
				message: `Collection privacy status changed`
			})
		}
		else if(request.message) {

			triggerPopup({
				message: `${request.message}`
			})
		}
	}
	let deleteCollection = async(groupID) => {

		let body = {
			groupID: groupID,
			action: 'deleteCollection'
		};

		let request = await accessAPI.manageGroup('deleteGroup', body);

		if(request.groupName === 'BOOKMARKS') {

			triggerPopup({
				message: `Bookmarks have been emptied`
			})
		}
		else if(request.confirmation == true) {

			triggerPopup({
				message: `Collection deleted`
			})
		}
		else if(request.message) {

			triggerPopup({
				message: `$request.message}`
			})
		}
	}




	//Initializer useEffect
	React.useEffect(()=> {
		updateMacros();
	}, [])


	return (
		<div id='manageMacros' className={`${sectionClass.manageMacros}`}>
			
			{createTagToggle &&
				<div id="createTag">
					<h2>Create Tag</h2>

					<div className={"newTagWrapper"}>
						
						<input 
							placeholder="Enter a single word phrase"
							onChange={newTag_onChange} 
							value={`${newTag_value.name}`}/>
						<div className={'buttonWrapper'}>
							<button className={`buttonDefault ${newTag_value.isPrivate == true ? '' : '_inactive'}`} 
									onClick={(e)=> {
								e.preventDefault()

								if(newTag_value.isPrivate == true) {
									setNewTag_value({
										...newTag_value,
										isPrivate: false
									})
								} else {
									setNewTag_value({
										...newTag_value,
										isPrivate: true
									})
								}
							}}>Private</button>
							<button className={`buttonDefault`}
									onClick={(e)=> {
										e.preventDefault()
										createTag()
							}}>Save</button>
						</div>
					</div>
				</div>
			}
			
			{deleteTagsToggle &&
				<div id="deleteTags">
					<h2>Delete Tags</h2>

					<ul id="deleteTags">
						{userTags.map((tag, index) => (
							<li key={tag.id}
								className={`${userTags[index].selected == true ? 'selected' : ''}`}>
								<button onClick={()=> {selectDeleteTag(tag.name, index)}}>{tag.name}</button>
								<div className={`confirmation`}>
									<p>Are You Sure?</p>

									<div className={`buttonWrapper`}>
										<button className={`buttonDefault`} 
												onClick={(e)=> {
													e.preventDefault()
													deleteTag_submit(tag.id);
												}}>Yes</button>
										<button className={`buttonDefault`}
												onClick={(e)=> {
													e.preventDefault()
													selectDeleteTag(tag.name, index)
												}}>No</button>
									</div>
								</div>
							</li>
						))}
					</ul>

				</div>
			}
			
			{newCollectionToggle &&
				<div id="newCollection">
					<h2>New Collection</h2>

					<form id="newCollection">
						<input  placeholder="Enter a Name"
								name="collectionName" 
							   	onChange={newCollectionName_onChange} 
							   	value={`${newCollection.name}`}/>
						<textarea name="collectionDescription" 
									placeholder="Enter Description" 
									rows="4" 
									cols="20"
									onChange={newCollectionDescription_onChange}>
						</textarea>

						<div id="buttonWrapper">
							<button className={`buttonDefault ${newCollection.isPrivate == true ? '' : '_inactive'}`} onClick={(e)=> {
								e.preventDefault()
								if(newCollection.isPrivate == true) {
									setNewCollection({
										...newCollection,
										isPrivate: false
									})
								} else {
									setNewCollection({
										...newCollection,
										isPrivate: true
									})
								}
							}}>Private</button>

							<button className={`buttonDefault`} onClick={(e)=> {
								e.preventDefault()
								newCollection_submit()
							}}>Save</button>
						</div>
					</form>

				</div>	
			}
			
			{manageCollectionsToggle &&
				<div id="manageCollections">
					<h2>Manage Collections</h2>

					<ul id="collections">
						{userCollections.map((item, index) => (
							<li key={item.id}
								className={`${userCollections[index].selected == true ? 'selected' : ''} 
											${userCollections[index].rename == true ? '_rename' : ''}
											${userCollections[index].delete == true ? '_confirm' : ''}
											${userCollections[index].makePrivate == true ? '_confirm' : ''}`}
								onClick={(e)=> {
									e.preventDefault()
									manageCollections(item.name, 'selected', true);
								}}>
								<p>{item.name}</p>
								<div className={`options`}>

									<div className={`initialChoiceWrapper`}>
										<button className={`buttonDefault`}
												onClick={(e)=> {
													e.preventDefault();
													setTimeout(()=> {
														manageCollections(item.name, 'rename', true);
													}, 100)
												}}>Rename</button>
										<button className={`buttonDefault ${userCollections[index].isPrivate == true ? '' : '_inactive'}`}
												onClick={(e)=> {
													e.preventDefault();
													setTimeout(()=> {
														manageCollections(item.name, 'makePrivate', true);
													}, 100)
												}}>Private</button>
										<button className={`buttonDefault`}
												onClick={(e)=> {
													e.preventDefault();
													setTimeout(()=> {
														manageCollections(item.name, 'delete', true);
													}, 100)
												}}>Delete</button>
									</div>

									<div className={`confirm `}>
											<p>Are You Sure?</p>

											<div className={`choiceWrapper`}>
												<button className={`buttonDefault`}
														onClick={(e)=> {
															e.preventDefault()
															console.log(item.name)
															if(userCollections[index].delete == true) {
																deleteCollection(item._id)
															}
															else if(userCollections[index].makePrivate == true) {
																let change = userCollections[index].isPrivate == true ? false : true;
																privatizeCollection(change, item._id);
															}
														}}>Yes</button>

												<button className={`buttonDefault`}
														onClick={(e)=> {
															e.preventDefault();
															console.log('thing');
															setTimeout(()=> {
																manageCollections();
															}, 100)
												}}>No</button>
											</div>
										</div>

									<form className={` `}>
											<input placeholder="Enter New Title" 
												   value={`${editCollection.newName}`}
												   onChange={editCollectionName_onChange}/>
											<div className={'wrapper'}>
												<button className={`buttonDefault`}
														onClick={(e)=> {
															e.preventDefault();
															setTimeout(()=> {
																manageCollections(item.name, 'rename', false);
															}, 100)
															setEditCollection({
																...editCollection,
																newName: '',
															})
												}}>Cancel</button>
												<button className={`buttonDefault`}
														onClick={(e)=> {
															e.preventDefault();
															renameCollection(item._id)
												}}>Save</button>	
											</div>
										</form>
								</div>
							</li>
						))}
					</ul>
				</div>
			}


			{/*
				E X I T  
				B U T T O N
			*/}
			<div id="exitButtonWrapper">
				<button id="exit" 
						className={"buttonDefault"} 
						onClick={(e)=> {
					e.preventDefault();

					setSectionClass({
						...sectionClass,
						manageMacros: 'leave'
					});

					let delay = setTimeout(()=> {
						setCurrent({
							...current,
							manageMacros: false,
						})
					}, 300)
					let delay2 = setTimeout(()=> {
						setSectionClass({
							...sectionClass,
							manageMacros: ''
						})
						set_ManageMacrosToggle();
					}, 600)	
				}}>✕</button>
			</div>
		</div>
	)
}