/*jslint node: true */
"use strict";
var conf = require('byteballcore/conf.js');
var myWitnesses = require('byteballcore/my_witnesses.js');
var logger = require('byteballcore/util/logger.js');

function start(){
	logger.log('starting');
	var network = require('byteballcore/network.js');
	if (conf.initial_peers)
		conf.initial_peers.forEach(function(url){
			network.findOutboundPeerOrConnect(url);
		});
}

myWitnesses.readMyWitnesses(function(arrWitnesses){
	if (arrWitnesses.length > 0)
		return start();
	logger.log('will init witnesses', conf.initial_witnesses);
	myWitnesses.insertWitnesses(conf.initial_witnesses, start);
}, 'ignore');
