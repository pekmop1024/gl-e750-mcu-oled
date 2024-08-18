
#
# Copyright (C) 2017 OpenWrt.org
#
# This is free software, licensed under the GNU General Public License v2.
# See /LICENSE for more information.
#
include $(TOPDIR)/rules.mk

PKG_NAME:=gl-e750-mcu-oled
PKG_VERSION:=1.1
PKG_RELEASE:=1
PKG_ARCH=:all
PKG_LICENSE:=GPL-3.0

include $(INCLUDE_DIR)/package.mk

define Package/gl-e750-mcu-oled/Default
	SECTION:=base
	CATEGORY:=gl-inet
	TITLE:=GL.inet GL-E750 MCU OLED script for vanilla OpenWrt
	DEPENDS:=+libjson-c +libpthread +libuci +libcurl +libblobmsg-json +libiwinfo +libubox +libubus +libuuid +jq +coreutils-stty +sms-tool +luci-app-3ginfo-lite +socat
endef

Package/gl-e750-mcu-oled = $(Package/gl-e750-mcu-oled/Default)

define Package/gl-e750-mcu-oled/description
GL.inet GL-E750 MCU OLED script for vanilla OpenWrt
endef

define Package/gl-e750-mcu-oled/conffiles
/etc/config/mcu_oled
endef

define Build/Prepare
endef

define Build/Configure
endef

define Build/Compile
endef

define Build/Prepare
endef

define Package/gl-e750-mcu-oled/install
	$(INSTALL_DIR) $(1)/usr/bin
	$(INSTALL_BIN) ./files/usr/bin/mcu_oled $(1)/usr/bin
	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/etc/init.d/mcu_oled $(1)/etc/init.d
	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_CONF) ./files/etc/config/mcu_oled $(1)/etc/config
	$(INSTALL_DIR) $(1)/usr/share/rpcd/acl.d/
	$(CP) ./files/usr/share/rpcd/acl.d/* $(1)/usr/share/rpcd/acl.d/
	$(INSTALL_DIR) $(1)/usr/share/luci/menu.d/
	$(CP) ./files/usr/share/luci/menu.d/* $(1)/usr/share/luci/menu.d/
	$(INSTALL_DIR) $(1)/www/luci-static/resources/view/status/include/
	$(CP) ./files/www/luci-static/resources/view/status/include/* $(1)/www/luci-static/resources/view/status/include/
	$(INSTALL_DIR) $(1)/www/luci-static/resources/view/system/
	$(CP) ./files/www/luci-static/resources/view/system/mcu_oled.js $(1)/www/luci-static/resources/view/system/
endef

$(eval $(call BuildPackage,gl-e750-mcu-oled))
