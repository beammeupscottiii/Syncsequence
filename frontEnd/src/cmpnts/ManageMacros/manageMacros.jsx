import * as React from 'react';
import APIaccess from '../../apiaccess';
import './manageMacros.css';

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


	const createTag = () => {
		// let body = {
	    //    type: "tag",
	    //    name: newTagName,
	    //    isPrivate: isPrivate,
	    //    action: 'newTag'
	    // }

	    // let request = await accessAPI.newGroup(body);

	    // if(request.alreadyExists) {

	    //   setCreatingTag(false);

	    //   triggerPopup({
	    //       message: `A tag with the name ${newTagName} already exists`, 
	    //   });
	    // }
	    // else if (request.confirm) {
	    //     triggerPopup({
	    //       message: `New Tag ${newTagName} created!` 
	    //     })
	}

	const deleteTag = () => {

	}

	const createCollection = () => {

	}

	const manageCollection = () => {

	}

	React.useEffect(()=> {

	}, [])


	return (
		<div id='manageMacros' className={`${sectionClass.manageMacros}`}>
			
			{createTagToggle &&
				<div id="createTag">
					<h2>Create Tag</h2>
				</div>
			}
			
			{deleteTagsToggle &&
				<div id="deleteTag">
					<h2>Delete Tags</h2>
				</div>
			}
			
			{newCollectionToggle &&
				<div id="newCollection">
					<h2>New Collection</h2>
				</div>	
			}
			
			{manageCollectionsToggle &&
				<div id="manageCollections">
					<h2>Manage Collections</h2>
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