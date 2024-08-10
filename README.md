# gl-e750-mcu-oled
GL.inet GL-E750 MCU OLED script for vanilla OpenWrt

## Disclaimer

Use at your own risk! Incorrect JSON can make MCU act weird, including shutting down the router, and in combination with running as background task it could lead to bootloops, however, there is always option for booting into OpenWrt failsafe mode and fixing script or removing it from autostart, so no worries :)

## Dependencies:
 * **gl-e750-mcu** (https://github.com/gl-inet/GL-E750-MCU-instruction)
 * **3ginfo.sh** from **luci-app-3ginfo-lite** (https://github.com/4IceG/luci-app-3ginfo)
 * **sms_tool** (available from OpenWrt repository)
 * **jq** (available from OpenWrt repository)
 * **mwan3.user** script (optional, for mwan3 interfaces status on custom screen)
   limitations due to custom message size (64 symbols max) and formatting:
    * interface names will be trunacted to 6 symbols
    * interface status will be trunacted to 7 symbols
    * max 4 interfaces supported

## Configuration:
 * LuCI -> System -> MCU OLED
 * /etc/config/mcu_oled

## Features:
 * Clock;
 * Battery status (LuCI -> Overview);
 * Mobile network type;
 * Mobile network signal;
 * SMS indicator;
 * Router LAN address;
 * 2.4G and 5G access point names
 * 2.4G and 5G access point keys display (optional)
 * Wireless clients number
 * Configurable **mwan3** interfaces status
 * VPN icon status

## Supported MCU JSON input:
 * see https://github.com/gl-inet/GL-E750-MCU-instruction for details

## Example mwan3.user script:

```
MWAN3IFNAME0="vpn0"
if [ "${ACTION}" == "connected" ]; then
    if [ "${INTERFACE}" == "${MWAN3IFNAME0}" ]; then
        echo "online" > /tmp/mwan3_${MWAN3IFNAME0}_status
    fi
fi
if [ "${ACTION}" == "disconnected" ]; then
    if [ "${INTERFACE}" == "${MWAN3IFNAME0}" ]; then
        echo "offline" > /tmp/mwan3_${MWAN3IFNAME0}_status
    fi
fi
```

## Credits
 * [Rafał Wabik](https://github.com/4IceG) for **3ginfo.sh** and **sms-tool**;
 * [Cezary Jackiewicz](https://github.com/obsy) for **3ginfo.sh** and **sms-tool**;
 * [GL.inet](https://github.com/gl-inet) for the router and **gl-e750-mcu**.
