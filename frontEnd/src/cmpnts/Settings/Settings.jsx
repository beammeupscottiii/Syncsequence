/* * * V i t a l s * * */
import * as React from 'react';
import APIaccess from '../../apiaccess';

import './Settings.css';

let accessAPI = APIaccess();


export default function Settings({ 
	current,
	setCurrent,
	sectionClass, 
	refe 
}) {

	

	return (
		<div id="settings" className={ `${sectionClass.settings}` } ref={refe}>
			
		</div>
	)
}