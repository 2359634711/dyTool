// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
//@match        http://jwgl.nepu.edu.cn/*
//@match        http://jwgl.nepu.edu.cn/dwr/engine.js
// @grant        none
// @require    file:///home/root1/jiaowu/index.js
// ==/UserScript==




(function s() {
    document.selection = {
        empty: () => { }
    }
    Document.prototype.selectNodes = function (selecter) {
        var dom = this
        var selecters = selecter.split('/')
        var i = 1
        while (i < selecters.length) {
            var s = selecters[i]
            if (!s) break
            if (i++ == selecters.length - 1) {
                dom = dom.querySelectorAll(s)
            } else {
                dom = dom.querySelector(s)
            }
        }
        return dom
    }
    window.send_request = (url, SystemBh) => {
        http_request = false;
        if (window.XMLHttpRequest) {
            http_request = new XMLHttpRequest();
            if (http_request.overrideMimeType) {
                http_request.overrideMimeType("text/xml");
            }
        }
        else if (window.ActiveXObject) {
            try {
                http_request = new ActiveXObject("Msxml2.XMLHTTP");
            }
            catch (e) {
                try {
                    http_request = new ActiveXObject("Microsoft.XMLHTTP");
                }
                catch (ei) { }
            }
        }
        if (!http_request) {
            window.alert("不能创建对象!");
            return false;
        }

        try {
            http_request.open("POST", url, true);

            http_request.setRequestHeader("CONTENT-TYPE", "application/x-www-form-urlencoded");

            http_request.send(null);

            http_request.onreadystatechange = parstRes;




        }
        catch (eii) { alert("加载编号为" + SystemBh + "的应用系统失败，可能是网络延迟问题！"); }


        function parstRes() {
            if (http_request.readyState === 4 && http_request.status === 200) {
                var tmpxml = http_request.responseXML;
                //加载顶层菜单开始
                var topXml = tmpxml.selectNodes("/Menus/topMenus/Menu");
                for (i = 0; i < topXml.length; i++) {
                    topMenuItems[topMenuLength] = new Array();
                    topMenuItems[topMenuLength][0] = topXml[i].attributes.getNamedItem("parentid").textContent;
                    topMenuItems[topMenuLength][1] = SystemBh + "_" + topXml[i].attributes.getNamedItem("id").textContent;
                    topMenuItems[topMenuLength][2] = topXml[i].attributes.getNamedItem("name").textContent;
                    topMenuItems[topMenuLength][3] = topXml[i].attributes.getNamedItem("title").textContent;
                    topMenuItems[topMenuLength][4] = topXml[i].attributes.getNamedItem("path").textContent;
                    topMenuItems[topMenuLength][5] = topXml[i].attributes.getNamedItem("imageUrl").textContent;
                    topMenuItems[topMenuLength][6] = topXml[i].attributes.getNamedItem("defaultPage").textContent;
                    topMenuLength++;
                }
                //加载顶层菜单结束

                //加载一层菜单开始
                var menuXml = tmpxml.selectNodes("/Menus/Level1Menus/Menu");
                for (i = 0; i < menuXml.length; i++) {
                    menuItems[menuLength] = new Array();
                    menuItems[menuLength][0] = SystemBh + "_" + menuXml[i].attributes.getNamedItem("parentid").textContent;
                    menuItems[menuLength][1] = SystemBh + "_" + menuXml[i].attributes.getNamedItem("id").textContent;
                    menuItems[menuLength][2] = '&nbsp;' + menuXml[i].attributes.getNamedItem("name").textContent;
                    menuItems[menuLength][3] = menuXml[i].attributes.getNamedItem("title").textContent;
                    menuItems[menuLength][4] = menuXml[i].attributes.getNamedItem("path").textContent;
                    menuItems[menuLength][5] = menuXml[i].attributes.getNamedItem("imageUrl").textContent;
                    menuLength++;
                }

                //加载一层菜单结束

                //加载二层菜单开始
                var linkXml = tmpxml.selectNodes("/Menus/Level2Menus/Menu");
                for (i = 0; i < linkXml.length; i++) {
                    linkItems[linkLength] = new Array();
                    linkItems[linkLength][0] = SystemBh + "_" + linkXml[i].attributes.getNamedItem("parentid").textContent;
                    linkItems[linkLength][1] = SystemBh + "_" + linkXml[i].attributes.getNamedItem("id").textContent;
                    linkItems[linkLength][2] = '&nbsp;&nbsp;' + linkXml[i].attributes.getNamedItem("name").textContent;
                    linkItems[linkLength][3] = linkXml[i].attributes.getNamedItem("title").textContent;
                    linkItems[linkLength][4] = linkXml[i].attributes.getNamedItem("path").textContent;
                    linkItems[linkLength][5] = linkXml[i].attributes.getNamedItem("imageUrl").textContent;
                    linkLength++;
                }

                //加载二层菜单结束
            }
        }
        setTimeout(() => {
            window.onresize()
        }, 1000)
        setTimeout(() => {
            window.onresize()
        }, 2000)
        setTimeout(() => {
            window.onresize()
        }, 3000)
    }
}())
