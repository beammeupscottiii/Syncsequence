/* * * 
  V i T A L s
 * * */
import React from 'react';
import ReactDOM from 'react-dom/client';
import {useNavigate} from 'react-router-dom';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  useNavigation,
  useLocation,
  Outlet
} from "react-router-dom";
import useWebSocket, {ReadyState} from 'react-use-websocket';
import { UIContextProvider, useUIC } from './UIcontext';
import APIaccess from './apiaccess';
import CalInfo from './components/calInfo'

import './Base.css';
import './components/base/home.css';
import './components/sections/sections.css';

/* * * 
  C o m p o n e n t s 
    o f
  H O M E
* * */
import Entry from './components/entry/entry';
import Header from './cmpnts/Header/Header';
import NotificationList from './components/notifs/notifsList';
import { Navbar, Navmenu } from './cmpnts/Nav/Nav';
import SectionWrapper from './cmpnts/SectionWrapper/SectionWrapper';
import OptionsButton from './cmpnts/OptionsButton/OptionsButton';
import Instants from './cmpnts/Instants/Instants'

/* * * 
  M a i n  S e c t i o n s 
* * */
/* import UserLog from './components/sections/userLog'; */
import Profile from './cmpnts/Profile/Profile';
import SocialSection from './cmpnts/Socials/SocialSection';
import UserLog from './cmpnts/Home/Home';
import Macross from './cmpnts/Macros/macros';
import Settings from './cmpnts/Settings/Settings';

/* * * 
  S u b  S e c t i o n s 
* * */
// import { CreatePost } from './components/sections/userLog';
// import { ManageConnections } from './components/sections/socialLog';
import CreatePostt from "./cmpnts/CreatePost/CreatePost";
import ManageConnections from './cmpnts/ManageConnections/ManageConnections';
import { ManageMacros } from './components/sections/macros';
import ManageMacross from './cmpnts/ManageMacros/manageMacros';
import Calendar from './cmpnts/Calendar/Calendar';
import Mapp from './cmpnts/Map/Map';
import DragSlider from './components/base/dragSlider';
import CustomLogEditor from './components/base/customLogEditor/customLogEditor';

/* * * 
  P A G E S 
***/
// import Macrospage from './components/macrospage/macrospage';
import Macrospage from './cmpnts/MacrosPage/macrospage';
import Post from './components/blog/post';
import AboutPage from './components/base/aboutPage';





/* * * I n i t i a l i z e * * */
const accessAPI = APIaccess();



/* * * Supporting Functions * * */
function HomeOrEntry({ children }) {

  const { authed } = useUIC();
  const location = useLocation();

  return authed === true ? ( children ) : <Navigate to="/entry" replace state={{ path: location.pathname }} />
}



