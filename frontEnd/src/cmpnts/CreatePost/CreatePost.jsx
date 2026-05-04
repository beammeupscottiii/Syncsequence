/* * * V i t a l s * * */
import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import APIaccess from '../../apiaccess';
import { useUIC } from '../../UIcontext';

import './CreatePost.css';

let accessAPI = APIaccess();


let addText = 
<svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="22" 
    height="22" 
    viewBox="0 0 22 22">
  <g id="Group_564" data-name="Group 564" transform="translate(-33.163 -259)">
    <g id="Group_374" data-name="Group 374" transform="translate(33 259)">
      <g id="Ellipse_30" data-name="Ellipse 30" transform="translate(0.163)" fill="none" stroke="rgba(112,112,112,0.5)" stroke-width="2">
        <circle cx="11" cy="11" r="11" stroke="none"/>
        <circle cx="11" cy="11" r="10" fill="none"/>
      </g>
    </g>
    <g id="Group_375" data-name="Group 375" transform="translate(38.915 264.752)">
      <line id="Line_221" data-name="Line 221" x2="10.497" transform="translate(0 5.248)" fill="none" stroke="rgba(112,112,112,0.5)" stroke-width="2"/>
      <line id="Line_222" data-name="Line 222" x2="10.497" transform="translate(5.248) rotate(90)" fill="none" stroke="rgba(112,112,112,0.5)" stroke-width="2"/>
    </g>
  </g>
</svg>

let addImage = 
<svg 
  xmlns="http://www.w3.org/2000/svg" 
  width="27.16" 
  height="23.374" 
  viewBox="0 0 27.16 23.374">
  <g 
    id="Group_565" 
    data-name="Group 565" 
    transform="translate(-4634.84 -575.626)">
      <g 
        id="Path_39" 
        data-name="Path 39" 
        transform="translate(4634.84 578.54) rotate(-8)" 
        fill="none">
        <path 
          d="M4,0H16.939a4,4,0,0,1,4,4V14.8a4,4,0,0,1-4,4H4a4,4,0,0,1-4-4V4A4,4,0,0,1,4,0Z" 
          stroke="none"/>
        <path 
          d="M 4 1.999998092651367 C 2.897199630737305 1.999998092651367 2 2.897197723388672 2 3.999998092651367 L 2 14.80451774597168 C 2 15.90731811523438 2.897199630737305 16.80451774597168 4 16.80451774597168 L 16.93860054016113 16.80451774597168 C 18.04140090942383 16.80451774597168 18.93860054016113 15.90731811523438 18.93860054016113 14.80451774597168 L 18.93860054016113 3.999998092651367 C 18.93860054016113 2.897197723388672 18.04140090942383 1.999998092651367 16.93860054016113 1.999998092651367 L 4 1.999998092651367 M 4 -1.9073486328125e-06 L 16.93860054016113 -1.9073486328125e-06 C 19.14773941040039 -1.9073486328125e-06 20.93860054016113 1.790857315063477 20.93860054016113 3.999998092651367 L 20.93860054016113 14.80451774597168 C 20.93860054016113 17.01365852355957 19.14773941040039 18.80451774597168 16.93860054016113 18.80451774597168 L 4 18.80451774597168 C 1.790861129760742 18.80451774597168 0 17.01365852355957 0 14.80451774597168 L 0 3.999998092651367 C 0 1.790857315063477 1.790861129760742 -1.9073486328125e-06 4 -1.9073486328125e-06 Z" 
          stroke="none" 
          fill="rgba(112,112,112,0.51)"/>
      </g>
    <g 
      id="Group_372" 
      data-name="Group 372" 
      transform="translate(4641.272 581.195)">
      <g 
        id="Rectangle_141" 
        data-name="Rectangle 141" 
        transform="translate(-0.272 -0.195)" 
        fill="#fff" 
        stroke="rgba(112,112,112,0.51)" 
        stroke-width="2">
          <rect width="21" height="18" rx="4" stroke="none"/>
          <rect x="1" y="1" width="19" height="16" rx="3" fill="none"/>
      </g>
      <path 
        id="Path_7" 
        data-name="Path 7" 
        d="M0,.317S2.043-3.511,4.294-3.511,6.452,1.193,9,.317s3.744-8.28,5.493-7.331S18.841.317,18.841.317" 
        transform="translate(0.915 12.359)" 
        fill="none" 
        stroke="rgba(112,112,112,0.51)" 
        stroke-width="2"/>
      <circle 
        id="Ellipse_29" 
        data-name="Ellipse 29" 
        cx="1.5" 
        cy="1.5" 
        r="1.5" 
        transform="translate(2.728 2.805)" 
        fill="rgba(112,112,112,0.5)"/>
    </g>
  </g>
</svg>

