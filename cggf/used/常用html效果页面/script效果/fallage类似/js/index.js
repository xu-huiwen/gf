//广告轮播
$(function(){
	$('#slides').slides({
		generatePagination: false,
		play: 3000,
		pause: 1500,
		effect: 'slide',
		hoverPause: true
	});
});
//游戏资讯
$(".info-nav a").each(function(f){
	$(this).mouseover(function(){
		$(this).addClass("of").siblings().removeClass("of");
		$(".info-list").hide();
		$(".info-list").eq(f).show();
	})
})

//上下滑动
$(function() {
	$('a[href*=#],area[href*=#]').click(function() {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var $target = $(this.hash);
			$target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
			if ($target.length) {
				var targetOffset = $target.offset().top;
				$('html,body').stop(true,false).animate({
						scrollTop: targetOffset
					},
					500);
				return false;
			}
		}
	});
})
//导航响应
$(window).bind("scroll",function(){
	var ScrTop=$(document).scrollTop();
	$(".mx").each(function(b){
		if(ScrTop>=$(".mx").eq(b).offset().top){
			$(".banner a").eq(b).addClass("ob"+(b+1)).siblings().removeClass("ob1 ob2 ob3 ob4 ob5");
		}
	});	
	if(ScrTop>$(".wrap1").offset().top+$(window).height()*0.5){
		$(".word1").addClass("bounceInLeft").css("opacity",1);
	}else{
		$(".word1").removeClass("bounceInLeft").css("opacity",0);
	}
	if(ScrTop>$(".wrap2").offset().top+$(window).height()*0.5){
		$(".word2").addClass("bounceInRight").css("opacity",1);
	}else{
		$(".word2").removeClass("bounceInRight").css("opacity",0);
	}
})
//导航hover效果
$(".nav a").each(function(){
	$(this).hover(function(){
		$(this).addClass("on");
	},function(){
		$(this).removeClass("on");
	})
})
//视频
 var video = new tvp.VideoInfo();
    video.setVid("q0011iyvdam");//视频vid
    var player = new tvp.Player(800, 500);//视频高宽
    player.setCurVideo(video);
    player.addParam("autoplay","1");//是否自动播放，1为自动播放，0为不自动播放
	player.addParam("wmode","opaque");
    player.addParam("pic","http://ossweb-img.qq.com/images/roco/act/a20120925movie/video_pic.jpg");//默认图片地址
    player.addParam("flashskin", "http://imgcache.qq.com/minivideo_v1/vd/res/skins/TencentPlayerMiniSkin.swf");//是否调用精简皮肤，不使用则删掉此行代码
    player.write("videoCon");

//手风琴
$(function($) {
	var a_width = 212; //a标签的宽度
	var ct_width = 458; //内容的宽度
	var nums = 5; //a标签的个数
	$(".sfq-box li").each(function(index) {
		$(this).click(function() {
			showEvt(index);
		})
	});
	var cur = 0;

	function showEvt(n) {
		if (cur == n) return false;
		cur = n;
		$(".sfq-box li").removeClass('active');
		$(".sfq-box li").eq(n).addClass('active');
		if (1 <= n <= nums - 1) {
			setTimeout(function() {
				$(".evtCon").css('left', (n + 1) * a_width + 'px');
			}, 400);
		}
		$(".evt").fadeOut(200);
		$(".evt").eq(n).delay(500).fadeIn(200);
		$(".sfq-box li").find('a').each(function(index) {
			if (index <= n) {
				$(this).animate({
					left: index * a_width + "px"
				}, 300)
			} else {
				$(this).animate({
					left: (index) * a_width + ct_width + "px"
				}, 300)
			}
		});
	}
});
//隐藏横向滚动条
$("body,html").css("overflow-x","hidden")




