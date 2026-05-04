/* * * V i t a l s * * */
import * as React from 'react';
import APIaccess from '../../apiaccess';
import Log from '../Log/Log';
import './Home.css';
import FullList from '../../components/base/fullList';

let accessAPI = APIaccess();

export default function UserLog({active, setCurrent, current, log, setLog, sectionClass, refe}) {

	let userID = sessionStorage.getItem('userID');
	let [isModal, openModal] = React.useReducer(state => !state, false);

	let updateLog = async() => {

		let posts = await accessAPI.pullUserLog({type: 'customLog', logNumber: current.log})
		setLog(posts);
	} 

	React.useEffect(()=> {
		updateLog()
	}, [])

	React.useEffect(()=> {
		updateLog()
	}, [current.modal, current.customizer])

	let noHeading = false;

	return (
		<div id="HOMELOG" className={ `${sectionClass.home}` } ref={refe}>
			<Log data={log} 
				 section={"user"} 
				 noHeading={noHeading} 
				 current={current} 
				 setCurrent={setCurrent}
				 updateLog={updateLog}/>
		</div>
	)
}