let tagUsers = 
<svg 
  xmlns="http://www.w3.org/2000/svg" 
  width="22.577" 
  height="26.247" 
  viewBox="0 0 22.577 26.247">
  <g 
    id="Group_568" 
    data-name="Group 568" 
    transform="translate(-213.634 -266.753)">
    <g 
      id="Group_382" 
      data-name="Group 382" 
      transform="translate(213.634 266.753)">
      <g 
        id="Group_380" 
        data-name="Group 380">
        <g 
          id="Path_11" 
          data-name="Path 11" 
          transform="translate(0 11.119)" 
          fill="#fff">
          <path 
            d="M9.436,0a9.436,9.436,0,0,1,9.436,9.436c0,5.211-4.224,4.552-9.436,4.552S0,14.647,0,9.436A9.436,9.436,0,0,1,9.436,0Z" 
            stroke="none"/>
          <path 
            d="M 9.435518264770508 1.999995231628418 C 5.33555793762207 1.999995231628418 1.999998092651367 5.335556030273438 1.999998092651367 9.435515403747559 C 1.999998092651367 11.10657501220703 2.522558212280273 11.39309501647949 2.773687362670898 11.53078556060791 C 3.550658226013184 11.95678520202637 5.055977821350098 12.01422595977783 6.426028251647949 12.01422595977783 C 6.872498512268066 12.01422595977783 7.334407806396484 12.0080451965332 7.823428153991699 12.00150585174561 C 8.343838691711426 11.99454593658447 8.8819580078125 11.98734569549561 9.435518264770508 11.98734569549561 C 9.989248275756836 11.98734569549561 10.52730846405029 11.99454593658447 11.04765892028809 12.00150585174561 C 11.53659820556641 12.0080451965332 11.99842834472656 12.01422595977783 12.44500827789307 12.01422595977783 C 13.81487846374512 12.01422595977783 15.32003784179688 11.9567756652832 16.09716796875 11.53067588806152 C 16.34835815429688 11.39294528961182 16.87103843688965 11.10635566711426 16.87103843688965 9.435515403747559 C 16.87103843688965 5.335556030273438 13.53547859191895 1.999995231628418 9.435518264770508 1.999995231628418 M 9.435518264770508 -4.76837158203125e-06 C 14.64660835266113 -4.76837158203125e-06 18.87103843688965 4.224425315856934 18.87103843688965 9.435515403747559 C 18.87103843688965 14.64661598205566 14.64660835266113 13.98734569549561 9.435518264770508 13.98734569549561 C 4.224430084228516 13.98734569549561 -1.9073486328125e-06 14.64661598205566 -1.9073486328125e-06 9.435515403747559 C -1.9073486328125e-06 4.224425315856934 4.224428176879883 -4.76837158203125e-06 9.435518264770508 -4.76837158203125e-06 Z" 
            stroke="none" 
            fill="rgba(112,112,112,0.48)"/>
        </g>
        <g 
          id="Ellipse_32" 
          data-name="Ellipse 32" 
          transform="translate(4.045)" 
          fill="none" 
          stroke="rgba(112,112,112,0.48)" 
          stroke-width="2">
          <circle 
            cx="5.096" 
            cy="5.096" 
            r="5.096" 
            stroke="none"/>
          <circle 
            cx="5.096" 
            cy="5.096" 
            r="4.096" 
            fill="none"/>
        </g>
      </g>
      <g 
        id="Group_383" 
        data-name="Group 383" 
        transform="translate(11.458 15.128)">
        <rect 
          id="Rectangle_143" 
          data-name="Rectangle 143" 
          width="12" 
          height="12" 
          transform="translate(-0.881 -0.881)" 
          fill="#fff"/>
        <g 
          id="Group_381" 
          data-name="Group 381" 
          transform="translate(0.193 1.119)">
          <line 
            id="Line_224" 
            data-name="Line 224" 
            y2="9" 
            transform="translate(4.926)" 
            fill="none" 
            stroke="rgba(112,112,112,0.5)" 
            stroke-width="2"/>
          <line 
            id="Line_225" 
            data-name="Line 225" 
            y2="10" 
            transform="translate(10 4.44) rotate(90)" 
            fill="none" 
            stroke="rgba(112,112,112,0.5)" 
            stroke-width="2"/>
        </g>
      </g>
    </g>
  </g>
</svg>

const addTags = 
<svg 
  xmlns="http://www.w3.org/2000/svg" 
  width="27.104" 
  height="23.775" 
  viewBox="0 0 27.104 23.775">
  <g 
    id="Group_569" 
    data-name="Group 569" 
    transform="translate(-4573.47 -493.812)">
    <line 
      id="Line_226" 
      data-name="Line 226" 
      x2="0.951" 
      y2="26.887" 
      transform="matrix(0.819, -0.574, 0.574, 0.819, 4575.235, 494.959)" 
      fill="none" 
      stroke="rgba(112,112,112,0.5)" 
      stroke-width="2"/>
      <line 
        id="Line_228" 
        data-name="Line 228" 
        x2="0.951" 
        y2="26.887" 
        transform="matrix(0.819, -0.574, 0.574, 0.819, 4583.534, 494.959)" 
        fill="none" 
        stroke="rgba(112,112,112,0.5)" 
        stroke-width="2"/>
      <line 
        id="Line_229" 
        data-name="Line 229" 
        y2="23.305" 
        transform="translate(4596.774 501.898) rotate(90)" 
        fill="none" 
        stroke="rgba(112,112,112,0.5)" 
        stroke-width="2"/>
      <line 
        id="Line_230" 
        data-name="Line 230" 
        y2="23.305" 
        transform="translate(4600.305 509.273) rotate(90)" 
        fill="none" 
        stroke="rgba(112,112,112,0.5)" 
        stroke-width="2"/>
  </g>
</svg>

const addLocationData =
<svg 
  xmlns="http://www.w3.org/2000/svg" 
  width="18.423" 
  height="23.37" 
  viewBox="0 0 18.423 23.37">
  <g 
    id="Group_567" 
    data-name="Group 567" 
    transform="translate(-173.577 -266.63)">
    <g 
      id="Group_378" 
      data-name="Group 378" 
      transform="translate(-4417.138 -316)">
      <g 
        id="Path_10" 
        data-name="Path 10" 
        transform="translate(4590.714 582.63)" 
        fill="none">
        <path 
          d="M9.212,0c5.087,0,9.212,3.548,9.212,7.925S10.819,23.37,8.988,23.37,0,12.3,0,7.925,4.124,0,9.212,0Z" 
          stroke="none"/>
        <path 
          d="M 9.21160888671875 1.999998092651367 C 5.235109329223633 1.999998092651367 1.999998092651367 4.657817840576172 1.999998092651367 7.924727439880371 C 1.999998092651367 9.342227935791016 3.223918914794922 12.34802722930908 5.118068695068359 15.58235740661621 C 6.742815017700195 18.35666084289551 8.198783874511719 20.2008056640625 9.007073402404785 21.02586555480957 C 9.85053825378418 20.20625495910645 11.38494491577148 18.35835647583008 13.11470890045166 15.56567764282227 C 15.55672836303711 11.62305736541748 16.42321968078613 8.985457420349121 16.42321968078613 7.924727439880371 C 16.42321968078613 4.657817840576172 13.18810844421387 1.999998092651367 9.21160888671875 1.999998092651367 M 9.21160888671875 -1.9073486328125e-06 C 14.29903888702393 -1.9073486328125e-06 18.42321968078613 3.548017501831055 18.42321968078613 7.924727439880371 C 18.42321968078613 12.30142784118652 10.81915855407715 23.36999702453613 8.988398551940918 23.36999702453613 C 7.157649040222168 23.36999702453613 -1.9073486328125e-06 12.30142784118652 -1.9073486328125e-06 7.924727439880371 C -1.9073486328125e-06 3.548017501831055 4.124178886413574 -1.9073486328125e-06 9.21160888671875 -1.9073486328125e-06 Z" 
          stroke="none" 
          fill="rgba(112,112,112,0.5)"/>
      </g>
    </g>
    <g 
      id="Ellipse_31" 
      data-name="Ellipse 31" 
      transform="translate(179 271)" 
      fill="none" 
      stroke="rgba(112,112,112,0.5)" 
      stroke-width="2">
      <circle 
        cx="3.75" 
        cy="3.75" 
        r="3.75" 
        stroke="none"/>
      <circle 
        cx="3.75" 
        cy="3.75" 
        r="2.75" 
        fill="none"/>
    </g>
  </g>
