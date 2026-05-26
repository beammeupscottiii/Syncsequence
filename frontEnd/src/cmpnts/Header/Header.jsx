/* * * V i t a l s * * */
import * as React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useUIC } from '../../UIcontext';

import './Header.css';


function ReturnElement ({current, setCurrent, isSubPage}) {

	let navigate = useNavigate();
	let [ifLeave, setLeave] = React.useState(false);
	let { baseRef, prevSection } = useUIC();

	let goBack = () => {
		/* function to return one step backwards using router history */
		let baseElement = baseRef.current;

		setLeave(true)
		setTimeout(()=> {
			baseElement.classList.add('leave');
		}, 300);


		setTimeout(()=> {
			if(isSubPage) {
				console.log('is a subpage')
				setCurrent({
					...current,
					section: `${prevSection}`
				})
			}
			navigate(-1)
			baseElement.classList.add('return');
		}, 850);

		setTimeout(()=> {
			baseElement.classList.remove('return');
			baseElement.classList.remove('leave');
		}, 1400);
	}

	return (
		<svg 
			xml version="1.0"
			viewBox="109.21 220.42 140.874 69.937" 
			xmlns="http://www.w3.org/2000/svg"
			id="return"
			className={ifLeave ? "leave" : ""}
			onClick={goBack}>
	  		<polyline 
	  			id="top"
	  			points="249.644 250.369 109.21 250.393 159.165 220.42" 
	  			transform="matrix(0.9999999999999999, 0, 0, 0.9999999999999999, 0, 1.4210854715202004e-14)"/>
	  		<polyline 
	  			id="bottom"
	  			points="250.084 260.408 109.65 260.384 159.605 290.357" 
	  			transform="matrix(0.9999999999999999, 0, 0, 0.9999999999999999, 0, 1.4210854715202004e-14)"/>
		</svg>
	)
}

