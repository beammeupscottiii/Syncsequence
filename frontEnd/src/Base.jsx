/* * * B a s e  L a y e r * * */
import React from 'react';
import ReactDOM from 'react-dom/client';
import {useNavigate} from 'react-router-dom';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  useLocation,
  Outlet
} from "react-router-dom";
import useWebSocket, {ReadyState} from 'react-use-websocket';
import { UIContextProvider, useUIC } from './UIcontext';
import APIaccess from './apiaccess';
import CalInfo from './components/calInfo'

import './Base.css';
import './components/base/home.css';

/* * * C o m p o n e n t s * * */
import Entry from './components/entry/entry';
import Header from './cmpnts/Header/Header';
import NotificationList from './components/notifs/notifsList';
import { Navbar, Navmenu } from './cmpnts/Nav/Nav';
import SectionWrapper from './cmpnts/SectionWrapper/SectionWrapper';
import OptionsButton from './cmpnts/OptionsButton/OptionsButton';
import Instants from './cmpnts/Instants/Instants'

import Macrospage from './components/macrospage/macrospage';
import Post from './components/blog/post';
import Instant from './components/notifs/instant';
import UserSettings from './components/base/userSettings';
import UserProfile from './components/base/userProfile';
import AboutPage from './components/base/aboutPage';



/*
  09. 16. 2025
  These will technically be temporary
*/
/* import UserLog from './components/sections/userLog'; */
import Profile from './cmpnts/Profile/Profile';
import SocialSection from './cmpnts/Socials/SocialSection';
import UserLog from './cmpnts/Home/Home';
import Macros from './components/sections//macros';
import Settings from './cmpnts/Settings/Settings';

/*** Sub Sections ***/
// import { CreatePost } from './components/sections/userLog';
import CreatePostt from "./cmpnts/CreatePost/CreatePost";
// import { ManageConnections } from './components/sections/socialLog';
import ManageConnections from './cmpnts/ManageConnections/ManageConnections';
import { ManageMacros } from './components/sections/macros';
import Calendar from './cmpnts/Calendar/Calendar';
import Mapp from './cmpnts/Map/Map';
import DragSlider from './components/base/dragSlider';
import './components/sections/sections.css';
import CustomLogEditor from './components/base/customLogEditor/customLogEditor';


/* * * I n i t i a l i z e * * */
const accessAPI = APIaccess();




/* * * Supporting Functions * * */
function HomeOrEntry({ children }) {

  const { authed } = useUIC();
  const location = useLocation();

  return authed === true ? ( children ) : <Navigate to="/entry" replace state={{ path: location.pathname }} />
}