/* * * 
  H O M E  
  C o m p o n e n t 
* * */
function Home({
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

  const userID = sessionStorage.getItem('userID');
  const username = sessionStorage.getItem('userName');
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    logout, 
    baseRef, 
    unreadCount, 
    getUnreadCount, 
    setUnreadCount,
    websocket,
    triggerPopup 
  } = useUIC();
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
  
  let element = baseRef.current;

  React.useEffect(()=> {
    getUnreadCount();
    if(element) {
      setEnter();
    }
  }, [element]);

  /* 
    09. 16. 2025
    Temporarily placed within BASE as it's necessary for home feed
  */
  let updateLog = async() => {

    let posts = await accessAPI.pullUserLog({type: 'customLog', logNumber: current.log})
    setLog(posts);
  } 

  React.useEffect(()=> {
      let topics = sessionStorage.getItem('topicsAsString');
      topics = topics.split(', ');
      setUserTopics(topics);

      document.title = `Resync'd | Home`;
      updateLog();
      getUnreadCount();
  }, [])

  /*
      09. 19. 2025
      section refs should also be within UIC
      temporary placement
      they are for UI purposes, enter/leaving animation
  */
  let homeRef = React.useRef();
  let macrosRef = React.useRef();
  let socialRef = React.useRef();
  let profileRef = React.useRef();
  let settingsRef = React.useRef();

  /***
   * Home section stuff
  ***/
  const [createPostToggle, setCreatePostToggle] = React.useReducer(state => !state, false);
  const [draftsList, setDraftsList] = React.useReducer(state => !state, false);

  // For Prompting Post and Draft Submission in <CreatePost>
  const triggerSubmitRef = React.useRef(null);
  const triggerDraftRef = React.useRef(null);

  React.useEffect(()=> {
    updateLog()
  }, [createPostToggle, current.customizer])



  /***
   * Social Section stuff
   ***/
  const [manageConnectionsToggle, setManageConnectionsToggle] = React.useReducer(state => !state, false);

  
  /***
   * Macros Section & Macrospage stuff
   ***/
  const [manageMacrosToggle, set_ManageMacrosToggle] = React.useReducer(state => !state, false);
  const [createTagToggle, set_CreateTagToggle] = React.useReducer(state => !state, false);
  const [deleteTagsToggle, set_DeleteTagsToggle] = React.useReducer(state => !state, false);
  const [newCollectionToggle, set_NewCollectionToggle ] = React.useReducer(state => !state, false);
  const [manageCollectionsToggle, set_ManageCollectionsToggle] = React.useReducer(state => !state, false);

  React.useEffect(()=> {
    if(!manageMacrosToggle) {

      let delay = setTimeout(()=> {
        if (createTagToggle) set_CreateTagToggle();
        if (deleteTagsToggle) set_DeleteTagsToggle();
        if (newCollectionToggle) set_NewCollectionToggle();
        if (manageCollectionsToggle) set_ManageCollectionsToggle();
      }, 400)

    }
  }, [manageMacrosToggle])





  /***
   * Profile stuff
  ***/
  // const profileContext = React.createContext(null);
  const removeConnectionRef = React.useRef(null);
  const requestConnectionRef = React.useRef(null);
  const subscriptionRequestRef = React.useRef(null);

  // For when UserProfile loads, to update OptionsButton options
  // can be  conn, subbed or subber
  const [viewedUserConnStatus, setViewedUserConnStatus] = React.useState('');



  /*** 
    For Scroll Tracking on div#sections
  ***/ 
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

  

  /***
   * Conditionals for whether the Header displays the back button
  ***/
  const isSubPage = location.pathname.includes('/post/') ||
                    location.pathname.includes('/macros') ||
                    location.pathname.includes('/user');


  // for page navigation requiring <Home> to fade in and out
  const navigation = useNavigation();
  const isNavigating = navigation.state === "loading";
  const nextLocation = navigation.location?.pathname;
  const isGoingToProfile = nextLocation?.includes('/user/');

  React.useEffect(()=> {
    if(isNavigating){
      element.classList.remove('enter');
      element.classList.add('leave');
    }

    //for going to a user's profile
    if(location.pathname.includes('/user')){

      
      if(manageConnectionsToggle) {
        setSectionClass({ 
          ...sectionClass, 
          manageConnections: '' 
        });
        setManageConnectionsToggle();
      }
    }
  }, [navigation.state])




  /*
    W e b 
    S o c k e t s
  */
  React.useEffect(()=> {

    const acceptRequest = async(originalSender) => {

      let notif = {
        type: 'request',
        senderID: userID,
        senderUsername: username,
        recipients: [originalSender],
        message: 'connectionAcceptedSent',
        SMT: 'sent'
      }

      websocket.send(JSON.stringify(notif));
      let request = await accessAPI.newInteraction(notif);

      if(request.confirm == true) {

        let delay = setTimeout(()=> {
          triggerPopup({
            message: `You are now connected`
          })
        }, 300)
      }
    }

    //SMT Socket Message Type
    // null, RECIEVED or SENT
    if(websocket.message.SMT != null) {

      if(websocket.message.SMT == 'recieved' && 
        websocket.message.message == 'connectionRequestSent') {

        triggerPopup({
          message: `You recieved a connection request from ${websocket.message.senderUsername}`,
          interactMessage: 'Accept',
          onInteract: ()=> {
            acceptRequest(websocket.message.senderID);
          }
        });

      }

      else if(websocket.message.SMT == 'recieved' && 
        websocket.message.message == 'connectionAcceptedSent') {

        triggerPopup({
          message: `You and ${websocket.message.senderUsername} are now connected`
        });

      }

      else if (websocket.message == 'connectionAcceptedRecieved') {}
      else if(websocket.message == 'initial-recieved') {} //for comment on post
      else if(websocket.message == 'response-recieved') {} //for reply to comment
      else if(websocket.message == 'recieved') {} //being tagged
      else if(websocket.message == 'subscriptionRequestRecieved') {}
      else if(websocket.message == 'subscriptionAccepted') {}
      else if(websocket.message == 'subscribed') {}
      else if(websocket.SMT == 'updateNotifs') {
        getUnreadCount();

        websocket.setMessage({
          type: 'simpleNotif',
          message: `New notifications!`
        })
      }
    }
    
  }, [websocket.message])



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
            setUserSettings={setUserSettings}
            current={current}
            setCurrent={setCurrent}/>
        }



        {/*
            M A I N   S E C T I O N   W R A P P E R
        */}
        <Outlet 
          context={{ 
            removeConnectionRef, 
            requestConnectionRef, 
            subscriptionRequestRef 
          }}
          key={location.pathname}/>

        <SectionWrapper onScrollDelta={handleScroll}>
          {current.section == 'profile' &&
            <Profile
              current={current}
              setCurrent={setCurrent}
              sectionClass={sectionClass}
              refe={profileRef}
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
            <Macross
              current={current} 
              setCurrent={setCurrent}
              tags={tags}
              setTags={setTags} 
              userTopics={userTopics}
              setUserTopics={setUserTopics}
              sectionClass={sectionClass}
              refe={macrosRef}
              socialPaddingAdjust={socialPaddingAdjust}
              />
          }

          {current.section == 'settings' &&
            <Settings 
                current={current}
                setCurrent={setCurrent}
                sectionClass={sectionClass}
                refe={settingsRef}
                isLogout={isLogout}
                setLogout={setLogout}/>

          }
        </SectionWrapper>


        {manageConnectionsToggle &&
          <ManageConnections current={current} 
                             setCurrent={setCurrent} 
                             set_ManageMacrosToggle={set_ManageMacrosToggle}
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

        {manageMacrosToggle &&
          <ManageMacros current={current} 
                        setCurrent={setCurrent}
                        set_ManageMacrosToggle={set_ManageMacrosToggle}
                        set_CreateTagToggle={set_CreateTagToggle}
                        set_DeleteTagsToggle={set_DeleteTagsToggle}
                        set_NewCollectionToggle={set_NewCollectionToggle}
                        set_ManageCollectionsToggle={set_ManageCollectionsToggle} 
          />
        }

        {/*{manageMacrosToggle &&
          <ManageMacross current={current} 
                         setCurrent={setCurrent}
                         sectionClass={sectionClass}
                         setSectionClass={setSectionClass}
                         set_ManageMacrosToggle={set_ManageMacrosToggle}
                         createTagToggle={createTagToggle}
                         deleteTagsToggle={deleteTagsToggle}
                         newCollectionToggle={newCollectionToggle}
                         manageCollectionsToggle={manageCollectionsToggle} 
          />
        }*/}
        


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
            triggerSubmitRef={triggerSubmitRef}
            triggerDraftRef={triggerDraftRef}
            draftsList={draftsList}
            setDraftsList={setDraftsList}

            manageConnectionsToggle={manageConnectionsToggle}
            setManageConnectionsToggle={setManageConnectionsToggle}

            set_ManageMacrosToggle={set_ManageMacrosToggle}
            set_CreateTagToggle={set_CreateTagToggle}
            set_DeleteTagsToggle={set_DeleteTagsToggle}
            set_NewCollectionToggle={set_NewCollectionToggle}
            set_ManageCollectionsToggle={set_ManageCollectionsToggle}

            removeConnectionRef={removeConnectionRef}
            requestConnectionRef={requestConnectionRef}
            subscriptionRequestRef={subscriptionRequestRef}
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
            />
        }
        {current.customizer &&
          <CustomLogEditor
            current={current}
            setCurrent={setCurrent} 
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
        
    </section>
  )
}









