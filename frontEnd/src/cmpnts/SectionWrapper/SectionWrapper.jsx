import * as React from 'react';

import './SectionWrapper.css';



export default function SectionWrapper({ onScrollDelta, children }) {

	const touchStartY = React.useRef(0);

	const handleWheel = (event) => {
		onScrollDelta(event.deltaY);
	}

	const handleTouchStart = (event) => {
		touchStartY.current = event.touches[0].clientY;
	}

	const handleTouchMove = (event) => {
		const currentY = event.touches[0].clientY;
		const deltaY = touchStartY.current - currentY;

		onScrollDelta(deltaY);

		touchStartY.current = currentY;
	}

	const handleTouchEnd = () => {
		touchStartY.current = 0;
	}

	return (
		<div id="sectionWrapper"
			 onWheel={handleWheel}
			 onTouchStart={handleTouchStart}
			 onTouchMove={handleTouchMove}
			 onTouchEnd={handleTouchEnd}>
			 {children}
		</div>
	)
}