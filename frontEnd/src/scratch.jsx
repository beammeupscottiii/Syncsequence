let data = await accessAPI.getConnections(userInfo._id);

<ul id="connections">
	{data.map((connect, index)=> (
		<li key={index} >
			<img src={connect.profilePhoto} />

			<div className="text">
				<h4>{connect.userName}</h4>
				<span>{`${connect.fullName}`}</span>
			</div>

			<div id="svgWrapper"
				className={`${connect.isConnection == true ? 'connection' : ''} ${connect.isSubsciber == true ? 'subscriber' : ''} ${connect.isSubscription == true ? 'subscription' : ''}`}>
				{connect.isConnection == true ? twoWaySVG : null}
				{connect.isSubscription || connect.isSubsciber ? oneWaySVG : null}
			</div>
		</li>
	))}
</ul>

div#FullList ul#connections {
	margin: 96px auto 0;
    height: calc(100% - 300px);
    overflow-y: scroll;
    list-style-type: none;
    padding: 0;
    width: 96%;
}

div#FullList ul#connections li {
	position: relative;
    display: flex;
	display: block;
	flex-direction: row;
    width: 100%;
    margin: 16px 0;
}

div#FullList ul#connections img {
	width: 48px;
    height: 48px;
    border-radius: 8px;
    opacity: 0.5;
    display: inline-block;
    margin: 0px 8px;
}

div#FullList ul#connections li div.text {
	display: inline-block;
}

div#FullList ul#connections li div.text h4 {
	font-family: "Raleway";
    font-size: 1.5em;
    margin: 16px 0 8px;
}

div#FullList ul#connections li div.text span {
	display: block;
    color: var(--greyscale-text);
    margin-top: 4px;
}


div#FullList ul#connections li div#svgWrapper {
	position: absolute;
	right: 0;
	top: 50%;
	margin-right: 8px;
}

div#FullList ul#connections li div#svgWrapper.subscription {
	transform: rotate(180deg);
}

div#svgWrapper svg {
	transform: scale(1.2);
}

div#svgWrapper svg g line.cls-1 {
	fill: none;
    stroke: rgba(0,0,0,0.4);
    stroke-width: 2px;
}