/* * * H O M E  C o m p o n e n t * * */
function Home({
  socketURL, 
  socketMessage, 
  setSocketMessage, 
  sendMessage, 
  isActive, 
  setActive, 
  accessID, 
  setAccessID, 
  unreadCount, 
  setUnreadCount,
  getUnreadCount,
  current,
  setCurrent,
  cal,
  selectedDate,
  setSelectedDate,
  mapData,
  setMapData,
  log,
  setLog,
  navOptions,
  setNavOptions,
  tags,
  setTags,
  userTopics,
  setUserTopics,
  sectionClass,
  setSectionClass,
}) {

  const navigate = useNavigate();
  const location = useLocation();
  const { logout, baseRef } = useUIC();
  const [notifList, setNotifList] = React.useReducer(state => !state, false);
  const [userSettings, setUserSettings] = React.useReducer(state => !state, false);
  const [isLogout, setLogout] = React.useReducer(state => !state, false);
  const isPost = false;
  const [dateInView, set_dateInView] = React.useState({
    month: null,
    day: null,
    year: null,
  })

  const [enter, setEnter] = React.useReducer(state => !state, true);
  
  // let el = React.useRef();
  let element = baseRef.current;

  React.useEffect(()=> {
    getUnreadCount();
    if(element) {
      setEnter();
    }
  }, [element]);

  React.useEffect(()=> {
      let topics = sessionStorage.getItem('topicsAsString');
      topics = topics.split(', ');
      setUserTopics(topics);

      document.title = 'Syncseq.xyz/home'
  }, [])

  /* 
    09. 16. 2025
    Temporarily placed within BASE as it's necessary for home feed
  */
  let updateLog = async() => {

    let posts = await accessAPI.pullUserLog({type: 'customLog', logNumber: current.log})
    setLog(posts);
  } 

  React.useEffect(()=> {
    updateLog()
    document.title = 'Syncseq.xyz/home'
  }, [])

  /*
      09. 19. 2025
      section refs should also be within UIC
      temporary placement
  */
  let homeRef = React.useRef();
  let macrosRef = React.useRef();
  let socialRef = React.useRef();
  let profileRef = React.useRef();
  let settingsRef = React.useRef();
  const [createPostToggle, setCreatePostToggle] = React.useReducer(state => !state, false);
  const [draftsList, setDraftsList] = React.useReducer(state => !state, false);

  const [manageConnectionsToggle, setManageConnectionsToggle] = React.useReducer(state => !state, false);

    React.useEffect(()=> {
      updateLog()
    }, [createPostToggle, current.customizer])

  /* 
    09. 20. 2025
    For Scroll Tracking on div#sections
  */ 
  const [headerVisible, setHeaderVisible] = React.useState(true);
  const [socialPaddingAdjust, setSocialPaddingAdjust] = React.useState(false);
  const scrollAccumulator = React.useRef(0);
  const scrollThreshold = 60;
  const handleScroll = (deltaY) => {

    scrollAccumulator.current += deltaY;

    if(scrollAccumulator.current > scrollThreshold && headerVisible) {
      setHeaderVisible(false);
      setSocialPaddingAdjust(true);
    }

    if(deltaY < 0) {
      if(!headerVisible) {
        setHeaderVisible(true);
        setSocialPaddingAdjust(false);
      }

      scrollAccumulator.current = 0;
    }

    if(scrollAccumulator.current < 0) {
      scrollAccumulator.current = 0;
    }
  }



  // For Prompting Post and Draft Submission in <CreatePost>
  const triggerSubmitRef = React.useRef(null);
  const triggerDraftRef = React.useRef(null);


  //Conditionals for whether the Header displays the back button
  const isSubPage = location.pathname.includes('/post/') ||
                    location.pathname.includes('/macros') ||
                    location.pathname.includes('/user');

  // For when UserProfile loads, to update OptionsButton options
  // can be  conn, subbed or subber
  const [viewedUserConnStatus, setViewedUserConnStatus] = React.useState('')

  return (
    <section id="BASE" ref={baseRef} className={`${enter == true ? '_enter' : ''}`}>  

        {/* H E A D E R  &  N A V B A R */}
        <Header 
          cal={cal} 
          isPost={isPost} 
          setNotifList={setNotifList} 
          unreadCount={unreadCount}
          isVisible={headerVisible}
          isSubPage={isSubPage}
          current={current}
          setCurrent={setCurrent}> 
      
          <Navbar current={current} 
                  setCurrent={setCurrent}/>
        </Header>

        {/*N A V I G A T I O N  M E N U*/}
        {current.navmenu &&
          <Navmenu current={current}
                   setCurrent={setCurrent}
                   sectionClass={sectionClass}
                   setSectionClass={setSectionClass}
                   homeRef={homeRef}
                   macrosRef={macrosRef}
                   socialRef={socialRef}
                   profileRef={profileRef}
                   settingsRef={settingsRef}/>
        }

        {/*N O T I F I C A T I O N S  L I S T*/}
        {notifList &&
          <NotificationList 
            setNotifList={setNotifList} 
            unreadCount={unreadCount}
            setUnreadCount={setUnreadCount}
            setSocketMessage={setSocketMessage}
            socketMessage={socketMessage}
            accessID={accessID}
            setAccessID={setAccessID}
            setUserSettings={setUserSettings}/>
        }



        {/*
            M A I N   S E C T I O N   W R A P P E R
        */}
        <Outlet />

        <SectionWrapper onScrollDelta={handleScroll}>
          {current.section == 'profile' &&
            <Profile
              current={current}
              setCurrent={setCurrent}
              sectionClass={sectionClass}
              refe={profileRef}
              accessID={accessID}
              setAccessID={setAccessID}
              log={log}
              setLog={setLog}/>
          }

          {current.section == 'social' &&
            <SocialSection
              current={current}
              setCurrent={setCurrent}
              sectionClass={sectionClass}
              refe={socialRef} 
              socialPaddingAdjust={socialPaddingAdjust}/>
          }

          {current.section == 'home' &&
            <UserLog  
              current={current} 
              setCurrent={setCurrent} 
              log={log}
              setLog={setLog}
              sectionClass={sectionClass}
              refe={homeRef}/>
          }

          {current.section == 'macros' &&
            <Macros  
              current={current} 
              setCurrent={setCurrent}
              tags={tags}
              setTags={setTags} 
              userTopics={userTopics}
              setUserTopics={setUserTopics}
              sectionClass={sectionClass}
              refe={macrosRef}/>
          }

          {current.section == 'settings' &&
            <Settings 
                current={current}
                setCurrent={setCurrent}
                sectionClass={sectionClass}
                refe={settingsRef}
                accessID={accessID}
                setAccessID={setAccessID}
                socketMessage={socketMessage}
                setSocketMessage={setSocketMessage}
                isLogout={isLogout}
                setLogout={setLogout}/>

          }
        </SectionWrapper>


        {manageConnectionsToggle &&
          <ManageConnections current={current} 
                             setCurrent={setCurrent} 
                             setSocketMessage={setSocketMessage}
                             manageConnectionsToggle={manageConnectionsToggle}
                             setManageConnectionsToggle={setManageConnectionsToggle}
                             sectionClass={sectionClass}
                             setSectionClass={setSectionClass}/>
        }

        {/*{createPostToggle &&
          <CreatePost setCurrent={setCurrent}
                      current={current} 
                      socketMessage={socketMessage}
                      setSocketMessage={setSocketMessage} 
                      selectedDate={selectedDate}
                      createPostToggle={createPostToggle}
                      setCreatePostToggle={setCreatePostToggle}/>
        }*/}

        {createPostToggle &&
          <CreatePostt setCurrent={setCurrent}
                      current={current} 
                      socketMessage={socketMessage}
                      setSocketMessage={setSocketMessage} 
                      selectedDate={selectedDate}
                      setSelectedDate={setSelectedDate}
                      createPostToggle={createPostToggle}
                      setCreatePostToggle={setCreatePostToggle} 
                      sectionClass={sectionClass}
                      setSectionClass={setSectionClass}
                      setCreatePostToggle={setCreatePostToggle}
                      triggerSubmitRef={triggerSubmitRef}
                      triggerDraftRef={triggerDraftRef}
                      draftsList={draftsList}
                      setDraftsList={setDraftsList}/>
        }

        {(!current.map &&( current.modal && current.section == 'macros')) &&
          <ManageMacros current={current} 
                        setCurrent={setCurrent} 
                        socketMessage={socketMessage}
                        setSocketMessage={setSocketMessage}/>
        }


         {/*
            O P T I O N S  B U T T O N
        */}
        <OptionsButton 
            current={current} 
            setCurrent={setCurrent}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            setSectionClass={setSectionClass}
            sectionClass={sectionClass}

            createPostToggle={createPostToggle}
            setCreatePostToggle={setCreatePostToggle}

            manageConnectionsToggle={manageConnectionsToggle}
            setManageConnectionsToggle={setManageConnectionsToggle}

            triggerSubmitRef={triggerSubmitRef}
            triggerDraftRef={triggerDraftRef}
            draftsList={draftsList}
            setDraftsList={setDraftsList}
        />



        {current.gallery.length > 0 &&
          <DragSlider current={current} setCurrent={setCurrent} siteLocation={'home'}/>
        }

        {current.calendar &&
          <Calendar 
            setCurrent={setCurrent} 
            current={current}
            cal={cal} 
            set_dateInView={set_dateInView}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            sectionClass={sectionClass}
            setSectionClass={setSectionClass}/>
        }
        {current.map && 
          <Mapp 
            setCurrent={setCurrent}
            current={current}
            log={log}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            cal={cal}
            sectionClass={sectionClass}
            setSectionClass={setSectionClass}
            setSocketMessage={setSocketMessage}/>
        }
        {current.customizer &&
          <CustomLogEditor
            current={current}
            setCurrent={setCurrent} 
            setSocketMessage={setSocketMessage}
            socketMessage={setSocketMessage}
          />
        }

        {isLogout &&
            <div id="logoutModal" className={``}>
              
              <div id="wrapper">
                <span id="exclaimation">!</span>
                <h2>Are you sure you wish to log out?</h2>

                <div id="options">
                  <button className={`buttonDefault`} onClick={setLogout}>Cancel</button>
                  <button className={`buttonDefault`} onClick={async()=> {
                    await logout().then(()=> {
                      navigate('/entry');
                    })
                  }}>Log Out</button>
                </div>
                </div>
            </div>
          }


        {/*<Instant 
          socketMessage={socketMessage} 
          setSocketMessage={setSocketMessage}
          sendMessage={sendMessage}
          isActive={isActive}
          setActive={setActive}
          accessID={accessID}
          setAccessID={setAccessID}
          getUnreadCount={getUnreadCount}
        />*/}
        
    </section>
  )
}









