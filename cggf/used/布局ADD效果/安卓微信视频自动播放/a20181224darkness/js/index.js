//预加载
var rateNum = document.querySelector('.preload_percent span'),
imgPath = "ossweb-img/",
sourceArr = ['sp.png','load_bg.jpg','ad_pic.jpg','ad_pic1.jpg','ad_pic2.jpg','bg.jpg','bg1.jpg','bg2.jpg','bg3.jpg','bg4.jpg','bg5.jpg','bg6.jpg','cz_pic1.png','cz_pic2.png','cz_pic3.png','cz_pic4.png','cz_pic5.png','cz_pic6.png','cz_pic7.png','cz_pic8.png','cz_pic9.png','cz_pic10.png','dj1.png','dj2.png','dj3.png','dj4.png','dj5.png','dj6.png','dj7.png','dj8.png','dj9.png','dj10.png','dj11.png','guajian.png','map_bg.png','map_bg1.png','map_bg2.png','map_bg3.png','map_bg4.png','map_bg5.png','map_bg6.png','map_bg7.png','map_bg8.png','map_bg9.png','map_bg10.png','peo_tip1.png','peo_tip2.png','peo_tip3.png','peo_tip4.png','peo_tip5.png','pop_bg.png','pr2_pic1.jpg','pr2_pic2.jpg','pr2_pic3.jpg','pr3_gif.gif','pr3_gifbg.png','slo_sp.png','sz_pic.png','video_pic1.jpg','bn/bn1.png','bn/bn2.png','bn/bn3.png','bn/bn4.png','bn/bn5.png','bn/bn6.png','bn/bn7.png','bn/bn8.png','bn/bn9.png','bn/bn10.png','bn/bn11.png','bn/bn12.png','sy/sy1.jpg','sy/sy2.jpg','sy/sy3.jpg','sy/sy4.jpg','sy/sy5.jpg','sy/sy6.jpg','sy/sy7.jpg','sy/sy8.jpg','sy/sy9.jpg','sy/sy10.jpg','sy/sy11.jpg','sy/sy12.jpg','gjs/gjs1.png','gjs/gjs2.png','gjs/gjs3.png','gjs/gjs4.png','gjs/gjs5.png','gjs/gjs6.png','gjs/gjs7.png','gjs/gjs8.png','gjs/gjs9.png','gjs/gjs10.png','gjs/gjs11.png','gjs/gjs12.png','nw/nw1.png','nw/nw2.png','nw/nw2.png','nw/nw4.png','nw/nw5.png','nw/nw6.png','nw/nw7.png','nw/nw8.png','nw/nw9.png','nw/nw10.png','nw/nw11.png','nw/nw12.png','sqs/sqs1.png','sqs/sqs2.png','sqs/sqs3.png','sqs/sqs4.png','sqs/sqs5.png','sqs/sqs6.png','sqs/sqs7.png','sqs/sqs8.png','sqs/sqs9.png','sqs/sqs10.png','sqs/sqs11.png','sqs/sqs12.png','sr/sr1.png','sr/sr2.png','sr/sr3.png','sr/sr4.png','sr/sr5.png','sr/sr6.png','sr/sr7.png','sr/sr8.png','sr/sr9.png','sr/sr10.png','sr/sr11.png','sr/sr12.png'];
for (var i = 0; i < sourceArr.length; i++) {
    sourceArr[i] = imgPath + sourceArr[i] ;
};
var loadImage = function(path, callback) {
    var img = new Image();
    img.onload = function() {
        img.onload = null;
        callback(path);
    }
    img.src = path;
}
var imgLoader = function(imgs, callback) {
    var len = imgs.length,
        i = 0;
    while (imgs.length) {
        loadImage(imgs.shift(), function(path) {
            callback(path, ++i, len);
        });
    }
}
imgLoader(sourceArr, function(path, curNum, total) {
    var percent = curNum / total
    rateNum.innerHTML = Math.floor(percent * 100);
    if (percent == 1) {
        setTimeout(showPage, 500);
    }
});
var showPage = function() {
	$('.preload').addClass("pageload-complete")
	document.querySelector('.preload_ct').style.display = 'block';
	document.querySelector('.preload_ct').style.opacity = '1';
}
//序列帧（首屏）
for(i=1;i<=12;i++){
	(function (oNewImg1){
		var oImg1=new Image();
		oImg1.onload=function (){
			oNewImg1.src=this.src;
		};
		oImg1.src='ossweb-img/sy/sy'+i+'.jpg';
		oNewImg1.style.display='none';
		document.getElementById('fm_img').appendChild(oNewImg1);
	})
	(document.createElement('img'));
}
/*动画*/
//var  timer1;
//function abc1(a,b,c){
//	clearInterval(timer1);
//	var i=c,aImg1=$('#fm_img img');
//	timer1=setInterval(function(){
//		if(i<a){
//			$('#fm_img img').css('display','none');
//			$('#fm_img img').eq(i).css('display','block')
//			i++;
//		}else{
//			i=b;
//		}
//	},80)
//}	
//var bool1=false;
//var bule1=true;
//clearInterval(timer1);
//abc1(12,0,0);



