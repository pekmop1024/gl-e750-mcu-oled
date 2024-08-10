'use strict';
'require form';
'require fs';
'require view';
'require uci';
'require ui';
'require tools.widgets as widgets'

/*

 mcu_oled version 1.0 by pekmop1024
 GL.inet GL-E750 MCU OLED script for vanilla OpenWrt
 License: GPL3 (https://www.gnu.org/licenses/gpl-3.0.en.html)

*/

function getTtyUsb() {
	return fs.list('/dev').then(function(devices) {
		return devices.filter(function(device) {
			return device.name.match(/^ttyUSB/);
		});
	});
}

return view.extend({
	load: function() {
		return Promise.all([
			L.resolveDefault(getTtyUsb()),
			L.resolveDefault(fs.stat('/usr/share/3ginfo-lite/3ginfo.sh'), ''),
			L.resolveDefault(fs.stat('/usr/bin/sms_tool'), ''),
		]);
	},

	render: function(data) {
		var m, s, o;
		m = new form.Map('mcu_oled',
				 'MCU OLED',
				 _('MCU OLED configuration<br />\
				 NOTE: display updates once per minute on each minute beggining, if you do not see changes after applying on display, please wait for next minute'),
				 _('Configuration page for the MCU OLED display'));

		s = m.section(form.TypedSection, 'mcu_oled', '', null);
		s.anonymous = true;

		o = s.option(form.Flag, 'mcustatus',
			     _('Get MCU status info and save to file'),
			     _('Needed for battery status on main status page'));
		o.default = 1;
		o.rmempty = 0;

		o = s.option(form.Flag, 'hidepsk',
			     _('Hide wireless PSK on screen'),
			     _('By default PSK is displayed along with SSID'));
		o.default = 0;
		o.rmempty = 0;

		o = s.option(form.Value, 'mode',
			     _('Operation mode on display'),
			     _('Informational purposes only.'));
		var modes = [ 'Router', 'AP', 'WDS', 'Extender' ];
		modes.forEach(mode => o.value(mode));
		o.placeholder = _('Please select mode');
		o.default = 'Router';
		o.rmempty = 0;

		o = s.option(form.Value, 'radio2g',
			     _('2.4GHz radio interface name'),
			     _('This is wifi-iface name, not network interface name. Used for getting SSID and PSK for wireless network'));
		o.rmempty = 0;

		o = s.option(form.Value, 'radio5g',
			     _('5GHz radio interface name'),
			     _('This is wifi-iface name, not network interface name. Used for getting SSID and PSK for wireless network'));
		o.rmempty = 0;

		o = s.option(form.Value, 'iflist',
			     _('List of MWAN3 interfaces to show'),
			     _('Space-separated, maximum 4 interfaces'));
		o.rmempty = 0;

		o = s.option(form.Value, '3ginfo',
			     _('Path to 3ginfo.sh application'),
			     _('Read-only when application is found at default location'));
		o.default = '/usr/share/3ginfo-lite/3ginfo.sh';
		if (data[1].type == 'file') {
			o.readonly = true;
		}
		o.rmempty = 0;

		o = s.option(form.Value, 'smstool',
			     _('Path to sms_tool application'),
			     _('Read-only when application is found at default location'));
		o.default = '/usr/bin/sms_tool';
		if (data[2].type == 'file') {
			o.readonly = true;
		}
		o.rmempty = 0;

		o = s.option(form.Value, 'smsdevice',
			     _('Serial port for sms_tool'),
			     _('Select one of the available ttyUSBX ports.'));
		data[0].sort((a, b) => a.name > b.name);
		data[0].forEach(device => o.value('/dev/' + device.name));
		o.placeholder = _('Please select a port');
		o.default = '/dev/ttyUSB3';
		o.rmempty = 0;

		o = s.option(form.Value, 'smsstorage',
			     _('SMS storage read by sms_tool'),
			     _('ME is modem storage, SIM is sim storage.'));
		var storages = [ 'ME', 'SIM' ];
		storages.forEach(storage => o.value(storage));
		o.placeholder = _('Please select SMS storage');
		o.default = 'ME';
		o.rmempty = 0;

		return m.render();
	}
});