export default function Main() {

  /**
   * W e b  S o c k e t
   * A n d
   * N o t i f i c a t i o n s
   */
  const { authed } = useUIC();
  let userID = sessionStorage.getItem('userID');
  

  /***
   * S O C K E T  S T U F F
  ***/
  const [socketURL, setSocketURL] = React.useState(``);
  const {sendMessage, lastMessage, readyState} = useWebSocket(socketURL);
  const [socketMessage, setSocketMessage] = React.useState({
    type: null,
    message: null
  });
  const [accessID, setAccessID] = React.useState({})
  const [isActive, setActive] = React.useState({
    type: null,   //type of popUp notif to appear
    state: null,  //set class for it to popUp 
  })
  /**
   * Connects to webSocket server upon verifying user log in
   * & gets unreadNotif count
   */
  React.useEffect(()=> {
    if(authed == true) {
      setSocketURL(`ws://172.27.140.231:3333/?${userID}`);
      getUnreadCount();
    }
  }, [authed])


  // need to implement reconnect redundancy here
  React.useEffect(() => { 
    if(readyState === ReadyState.OPEN) {
      console.log('Websocket connection established')
    } else if (readyState === ReadyState.CLOSED) {
      console.log('socket connection has closed')
    }
  }, [readyState])


  /**
   * when socket connection R E C I E V E S messages
   */
  useWebSocket(socketURL, {
    onMessage: (e)=> {
      let data = JSON.parse(e.data);
      let details;
      if(data.details) {
        details = JSON.parse(data.details)
      }
      console.log(data);

      // if(data.recipients.includes(userID) {
        //need to implement
      // })

      if(data.type == 'request' && data.message == 'connectionRequestRecieved') {
        setSocketMessage(data);
        setAccessID({
          ...accessID,
          accept: data.senderID,
          notifID: data.originalID,
        });
        setActive({
          type: 3,
          state: true
        })
        console.log(data);
        console.log(accessID);
      }

      else if (data.type == 'request' && data.message == 'connectionAcceptedRecieved') {
        setSocketMessage({
          senderUsername: data.senderUsername,
          type: 'request',
          message: 'connectionAcceptedRecieved'
        });
        setActive({
          type: 1,
          state: true
        })
      }

      else if(data.type == 'comment' && data.message == 'initial-recieved') {
        setSocketMessage({
          senderUsername: data.senderUsername,
          type: 'comment',
          message: 'initial-recieved',
          postTitle: data.postTitle,
        });
        setActive({
          type: 2,
          state: true
        })
        // setAccessID({ postURL: data.postURL, notifID: data._id, commentID: details.commentID });
        setAccessID({ postURL: data.postURL, notifID: data._id });
        console.log(data);
      }

      else if(data.type == 'comment' && data.message == 'response-recieved') {
        setSocketMessage({
          senderUsername: data.senderUsername,
          type: 'comment',
          message: 'response-recieved',
          postTitle: data.postTitle,
        });
        setActive({
          type: 2,
          state: true
        })
        // setAccessID({ postURL: data.postURL, notifID: data._id, commentID: details.commentID });
        setAccessID({ postURL: data.postURL, notifID: data._id });
        console.log(data);
      }

      else if(data.type == 'tagging' && data.message == 'recieved') {
        setSocketMessage(data)
        setActive({
          type: 2,
          state: true
        })
        setAccessID({ postURL: data.url, notifID: data._id });
      }

      else if(data.type == 'request' && data.message == 'subscriptionRequestRecieved') {
        setSocketMessage({
          //create text in instants for subscription request notif
          //need requester username, message type and message...
          senderUsername: data.senderUsername,
          message: 'subscriptionRequestRecieved',
          type: 'request',
          data: data
        })

        setAccessID({
          ...accessID,
          accept: data.senderID,
          notifID: data.originalID,
        });

        setActive({
          type: 3,
          state: true
        })
      }

      else if(data.type == 'request' && data.message == 'subscriptionAccepted') {
        setSocketMessage({
          //create text in instants for subscription request notif
          //need requester username, message type and message...
          senderUsername: data.senderUsername,
          message: 'subscriptionAccepted',
          type: 'request'
        })

        setAccessID({
          ...accessID,
          accept: data.senderID,
          notifID: data.originalID,
        });

        setActive({
          type: 1,
          state: true
        })
      }

      else if(data.type == 'request' && data.message == 'subscribed') {
        setSocketMessage({
          //create text in instants for subscription request notif
          //need requester username, message type and message...
          senderUsername: data.senderUsername,
          message: 'subscribed',
          type: 'request'
        })

        setAccessID({
          ...accessID,
          accept: data.senderID,
          notifID: data.originalID,
        });

        setActive({
          type: 1,
          state: true
        })
      }

      else if(data.type == 'updateNotifs') {
        getUnreadCount();

        setSocketMessage({
          type: 'simpleNotif',
          message: `New notifications!`
        })
      }
    },
    shouldReconnect: (event) => true,
    reconnectAttempts: 10,
  })

  
  const [sectionClass, setSectionClass] = React.useState({
      profile: 'enter',
      social: 'enter',
      home: 'enter',
      macros: 'enter',
      settings: 'enter',
      map: '',
      mapSettings: '_enter',
      calendar: '',
      createPost: '',
      manageConnections: '',
  })
  
  const [current, setCurrent] = React.useState({
    section: 'home', //0, 1, 2, 3, 4
    social: false, //true, false or social
    calendar: false, //true or false
    map: false,
    createPost: false,
    manageConnections: false,
    scrollTo: null,
    currentLog: null,
    modal: false, //for <UserProfile>, when user leaves page via a fullList, ensures modal is still up
    customizer: false,
    transition: false, //for components mounted dependant on this stateVar, indicates before unmount
    gallery: [], //for dragslider. should be an array of links
    log: 0,
    navmenu: false,
    isConnected: null,
    isSubscribed: null,
    hasSubscription: null,
  });

  const cal = CalInfo();

  const hajime = new Date(),
      kyou = hajime.getDate(),
      kongetsu = hajime.getMonth(),
      kotoshi = hajime.getFullYear();
  const [selectedDate, setSelectedDate] = React.useState({
    day: null,
    month: null,
    year: null
  })



  const [mapData, setMapData] = React.useState({
    currentCity: 'NY',
    currentState: 'NYC'
  })


  let [initialLogin, setInitialLogin] = React.useState(true);
  if(initialLogin == true) {

    setCurrent({
        ...current,
        section: 'home'
    })
    setInitialLogin(false);
  }

  const [unreadCount, setUnreadCount] = React.useState('');
  /**
   * Fetches unread count of interactions on initial load
   * and when new interactions occur
   */
  let getUnreadCount = async() => {
    let count = await accessAPI.getInteractions('count');
    if (count > 99) {
      count = '99';
    }
    setUnreadCount(count);
  }

  React.useEffect(()=> {
    getUnreadCount();
  }, [socketMessage])

  /*
    Top level state array to house log of posts
    Changes whenever a new section becomes active
  */
  const [log, setLog] = React.useState([]);


  /* Top Level state for tags */
  const [tags, setTags] = React.useState([]);

  /*
    For macrospage to discern whether a user already has a topic saved to their profile
  */
  const [userTopics, setUserTopics] = React.useState([]);

  

  const routerObject = createBrowserRouter([
    
    // E N T R Y 
    { 
      path: "/entry",
      element: <Entry />
    },

    //R O O T
    {
      path: "/",
      element: 
        <HomeOrEntry>
            <Home 
              // socket & notif stuff
              socketURL={socketURL}
              socketMessage={socketMessage}
              setSocketMessage={setSocketMessage}
              sendMessage={sendMessage}
              isActive={isActive}
              setActive={setActive}
              accessID={accessID}
              setAccessID={setAccessID}
              unreadCount={unreadCount}
              setUnreadCount={setUnreadCount}
              getUnreadCount={getUnreadCount}
              lastMessage={lastMessage}
              // socket & notif stuff
              cal={cal}
              current={current}
              setCurrent={setCurrent}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}

              mapData={mapData}
              setMapData={setMapData}

              log={log}
              setLog={setLog}
              tags={tags}
              setTags={setTags}
              userTopics={userTopics}
              setUserTopics={setUserTopics}

              sectionClass={sectionClass}
              setSectionClass={setSectionClass}
            />
        </HomeOrEntry>,
      children: [
        //Post
        {
          path: '/post/:postID',
          loader: async({ params }) => {
            let request = await accessAPI.getBlogPost(params.postID);
            return request;
          },
          element:
              <Post 
                // socket stuff
                socketURL={socketURL}
                socketMessage={socketMessage}
                setSocketMessage={setSocketMessage}
                sendMessage={sendMessage}
                isActive={isActive}
                setActive={setActive}
                accessID={accessID}
                setAccessID={setAccessID}
                unreadCount={unreadCount}
                setUnreadCount={setUnreadCount}
                getUnreadCount={getUnreadCount}
                lastMessage={lastMessage}
                current={current}
                setCurrent={setCurrent}
                     
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
        },

        //Profile
        {
          path: '/user/:username/:userid',
          loader: async({ params }) => {
            let data = await accessAPI.getSingleUser(params.userid);
            return data;
          },
          element: 
            // <UserProfile
            //       // socket stuff
            //       socketURL={socketURL}
            //       socketMessage={socketMessage}
            //       setSocketMessage={setSocketMessage}
            //       sendMessage={sendMessage}
            //       isActive={isActive}
            //       setActive={setActive}
            //       accessID={accessID}
            //       setAccessID={setAccessID}
            //       unreadCount={unreadCount}
            //       setUnreadCount={setUnreadCount}
            //       getUnreadCount={getUnreadCount}
            //       lastMessage={lastMessage}
            //       current={current}
            //       setCurrent={setCurrent}
            //       // socket stuff
            //       selectedDate={selectedDate}
            //       setSelectedDate={setSelectedDate}
            // />
            <Profile
              current={current}
              setCurrent={setCurrent}
              sectionClass={sectionClass}
              // refe={profileRef}
              accessID={accessID}
              setAccessID={setAccessID}
              log={log}
              setLog={setLog}/>
        },

        //Macrospage
        {
          path: '/macros/:macroname/:macroid',
          loader: async({ params }) => {
            let macroInfo = await accessAPI.getTagData(params.macroid, params.macroname);
            let macroPosts = await accessAPI.groupPosts({action: 'getPosts', groupID: params.macroid, groupName: params.macroname});
             
            let doesHaveAccess;
            if(macroInfo.response == 'topic') {
              macroInfo.userHasAccess = macroInfo.hasAccess;
              // macroInfo._id = 'topic';
            }
            // else if(macroInfo.hasAccess) {
            else {
              doesHaveAccess = macroInfo.hasAccess.filter(el => el == userID);
              doesHaveAccess = doesHaveAccess.length > 0 ? true : false;
              macroInfo.userHasAccess = doesHaveAccess;
            }
             
            macroInfo.name = macroInfo.name ? macroInfo.name : params.macroname;
            macroInfo.ownerUsername = macroInfo.adminUsernames ? macroInfo.adminUsernames[0] : null;
            macroInfo.ownerID = macroInfo.admins ? macroInfo.admins[0] : null;
            macroInfo.type = macroInfo.type == undefined ? 'topic' : macroInfo.type;
            macroInfo.userCount = macroInfo.hasAccess ? macroInfo.hasAccess.length : null;
            macroInfo.postCount = macroPosts.length ? macroPosts.length : 0

            return {macroInfo, macroPosts}
          },
          element: 
              <Macrospage
                // socket stuff
                socketURL={socketURL}
                socketMessage={socketMessage}
                setSocketMessage={setSocketMessage}
                sendMessage={sendMessage}
                isActive={isActive}
                setActive={setActive}
                accessID={accessID}
                setAccessID={setAccessID}
                unreadCount={unreadCount}
                setUnreadCount={setUnreadCount}
                getUnreadCount={getUnreadCount}
                lastMessage={lastMessage}
                current={current}
                setCurrent={setCurrent}
                // socket stuff
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                tags={tags}
                setTags={setTags}
                userTopics={userTopics}
                setUserTopics={setUserTopics}
              />
        },
      ]
    },

    //H O M E
    {
      path: "/home",
      element: 
        <HomeOrEntry>
            <Home 
              // socket & notif stuff
              socketURL={socketURL}
              socketMessage={socketMessage}
              setSocketMessage={setSocketMessage}
              sendMessage={sendMessage}
              isActive={isActive}
              setActive={setActive}
              accessID={accessID}
              setAccessID={setAccessID}
              unreadCount={unreadCount}
              setUnreadCount={setUnreadCount}
              getUnreadCount={getUnreadCount}
              lastMessage={lastMessage}
              // socket & notif stuff
              cal={cal}
              current={current}
              setCurrent={setCurrent}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}

              mapData={mapData}
              setMapData={setMapData}

              log={log}
              setLog={setLog}
              tags={tags}
              setTags={setTags}
              userTopics={userTopics}
              setUserTopics={setUserTopics}

              sectionClass={sectionClass}
              setSectionClass={setSectionClass}
            />
        </HomeOrEntry>,
      children: [
        //Post
        {
          path: '/home/post/:postID',
          loader: async({ params }) => {
            let request = await accessAPI.getBlogPost(params.postID);
            return request;
          },
          element:
              <Post 
                // socket stuff
                socketURL={socketURL}
                socketMessage={socketMessage}
                setSocketMessage={setSocketMessage}
                sendMessage={sendMessage}
                isActive={isActive}
                setActive={setActive}
                accessID={accessID}
                setAccessID={setAccessID}
                unreadCount={unreadCount}
                setUnreadCount={setUnreadCount}
                getUnreadCount={getUnreadCount}
                lastMessage={lastMessage}
                current={current}
                setCurrent={setCurrent}
                     
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
        },

        //Profile
        {
          path: '/home/user/:username',
          loader: async({ params }) => {
            let data = await accessAPI.getSingleUser(params.userid);
            return data;
          },
          element: 
            <UserProfile
                  // socket stuff
                  socketURL={socketURL}
                  socketMessage={socketMessage}
                  setSocketMessage={setSocketMessage}
                  sendMessage={sendMessage}
                  isActive={isActive}
                  setActive={setActive}
                  accessID={accessID}
                  setAccessID={setAccessID}
                  unreadCount={unreadCount}
                  setUnreadCount={setUnreadCount}
                  getUnreadCount={getUnreadCount}
                  lastMessage={lastMessage}
                  current={current}
                  setCurrent={setCurrent}
                  // socket stuff
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
            />
        },

        //Macrospage
        {
          path: '/home/macros/:macroname/:macroid',
          loader: async({ params }) => {
            let macroInfo = await accessAPI.getTagData(params.macroid, params.macroname);
            let macroPosts = await accessAPI.groupPosts({action: 'getPosts', groupID: params.macroid, groupName: params.macroname});
             
            let doesHaveAccess;
            if(macroInfo.response == 'topic') {
              macroInfo.userHasAccess = macroInfo.hasAccess;
              // macroInfo._id = 'topic';
            }
            // else if(macroInfo.hasAccess) {
            else {
              doesHaveAccess = macroInfo.hasAccess.filter(el => el == userID);
              doesHaveAccess = doesHaveAccess.length > 0 ? true : false;
              macroInfo.userHasAccess = doesHaveAccess;
            }
             
            macroInfo.name = macroInfo.name ? macroInfo.name : params.macroname;
            macroInfo.ownerUsername = macroInfo.adminUsernames ? macroInfo.adminUsernames[0] : null;
            macroInfo.ownerID = macroInfo.admins ? macroInfo.admins[0] : null;
            macroInfo.type = macroInfo.type == undefined ? 'topic' : macroInfo.type;
            macroInfo.userCount = macroInfo.hasAccess ? macroInfo.hasAccess.length : null;
            macroInfo.postCount = macroPosts.length ? macroPosts.length : 0

            return {macroInfo, macroPosts}
          },
          element: 
              <Macrospage
                // socket stuff
                socketURL={socketURL}
                socketMessage={socketMessage}
                setSocketMessage={setSocketMessage}
                sendMessage={sendMessage}
                isActive={isActive}
                setActive={setActive}
                accessID={accessID}
                setAccessID={setAccessID}
                unreadCount={unreadCount}
                setUnreadCount={setUnreadCount}
                getUnreadCount={getUnreadCount}
                lastMessage={lastMessage}
                current={current}
                setCurrent={setCurrent}
                // socket stuff
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                tags={tags}
                setTags={setTags}
                userTopics={userTopics}
                setUserTopics={setUserTopics}
              />
        },
      ]
    },

    //A B O U T 
    {
      path: '/about',
      loader: async({ params }) => {
        let data = await accessAPI.getProjectPublicStats();
        return data;
      },
      element: 
        <AboutPage />
    }

    // O L D 
    // R O O T
    // {
    //   path: "/",
    //   element:
    //     <HomeOrEntry>
    //       <Home 
    //               // socket & notif stuff 
    //               socketURL={socketURL}
    //               socketMessage={socketMessage}
    //               setSocketMessage={setSocketMessage}
    //               sendMessage={sendMessage}
    //               isActive={isActive}
    //               setActive={setActive}
    //               accessID={accessID}
    //               setAccessID={setAccessID}
    //               unreadCount={unreadCount}
    //               setUnreadCount={setUnreadCount}
    //               getUnreadCount={getUnreadCount}
    //               lastMessage={lastMessage}
    //               // socket & notif stuff
    //               cal={cal}
    //               current={current}
    //               setCurrent={setCurrent}
    //               selectedDate={selectedDate}
    //               setSelectedDate={setSelectedDate}

    //               mapData={mapData}
    //               setMapData={setMapData}

    //               log={log}
    //               setLog={setLog}
    //               tags={tags}
    //               setTags={setTags}
    //               userTopics={userTopics}
    //               setUserTopics={setUserTopics}

    //               sectionClass={sectionClass}
    //               setSectionClass={setSectionClass}
    //       />
    //     </HomeOrEntry>
    //   ,
    // },
    // H O M E
    // {
    //   path: '/home',
    //   element:
    //     <HomeOrEntry>
    //         <Home 
    //               // socket & notif stuff
    //               socketURL={socketURL}
    //               socketMessage={socketMessage}
    //               setSocketMessage={setSocketMessage}
    //               sendMessage={sendMessage}
    //               isActive={isActive}
    //               setActive={setActive}
    //               accessID={accessID}
    //               setAccessID={setAccessID}
    //               unreadCount={unreadCount}
    //               setUnreadCount={setUnreadCount}
    //               getUnreadCount={getUnreadCount}
    //               lastMessage={lastMessage}
    //               // socket & notif stuff
    //               cal={cal}
    //               current={current}
    //               setCurrent={setCurrent}
    //               selectedDate={selectedDate}
    //               setSelectedDate={setSelectedDate}

    //               mapData={mapData}
    //               setMapData={setMapData}

    //               log={log}
    //               setLog={setLog}
    //               tags={tags}
    //               setTags={setTags}
    //               userTopics={userTopics}
    //               setUserTopics={setUserTopics}

    //               sectionClass={sectionClass}
    //               setSectionClass={setSectionClass}
    //         />
    //     </HomeOrEntry>
    // },
    // P O S T
    // {
    //   path: '/post/:postID',
    //   loader: async({ params }) => {
    //     let request = await accessAPI.getBlogPost(params.postID);
    //     return request;
    //   },
    //   element:
    //     <HomeOrEntry>
    //       <Post 
    //         // socket stuff
    //               socketURL={socketURL}
    //               socketMessage={socketMessage}
    //               setSocketMessage={setSocketMessage}
    //               sendMessage={sendMessage}
    //               isActive={isActive}
    //               setActive={setActive}
    //               accessID={accessID}
    //               setAccessID={setAccessID}
    //               unreadCount={unreadCount}
    //               setUnreadCount={setUnreadCount}
    //               getUnreadCount={getUnreadCount}
    //               lastMessage={lastMessage}
    //               current={current}
    //               setCurrent={setCurrent}
                 
    //               selectedDate={selectedDate}
    //               setSelectedDate={setSelectedDate}
    //       />
    //     </HomeOrEntry>
    // },
    // M A C R O S P A G E
    // {
    //   path: '/macros/:macroname/:macroid',
    //   loader: async({ params }) => {
    //     let macroInfo = await accessAPI.getTagData(params.macroid, params.macroname);
    //     let macroPosts = await accessAPI.groupPosts({action: 'getPosts', groupID: params.macroid, groupName: params.macroname});
         
    //     let doesHaveAccess;
    //     if(macroInfo.response == 'topic') {
    //       macroInfo.userHasAccess = macroInfo.hasAccess;
    //       // macroInfo._id = 'topic';
    //     }
    //     // else if(macroInfo.hasAccess) {
    //     else {
    //       doesHaveAccess = macroInfo.hasAccess.filter(el => el == userID);
    //       doesHaveAccess = doesHaveAccess.length > 0 ? true : false;
    //       macroInfo.userHasAccess = doesHaveAccess;
    //     }
         
    //     macroInfo.name = macroInfo.name ? macroInfo.name : params.macroname;
    //     macroInfo.ownerUsername = macroInfo.adminUsernames ? macroInfo.adminUsernames[0] : null;
    //     macroInfo.ownerID = macroInfo.admins ? macroInfo.admins[0] : null;
    //     macroInfo.type = macroInfo.type == undefined ? 'topic' : macroInfo.type;
    //     macroInfo.userCount = macroInfo.hasAccess ? macroInfo.hasAccess.length : null;
    //     macroInfo.postCount = macroPosts.length ? macroPosts.length : 0

    //     return {macroInfo, macroPosts}
    //   },
    //   element: 
    //     <HomeOrEntry>
    //       <Macrospage
    //               // socket stuff
    //               socketURL={socketURL}
    //               socketMessage={socketMessage}
    //               setSocketMessage={setSocketMessage}
    //               sendMessage={sendMessage}
    //               isActive={isActive}
    //               setActive={setActive}
    //               accessID={accessID}
    //               setAccessID={setAccessID}
    //               unreadCount={unreadCount}
    //               setUnreadCount={setUnreadCount}
    //               getUnreadCount={getUnreadCount}
    //               lastMessage={lastMessage}
    //               current={current}
    //               setCurrent={setCurrent}
    //               // socket stuff
    //               selectedDate={selectedDate}
    //               setSelectedDate={setSelectedDate}
    //               tags={tags}
    //               setTags={setTags}
    //               userTopics={userTopics}
    //               setUserTopics={setUserTopics}
    //       />
    //     </HomeOrEntry>
    // },
    // U S E R  P R O F I L E
    // {
    //   path: '/user/:username/',
    //   loader: async({ params }) => {
    //     let data = await accessAPI.getSingleUser(params.userid);
    //     return data;
    //   },
    //   element: 
    //     <HomeOrEntry>
    //       <UserProfile
    //               // socket stuff
    //               socketURL={socketURL}
    //               socketMessage={socketMessage}
    //               setSocketMessage={setSocketMessage}
    //               sendMessage={sendMessage}
    //               isActive={isActive}
    //               setActive={setActive}
    //               accessID={accessID}
    //               setAccessID={setAccessID}
    //               unreadCount={unreadCount}
    //               setUnreadCount={setUnreadCount}
    //               getUnreadCount={getUnreadCount}
    //               lastMessage={lastMessage}
    //               current={current}
    //               setCurrent={setCurrent}
    //               // socket stuff
    //               selectedDate={selectedDate}
    //               setSelectedDate={setSelectedDate}
    //       />
    //     </HomeOrEntry>
    // },
    // U S E R  S E T T I N G S
    // {
    //   path: '/:username/settings',
    //   loader: async({ params }) => {
    //     let data = await accessAPI.userSettings({option: 'getUserSettings'});
    //     return data;
    //   },
    //   element: 
    //     <HomeOrEntry>
    //       <UserSettings
    //               setSocketMessage={setSocketMessage}
    //               socketURL={socketURL}
    //               socketMessage={socketMessage}
    //               sendMessage={sendMessage}
    //               isActive={isActive}
    //               setActive={setActive}
    //               setAccessID={setAccessID}
    //               accessID={accessID}
    //               getUnreadCount={getUnreadCount}
    //               current={current}
    //               setCurrent={setCurrent}
    //       />
    //     </HomeOrEntry>
    // },
  ])

  return (
      // <UIContextProvider>
        <RouterProvider router={routerObject} />
      // </UIContextProvider>
    )
}