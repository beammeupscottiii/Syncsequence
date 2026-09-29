/**
 * Sets user authentication as global context,
 * accessible by any nested component, 
 */
import * as React from "react";
import useWebSocket, {ReadyState} from 'react-use-websocket';
import Instant from './cmpnts/Instants/Instants'

import APIaccess from './apiaccess';

const uiContext = React.createContext();
const accessAPI = APIaccess();



export function UIContextProvider({ children }) {

	const [authed, setAuth] = React.useState(()=> {
		if(sessionStorage.getItem('userKey')) {
			return true;
		} else {
			return false;
		}
	});

	const _login = async(loginCredentials) => {

			let request = await APIaccess().logInUser(loginCredentials);

			if(request.confirm == true) {
				if(sessionStorage.getItem('userKey')) {

					setUserSettings({
						lon: request.userSettings.lon, 
				  	lat: request.userSettings.lat, 
				  	location_city: request.userSettings.location_city,
				  	location_state: request.userSettings.location_state, 
				  	topics: request.userSettings.topics, 
				  	tags: request.userSettings.tags, 
				  	collections: request.userSettings.collections, 
				  	privacySetting: request.userSettings.privacySetting, 
				  	profilePhoto: request.userSettings.profilePhoto
					});

					return {
						confirm: true,
					};
				}
			} else {
				return request;
			}	
		}

	const logout = async() => {
			return new Promise((res, rej) => {
				sessionStorage.removeItem('userKey');
				sessionStorage.removeItem('userName');
				sessionStorage.removeItem('userID');
				sessionStorage.removeItem('privacySetting');
				sessionStorage.removeItem('profilePhoto');
				setAuth(false);
				if(!sessionStorage.userKey) {
					res()
				}
			})
	}



	/*
		W e b 
		S o c k e t s	
	*/
	const userID = sessionStorage.getItem('userID');
	const [socketURL, setSocketURL] = React.useState(null); // Initialize as null to prevent premature connection
  const [socketMessage, setSocketMessage] = React.useState({ 
  	type: '', 
  	message: ''
  });
	const [unreadCount, setUnreadCount] = React.useState('');
	const { sendMessage, lastMessage, readyState } = useWebSocket(socketURL, {
	    onMessage: (e) => {
	      try {
	        let data = JSON.parse(e.data);

	        //do we actually need this??
	        if (data.details && typeof data.details === 'string') {
	          data.details = JSON.parse(data.details);
	        }
	        console.log("WebSocket Recieved Data:", data);
	        setSocketMessage(data);
	        
	        // 💡 Pro Tip: 
	        //Automatically increment unreadCount if a new notif hits real-time
	        // this should be in every conditional which also has notif
	        // setUnreadCount(prev => prev + 1);
	   
	      } catch (err) {
	        console.error("Error parsing WebSocket packet:", err);
	      }
	    },
	    shouldReconnect: (closeEvent) => true, // Automatic reconnection layer
	    reconnectAttempts: 10,
	    reconnectInterval: 3000,
	});

	let getUnreadCount = async() => {
    let count = await accessAPI.getInteractions('count');
    if (count > 99) {
      count = '99';
    }
    setUnreadCount(count);
	}

	//Connect to Server upon successful log in verification
  React.useEffect(() => {
    if (authed && userID) {
      setSocketURL(`ws://127.0.0.1:3333/?${userID}`);
      getUnreadCount();
    } else {
      setSocketURL(null); // Tear down the connection immediately if logged out
    }
  }, [authed, userID]);

  //update unreadCount everyTime messages are sent or recieved
  React.useEffect(()=> {
    getUnreadCount();
  }, [socketMessage])

  //Track connectivity
  React.useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      console.log('🌐 Global Context WebSocket connection established');
    } else if (readyState === ReadyState.CLOSED) {
      console.log('❌ Global Context WebSocket connection has closed');
    }
  }, [readyState]);

  //Group whats necessary into an object to pass down
  const websocket = {
  	message: socketMessage,
  	setMessage: setSocketMessage,
  	send: sendMessage
  }


  const [userSettings, setUserSettings] = React.useState({
  	lon: null, 
  	lat: null, 
  	location_city: null,
  	location_state: null, 
  	topics: null, 
  	tags: null, 
  	collections: null, 
  	privacySetting: null, 
  	profilePhoto: null
  })

  // collections: {
  // 	id: col._id,
  // 	name: col.name,
  // 	ownerID: col.admins[0],
  // 	ownerUsername: col.ownerUsername,
  // 	isPrivate:
  //}


	const [colorScheme, setColorScheme] = React.useState({
        bg: null, 
        headings: null, 
        text: null, 
        buttons: null, 
        submenus: null
    });

	const [popup, setPopup] = React.useState({
        isOpenClass: false,
        isOpen: false,
        message: "",
        onConfirm: null,
        onInteract: null,
        interactMessage: ''
    });

  const triggerPopup = (config) => {

    	console.log('Instants triggered');

        setPopup({
            isOpenClass: true,
            isOpen: true,
            message: config.message || "",
            onConfirm: config.onConfirm || null,
            onInteract: config.onInteract || null,
            interactMessage: config.interactMessage || ""
        });
  };

  const closePopup = () => {

    	setPopup(prev => (
	    	{ ...prev, 
	    	 isOpenClass: false }
	    ));

    	let timeout = setTimeout(() =>{
    		setPopup(prev => (
	    		{ ...prev, 
	    		isOpen: false,
	    		isOpenClass: false }
	    	));
    	}, 350)
  }

  const baseRef = React.useRef(null);

    //this may need to be set to sessionStorage in case of page reload
	const [prevSection, setPrevSection] = React.useState('')

   	const UIC = {
   		authed,
	    setAuth,
	    colorScheme,
	    setColorScheme,
	    popup,
	    triggerPopup,
	    closePopup,
	    _login,
	    logout,
	    baseRef,
	    prevSection,
	    setPrevSection,
	    websocket,
	    unreadCount,
	    setUnreadCount,
	    getUnreadCount,
	    userSettings,
	    setUserSettings
   	}

	return <uiContext.Provider value={UIC}>
			{children}
			<Instant 
                isOpen={popup.isOpen} 
                config={popup} 
                close={closePopup} 
                colorScheme={colorScheme}
            />
		   </uiContext.Provider>
}

export function useUIC(){
	return React.useContext(uiContext);
}