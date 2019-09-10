//活动配置
var actOption = {
    "iActId": 1075,
    "sAppId": 'ULINK-CWWL-585977',  //腾讯优联APPID
    "game": 'pao',
    "appUrl": '',
    "qqapiStatus": false,
    "shareLogStatus": true,
    "shareStatus": true,
    "platId": ulink.getQueryString('platid'),
    "area": ulink.getQueryString('area'),
    "rawardStatus": true
}
//随机显示测试语句
var sendText = [
    "人生路万条，拼搏第一条！",
    "加足马力，冲向人生巅峰！",
    "为了梦想，永不停止脚步！",
    "特别的你，永远不可替代！",
    "感谢陪伴，一起奔跑！",
];
var sendRandom = Math.floor(Math.random() * sendText.length);
ulink.$(".send").text(sendText[sendRandom]);
//分享配置
var shareOptions = {
    iActId: actOption.iActId, // 活动号
    title: '测测你的真性情！', // 分享标题
    desc: '参与测试，爽赢1888钻！更有专属好礼等你领~',  // 分享内容简介
    link: 'https://pao.qq.com/act/1075/78f2a26bd6531b4a/share.html',  // 分享链接
    imgUrl: 'https://pao.qq.com/act/1075/78f2a26bd6531b4a/image/120.png', // 分享后朋友看到的图标
    WXtrigger: function (res) { // 微信分享点击事件回调
        console.log("微信点击回调\n");
    },
    WXsuccess: function (res) { // 微信分享后回调
        addShareLogAjax();
    },
    WXfail: function (res) { // 微信分享失败回调
        alertView("微信分享失败");
    },
    QQtrigger: function (res) { // qq分享点击事件的回调
    },
    QQcallback: function (res) { // qq成功、失败、或取消的回调
        if (res.retCode == 0) {
            addShareLogAjax();
        } else {
            //ark分享情况下不触发失败提示
            if(actOption.qqapiStatus==false){
                alertView("QQ分享失败");
            }
        }
        console.log("QQ分享之后回调回调\n");
    },
    defaultCallback: function () {
        console.log("分享之后默认回调");
        // 调用show方法后，由于qq、微信webview环境不支持直接唤起分享，故会执行该回调、同时游戏中msdk分享失败、也会执行该回调
    }
};

//显示对应图标
var os = ulink.detect().os;
if (ulink.isQQApp()) {
    ulink.$('.qq_logo').show();
    actOption.platId = getPlatId();//修改对应系统
    actOption.area = 2;//修改对应大区
    //加载ARkJS
    ulink.loadScript({
        url: 'https://open.mobile.qq.com/sdk/qqapi.js?_bid=152',
        success: function () {
            actOption.qqapiStatus = true;
        },
        error: function () {
        }
    });
} else if (ulink.isWxApp()) {
    ulink.$('.wx_logo').show();
    actOption.platId = getPlatId();//修改对应系统
    actOption.area = 1;//修改对应大区
    ulink.share.init(shareOptions);
} else {
    if (actOption.platId == '') {
        actOption.platId = getPlatId();
    }
    //根据appid判断大区
    var appId = ulink.getQueryString('appid');
    if(appId=='100692648'){
        actOption.area = 2;
    }else if(appId=='wx15f5f4874ca259f4'){
        actOption.area = 1;
    }
    ulink.share.init(shareOptions);
}
//登录态
var LoginManager = ulink.LoginManager;
//分享按钮
ulink.$("#shareBtn").on('click', function () {
    if (ulink.isQQApp()) {
        qqH5Ark();
    } else if (ulink.isWxApp()) {
        pop('#share_tips');
        ulink.share.show();
    } else {
        pop('#share_tips');
        ulink.share.show();
    }
});
//分享礼包领取
ulink.$("#shareRawardBtn").on('click', function () {
    LoginManager.checkLogin(function (userInfo) {
        if (actOption.shareStatus) {
            ulink.http.get({
                url: actOption.appUrl + '/index.php',
                isShowLoading: true,
                params: {
                    route: 'share/lottery',
                    game: actOption.game,
                    iActId: actOption.iActId,
                    platId: actOption.platId,
                    area: actOption.area
                },
                success: function (data) {
                    var iRet = data.iRet;
                    if (iRet == 0) {
                        actOption.shareStatus = false;
                    }
                    alertView(data.sMsg);
                },
                error: function () {
                    alertView('操作失败稍后重试！');
                }
            });
        } else {
            alertView('请勿重复领取！');
        }
    }, function () {
        noLoginAct()
    });
});