//判断手机是流量还是WIFI
var connection = navigator.connection||navigator.mozConnection||navigator.webkitConnection||{tyep:'unknown'};
var type_text = ['unknown','ethernet','wifi','2g','3g','4g','none'];
console.log(connection.type)
if(connection.type == "wifi"){
	$(function () {
	    var u = navigator.userAgent, app = navigator.appVersion;
	    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
	    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	    if (isAndroid) {
	       //这个是安卓操作系统
			$("#myvideo")[0].pause();
			$('.fm_img').css({"display":"none"})
			$(".index_vb").css({"display":"none"})
			$("#myvideo")[0].play();
			$("body").click(function(){
				$("#myvideo")[0].play();
			})
		}
	    if (isIOS) {
	　　　　//这个是ios操作系统
			$("#myvideo")[0].pause();
			$(".index_vb").click(function(){
				$('.fm_img').css({"display":"none"})
				$(".index_vb").css({"display":"none"})
				$("#myvideo")[0].play();
			})
		}
	});

}else{
	$('.fm_img').css({"display":"block"})
	$(function () {
	    var u = navigator.userAgent, app = navigator.appVersion;
	    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
	    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	    if (isAndroid) {
	       //这个是安卓操作系统
			$("#myvideo")[0].pause();
			$(".index_vb").click(function(){
				$('.fm_img').css({"display":"none"})
				$(".index_vb").css({"display":"none"})
				$("#myvideo")[0].play();
			})
	    }
	    if (isIOS) {
	　　　　//这个是ios操作系统
			$("#myvideo")[0].pause();
			$(".index_vb").click(function(){
				$('.fm_img').css({"display":"none"})
				$(".index_vb").css({"display":"none"})
				$("#myvideo")[0].play();
			})
		}
	});
}
//切屏
var swiperV = new Swiper('.swiper-container-v', {
  direction: 'vertical',
//	initialSlide :2,  //开始显示第4屏
  pagination: {
    el: '.swiper-pagination-v',
    clickable: true
  },
  on: {
    slideChangeTransitionEnd: function(){
    	if(this.activeIndex>0){
    		$('.guajian').css({"display":"block"})
    	}else{
    		$('.guajian').css({"display":"none"})
    	}
    },
  }
});
//alert(swiperV.activeIndex);

//弹窗+视频
function gE(e) {
	return document.querySelector(e)
};
function pop(e) {
	if (!gE('#popmask')) {
		gE(e).style.display = "block";
	 	showpop(e);
		hidePop(e);
	};
};
function showpop(e){
	var popH = gE(e).offsetHeight,
			popW = gE(e).offsetWidth;
	gE(e).style.cssText = "position:fixed;left:50%;display:block;top:50%;z-index:18;" + "margin-left:-" + popW / 2 + "px;" + "margin-top:-" + popH / 2 + "px;"
	var bgObj = document.createElement("div");
	bgObj.setAttribute('id', 'popmask');
	document.body.appendChild(bgObj);
	var conH = document.body.scrollHeight,
	viewH = document.documentElement.clientHeight;
	if (conH > viewH) {
		gE('#popmask').style.height = conH + "px";
	} else {
		gE('#popmask').style.height = viewH + "px";
	}
	
};
function hidePop(e) {
	gE('#popmask').addEventListener('click', function () {
		hidePopOk(e)
	});
};
function hidePopOk(e) {
	gE(e).style.display = "none";
	var bgObj = gE("#popmask");
	document.body.removeChild(bgObj);
};
function popVideo(e,vid) {
	pop(e);
	var video = new tvp.VideoInfo();
    video.setVid(vid);
    var player = new tvp.Player();
    var videoURL = '';
    player.create({
        video: video,
        modId: 'videoPlayer',
        width: "100%",
        height: "100%",
        onfullscreen: function (f) { if (!f) $("#videoPlayer", ".video_close").hide() },
        autoplay: true,
        isHtml5UseAirPlay: true,
        isHtml5UseFakeFullScreen: true
    });
};
//关闭视频
function closeVideo(){
	hidePopOk('.vd_box');
	$('.video_player').html('');
	return false;
};	