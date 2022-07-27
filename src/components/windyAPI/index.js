const options = {
	key: `${process.env.REACT_APP_WINDY}`,
	verbose: true,
	lat: 50.4,
	lon: 14.3,
	zoom: 5,
};

const WindyInit =
	(options,
	(windyAPI) => {
		// windyAPI is ready, and contain 'map', 'store',
		// 'picker' and other usefull stuff

		const { map } = windyAPI;
		// .map is instance of Leaflet map

		// L.popup()
		//     .setLatLng([50.4, 14.3])
		//     .setContent('Hello World')
		//     .openOn(map);
	});

export default WindyInit;