function LogoButton ({isSubPage}) {

	let navigate = useNavigate();

	let globalOrHome = () => {
		/*
			If user is on Home, it goes to global.
			On anything else, it goes back home.
			will have to consult active sections state to distinguish 

			<svg 
			xmlns="http://www.w3.org/2000/svg" 
			width="32" 
			height="38" 
			viewBox="0 0 60 71"
			onClick={globalOrHome}
			id="logo">
		*/
	}

	return (
		<svg 
			xmlns="http://www.w3.org/2000/svg" 
			width="33.089" 
			height="40.784" 
			viewBox="0 0 33.089 40.784"
			onClick={globalOrHome}
			className={`${isSubPage ? 'subpageAdjust' : ''}`}
			id="logo">
			  <g id="Group_563" data-name="Group 563" transform="translate(1383.376 3479.325)">
			    <g id="Path_36" data-name="Path 36" transform="translate(-1383.376 -3479.325)" fill="none">
			      <path d="M8.272,0H24.817a8.434,8.434,0,0,1,8.272,8.586V32.2a8.434,8.434,0,0,1-8.272,8.586H8.272A8.434,8.434,0,0,1,0,32.2V8.586A8.434,8.434,0,0,1,8.272,0Z" stroke="none"/>
			      <path d="M 8.272336959838867 1.499996185302734 C 4.538057327270508 1.499996185302734 1.499998092651367 4.678806304931641 1.499998092651367 8.586086273193359 L 1.499998092651367 32.19784545898438 C 1.499998092651367 36.10512924194336 4.538057327270508 39.28393936157227 8.272336959838867 39.28393936157227 L 24.8170166015625 39.28393936157227 C 28.55129814147949 39.28393936157227 31.58935737609863 36.10512924194336 31.58935737609863 32.19784545898438 L 31.58935737609863 8.586086273193359 C 31.58935737609863 4.678806304931641 28.55129814147949 1.499996185302734 24.8170166015625 1.499996185302734 L 8.272336959838867 1.499996185302734 M 8.272336959838867 -3.814697265625e-06 L 24.8170166015625 -3.814697265625e-06 C 29.38569831848145 -3.814697265625e-06 33.08935928344727 3.844127655029297 33.08935928344727 8.586086273193359 L 33.08935928344727 32.19784545898438 C 33.08935928344727 36.9398078918457 29.38569831848145 40.78393936157227 24.8170166015625 40.78393936157227 L 8.272336959838867 40.78393936157227 C 3.703647613525391 40.78393936157227 -3.814697265625e-06 36.9398078918457 -3.814697265625e-06 32.19784545898438 L -3.814697265625e-06 8.586086273193359 C -3.814697265625e-06 3.844127655029297 3.703647613525391 -3.814697265625e-06 8.272336959838867 -3.814697265625e-06 Z" stroke="none" fill="#000"/>
			    </g>
			    <g id="Group_470" data-name="Group 470" transform="translate(-1379.681 -3474.24)">
			      <g id="Group_465" data-name="Group 465" transform="translate(14.69 17.137)">
			        <g id="Group_382" data-name="Group 382" transform="translate(0 0)">
			          <g id="Group_380" data-name="Group 380">
			            <g id="Path_11" data-name="Path 11" transform="translate(0 5.962)" fill="none">
			              <path d="M5.059,0a5.059,5.059,0,0,1,5.059,5.059c0,2.794-2.265,2.44-5.059,2.44S0,7.853,0,5.059A5.059,5.059,0,0,1,5.059,0Z" stroke="none"/>
			              <path d="M 5.058820724487305 0.999995231628418 C 2.820780754089355 0.999995231628418 1.000000953674316 2.820775508880615 1.000000953674316 5.058825492858887 C 1.000000953674316 5.997565269470215 1.305521011352539 6.165075302124023 1.452341079711914 6.245585441589355 C 1.882061004638672 6.481195449829102 2.664140701293945 6.513675212860107 3.445270538330078 6.513675212860107 C 3.685130596160889 6.513675212860107 3.93302059173584 6.510355472564697 4.195470809936523 6.506845474243164 C 4.474250793457031 6.503125190734863 4.762520790100098 6.499265670776367 5.058820724487305 6.499265670776367 C 5.355220794677734 6.499265670776367 5.643450736999512 6.503125190734863 5.922200679779053 6.506845474243164 C 6.184600830078125 6.510355472564697 6.432450771331787 6.513675212860107 6.672370910644531 6.513675212860107 C 7.415970802307129 6.513675212860107 8.234251022338867 6.481815338134766 8.665210723876953 6.245525360107422 C 8.812060356140137 6.165005207061768 9.117640495300293 5.997455596923828 9.117640495300293 5.058825492858887 C 9.117640495300293 2.820775508880615 7.296860694885254 0.999995231628418 5.058820724487305 0.999995231628418 M 5.058820724487305 -4.76837158203125e-06 C 7.852730751037598 -4.76837158203125e-06 10.11764049530029 2.264915466308594 10.11764049530029 5.058825492858887 C 10.11764049530029 7.85273551940918 7.852729320526123 7.499265670776367 5.058820724487305 7.499265193939209 C 2.264913558959961 7.499265670776367 9.5367431640625e-07 7.852735996246338 9.5367431640625e-07 5.058825492858887 C 9.5367431640625e-07 2.264915466308594 2.264910697937012 -4.76837158203125e-06 5.058820724487305 -4.76837158203125e-06 Z" stroke="none" fill="#000"/>
			            </g>
			            <g id="Ellipse_32" data-name="Ellipse 32" transform="translate(2.169)" fill="none" stroke="#000" stroke-width="1">
			              <circle cx="2.732" cy="2.732" r="2.732" stroke="none"/>
			              <circle cx="2.732" cy="2.732" r="2.232" fill="none"/>
			            </g>
			          </g>
			        </g>
			      </g>
			      <line id="Line_244" data-name="Line 244" x2="5.361" transform="translate(3.383 24.421)" fill="none" stroke="#000" stroke-width="1"/>
			      <line id="Line_245" data-name="Line 245" x2="4.289" transform="translate(3.383 21.74)" fill="none" stroke="#000" stroke-width="1"/>
			      <line id="Line_246" data-name="Line 246" x2="3.217" transform="translate(3.383 27.102)" fill="none" stroke="#000" stroke-width="1"/>
			      <g id="Group_473" data-name="Group 473" transform="translate(0.971 14.874)">
			        <g id="Rectangle_186" data-name="Rectangle 186" transform="translate(-0.12 2.466)" fill="none" stroke="#000" stroke-width="1">
			          <rect width="11" height="13" rx="2" stroke="none"/>
			          <rect x="0.5" y="0.5" width="10" height="12" rx="1.5" fill="none"/>
			        </g>
			        <g id="Rectangle_187" data-name="Rectangle 187" transform="matrix(0.574, -0.819, 0.819, 0.574, 6.75, 7.027)" fill="none" stroke="#000" stroke-width="0.5">
			          <rect width="8.578" height="1.072" rx="0.536" stroke="none"/>
			          <rect x="0.25" y="0.25" width="8.078" height="0.572" rx="0.286" fill="none"/>
			        </g>
			      </g>
			      <g id="Group_466" data-name="Group 466" transform="translate(16.226 0)">
			        <g id="Group_378" data-name="Group 378" transform="translate(0 0)">
			          <g id="Path_10" data-name="Path 10" transform="translate(0 1.049)" fill="none">
			            <path d="M4.819-1.049A5.2,5.2,0,0,1,9.878,3.762c0,2.347-4.077,8.281-5.058,8.281S0,6.109,0,3.762A4.978,4.978,0,0,1,4.819-1.049Z" stroke="none"/>
			            <path d="M 4.819102764129639 -0.04932117462158203 C 2.633272647857666 -0.04932117462158203 1.000002861022949 1.962919235229492 1.000002861022949 3.762089252471924 C 1.000002861022949 4.537518978118896 1.664322853088379 6.170619010925293 2.692432880401611 7.922609329223633 C 3.597403526306152 9.464775085449219 4.401286125183105 10.46691417694092 4.827895641326904 10.88726043701172 C 5.272519111633301 10.47000217437744 6.118852615356445 9.46634578704834 7.081752777099609 7.91473913192749 C 8.172653198242188 6.156888961791992 8.877542495727539 4.526869297027588 8.877542495727539 3.762089252471924 C 8.877542495727539 2.035749435424805 7.067222595214844 -0.04932117462158203 4.819102764129639 -0.04932117462158203 M 4.819102764129639 -1.049321174621582 C 7.546712875366211 -1.049321174621582 9.877542495727539 1.415529251098633 9.877542495727539 3.762089252471924 C 9.877542495727539 6.108639240264893 5.800652503967285 12.04301929473877 4.819102764129639 12.04301929473877 C 3.837552547454834 12.04301929473877 2.86102294921875e-06 6.108639240264893 2.86102294921875e-06 3.762089252471924 C 2.86102294921875e-06 1.415529251098633 2.091492652893066 -1.049321174621582 4.819102764129639 -1.049321174621582 Z" stroke="none" fill="#000"/>
			          </g>
			        </g>
			        <g id="Ellipse_31" data-name="Ellipse 31" transform="translate(2.908 2.906)" fill="none" stroke="#000" stroke-width="1">
			          <circle cx="2.011" cy="2.011" r="2.011" stroke="none"/>
			          <circle cx="2.011" cy="2.011" r="1.511" fill="none"/>
			        </g>
			      </g>
			      <g id="Group_469" data-name="Group 469" transform="translate(0 1.054)">
			        <g id="Group_468" data-name="Group 468" transform="translate(3.158 2.387)">
			          <g id="Group_372" data-name="Group 372" transform="translate(0 0)">
			            <g id="Rectangle_141" data-name="Rectangle 141" transform="translate(0 0)" fill="none" stroke="#000" stroke-width="1">
			              <rect width="11.259" height="9.651" rx="2" stroke="none"/>
			              <rect x="0.5" y="0.5" width="10.259" height="8.651" rx="1.5" fill="none"/>
			            </g>
			            <path id="Path_7" data-name="Path 7" d="M0-3.122S1.1-5.174,2.3-5.174,3.459-2.653,4.827-3.122s2.007-4.439,2.945-3.93,2.33,3.93,2.33,3.93" transform="translate(0.637 10.023)" fill="none" stroke="#000" stroke-width="1"/>
			            <circle id="Ellipse_29" data-name="Ellipse 29" cx="0.804" cy="0.804" r="0.804" transform="translate(1.608 1.608)"/>
			          </g>
			        </g>
			        <path id="Path_16" data-name="Path 16" d="M-1376.663-3460.63s-1.452.492-1.81-.339-1.8-7.2-1.141-8.342a.943.943,0,0,1,.339-.282c1.429-.963,9.57-1.706,10.065-1.21.529.529.486,2.09.486,2.09" transform="translate(1380.602 3471.599)" fill="none" stroke="#000" stroke-width="1"/>
			      </g>
			    </g>
			  </g>
			</svg>


	)
}

export default function Header ({ 
	isReturnable, 
	setNotifList, 
	unreadCount, 
	siteLocation,
	isVisible,
	children,
	isSubPage,
	current,
	setCurrent
}) {

	// let [returnable, setReturnable] = React.useState(isReturnable);
	let [isNotifList, setIsNotifList] = React.useState(false);

	return (
		<header className={`${isVisible ? 'return' : 'retreat'}`}>
		{/*<header>*/}

			<div id="headerWrapper">
				{isSubPage &&
					<ReturnElement 
						current={current} 
						setCurrent={setCurrent}
						isSubPage={isSubPage}/>
				}
				
				<LogoButton isSubPage={isSubPage}/>

				<button id="notifToggle" onClick={setNotifList}>
					{!isNotifList &&
						<div id="countWrapper">
							<p>{unreadCount}</p> 
							<hr width="0" size="36" />
							<p>0</p>
						</div>
					}
					

					{isNotifList &&
						<div id="exitWrapper"></div>
					}
					
				</button>
			</div>
			{children}
		</header>
	)
}