export default function Main() {

  /**
   * W e b  S o c k e t
   * A n d
   * N o t i f i c a t i o n s
   */
  const { authed, unreadCount, setUnreadCount, getUnreadCount } = useUIC();
  let userID = sessionStorage.getItem('userID');
    
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
      manageMacros: '',
      post: '',
      macrospage: ''
  })
  const [current, setCurrent] = React.useState({
    section: 'home', //0, 1, 2, 3, 4
    social: false, //true, false or social
    calendar: false, //true or false
    map: false,
    createPost: false,
    manageConnections: false,
    manageMacros: false,
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
    updateToggle: false
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

  // 

  /*
    Top level state array to house log of posts
    Changes whenever a new section becomes active
  */
  const [log, setLog] = React.useState([]);


  

  /*
    For macrospage to discern whether a user already 
    has a topic saved to their profile
  */
  const [tags, setTags] = React.useState([]);
  const [userTopics, setUserTopics] = React.useState([]);
  const [collections, setCollections] = React.useState([]);

  


  
  /*
    R O U T E R
        O B J E C T
  */
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
              // socketURL={socketURL}
              // socketMessage={socketMessage}
              // setSocketMessage={setSocketMessage}
              // sendMessage={sendMessage}
              // isActive={isActive}
              // setActive={setActive}
              // accessID={accessID}
              // setAccessID={setAccessID}
              // unreadCount={unreadCount}
              // setUnreadCount={setUnreadCount}
              // getUnreadCount={getUnreadCount}
              // lastMessage={lastMessage}
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
                // socketURL={socketURL}
                // socketMessage={socketMessage}
                // setSocketMessage={setSocketMessage}
                // sendMessage={sendMessage}
                // isActive={isActive}
                // setActive={setActive}
                // accessID={accessID}
                // setAccessID={setAccessID}
                // unreadCount={unreadCount}
                // setUnreadCount={setUnreadCount}
                // getUnreadCount={getUnreadCount}
                // lastMessage={lastMessage}
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
            // let data = await accessAPI.getSingleUser(params.userid);
            // return data;
            try {
              console.log("Loader running for user ID:", params.userid);
              const data = await accessAPI.getSingleUser(params.userid);
              return data;
            } catch (error) {
              console.error("CRITICAL ROUTE LOADER ERROR:", error);
              // Return a fallback object so the component still mounts and you can debug it
              return { error: true, message: error.message };
            }
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
              log={log}
              setLog={setLog}
            />
        },

        //Macrospage
        {
          path: '/macros/:macroname/:macroid',
          loader: async({ params }) => {
            let macroInfo = await accessAPI.getTagData(params.macroid, params.macroname);
            let macroPosts = await accessAPI.groupPosts({
              action: 'getPosts',
              type: macroInfo.response ? macroInfo.response : macroInfo.type, 
              groupID: params.macroid, 
              groupName: params.macroname});
             
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
                // socketURL={socketURL}
                // socketMessage={socketMessage}
                // setSocketMessage={setSocketMessage}
                // sendMessage={sendMessage}
                // isActive={isActive}
                // setActive={setActive}
                // accessID={accessID}
                // setAccessID={setAccessID}
                // unreadCount={unreadCount}
                // setUnreadCount={setUnreadCount}
                // getUnreadCount={getUnreadCount}
                // lastMessage={lastMessage}
                sectionClass={sectionClass}
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
              // socketURL={socketURL}
              // socketMessage={socketMessage}
              // setSocketMessage={setSocketMessage}
              // sendMessage={sendMessage}
              // isActive={isActive}
              // setActive={setActive}
              // accessID={accessID}
              // setAccessID={setAccessID}
              // unreadCount={unreadCount}
              // setUnreadCount={setUnreadCount}
              // getUnreadCount={getUnreadCount}
              // lastMessage={lastMessage}
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
                // socketURL={socketURL}
                // socketMessage={socketMessage}
                // setSocketMessage={setSocketMessage}
                // sendMessage={sendMessage}
                // isActive={isActive}
                // setActive={setActive}
                // accessID={accessID}
                // setAccessID={setAccessID}
                // unreadCount={unreadCount}
                // setUnreadCount={setUnreadCount}
                // getUnreadCount={getUnreadCount}
                // lastMessage={lastMessage}
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
            <Profile
              current={current}
              setCurrent={setCurrent}
              sectionClass={sectionClass}
              log={log}
              setLog={setLog}
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
                // socketURL={socketURL}
                // socketMessage={socketMessage}
                // setSocketMessage={setSocketMessage}
                // sendMessage={sendMessage}
                // isActive={isActive}
                // setActive={setActive}
                // accessID={accessID}
                // setAccessID={setAccessID}
                // unreadCount={unreadCount}
                // setUnreadCount={setUnreadCount}
                // getUnreadCount={getUnreadCount}
                // lastMessage={lastMessage}
                sectionClass={sectionClass}
                current={current}
                setCurrent={setCurrent}
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
  ])

  return (
      // <UIContextProvider>
        <RouterProvider router={routerObject} />
      // </UIContextProvider>
    )
}