</svg>



function SelectionModal({ 
  title, 
  data, 
  setData, 
  modal, 
  setModal 
}) {
  const {triggerPopup} = useUIC();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [apiResults, setApiResults] = React.useState([]);
  const [loadingResults, setLoadingResults] = React.useState(false);

  //for Create Tag Modal
  const [isCreatingTag, setCreatingTag] = React.useReducer(state => !state, false);
  const [newTagName, setNewTagName] = React.useState('');
  const [isPrivate, setIsPrivate] = React.useState(false);

  const createTag = async() => {

    if (!newTagName.trim() || newTagName.includes(' ')) {
       triggerPopup({
            message: `Please enter a single term with no spaces`, 
        });
        return;
    }

    let body = {
       type: "tag",
       name: newTagName,
       isPrivate: isPrivate,
       action: 'newTag'
    }

    let request = await accessAPI.newGroup(body);

    if(request.alreadyExists) {

      setCreatingTag(false);

      triggerPopup({
          message: `A tag with the name ${newTagName} already exists`, 
      });
    }
    else if (request.confirm) {
        triggerPopup({
          message: `New Tag ${newTagName} created!` 
        })

        //updates tags n topics, should include new tag
        let topics = await accessAPI.getSuggestions();
        let userTags = await accessAPI.getUserTags(); //gets all tags 

        let results = [];
        let _topics = topics.map(topic => {
          return {
            name: topic,
            type: 'topic',
            selected: false
          }
        })
        results.push(..._topics);

        if(userTags != false) {
          let _userTags = userTags.map(topic => {
            return {
              name: topic.name,
              type: 'tag',
              selected: false
            }
          })
          results.push(..._userTags);
        }

        setData(results);

        setCreatingTag();
    }
  }



  // 1. Determine if data is an array or a single object
  const isLocationMode = title == 'Location';
  const isTagsMode = title == 'Tags & Topics';
  const dataIsArray = Array.isArray(data);

  const localFilteredOptions = React.useMemo(() => {
	  // if (!dataIsArray || !searchQuery) return [{name: data.name}] || [];
    if (!dataIsArray) return data ? [data] : [];
    if (!searchQuery.trim()) return data;

	  const lowerCaseQuery = searchQuery.toLowerCase();
	  return data.filter(item => {
	    const matchesUsername = item.username?.toLowerCase().includes(lowerCaseQuery);
	    const primaryName = item.name || item.fullName;
	    const matchesName = primaryName?.toLowerCase().includes(lowerCaseQuery);
	    return matchesUsername || matchesName;
	  });
  }, [data, searchQuery, dataIsArray]);

  React.useEffect(() => {
	  // Only run this if we are NOT in array mode
	  if (dataIsArray) return;

	  if (!searchQuery.trim()) {
	    // If empty, show current location as the only option
	    setApiResults(data ? [{ ...data }] : []);
	    return;
	  }

	  const fetchLocations = async () => {
	    setLoadingResults(true);
	    try {
	      const response = await accessAPI.userSettings({
	        option: 'searchLocation',
	        query: searchQuery
	      });
	      setApiResults(response || []);
	    } catch (err) {
	      console.error('Error fetching suggestions:', err);
	      setApiResults([]);
	    } finally {
	      setLoadingResults(false);
	    }
	  };

	  const debounce = setTimeout(fetchLocations, 400); // Wait 400ms after user stops typing
	  return () => clearTimeout(debounce);
  }, [searchQuery, dataIsArray, data]);

  // 4. The Final List for the JSX
  const filteredOptions = dataIsArray ? localFilteredOptions : apiResults;

  //for placing selected options within it's state
  const selectedOptions = React.useMemo(() => {
  	if(dataIsArray) {
  		return data.filter(item => item.selected);
  	}
  	else return [{name: data.name}]
  }, [data]);

  const toggleSelection = async (clickedOption) => {
	  if(dataIsArray) {
	  	// 1. Identify what we are looking for (Username takes priority, then Name)
		  const targetValue = clickedOption.userName || clickedOption.name;

		  // 2. Prevent execution if both are missing (safety check)
		  if (!targetValue) return;

		  setData(prevData =>
		    prevData.map(item => {
		      // 3. Check if this specific item's username or name matches our target
		      const itemValue = item.userName || item.name;
		      
		      return itemValue === targetValue 
		        ? { ...item, selected: !item.selected } 
		        : item;
		    })
		  );
	  }
	  else {
	  	setData({
	  		...data,
	  		name: clickedOption.name
	  	})
	  }
  };

  //for controlled inputs
  const [manualCoordinates, setManualCoordinates] = React.useState({
  	lat: '',
  	lon: ''
  })

  const coordinatesOnChange = (e) => {
		if(e.target.name == 'lon') {

			const val = e.target.value;
			if (/^-?\d*\.?\d*$/.test(val)) {
				setManualCoordinates({
					...manualCoordinates,
					lon: e.target.value
				})
			}
		}
		else if(e.target.name == 'lat') {

			const val = e.target.value;
			if (/^-?\d*\.?\d*$/.test(val)) {
				setManualCoordinates({
					...manualCoordinates,
					lat: e.target.value
				})
			}
		}
  }

  //Auto sync controlled inputs with setData
  React.useEffect(()=> {

  	if(!isLocationMode || !setData.open) return;

  	if(manualCoordinates.lat !== '' && manualCoordinates.lon !== '') {
  		setData({
  			...data,
  			lon: manualCoordinates.lon,
  			lat: manualCoordinates.lat
  		})
  	} else {
  		setData({
  			...data,
  			lon: '',
  			lat: ''
  		})
  	}
  }, [manualCoordinates, setData, isLocationMode])


  //Necessary shtuff for getting geolocation
  const getGeoInfo_options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
  };
  const getGeoInfo_success = (pos) => {

  		console.log(pos.coords.longitude.toFixed(6))
  		console.log(pos.coords.latitude.toFixed(6))

		setManualCoordinates({
			lon: pos.coords.longitude.toFixed(6),
			lat: pos.coords.latitude.toFixed(6)
		})
		console.log('Location data saved within state')
  }
  const getGeoInfo_error = (err) => {
	 console.log(`Error (${err.code}): ${err.message}`)
  }

  //Get coordinates when button is toggled
  React.useEffect(()=> {
		if(manualCoordinates.lon) {
			return;
		}

		if(isLocationMode) {
			if(navigator.geolocation) {
				navigator.permissions.query({name: "geolocation"}).then((result)=> {
					console.log(result);

					if(result.state == "granted") {
						navigator.geolocation.getCurrentPosition(getGeoInfo_success, getGeoInfo_error, getGeoInfo_options)
					}
					else if(result.state == "prompt") {
						navigator.geolocation.getCurrentPosition(getGeoInfo_success, getGeoInfo_error, getGeoInfo_options)
					}
					else if(result.state == "denied") {
						//can utilize the popUpNotif to instruct user on how to activate location permissions
						// setLocationData({
						// 	lon: undefined,
						// 	lat: undefined
						// })
						setManualCoordinates({
							lon: undefined,
							lat: undefined
						})
					}
				})
			}
		}
		else {
			console.log("geolocation permissions not active")
		}
  }, []) //fires automatically if in location mode


  return (
    <div id="selectionModal_bg">

      {!isCreatingTag ? (

        <div id="selectionModal_wr">
          <h2>{title}</h2>

          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />

          {/* --- List of ALL Options --- */}
          <ul className="options">
            
            {filteredOptions.map((option) => (
              /* ✅ Added implicit return using parentheses ( ) instead of { } */
              <li
                key={option.id}
                onClick={() => toggleSelection(option)}
                className={`option ${option.selected ? 'selected' : ''}`}
              >
                <p>{(option.name || option.userName) || option.description}</p>
                {option.username && option.fullName && (
                  <span> ({option.fullName})</span>
                )}
              </li>
            ))}
          </ul>

          {/* --- List of SELECTED Options --- */}
          <ul className="selected">
            {selectedOptions.length > 0 &&
              selectedOptions.map((option) => (
              <li key={option.id} onClick={() => toggleSelection(option)}>
                {option.userName || option.name}
              </li>
            ))}
          </ul>

          {data.open &&
            <div id="coordinatesWrapper">
              
              <div id="lonWrap" className={`${manualCoordinates.lon !== '' ? 'active' : 'inactive'}`}>
                <p className={`${manualCoordinates.lon !== '' ? 'active' : 'inactive'}`}>LON</p>
                <input type="text"
                    inputMode="decimal"
                    name="lon"
                    onChange={coordinatesOnChange}
                    placeholder={manualCoordinates.lon}/>
              </div>
              <div id="latWrap" className={`${manualCoordinates.lon !== '' ? 'active' : 'inactive'}`}>
                <p className={`${manualCoordinates.lon !== '' ? 'active' : 'inactive'}`}>LAT</p>
                <input type="text"
                    inputMode="decimal"
                    name="lat"
                    onChange={coordinatesOnChange}
                    placeholder={manualCoordinates.lat}/>
              </div>
            </div>
          }

          {isLocationMode &&
            <button id="pinLocation"
                     className={`buttonDefault ${data.open == true ? 'active' : 'nonActive'}`}
                      onClick={(e)=> {
                        e.preventDefault(); 
                        if(data.open == false) {
                          setData({
                            ...data,
                            open: true
                          })
                        } else {
                          setData({
                            ...data,
                            open: false
                          })
                        }
                      }}>
                      Pin Location
              </button>
          }
    
          <button onClick={() => setModal(false)} className="close-button">
              &#10005;
          </button>

          {isTagsMode &&
            <button onClick={() => setCreatingTag()} className="createTag">
              Create Tag
            </button>
          }

        </div>

        ) : (

        <div id="createTag">
            
            <div id="selectionModal_wr" className="create-mode">
              <h2>Create New Tag</h2>
              
              <div className="form-group">
                  <input 
                      type="text" 
                      placeholder="Tag Name (e.g. Science)" 
                      value={newTagName}
                      onChange={(e) => setNewTagName(e.target.value.replace(/\s/g, ''))} // Prevent spaces
                  />
                  
                  <label className="checkbox-label">
                      <input 
                          type="checkbox" 
                          checked={isPrivate} 
                          onChange={(e) => setIsPrivate(e.target.checked)} 
                      />
                      Private Topic
                  </label>
              </div>

              
              <button onClick={createTag} 
                      className="save-btn">
                Save
              </button>

              <button onClick={() => setCreatingTag()} className="close-button">
                  &#10005;
              </button>
            </div>

        </div>

        )

      }
    </div>  
  )
}

