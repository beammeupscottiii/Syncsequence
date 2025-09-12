import * as React from 'react';

import './Nav.css';




export function Navbar({}) {

	/*	
		09. 11. 2025
		For now will use 'current' state var in Main.jsx for button labels
		unsure whether i'll move it to UIC 
	*/

	return (
		<nav>
			<button class={'buttonDefault'} id="navButton">Home</button>
		</nav>
	)
}

let GlobeIcon = () => (
	<svg 
		xmlns="http://www.w3.org/2000/svg" 
		width="32" 
		height="32" 
		viewBox="0 0 32 32"
		id="globe">
	  <defs>
	    {/*<style>
	      .cls-1, .cls-3 {
	        fill: none;
	      }

	      .cls-1 {
	        stroke: #707070;
	        stroke-width: 1.5px;
	      }

	      .cls-2 {
	        stroke: none;
	      }
	    </style>*/}
	  </defs>
	  <g id="Group_537" data-name="Group 537" transform="translate(-15.739 -23)">
	    <g id="Ellipse_37" data-name="Ellipse 37" class="cls-1" transform="translate(15.739 23)">
	      <circle class="cls-2" cx="16" cy="16" r="16"/>
	      <circle class="cls-3" cx="16" cy="16" r="15.25"/>
	    </g>
	    <line id="Line_256" data-name="Line 256" className="cls-1" x2="30.869" transform="translate(16.435 38.81)"/>
	    <line id="Line_257" data-name="Line 257" className="cls-1" x2="30.869" transform="translate(31.929 23.435) rotate(90)"/>
	    <path id="Path_17" data-name="Path 17" className="cls-1" d="M0,0S6.4,3.245,12.889,3.245,25.963,0,25.963,0" transform="translate(18.961 28.999)"/>
	    <path id="Path_18" data-name="Path 18" className="cls-1" d="M0,0S6.4,3.245,12.889,3.245,25.963,0,25.963,0" transform="translate(44.851 48.243) rotate(180)"/>
	    <path id="Path_19" data-name="Path 19" className="cls-1" d="M0,0H0L.114.03,1.149.286A65.209,65.209,0,0,0,15.22,2.078,65.088,65.088,0,0,0,30.331,0" transform="translate(37.259 54.262) rotate(-90)"/>
	    <path id="Path_20" data-name="Path 20" className="cls-1" d="M0,0A66.733,66.733,0,0,0,15.272,2.089,65.209,65.209,0,0,0,30.434,0" transform="translate(26.281 23.931) rotate(90)"/>
	  </g>
	</svg>
)

export function Navmenu({}) {

	/* 
		09. 12. 2025
		For now, the list of menu options is being hardcoded,
		but in the future, will utilize state var list of sections
		and run a function to place them all, excluding the current
		active section.
		This state var would possibly include ALL sections,
		so have these main at the top so we can cut off the loop at 5 values
	*/


	return (
		<div id="navmenu">
			
			<ul>
				<li>
					<button>
						<GlobeIcon />
					</button>
				</li>

				<li>
					<button className={"buttonDefault"}>Profile</button>
				</li>

				<li>
					<button className={"buttonDefault"}>Social</button>
				</li>

				<li>
					<button className={"buttonDefault"}>Macros</button>
				</li>

				<li>
					<button className={"buttonDefault"}>Settings</button>
				</li>

				<li>
					<button className={"buttonDefault"}>Close</button>
				</li>
			</ul>

		</div>
	)
}