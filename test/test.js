//var dolphin = require('../')('http://localhost:9999/');
var dolphin = require('../')();

dolphin.events({
	since: Date.now() / 1000,
	until: Date.now() / 1000
}).on('event', function(evt){
	console.log(evt);
}).on('error', function(err){
	console.log('Error:', err);
});


/*
dolphin.version().then(function(info){
	console.log(info);
})

dolphin.info().then(function(info){
	console.log(info);
})
*/
/*
dolphin.containers
	.inspect('b6905639cab3aecc33e59ccb6c4c69cfcde6b813eb00efadb5191c3c5b7257e4')
	.then(function(container){
		console.log(container);
}, function(err){
	console.log(err);
});
*/

/*
dolphin.version().then(function(info){
	console.log(info);
})
*/

// console.log('dolphin.containers');
// dolphin.containers({filters: '{"status":["running"]}'}).then(function(info){
// 	console.log('containers list', info);
// })

console.log('dolphin.containers.create');
dolphin.containers.create({
		Image: 'kreativsoftware/vae-basic', 
		Cmd: ['node', 'bin/www'], 
		ExposedPorts: {'3000/tcp': {}},
		AttachStdin: true,
		AttachStdout: true,
		AttachStderr: true,
		Tty: true,
		"Volumes": {
			"/tmp/video": { }
		},
	}).then(function(info){
	console.log('container created', info);
	
	dolphin.containers.start({
			Id: info.Id,
			"VolumeBindings": {
				"/tmp/video": {
					'bind': '/tmp/video',
					'mode': 'rw',
				}
			},
			"PortBindings": {
				"3000/tcp": [
					{
						"HostIp": "0.0.0.0", // Strings, not numbers here
						"HostPort": "3000"
					}
				]
			}
		}).then(function (startResult) {
			console.log('start', startResult);
			dolphin.containers.logs(info.Id).then(function (logs) {
				console.log('logs', logs);
			});
	});

})
