/**
 * Sets user authentication as global context,
 * accessible by any nested component, 
 */
import * as React from "react";
import Instant from './cmpnts/Instants/Instants'

import APIaccess from './apiaccess';

const uiContext = React.createContext();
const accessAPI = APIaccess();

/*
	A function which houses other values and functions 
	to operate within the context
*/
// export function useUIC() {

// 	const [authed, setAuth] = React.useState(()=> {
// 		if(sessionStorage.getItem('userKey')) {
// 			return true;
// 		} else {
// 			return false;
// 		}
// 	});
	
// 	const [colorScheme, setColorScheme] = React.useState({
// 		bg: null,
// 		headings: null,
// 		text: null,
// 		buttons: null,
// 		submenus: null
// 	})

// 	const [popup, setPopup] = React.useState({
//         isOpen: false,
//         message: "",
//         onConfirm: null,
//         onInteract: null
//     });


// 	return {
// 		authed,
// 		colorScheme,
// 		setColorScheme,
// 		popup,

// 		triggerPopup(config) {
//             setPopup({
//                 isOpen: true,
//                 message: config.message || "",
//                 onConfirm: config.onConfirm || null,
//                 onInteract: config.onInteract || null
//             });
//         },

//         closePopup() {
//             setPopup(prev => ({ ...prev, isOpen: false }));
//         },

// 		async _login(loginCredentials) {

// 			let request = await APIaccess().logInUser(loginCredentials);

// 			if(request.confirm == true) {
// 				if(sessionStorage.getItem('userKey')) {

// 					//setColorScheme to options set in request.settings.colorScheme

// 					sessionStorage.setItem('settings_preferredLocation_name', request.settings.preferredLocation.city ? request.settings.preferredLocation.city : null);
// 					sessionStorage.setItem('settings_preferredLocation_lon', request.settings.preferredLocation.lonLat[0] ? request.settings.preferredLocation.lonLat[0] : null);
// 					sessionStorage.setItem('settings_preferredLocation_lat', request.settings.preferredLocation.lonLat[1] ? request.settings.preferredLocation.lonLat[1] : null);

// 					setAuth(true);
// 					return {
// 						confirm: true,
// 						// settings: request.settings
// 					};
// 				}
// 			} else {
// 				return request;
// 			}	
// 		},

// 		async logout() {
// 			return new Promise((res, rej) => {
// 				sessionStorage.removeItem('userKey');
// 				sessionStorage.removeItem('userName');
// 				sessionStorage.removeItem('userID');
// 				sessionStorage.removeItem('privacySetting');
// 				sessionStorage.removeItem('profilePhoto');
// 				setAuth(false);
// 				if(!sessionStorage.userKey) {
// 					res()
// 				}
// 			})
// 		}
// 	};
// }

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

					//setColorScheme to options set in request.settings.colorScheme

					sessionStorage.setItem('settings_preferredLocation_name', request.settings.preferredLocation.city ? request.settings.preferredLocation.city : null);
					sessionStorage.setItem('settings_preferredLocation_lon', request.settings.preferredLocation.lonLat[0] ? request.settings.preferredLocation.lonLat[0] : null);
					sessionStorage.setItem('settings_preferredLocation_lat', request.settings.preferredLocation.lonLat[1] ? request.settings.preferredLocation.lonLat[1] : null);

					// setAuth(true);
					return {
						confirm: true,
						// settings: request.settings
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
	    baseRef
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