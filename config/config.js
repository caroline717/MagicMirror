/* Magic Mirror Config Sample
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * see https://docs.magicmirror.builders/getting-started/configuration.html#general
 * and https://docs.magicmirror.builders/modules/configuration.html
 */

//TODO: Add birthday to calendar
//https://forum.magicmirror.builders/topic/9092/birthday-calendar-and-appointments/7
//TODO: Pick custom modules

let primaryColor = "#ffbfc9";

let config = {
	address: "localhost", // Address to listen on, can be:
	// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
	// - another specific IPv4/6 to listen on a specific interface
	// - "0.0.0.0", "::" to listen on any interface
	// Default, when address config is left out or empty, is "localhost"
	port: 3000,
	basePath: "/", // The URL path where MagicMirror is hosted. If you are using a Reverse proxy
	// you must set the sub path here. basePath must end with a /
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"], // Set [] to allow all IP addresses
	// or add a specific IPv4 of 192.168.1.5 :
	// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
	// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
	// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false, // Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "", // HTTPS private key path, only require when useHttps is true
	httpsCertificate: "", // HTTPS Certificate path, only require when useHttps is true

	language: "en",
	locale: "en-US",
	logLevel: ["INFO", "LOG", "WARN", "ERROR"], // Add "DEBUG" for even more logging
	timeFormat: 12,
	units: "imperial",
	// serverOnly:  true/false/"local" ,
	// local for armv6l processors, default
	//   starts serveronly and then starts chrome browser
	// false, default for all NON-armv6l devices
	// true, force serveronly mode, because you want to.. no UI on this device

	modules: [
		{
			module: "MMM-nyc-transit",
			position: "top_center",
			config: {
				apiKey: "BwwV0Kn7Gs6fWzypayNsA56X67Cpb96Fa4RiFMiK",
				displayType: "list",
				mtaType: "train",
				stations: [
					{
						stationId: 301,
						walkingTime: 5,
						dir: {
							upTown: false,
							downTown: true
						}
					},
					{
						stationId: 146,
						walkingTime: 5,
						dir: {
							upTown: false,
							downTown: true
						}
					}
				],
				updateInterval: 300000
			}
		},
		{
			module: "MMM-MagicMover",
			config: {
				updateInterval: 60 * 1000,
				ignoredRegions: [],
				maxMove: 20
			}
		},
		{
			module: "clock",
			position: "top_left",
			config: {
				timezone: "America/New_York",
				lat: 40.73061,
				long: -73.935242
			}
		},
		{
			module: "calendar",
			header: "US Holidays",
			position: "top_left",
			config: {
				customEvents: [{ keyword: "Birthday", symbol: "birthday-cake", color: primaryColor }],
				maximumEntries: 5,
				colored: true,
				coloredSymbolOnly: true,
				calendars: [
					{
						color: primaryColor,
						symbol: "star",
						url: "webcal://www.calendarlabs.com/ical-calendar/ics/76/US_Holidays.ics"
					}
				]
			}
		},
		{
			module: "compliments",
			position: "bottom_bar",
			config: {
				compliments: {
					morning: ["Good morning, Mackenzie!", "Enjoy your day!", "How was your sleep?", "I love you!"],
					afternoon: ["Hello, Mackenzie!", "I love you!"],
					evening: ["Good Evening, Mackenzie!", "Sleep well!", "I love you!"],
					"....-01-01": ["Happy new year!"],
					"....-01-09": ["Happy Birthday!"],
					"....-10-31": ["Happy Halloween!"],
					"....-12-25": ["Merry Christmas!"]
				}
			}
		},
		//Current
		{
			module: "weather",
			position: "top_right",
			config: {
				weatherProvider: "openweathermap",
				type: "current",
				roundTemp: true,
				degreeLabel: true,
				location: "New York",
				locationID: "5128581", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				apiKey: "6d6c368ecd4b4df1e5029b59e557e8a6"
			}
		},
		//Forecast
		{
			module: "weather",
			position: "top_right",
			header: "Weather Forecast",
			config: {
				weatherProvider: "openweathermap",
				type: "forecast",
				roundTemp: true,
				degreeLabel: true,
				colored: "true",
				maxEntries: 10,
				maxNumberOfDays: 8,
				location: "New York",
				locationID: "5128581", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				apiKey: "6d6c368ecd4b4df1e5029b59e557e8a6",
				initialLoadDelay: 1000 //Added because two differnent modules share a key
			}
		}
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {
	module.exports = config;
}
