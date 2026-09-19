import * as React from 'react';
import APIaccess from '../../apiaccess';
import './manageMacros.css';

let accessAPI = APIaccess();


export default function ManageMacross({
	createTagToggle,
	deleteTagsToggle,
	newCollectionToggle,
	manageCollectionsToggle
}) {


	// let [modal, setModal] = React.useState({
	// 	active: false,
	// 	newTag: false,
	// 	deleteTag: false,
	// 	newCollection: false,
	// 	manageCollections: false
	// });

	React.useEffect(()=> {

	})


	return (
		<div id='manageMacros'>
			
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
		</div>
	)
}