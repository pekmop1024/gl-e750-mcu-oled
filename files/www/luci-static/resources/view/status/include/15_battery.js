'use strict';
'require baseclass';
'require fs';
'require rpc';

/*

 mcu_oled version 1.0 by pekmop1024
 GL.inet GL-E750 MCU OLED script for vanilla OpenWrt
 License: GPL3 (https://www.gnu.org/licenses/gpl-3.0.en.html)

*/

var callFileRead = rpc.declare({
	object: 'file',
	method: 'read',
	params: [ 'path' ],
	expect: { data: '' },
	filter: function(value) { return value.trim() }
});

return baseclass.extend({
	title: _('Battery'),

	load: function() {
		return Promise.all([
			L.resolveDefault(callFileRead('/var/run/mcu_status.log'))
		]);
	},

	render: function(data) {

		var batterydata = data[0].split(',');

		if (batterydata[0] == '{OK}') {
			if (batterydata[1] != null) {
				batterydata[1] = batterydata[1] +' %'
			} else {
				batterydata[1] = 'please wait...'
			}
			if (batterydata[2] != null) {
				batterydata[2] = batterydata[2] +' C'
			} else {
				batterydata[2] = 'please wait...'
			}
			if (batterydata[3] == 1) {
				batterydata[3] = 'charging'
			} else if (batterydata[3] == 0) {
				batterydata[3] = 'discharging'
			} else {
				batterydata[3] = 'please wait...'
			}
			if (batterydata[4] == null) {
				batterydata[4] = 'please wait...'
			}
		} else {
			batterydata[1] = 'please wait...'
			batterydata[2] = 'please wait...'
			batterydata[3] = 'please wait...'
			batterydata[4] = 'please wait...'
		}

		var fields = [
			_('Charge level'), batterydata[1],
			_('Temperature'), batterydata[2],
			_('Status'), batterydata[3],
			_('Cycles'), batterydata[4],
		];

		var table = E('table', { 'class': 'table' });

		for (var i = 0; i < fields.length; i += 2) {
			table.appendChild(E('tr', { 'class': 'tr' }, [
				E('td', { 'class': 'td left', 'width': '33%' }, [ fields[i] ]),
				E('td', { 'class': 'td left' }, [ (fields[i + 1] != null) ? fields[i + 1] : '?' ])
			]));
		}

		return table;
	}
});
