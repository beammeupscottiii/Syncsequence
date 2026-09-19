import * as React from 'react';
import APIaccess from '../../apiaccess';
import {useNavigate} from 'react-router-dom';
import './macros.css';

let accessAPI = APIaccess();

export default function Macross({
	current, 
	setCurrent, 
	tags, 
	setTags, 
	userTopics, 
	setUserTopics, 
	sectionClass,
	refe,
	socialPaddingAdjust
}) {

	const userID = sessionStorage.getItem('userID');
	const navigate = useNavigate();

	let [tagsSection, toggleTags] = React.useReducer(state => !state, true);

	let [privatePostsSection, togglePrivatePosts] = React.useReducer(state => !state, false);
	let [privatePosts_visibleCount, setPrivatePosts_visibleCount] = React.useState(6);
	let [privatePosts, setPrivatePosts] = React.useState([]);

	let [collectionsSection, toggleCollections] = React.useReducer(state => !state, false);
	let [collections_visibleCount, setCollections_visibleCount] = React.useState(6);
	let [collections, setCollections] = React.useState([]);
	
	const privatePosts_ShowMore = () => {
		setPrivatePosts_visibleCount(prevCount => prevCount + 20);
	}

	const collections_ShowMore = () => {
		collections_visibleCount(prevCount => prevCount + 20);
	}

	
	let updateMacros = async() => {

		let tags = await accessAPI.getMacros('tags'); //allTagsUsed
		tags = tags.filter(e => e);
		console.log(tags)
		let userPrivatePosts = await accessAPI.getMacros('private');
		let collections = await accessAPI.getMacros('collections');

		setTags(tags);
		setPrivatePosts(userPrivatePosts);
		setCollections(collections);
	}

	let goToMacrosPage = async(tag) => {
									
		setTimeout(()=> {
			navigate(`/macros/${tag.name}/${tag._id}`, {
					state: {
						// topicHasAccess: macroInfo.type == 'topic' &&
					}
				})
		}, 200)
	}

	let goToPost = async(postData) => {
		setTimeout(()=> {
			navigate(`/post/${postData._id}`);
		}, 600)
	}

	console.log(tagsSection)
	console.log(collections)

	React.useEffect(()=> {
		updateMacros();
	}, []);



	return (	

		<section id='MACROS' ref={refe}
			className={`${sectionClass.macros} ${socialPaddingAdjust ? 'up' : 'down'}`}>

			{/*T A G S*/}
			<div id="tags" className={`section ${tagsSection == true ? 'open' : 'closed'}`}>

				{/*H E A D E R*/}
				<div className={`headerWrapper`}>
					<h2>Tags List</h2>
					<button className={`buttonDefault`} onClick={(e)=> {
						e.preventDefault()
						toggleTags();
					}}>{tagsSection == true ? '-' : '+'}</button>
				</div>

				{/*T A G S  W R A P P E R*/}
				<ul id="tagsWrapper">
					{tags.map(tag => (
						<li className={`${tag.type} ${tag.isPrivate == true ? 'private' : ''}`} key={tag.name}>
							<button className={tag.type} onClick={(e)=> {
								e.preventDefault();
								goToMacrosPage(tag);
							}}>{tag.name}</button>
						</li>
					))}
				</ul>
			</div>


			{/*P R I V A T E  P O S T S*/}
			<div id="privatePosts" className={`section ${privatePostsSection == true ? 'open' : 'closed'}`}>

				{/*H E A D E R*/}
				<div className={`headerWrapper`}>
					<h2>Private Posts</h2>
					<button className={`buttonDefault`} onClick={(e)=> {
						e.preventDefault()
						togglePrivatePosts()
					}}>{privatePostsSection == true ? '-' : '+'}</button>
				</div>

				{/*P O S T S  L I S T*/}
				<ul>
					{privatePosts.slice(0, privatePosts_visibleCount).map((post, index)=> {

						let cmntcount = 0, commentCount;
							let countComments = (comments) => {
				
								for(let cmnt of comments) {
									cmntcount++;
									countComments(cmnt.replies)
								}

								commentCount = cmntcount;
							}
							countComments(post.comments)
							
							return (
								<li onClick={()=> {goToPost(post)}}>
									<h4>{post.postedOn_month}. {post.postedOn_day}. {post.postedOn_year}</h4>
									<h3>{post.title}</h3>

									<ul className={`deets`}>
										{post.tags.length > 0 &&
											<li>{post.tags.length} tags</li>
										}
										{commentCount > 0 &&
											<li>{commentCount} comments</li>
										}
									</ul>
								</li>
							)
					})}
				</ul>

				{/*E X P A N D  B U T T O N*/}
				{privatePosts_visibleCount < privatePosts.length && (
					<button id="showMore" 
							className={`buttonDefault`}
							onClick={privatePosts_ShowMore}>
						Show More
					</button>
				)}
			</div>


			{/*C O L L E C T I O N S*/}
			<div id="collections" className={`section ${collectionsSection == true ? 'open' : 'closed'}`}>
				
				{/* H E A D E R */}
				<div className={`headerWrapper`}>
					<h2>Collections</h2>
					<button className={`buttonDefault`} onClick={(e)=> {
						e.preventDefault()
						toggleCollections()
					}}>{collectionsSection == true ? '-' : '+'}</button>
				</div>

				{/*L I S T*/}
				<ul>
					{collections.length > 0 &&
						collections.map(item => {

							return (
								<li onClick={()=> {goToMacrosPage(item)}}>
									{item.name}
								</li>
							)
						})
					}
				</ul>

				{/*E X P A N D  B U T T O N*/}
				{collections_visibleCount < collections.length && (
					<button id="showMore" 
							className={`buttonDefault`}
							onClick={collections_ShowMore}>
						Show More
					</button>
				)}

			</div>

		</section>
	)
}