function DraftPage({
  dataList,
  setDataList,
  draftsList,
  setDraftsList,
  postContent,
  setPostContent,
  tagged,
  setTagged,
  suggestions,
  setSuggestions,
  setPrivate,
  setPinLocation,
}) {

	// const [dataList, setDataList] = React.useState([]);
	const [selection, setSelection] = React.useState([]);
	const el = React.useRef();
	// let dataList = dataList;

	const updateDrafts = async() => {
		let update = await accessAPI.getDrafts();
		setDataList(update);
	}

	const deleteDraft = async(draftID) => {
		let request = await accessAPI.deletePost(draftID);
		if(request) {
			updateDrafts();
		}
	}

	const setAsPost = (postID) => {
		let post = dataList.find(post => post._id == postID);
		console.log(post);
		
		let updatedDrafts = dataList.map(original => {
			if(original._id == post._id) {
				return {
					...original,
					selected: true
				}
			}
			else return original	
		})
		setDataList(updatedDrafts);

		/* Setting Post Content */
		let title = document.getElementById('title');
		title.value = post.title;

		if(post.content.length > 0) {
			post.content.forEach((piece, index) => {
				if(index == 0) {
					setPostContent([
						{
							content: piece.content,
							type: piece.type,
							index: piece.place
						}
					])
				}
				else {
					setPostContent([
						...postContent,
						{
							content: piece.content,
							type: piece.type,
							index: piece.place	
						}
					])
				}
			})
		}

		let updatedTagged = tagged.map(user1 => {
			let user2 = post.taggedUsers.find(user => user._id == user1._id);
			if(user2) {
				return { ...user1, selected: true};
			}
			else return user1;
		});
		setTagged(updatedTagged);
		// console.log(updatedTagged);

		let updatedSuggestions = suggestions.map(tag1 => {
			let tag2 = post.tags.find(tag => tag.name == tag1.name);
			if(tag2) {
				return { ...tag1, selected: true};
			}
			else return tag1;
		});
		setSuggestions(updatedSuggestions);
		// console.log(updatedSuggestions); 

		if(post.isPrivate == true) {
			setPrivate();
		}

		if(post.location) {	
			setPinLocation({
				open: true,
				lon: post.location.lon, 
				lat: post.location.lat,
				name: post.location.name ? post.location.name : null
			});
		}

		el.current.classList.add('leave');

		let second = setTimeout(()=> {
			setDraftsList();	
		}, 500)
	}

	//Enter animation
	React.useEffect(()=> {
		let elCurrent = el.current;
		let delay = setTimeout(()=> {
			elCurrent.classList.remove('_enter');	
		}, 200)
	}, [])

	return (
		<div id="draftsList" ref={el}>
			
			<h2 id="title">
				Drafts
			</h2>

			<ul id="dataList">
				{dataList.map((entry) => (

					<li key={entry._id} className={`view`} onClick={(e)=> {
							e.preventDefault()
							setAsPost(entry._id);
					}}>	
						{entry.title &&
							<h3>{entry.title}</h3>
						}
						{entry.content.length > 0 &&
							<p>{entry.content[0].content}</p>
						}
						{entry.images &&
							<ul className='images'>
								{entry.images.map(img => (
									<li>
										<img src={img}/>
									</li>
								))}
							</ul>
						}
						
						<button className={`buttonDefault`} onClick={(e)=> {
							e.preventDefault();
							e.stopPropagation();
							deleteDraft(entry._id);
						}}>Delete</button>
					</li>
				))}
			</ul>
			
			<div id="exitWrapper">
				<button className={`buttonDefault`}
					onClick={(e)=> {
						e.preventDefault();

						el.current.classList.add('leave');

						let second = setTimeout(()=> {
							setDraftsList();	
						}, 500)
					}}>Exit</button>	
			</div>
		</div>
	)
}