//分享礼包领取
ulink.$("#rawardBtn").on('click', function () {
    LoginManager.checkLogin(function (userInfo) {
        if (actOption.rawardStatus) {
            ulink.http.get({
                url: actOption.appUrl + '/index.php',
                isShowLoading: true,
                params: {
                    route: 'raward/lottery',
                    game: actOption.game,
                    iActId: actOption.iActId,
                    platId: actOption.platId,
                    area: actOption.area
                },
                success: function (data) {
                    var iRet = data.iRet;
                    if (iRet == 0) {
                        actOption.rawardStatus = false;
                        alertView(data.sMsg);
                    } else {
                        alertView(data.sMsg);
                    }
                },
                error: function () {
                    alertView('操作失败稍后重试！');
                }
            });
        } else {
            alertView('请勿重复领取！');
        }
    }, function () {
        noLoginAct()
    });

});

LoginManager.checkLogin(function (userInfo) {
    showUserInfo(userInfo)
}, function () {
    noLoginAct()
});

function getPlatId() {
    var os = ulink.detect().os;
    if (os.ios === true) {
        return 0;
    } else if (os.android === true) {
        return 1;
    }
    return '';
}

function noLoginAct() {
    if (ulink.isQQApp()) {
        LoginManager.login()
    } else if (ulink.isWxApp()) {
        LoginManager.loginByWx()
    } else {
        pop("#pop_login");
    }
}

function loginByQQ() {
    actOption.area = 2;
    LoginManager.login()
}

function loginByWx() {
    actOption.area = 1;
    LoginManager.loginByWx()
}

/**
 * 显示登录数据
 */
function showUserInfo(userInfo) {
    if (userInfo && userInfo.nickName && ulink.$('#userName').length > 0) {
        ulink.$('#userName').text(userInfo.nickName)
    }
    //createRoleSelectorAjax();
}

function alertView(textinfo) {
    ulink.$('#pop').find('.pop_txt').text(textinfo);
    pop('#pop')
}

/**
 * 提交分享记录数据
 */
function addShareLogAjax() {
    if (actOption.shareLogStatus) {
        ulink.http.get({
            url: actOption.appUrl + '/index.php',
            isShowLoading: true,
            params: {route: 'share/add', game: actOption.game, iActId: actOption.iActId, platId: actOption.platId},
            success: function (data) {
                var iRet = data.iRet;
                if (iRet == 0) {
                    actOption.shareLogStatus = false;
                } else {
                    alertView(data.sMsg);
                }
            },
            error: function () {
                alertView('操作失败稍后重试！');
            }
        });
    }
}

function qqH5Ark() {
    if (actOption.qqapiStatus) {
        mqq.invoke("QQApi", "shareArkMessage", {
            "appName": "com.tencent.gamecenter.gameshare",  // appName是固定的
            "appView": "noDataView",    // appView 目前支持两种，dataView和noDataView，具体后面有说明
            "metaData": JSON.stringify({
                "shareData": {
                    "appid": "100692648",
                    "type": "image",
                    "url": "https%3a%2f%2fpao.qq.com%2fact%2f1075%2f78f2a26bd6531b4a%2fimage%2fark.jpg",
                    "width": 601,
                    "height": 330,
                    "jumpUrl": "https%3a%2f%2fpao.qq.com%2fact%2f1075%2f78f2a26bd6531b4a%2fshare.html",
                    "scene": "1234",
                    "buttons": [{
                        "text": "更多精彩",
                        "url": "https%3a%2f%2fm.gamecenter.qq.com%2fdirectout%2fsearch_gift%2f100692648%3f_wv%3d1031%26appId%3d100692648%26appType%3d1%26asyncMode%3d3%26ADTAG%3dshare"
                    }]
                }
            }),
            "callback": mqq.callback(function (result) {
                if (result.result == 0) {
                    addShareLogAjax();
                }
            })
        })
    } else {
        pop('#share_tips');
        ulink.share.show();
    }
}