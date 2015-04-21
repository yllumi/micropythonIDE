chrome.app.runtime.onLaunched.addListener(function(launchData) {
	chrome.app.window.create('index.html', {
		id: "mainwin",
		frame: "none",
		'bounds': {
			'width': 1024,
			'height': 768
		}
	},
	function(win) {
		win.contentWindow.launchData = launchData;
	});
});