export default function CreatePostt ({
	draftsList,
	setDraftsList,
	setCurrent, 
	current, 
	socketMessage, 
	setSocketMessage, 
	selectedDate,
  setSelectedDate,
	sectionClass,
	setSectionClass,
	setCreatePostToggle,
	triggerSubmitRef,
	triggerDraftRef
}) {

  const navigate = useNavigate();
	const { triggerPopup } = useUIC();
	const userID = sessionStorage.getItem('userID');
	const username = sessionStorage.getItem('userName');
	const privacySetting = sessionStorage.getItem('privacySetting');
	const [drafts, setDrafts] = React.useState([]);
	const [formData, setFormData] = React.useState({});
	const [tagsNTopics, setTagsNTopics] = React.useState([]);
	const [tagged, setTagged] = React.useState([]); //user's connections
	const [isPrivate, setPrivate] = React.useReducer(state => !state, false);
	const [locationData, setLocationData] = React.useState({ 
		//values are null until user initially selects pinLocation 
		lon: undefined, //40.6569 
		lat: undefined, //-73.9605
		name: '',
		open: false
	});
	const [postContent, setPostContent] = React.useState([
		{
			content: '',
			type: 'text',
			index: 0
		}
	]);

	const handleChange = (event) => {

		if(event.target.name == 'tags') {
			let value = event.target.value;
			let array = value.split(/[, ]+/);
			setFormData({
				...formData,
				[event.target.name]: event.target.value,
			})
		} 

		else if(event.target.name == 'image') {
			setPostContent([
				...postContent,
				{ 
					content: event.target.files[0],
					type: 'media', 
					index: postContent.length - 0.5,
					url: URL.createObjectURL(event.target.files[0]),
				}		
			])	
		} 

		//chatGPT recommended update
		else if (event.target.name == 'content') {
		  let existingItem = postContent.find(item => item.index == event.target.dataset.index);

		  if (existingItem) {
		    // Update existing content
		    setPostContent(postContent.map(item => 
		      item.index == event.target.dataset.index 
		        ? { ...item, content: event.target.value }
		        : item
		    ));
		  } 
		  else {
		    // Add new content
		    setPostContent([
		      ...postContent,
		      {
		        content: event.target.value,
		        type: 'text',
		        index: event.target.dataset.index
		      }
		    ]);
		  }
		} 

		else {
			setFormData({
				...formData,
				[event.target.name]: event.target.value,
			})
		}
	}

	const handleSubmit = React.useCallback(async(event) => {

		console.log('recieved');

		if (event && event.preventDefault) event.preventDefault();
		console.log(postContent);
		let title = document.getElementById('title');

		if (!title.value.trim() || !postContent.some(content => {
		  if (content.type === 'text') {
		    // Only apply trim to text content
		    return typeof content.content === 'string' && content.content.trim() !== '';
		  } else if (content.type === 'media') {
		    // Check if media content is a valid File object
		    return content.content instanceof File;
		  }
		})) {
			setSocketMessage({
			    type: 'error',
			    message: 'At least a Title, Text, or Media is needed to make a post!'
			  });
			  return false;  // Stop the form submission if validation fails
		}  
		else {
			
			element.classList.add('_loading');
			let submission = new FormData();

			submission.append('type', 'entry');
			submission.append('title', formData.title ? formData.title : title.value);
			submission.append('isPrivate', isPrivate);
			submission.append('privacyTogglable', sessionStorage.getItem('privacySetting'));
			submission.append('profilePhoto', sessionStorage.getItem('profilePhoto'));

			for(let i=0; i < postContent.length; i++) {

				const {type, content, index} = postContent[i];

				if(type == 'text') {
					if (typeof content === 'string' && content.trim() === '') {
				      continue;  // Skip empty text content
				    }
					else {
						let content = postContent[i].content;
						submission.append(`${index}`, content)
					}
				} else if(type == 'media') {
					let content = postContent[i].content;
					submission.append(`${index}`, content)
				}
			}

			let tags = tagsNTopics.filter(el => el.selected == true).map(el => el.name);
			if(tags.length > 0) {
				submission.append('tags', tags);	
			} 
			
			let taggedUsers = tagged.filter(user => user.selected == true).map(user => {
				return {
					_id: user._id, 
					username: user.userName
				}
			});
			if(taggedUsers.length > 0) {
				submission.append('taggedUsers', JSON.stringify(taggedUsers));
			}
			console.log(taggedUsers);

			if(selectedDate.day != null) {
				submission.append('usePostedByDate', false);
				submission.append('postedOn_month', selectedDate.month);
				submission.append('postedOn_day', selectedDate.day);
				submission.append('postedOn_year', selectedDate.year);
			} else {
				submission.append('usePostedByDate', true);
			}

			if(locationData.lon) {
				submission.append('geoLon', locationData.lon);
				submission.append('geoLat', locationData.lat);
			}	
			console.log(submission);
			console.log(tags);

			let submit = await accessAPI.createPost(submission);

			if(submit.confirm == true) {
				console.log("Post submission successful");
				
				let utilizedDraft = drafts.find(post => post.selected == true);
				if(utilizedDraft) {
					await accessAPI.deleteDraft(utilizedDraft._id)	
				}

				//on interact shuld include : navigate(`/post/${submit.postId}`); or such
				
				triggerPopup({
			        message: "Post Submitted!", // "Post Submitted Successfully!"
			        // onConfirm: () => console.log("should close modal"),
			        onInteract: () => {
                navigate(`/post/${submit.postURL}`);
              },
              interactMessage: 'View Post'
			    });
				
				return true;

			} else if(submit.message) {
				element.classList.remove('_loading');
				console.log('Issue with post submission');
				setSocketMessage({
					type: 'error',
					message: submit.message
				})
				return false;
			}

			/**
			 * 10. 27. 2023
			 * setSocketMessage here with info for making notif for tagged users
			 */
			if(tagged.some(user => user.selected == true)) {

				let recips = tagged.filter(user => user.selected == true).map(user => {return user._id});

				setSocketMessage({
					type: 'tagging',
					isRead: false,
					senderID: userID,
					senderUsername: username,
					url: submit.postURL,
					message: 'sent',
					recipients: recips,
					postTitle: title.value
				})

			}
		}
	}, [postContent, locationData, tagsNTopics])

	const draftPost = async(event = null) => {
		if (event && event.preventDefault) event.preventDefault();

		let title = document.getElementById('title');
		if (!title.value.trim() || !postContent.some(content => {
		  if (content.type === 'text') {
		    // Only apply trim to text content
		    return typeof content.content === 'string' && content.content.trim() !== '';
		  } else if (content.type === 'media') {
		    // Check if media content is a valid File object
		    return content.content instanceof File;
		  }
		})) {
			setDraftsList();
			console.log('true');
			return true;
		}
		else {

			element.classList.add('_loading');
			let submission = new FormData();

			submission.append('type', 'draft');
			submission.append('title', formData.title);
			submission.append('isPrivate', isPrivate);
			submission.append('privacyTogglable', sessionStorage.getItem('privacySetting'));
			submission.append('profilePhoto', sessionStorage.getItem('profilePhoto'));

			for(let i=0; i < postContent.length; i++){
				if(postContent[i].type == 'text') {
					if(postContent[i].content === '') {
						return null;
					} else {
						let content = postContent[i].content;
						submission.append(`${postContent[i].index}`, content)
					}
					
				} else if(postContent[i].type == 'image') {
					let content = postContent[i].content;
					submission.append(`${postContent[i].index}`, content)
				}
			}

			let tags = tagsNTopics.filter(el => el.selected == true).map(el => el.name);
			if(tags.length > 0) {
				submission.append('tags', tags);	
			} 
			
			let taggedUsers = tagged.filter(user => user.selected == true).map(user => {
				return {
					_id: user._id, 
					username: user.userName
				}
			});
			if(taggedUsers.length > 0) {
				submission.append('taggedUsers', JSON.stringify(taggedUsers));
			}
			console.log(taggedUsers);

			if(selectedDate.day != null) {
				submission.append('usePostedByDate', false);
				submission.append('postedOn_month', selectedDate.month);
				submission.append('postedOn_day', selectedDate.day);
				submission.append('postedOn_year', selectedDate.year);
			} else {
				submission.append('usePostedByDate', true);
			}

			if(locationData.lon) {
				submission.append('geoLon', locationData.lon);
				submission.append('geoLat', locationData.lat);
			}	
			console.log(submission);
			console.log(tags);

			let submit = await accessAPI.createPost(submission);

			if(submit.confirm == true) {
				getDrafts();
				await setDraftsList();
				return true;
			} 
			else if(submit.message) {
				element.classList.remove('_loading');
				console.log('Issue with post submission');

				setSocketMessage({
					type: 'error',
					message: submit.message
				})
			}
		}	
	}

	const newContent = (type) => {
		setPostContent([
			...postContent,
			{
				content: '',
				type: type,
				index: postContent.length
			}
		])
	}

	const getConnections = async() => {
		let request = await accessAPI.getConnections(userID);
		request.forEach(user => {
			user.selected = false;
		})
		setTagged(request);
	}

	const gettagsNTopics = async() => {

		let topics = await accessAPI.getSuggestions();
		let userTags = await accessAPI.getUserTags(); //gets all tags 
		console.log(userTags)
		let results = [];
		let _topics = topics.map(topic => {
			return {
				name: topic,
				type: 'topic',
				selected: false
			}
		})
		results.push(..._topics);
		if(userTags != false) {
			let _userTags = userTags.map(topic => {
				return {
					name: topic.name,
					type: 'tag',
					selected: false
				}
			})
			results.push(..._userTags);
		}
		console.log(results)
		setTagsNTopics(results);
	}

	const getDrafts = async() => {
		let request = await accessAPI.getDrafts();
		setDrafts(request);
	}

	React.useLayoutEffect(() => {
	    // Register Submit Logic
	    if (triggerSubmitRef) {
	        triggerSubmitRef.current = handleSubmit;
	    }

	    // Register Draft Logic
	    if (triggerDraftRef) {
	        triggerDraftRef.current = draftPost;
	    }

	    // Cleanup both on unmount
	    return () => {
	        if (triggerSubmitRef) triggerSubmitRef.current = null;
	        if (triggerDraftRef) triggerDraftRef.current = null;
	    };
	}, [triggerSubmitRef, triggerDraftRef, handleSubmit, draftPost]);
	

	const [enter, setEnter] = React.useReducer(state => !state, true);
	const [modal, setModal] = React.useReducer(state => !state, false);
	const [isPrivate_2, setIsPrivate_2] = React.useReducer(state => !state, false);
	const [newTag_value, setNewTag_value] = React.useState('');
	const tagModal = React.useRef(); 
	const el = React.useRef();
	const element = el.current;

	let writtenDate;
	if(selectedDate.day) {
		writtenDate = `${selectedDate.month + 1}. ${selectedDate.day}. ${selectedDate.year}`;
	}

	const hajime = new Date(),
      	  kyou = hajime.getDate(),
      	  kongetsu = hajime.getMonth() + 1,
      	  kotoshi = hajime.getFullYear();

	//update main data: connections, topics and tags, drafted posts
	React.useEffect(()=> {
		getConnections();
		gettagsNTopics();
		getDrafts();

    setSelectedDate({
      month: kongetsu,
      day: kyou,
      year: kotoshi
    });

	}, []);

	//Enter animation
	React.useEffect(()=> {
		let elCurrent = el.current;
		let delay = setTimeout(()=> {
			elCurrent.classList.remove('_enter');	
		}, 200)
	}, [])

	//might need to edit this for update
	const textareaImageAdd = (index, type, info) => {

		let placeholderText = index > 0 ? 'What else?' : "What's New?"

		if(type == 'text') {
				return	(
					<div className={`textAreaWrapper`}>
						<textarea 
							key={index}
							className={"textareaImageAdd"}
							name="content" 
							placeholder={placeholderText}
							onBlur={handleChange}
							onChange={handleChange}
							data-index={index}
							rows="8"
							// cols="30"
							value={info ? info : undefined}
						/>
						{index > 0 &&
							<button className={`buttonDefault remove`}
									onClick={(e)=> {
										e.preventDefault();
										console.log(index);
										let copy2 = postContent.filter(post => post.index != index);
										setPostContent(copy2);
									}}>
								Remove
							</button>
						}
						
					</div>
				)
		}
		else if(type == 'media') {

			// let link = images.find(element => element.index == index);
			return (
				<div className={`mediaWrapper`}>
					<img key={index} src={info}/> 

					<button className={`buttonDefault remove`}
							onClick={(e)=> {
								e.preventDefault();
								let copy2 = postContent.filter(post => post.index != index);
								setPostContent(copy2);
							}}>
						Remove
					</button>
				</div>
				
			)
		}
	}


	//SVG ICONS
	let privacyToggle =
	<svg 
	  xmlns="http://www.w3.org/2000/svg" 
	  width="29.455" 
	  height="24.899" 
	  viewBox="0 0 29.455 24.899"
	  id="privacyToggle"
	  className={`${isPrivate == true ? 'active' : ''}`}
	  onClick={()=> {
	  	setPrivate();
	  }}>
	  <g 
	    id="Group_566" 
	    data-name="Group 566" 
	    transform="translate(-4609.355 -603.878)">
	    <g 
	      id="Path_8" 
	      data-name="Path 8" 
	      transform="translate(4612 606.95)" 
	      fill="none">
	      <path 
	        d="M12.05,0c7.076,0,14.76,8.49,14.76,9.466s-7.684,9.287-14.76,9.287S-2.645,11.511-2.645,9.466,4.974,0,12.05,0Z" 
	        stroke="none"/>
	      <path 
	      	className="a"
	        d="M 12.0501594543457 1.999996185302734 C 8.684169769287109 1.999996185302734 5.358940124511719 4.036735534667969 3.676389694213867 5.250805854797363 C 2.509799957275391 6.092576026916504 1.402379989624023 7.065005302429199 0.5581092834472656 7.988955497741699 C -0.07658958435058594 8.683549880981445 -0.4126834869384766 9.184514999389648 -0.5662364959716797 9.462612152099609 C -0.4120731353759766 9.736064910888672 -0.07626724243164062 10.22669982910156 0.5551395416259766 10.90390586853027 C 1.397468566894531 11.80733585357666 2.503580093383789 12.7577953338623 3.669719696044922 13.58019542694092 C 5.350118637084961 14.76528549194336 8.673379898071289 16.75339508056641 12.0501594543457 16.75339508056641 C 14.40024948120117 16.75339508056641 17.33581924438477 15.53045558929443 20.31610870361328 13.30986595153809 C 22.28052711486816 11.84619331359863 23.7551441192627 10.32939338684082 24.47718620300293 9.457530975341797 C 23.75682258605957 8.569526672363281 22.27989196777344 7.018864631652832 20.30921936035156 5.519125938415527 C 17.3272590637207 3.249775886535645 14.39413928985596 1.999996185302734 12.0501594543457 1.999996185302734 M 12.0501594543457 -3.814697265625e-06 C 19.1262092590332 -3.814697265625e-06 26.81019020080566 8.490435600280762 26.81019020080566 9.466375350952148 C 26.81019020080566 10.44230556488037 19.1262092590332 18.75339508056641 12.0501594543457 18.75339508056641 C 4.974109649658203 18.75339508056641 -2.64453125 11.5106954574585 -2.64453125 9.466375350952148 C -2.64453125 7.422045707702637 4.974109649658203 -3.814697265625e-06 12.0501594543457 -3.814697265625e-06 Z" 
	        stroke="none" 
	        fill="rgba(112,112,112,0.5)"/>
	    </g>
	    <g 
	      id="Path_9" 
	      data-name="Path 9" 
	      transform="translate(4618.583 610.827)" 
	      fill="none">
	      <path 
	        d="M5.5,0A5.5,5.5,0,0,1,11,5.5,5.7,5.7,0,0,1,9.862,8.851,5.347,5.347,0,0,1,5.5,11a5.5,5.5,0,0,1,0-11Z" 
	        stroke="none"/>
	      <path 
	      	className="a"
	        d="M 5.5 2 C 3.570089817047119 2 2 3.570089817047119 2 5.5 C 2 7.429909706115723 3.570089817047119 9 5.5 9 C 6.771279811859131 9 7.792150020599365 8.343709945678711 8.202680587768555 7.733940124511719 L 8.217010498046875 7.712940216064453 C 8.758520126342773 6.930280208587646 9 6.247789859771729 9 5.5 C 9 3.570089817047119 7.429909706115723 2 5.5 2 M 5.5 0 C 8.537569999694824 0 11 2.462430000305176 11 5.5 C 11 6.648200035095215 10.64815998077393 7.71422004699707 9.861720085144043 8.850890159606934 C 9.056220054626465 10.04732036590576 7.389369964599609 11 5.5 11 C 2.462430000305176 11 0 8.537569999694824 0 5.5 C 0 2.462430000305176 2.462430000305176 0 5.5 0 Z" 
	        stroke="none" 
	        fill="rgba(112,112,112,0.5)"/>
	    </g>
	    <line 
	      id="Line_223" 
	      data-name="Line 223" 
	      y1="23.488" 
	      x2="23.366" 
	      transform="translate(4612.399 604.583)" 
	      fill="none" 
	      stroke="rgba(112,112,112,0.5)" 
	      stroke-width="2"/>
	  </g>
	</svg>

	const [activeType, setActiveType] = React.useState(null); //users, locations, tags
	const getModalConfig = () => {
	    switch(activeType) {
	      case 'users': 
	        return { title: 'Tag Users', data: tagged, setter: setTagged };
	      case 'location': 
	        return { title: 'Location', data: locationData, setter: setLocationData };
	      case 'tags':
	      	return { title: 'Tags & Topics', data: tagsNTopics, setter: setTagsNTopics };
	      default: 
	        return null;
	    }
	  };
  const config = getModalConfig();

  const [dateSelect, setDateSelect] = React.useReducer(state => !state, false);

  const changeDate = (e) => {
    const { name, value } = e.target;
    setSelectedDate(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const validateDate = () => {
    const { month, day, year } = selectedDate;
    
    // Parse to integers
    const m = parseInt(month);
    const d = parseInt(day);
    const y = parseInt(year);

    // Basic check for empty inputs
    if (!month == null && !day == null && !year == null) {
      triggerPopup({
          message: `Please fill in all fields`, 
      });
      return;
    }

    // JS Date uses 0-indexed months (0 = Jan, 1 = Feb)
    const testDate = new Date(y, m - 1, d);

    // Check if the date rolled over (e.g., Feb 30 -> March 2)
    const isValid = 
      testDate.getFullYear() === y &&
      testDate.getMonth() === m - 1 &&
      testDate.getDate() === d;

    if (isValid) {
      setDateSelect()
    } else {
      triggerPopup({
          message: `Date entered is invalid`, 
      });
    }
  }


	return (
		<div id="createPostt" ref={el} className={`${sectionClass.createPost}`}>
			
			<div id="returnButtonWrapper">
				<svg 
				  onClick={()=> {
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
				  }}
				  xmlns="http://www.w3.org/2000/svg" 
				  width="48" 
				  height="48" 
				  viewBox="0 0 38 38">
				  <g id="Group_347" data-name="Group 347" transform="translate(-18 -58)">
				    <g id="Ellipse_28" data-name="Ellipse 28" transform="translate(18 58)" fill="#fff" stroke="rgba(112,112,112,0.35)" stroke-width="2">
				      <circle cx="19" cy="19" r="19" stroke="none"/>
				      <circle cx="19" cy="19" r="18" fill="none"/>
				    </g>
				    <g id="Group_346" data-name="Group 346" transform="translate(-3099.085 -416.706)">
				      <line id="Line_210" data-name="Line 210" x2="11.951" transform="matrix(0.819, -0.574, 0.574, 0.819, 3125.67, 493.706)" fill="none" stroke="rgba(112,112,112,0.35)" stroke-width="2"/>
				      <line id="Line_211" data-name="Line 211" x2="11.951" transform="matrix(0.819, 0.574, -0.574, 0.819, 3125.67, 493.706)" fill="none" stroke="rgba(112,112,112,0.35)" stroke-width="2"/>
				      <line id="Line_212" data-name="Line 212" x2="20.417" transform="translate(3126.083 493.706)" fill="none" stroke="rgba(112,112,112,0.35)" stroke-width="2"/>
				    </g>
				  </g>
				</svg>
			</div>

			<form onSubmit={handleSubmit} encType='multipart/form-data'>
				<fieldset>

					<div id="titleWrapper">

						<button 
							id="datePicker" 
							className={`buttonDefault`}
							onClick={(e)=> {
								e.preventDefault();
                setDateSelect();
							}}>
							{selectedDate.month}. {selectedDate.day}. {selectedDate.year}
						</button>

						<input 
							name="title" 
							id="title" 
							placeholder="Add a title?" 
							onChange={handleChange}/>
					</div>

					<div id="contentWrapper">
						{postContent.map((element) => {
							if(element.type == 'text') {
								return textareaImageAdd(element.index, element.type, element.content)
							}
							else if(element.type == 'media') {
								return textareaImageAdd(element.index, element.type, element.url)
							}	
						})}
					</div>
				</fieldset>
			</form>

			{/* O P T I O N S   W R A P P E R */}
			<ul id="optionsWrapper">
				
				{/*ADD TEXT*/}
				<li> 
					<button onClick={(e)=> {
						e.preventDefault()
						newContent('text')
					}}>
						{addText}
					</button>
				</li>

				{/*ADD IMAGE*/}
				<li>
					<button 
						htmlFor="addImage"
						onClick={(e)=> {
							e.preventDefault();
							document.getElementById('addImage').click();
						}
					}>
						{addImage}
					</button>

					<input	
						onChange={handleChange}
						id='addImage' 
						type="file" 
						accept="image/*"
						name='image' 
						hidden />
				</li>

				{/*PRIVACY TOGGLE*/}
				<li>
					<button>
						{privacyToggle}
					</button>
				</li>

				{/*TAG USERS*/}
				<li>
					<button onClick={()=> setActiveType('users')}>
						{tagUsers}
					</button>
				</li>

				{/*ADD TAGS*/}
				<li>
					<button onClick={()=> setActiveType('tags')}>
						{addTags}
					</button>
				</li>

				{/*ADD LOCATION DATA*/}
				<li>
					<button onClick={()=> setActiveType('location')}>
						{addLocationData}
					</button>
				</li>
			</ul>

			{activeType &&
				<SelectionModal 
					title={config.title} 
					data={config.data} 
					setData={config.setter}  
					setModal={()=> setActiveType(null)}
				/>
			}

			{draftsList &&
			  <DraftPage
				  dataList={drafts}
				  setDataList={setDrafts}
				  draftsList={draftsList}
				  setDraftsList={setDraftsList}
				  postContent={postContent}
				  setPostContent={setPostContent}
				  tagged={tagged}
				  setTagged={setTagged}
				  suggestions={tagsNTopics}
				  setSuggestions={setTagsNTopics}
				  setPrivate={setPrivate}
				  setPinLocation={setLocationData}/>
			}

      {dateSelect &&
        <div id="dateSelection">
            
            <div id='inputWrapper'>
              <input 
                type="number" 
                id="month" 
                name="month"
                value={selectedDate.month}
                placeholder={kongetsu} 
                onChange={changeDate}/>

              <input 
                type="number" 
                id="day" 
                name="day"
                value={selectedDate.day}
                placeholder={kyou}
                onChange={changeDate}/>

              <input 
                type="number" 
                id="year"
                name="year" 
                value={selectedDate.year}
                placeholder={kotoshi}
                onChange={changeDate}/>
            </div>

            <button className={`buttonDefault`} onClick={validateDate}>Enter</button>
        </div>
      }
			
			
		</div>
	)
};