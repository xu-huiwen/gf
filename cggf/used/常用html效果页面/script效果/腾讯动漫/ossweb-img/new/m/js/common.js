var winh=$(window).height(),
	winw=$(window).width(),
	scale=0,
	winw2=0,
	winh2=0,
	screenRo=false,
	m_bool = true,
	current_f = 0,
	sourcelinks='http://game.gtimg.cn/images/game/act/a20160415xmjtest/new/img/',
	// sourcelinks='../ossweb-img/new/m/ossweb-img/',
	sourceArr = [
		'bg.jpg',
		'bg_bottom.png',
		'bg_top.png',
		'bg_xmj.png',
		'cj_bottom.png',
		'cj_top.png',
		'sp.png',
		'dm_tm.png',
		'logo.png',
		'updown.png',
		'hz_tx.png',
		'hz_logo.png',
		'hz_ewm.jpg',
		'hz_video.jpg',
		'hz_btns.png',
		'video_a1.jpg',
		'video_a2.jpg',
		'video_a3.jpg',
		'xmj_jiabin1.png',
		'xmj_jiabin2.png',
		'xmj_jiabin3.png',
		'tm_bg1.png',
		'tm_bg2.png',
		'tm_bg3.png',
		'dm_bg1.png',
		'dm_bg2.png',
		'dm_bg3.png',
		'sy_1.png',
		'sy_2.png',
		'sy_3.png',
		'sy_show1.jpg',
		'sy_show2.jpg',
		'sy_show3.jpg',
		'qe.png'
	],
	current=0,
	play = null,
	page_len=$('.wrap_ul').find('.wrap_li').length,
	object_a=null,
	timer_b = null;

for(var o = 1;o<19;o++){
	sourceArr.push('zw_'+o+'.jpg');
}
for(var p = 1;p<15;p++){
	sourceArr.push('g_'+p+'.jpg');
}

var zw_Arr = [//// Gallary 数据
	['D7','烈火酱(左) 西瓜_DUN(右)','北京赛区','长生诀'],
	['夜莺 Dynasty','康康、小幽、福子、小白、小支、智熙、雷雷','北京赛区','ヒビカセ'],
	['照月鱼 木之舟','照月鱼、木之舟','成都赛区','原创编舞some like it hot(武士之魂)'],
	['666骰子战队','漫漫、baby、客北、小妖、节子、玲玲、R、诗小轩','成都赛区','Burning'],
	['もう団_毛团','毛团','广州赛区','queen of heart_红心皇后'],
	['百鬼PROJECT','螺、Noise_汰、暴徒、東','广州分赛区','jelLy（GUMIオリジナル曲，编舞以lockin元素为主）'],
	['亦以','亦以','郑州赛区','爱YOU READY 爱我READY'],
	['feeler触角','猫咪、壹、千代、吉尔、韭菜','河南郑州','刀剑春秋'],
	['奉天城马卡龙','金金、黏糕','辽宁赛区','[MARiA 217 Miume]四作集锦：<br/>Girls之舞+Lamb+Pink Cat+极乐净土【Perfume】OPENING ACT MTV VMAJ'],
	['β\'s Bingo！','锦歌、澄川、米迦萝、小点、院长、白咲、洛小亚、哈哈、简','辽宁省沈阳市工业展览馆','①仆らのLIVE 君とのLIFE ②仆らは今のなかで③それは仆たちの奇迹④START:DASH!!'],
	['沁月','沁月','南京赛区','三月雨'],
	['ZERO','ZERO','南京赛区','欺诈小丑'],
	['FairyDance','夜染、大花、渣熊、山楂、贞子','厦门赛区','骸骨乐团与莉莉娅'],
	['E.X','楔子、贰太','山东赛区','【D】'],
	['Twinkle宅舞联萌','果砸、九崖、有狐、苜蓿、莴苣、银蝶、鲈鱼、世奈、小灯','山东省济南市','《No brand girls》'],
	['π2','北斗、木句','上海赛区','《伤林果》/二次原创振幅的和风宅舞'],
	['ArsMania.','伊藤柒葉、奶油、啊C、珞炎、芜莓','上海赛区','+♂'],
	['斑马宅舞联盟','蛋挞','武汉赛区','活动小丑（原创振幅）'],
	['LL小分队','xiaomin、YUI、喵喵、木匠、穆落落、七七、青喵、汐樱、小斗','武汉赛区','Sunny day song']
];
var vids = [
	['r0330p0ylb4','w0305bia58c'],//主题曲vid
	['http://ac.qq.com/Comic/comicInfo/id/544148','http://ac.qq.com/Comic/comicInfo/id/543780','http://ac.qq.com/Comic/ComicInfo/id/543883'],
	['o0020gvegnv','b0020n3l3es','l0020e0x3wv'],//动漫vid
	[//宅舞选手展示vid
		'i0328y9x6mo','z03294y7n7b','o0328frt9v8','g0328gj6ndb','c032835z0go',
		'l0328zfiyog','u0329xvabua','w0328yt9u6j','e0329ippb9j','j0329m115d1',
		'e03283rqu97','o03303x5gwy','u0331re35br','i0328e12anz','z0329saq4zf',
		'e0329oq97qm','s03285mmwtd','q0328g4w2o4','i0330e5228e'
	],
	['w03301qqxgq']//合作vid

];
// 新闻数据
var newsList = [
	['【腾讯动漫星漫奖|以声之名】天涯相聚总有时，自此宏图未可知','http://comic.qq.com/a/20160725/039497.htm'],
	['星漫奖宅舞大赛将亮相郑州青少年动漫游戏文化节','http://comic.qq.com/a/20160721/052409.htm'],
	['2016星漫奖声优大赛三强名单出炉','http://comic.qq.com/a/20160721/030560.htm'],
	['星漫奖声优大赛总决赛在即 探秘学员们的训练日常','http://comic.qq.com/a/20160719/042966.htm'],
	['【好声音角逐】7月20日星漫奖声优大赛总决赛 三大平台同步直播','http://comic.qq.com/a/20160719/041852.htm'],
	['腾讯动漫携星漫奖热血进入！沈阳ACG期待您的到来','http://comic.qq.com/a/20160715/043673.htm'],
	['【星漫奖声优大赛】 珍惜人生的每一个机遇','http://comic.qq.com/a/20160715/035769.htm'],
	['向心的声音——星漫奖声优大赛决赛选手进驻音熊联萌训练营','http://comic.qq.com/a/20160713/040561.htm'],
	['一大波精彩内容来袭，Melochin空降CCG 任腾讯动漫“星漫奖”魔都分赛区评委','http://comic.qq.com/a/20160628/024066.htm'],
	['腾讯动漫占卜屋+星漫奖宅舞大赛+声优亮相，这个CCG料好足','http://comic.qq.com/a/20160624/054749.htm'],
	['【星漫奖x配音秀】盲选声音の怪物，为美好的声音转身','http://comic.qq.com/a/20160613/043350.htm'],
	['【宅舞】伴随星漫奖主题曲摇曳你的裙摆吧！','http://comic.qq.com/a/20160608/048167.htm'],
	['腾讯动漫星漫奖宅舞大赛强力助阵2016FUN成都游戏动漫节','http://comic.qq.com/a/20160531/046240.htm'],
	['听说隔壁老王都当声优了，你咋还不上呢？！','http://comic.qq.com/a/20160517/068558.htm'],
	['啊哈娱乐助力星漫奖 挖掘“跨次元”动漫人才！','http://comic.qq.com/a/20160429/038930.htm'],
	['“星漫奖 X 星舞银河” 宅舞的小船变成巨轮','http://comic.qq.com/a/20160420/040667.htm']
];
for(var i=0,j=sourceArr.length;i<j;i++){
	sourceArr[i]=sourcelinks+sourceArr[i];
}
// sourceArr.push('music/bg.mp3');
/*监听页面是否为竖屏*/
page();

//放缩
function scaleScreen(){
	if(winw<winh){
		scale=winw/640*20;
		$('html').css('font-size',scale+'px');
		$('.wrap_li').css('height',winh+'px');
	}
}


// playVideo();
function playVideo(vid){
	var video = new tvp.VideoInfo();
    video.setVid(vid);
    var player = new tvp.Player();
    player.create({
        width: '100%',
        height: '100%',
        video: video,
        modId: "video",
        autoplay: true   //是否自动播放
    });

}
/*图片预加载*/
object_a=new mo.Loader(sourceArr,{
	loadType : 1,
	minTime : 10,
	onLoading : function(count,total){
		var n=parseInt(Math.floor(count/total*100));
		$('.scarollbar').css('width',0.26*n+'rem');
		$('.scarollbar').html(n+'%');
		$('.loading_peop').css('left',-0.5+0.245*n+'rem');
	},
	onComplete : function(time){
		timer_b=setTimeout(showPage, 800);
	}
});

var showPage=function(){
	object_a=null;
	clearTimeout(timer_b);
	timer_b=null;
	$('.loading_animate').removeClass('round');
	$('.loading').css('display','none');
	$('.wrap_box').css('display','block');
	$('.wrap_ul').find('.wrap_li').eq(0).addClass('play');
};

/*音乐*/
// function m_pause(){
// 	if(m_bool){
// 		$('#music_bg')[0].play();
// 		$('.music_bg').removeClass('off');
// 		m_bool = false;
// 	}else{
// 		$('#music_bg')[0].pause();
// 		$('.music_bg').addClass('off');
// 		m_bool = true;
// 	}
// }


// 框架动画
$('.wrap_ul').on('swipeUp',function(){
	current++;
	if(current>=page_len){
		current=page_len-1;
	}
	pageMove(current);
});
$('.wrap_ul').on('swipeDown',function(){
	current--;
	if(current<=-1){
		current=0;
	}
	pageMove(current);
});
$('.up_down').on('tap',function(){
	current++;
	if(current>=page_len){
		current=page_len-1;
	}
	pageMove(current);
});
function pageMove(is){
	clearTimeout(play);
	if(is==0){
		$('.up_down').css('display','block');
	}else{
		$('.up_down').css('display','none');
	}

	$('.wrap_ul').css({
		'-webkit-transform':'translate(0,'+(-current*winh)+'px)',
		'transform':'translate(0,'+(-current*winh)+'px)'
	});
	play = setTimeout(function(){
		$('.wrap_ul').find('.wrap_li').eq(is).addClass('play').siblings().removeClass('play');
	},800);
}
function page(){
	if(winw>winh){
		$('#mask_tips').css({
        	'display':'block',
        	'line-height':winh+'px'
        });
		screenRo=true;
	}else{
		$('#mask_tips').css({
        	'display':'none'
        });
        scaleScreen();
	}
}
$(window).resize(function(){
		winh2=$(window).height();
		winw2=$(window).width();
	    if(winw2<=winh2&&screenRo){//刚开始是横屏,转为竖屏
	        $('#mask_tips').css({
	            'display':'none'
	        });
	        // winh=winh2;
	        // winw=winw2;
	        // scaleScreen();
	        window.location.reload();
	    }else if(winw2>=winh2&&screenRo){//刚开始是横屏,转为竖屏,再转为横屏
	        $('#mask_tips').css({
	            'display':'block',
	            'line-height':winh2+'px'
	        });
	    }else if(winw2>=winh&&screenRo==false){//刚开始是竖屏,转为横屏
	        $('#mask_tips').css({
	            'display':'block',
	            'line-height':winh2+'px'
	        });
	    }else if(winw2>=winw&&screenRo==false){//刚开始是竖屏,转为横屏,再转为竖屏
	        $('#mask_tips').css({
	            'display':'none'
	        });
	    }
});

$('.share_tips').on('touchend',function(){
	$(this).css('display','none');
});
$('body,html').eq(0).on('touchmove',function(e){
	e.preventDefault();
});


// 宅舞弹窗
$('.zw_ul').find('li').each(function(index){
	$(this).click(function(){
		var len = $('.zw_ul').find('li').length;
		zw_bool = true;
		zw_n = index;
		if(index == len){
			return;
		}
		$('.pop_show_pic').attr('src','http://game.gtimg.cn/images/game/act/a20160415xmjtest/new/m/ossweb-img/zw_big_'+(index+1)+'.jpg');
		$('.pop_tit').find('em').html(zw_Arr[index][0]);
		$('.pop_infor').find('li').eq(0).find('em').html(zw_Arr[index][1]);
		$('.pop_infor').find('li').eq(1).find('em').html(zw_Arr[index][2]);
		$('.pop_infor').find('li').eq(2).find('em').html(zw_Arr[index][3]);
		$('.pop_tips').attr('src','http://game.gtimg.cn/images/game/act/a20160415xmjtest/new/m/ossweb-img/zw_t'+(index+1)+'.png');
		$('.pop_video').attr('src','http://game.gtimg.cn/images/game/act/a20160415xmjtest/new/m/ossweb-img/zw_v'+(index+1)+'.jpg');
		showZw('zw_show');
		$('.pop_video').on('tap',function(){
			playVideo(vids[3][index]);
			showZw('video_pop');
		});
	});
});
function getH(id){
	$('#'+id).css('display','block');
	var H = $('#'+id).height()+parseInt($('#'+id).css('border-top-width'))+parseInt($('#'+id).css('border-bottom-width'))+parseInt($('#'+id).css('padding-top'))+parseInt($('#'+id).css('padding-bottom'));
	return H;
}
function showZw(id){
	if(id == 'video_pop'){
		$('.vmask').css('display','block');
		$('#'+id).css({
			'left':0,
			'top':(winh-getH(id))/2+'px'
		});
	}else if(id == 'flash_cj'){
		$('.mask').css('display','block');
		$('#'+id).css({
			'left':'0.8rem',
			'top':(winh-getH(id))/2+'px'
		});
	}else if(id == 'prise_input'){
		$('.mask').css('display','block');
		$('#'+id).css({
			'left':'0.8rem',
			'top':(winh-getH(id))/2+'px'
		});
	}else{
		$('.mask').css('display','block');
		$('#'+id).css({
			'left':'1rem',
			'top':(winh-getH(id))/2+'px'
		});
	}

}

function hideZw(id){
	$('#'+id).css('left','-999rem');
	if(id == 'video_pop'){
		$('#'+id).find('div').html('');
		$('.vmask').css('display','none');
	}else{
		$('.mask').css('display','none');
	}
}
// Gallary
function getHtml(){
	var str = '';
	var strli = '';
	var Gallary_len = 48;//总共的图片数量
	var Gallary_w = 17.6*scale;//移动一屏的宽度
	var Gallary_num = 20;//每一屏显示的数量
	var Gallary_n = Math.ceil(Gallary_len/20);//移动的次数
	var Gallary_current = 0;
	var cal_Gall = 0;
	$('.Gallary_ulbox').css('width',Gallary_n*Gallary_w+'px');

	for(var j = 0;j < Gallary_n;j++){
		cal_Gall = Gallary_len-Gallary_num*j;
		if(cal_Gall>=Gallary_num){
			strli='';
			for(var i = 0;i < 20;i++){
				strli+='<li><img src="http://game.gtimg.cn/images/game/act/a20160415xmjtest/new/img/g_'+(20*j+i+1)+'.jpg" alt="Gallary"><em class="mask"></em></li>';
			}
		}else{
			strli='';
			for(var i = 0;i < Gallary_len-j*20;i++){
				strli+='<li><img src="http://game.gtimg.cn/images/game/act/a20160415xmjtest/new/img/g_'+(20*j+i+1)+'.jpg" alt="Gallary"><em></em></li>';
			}
		}

		str+='<ul class="Gallary_ul">'+strli+'</ul>';
	}
	$('.Gallary_ulbox').html(str);
	$('.Gallary_prev').on('touchend',function(){
		sub();
	});
	$('.Gallary_next').on('touchend',function(){
		add();
	});
	$('.Gallary_ulbox').find('li').each(function(index){
		$(this).click(function(){
			$('.Gallary_pic').attr('src','http://game.gtimg.cn/images/game/act/a20160415xmjtest/new/img/g_big_'+(index+1)+'.jpg');
			showZw('Gallary_pop');
		});
	});
	$('.Gallary_ulbox').on('swipeLeft',function(){
		add();
	});
	$('.Gallary_ulbox').on('swipeRight',function(){
		sub();
	});

	function add(){
		Gallary_current++;
		if(Gallary_current >= Gallary_n){
			Gallary_current = Gallary_n-1;
		}
		GallaryMove(Gallary_current);
	}
	function sub(){
		Gallary_current--;
		if(Gallary_current <= -1){
			Gallary_current = 0
		}
		GallaryMove(Gallary_current);
	}

	function GallaryMove(is){
		$('.Gallary_ulbox').css({
			'-webkit-transform':'translate('+(-Gallary_w*is)+'px,0)',
			'transform':'translate('+(-Gallary_w*is)+'px,0)'
		});
	}
}
// 新闻列表
function getNews(){
	var str = '';
	var option = '';
	var news_nums = 13;//每一屏最多放的条数
	var news_len = newsList.length;//新闻数据的长度
	var news_n = Math.ceil(news_len/news_nums);//屏数
	var news_screen_n = 0;//初始化当前屏的条数
	var news_current = 0;//当前第几屏
	for(var i = 0;i<news_n;i++){

		option+='<option value="'+(i+1)+'">'+(i+1)+'</option>';
	}
	$('#newsSelect').html(option);
	writeNews(news_current);
	$('.ul_list_c').find('a').eq(0).click(function(){
		news_current = 0;
		writeNews(news_current);
	});
	$('.ul_list_c').find('a').eq(1).click(function(){
		news_current--;
		if(news_current<=-1){
			news_current = 0;
		}
		writeNews(news_current);
	});
	$('.ul_list_c').find('a').eq(2).click(function(){
		news_current++;
		if(news_current>=news_n){
			news_current = news_n-1;
		}
		writeNews(news_current);
	});
	$('.ul_list_c').find('a').eq(3).click(function(){
		news_current = news_n-1;
		writeNews(news_current);
	});
	$('#newsSelect').change(function(){
		news_current = $(this).val()-1;
		writeNews(news_current);
	});

	function writeNews(is){
		news_screen_n = 0;
		$('.news_list').html('');
		str = '';
		document.getElementById("newsSelect").options[is].selected="selected";
		news_screen_n = news_len - is*news_nums;
		if(news_screen_n>=news_nums){
			for(var i = 0;i<news_nums;i++){
				str+='<li><a href="'+newsList[news_nums*is+i][1]+'" target="_blank">'+newsList[news_nums*is+i][0]+'></a></li>'
			}
		}else{
			for(var i = 0;i<news_screen_n;i++){
				str+='<li><a href="'+newsList[news_nums*is+i][1]+'" target="_blank">'+newsList[news_nums*is+i][0]+'></a></li>'
			}
		}
		$('.news_list').html(str);
	}
}

//主题曲视频
$('.js_pagea').each(function(index){
	$(this).on('tap',function(){
		if(index==2){
			alert('敬请期待！');
			return;
		}
		playVideo(vids[0][index]);
		showZw('video_pop');
	});
});
//条漫
$('.tm_ul').find('li').each(function(index){
	$(this).on('tap',function(){
		window.location.href=vids[1][index];
	});
});
//动漫
$('.dm_ul').find('li').each(function(index){
	$(this).on('tap',function(){
		playVideo(vids[2][index]);
		showZw('video_pop');
	});
});
//合作
$('.hz_video').on('tap',function(){
	playVideo(vids[4][0]);
	showZw('video_pop');
});

//嘉宾页面嘉宾特效
function jiabinFun(){
	var jz_w = 27.2*scale;
	var jz_l = $('.xmj_jb_lr').find('img').length;
	var jz_current = 0;//嘉宾展示

	$('.xmj_jb_btnsl').click(function(){
		jz_current--;
		if(jz_current<0){
			jz_current = 0;
		}
		jz_jiabin();

	});
	$('.xmj_jb_btnsr').click(function(){
		jz_current++;
		if(jz_current>=jz_l-1){
			jz_current = jz_l-1;
		}
		jz_jiabin();
	});

	function jz_jiabin(){
		if(jz_current==0||jz_current==jz_l-1){
			if(jz_current==0){
				$('.xmj_jb_btnsl').css('display','none');
			}else{
				$('.xmj_jb_btnsr').css('display','none');
			}
		}else{
			$('.xmj_jb_btnsl').css('display','block');
			$('.xmj_jb_btnsr').css('display','block');
		}
		$('.xmj_jb_lr').animate({
			'left':-jz_current*jz_w
		},1000);
	}
}


function cj(){
		//点击开始抽奖 通知js  flash->js
	function callJsToStart(){
	//测试
		callFlashToRoll(1);
	}
	//开发获得抽奖结果 通知flash开始播放效果 js->flash
	function callFlashToRoll(id){
		//通知转盘转到对应的中奖产品的id （序号从0,1,2.....，0是指针初始指示的位置，沿着顺时针的方向递增）
		if(lottery)lottery.stopRoll(id);
	}
	//3、flash动画完成通知js  flash->js
	function callJsToComplete(){
		alert('恭喜你获得大奖哟！！');
	}
	var lottery = new mo.Lottery({
		'flashUrl' : 'http://ossweb-img.qq.com/images/flash/lottery/circle/lotteyround_2013_v1.swf',
		'r':7,//奖品总数
		'width':20.65*scale,//flash宽度
		'height':20.65*scale,//flash高度
		'flashFirst':false,
		'b':'http://game.gtimg.cn/images/game/act/a20160415xmjtest/new/img/cj_bottom.png',//圆盘的图片 文件格式可以是swf、png、jpg（建议swf 可以压缩）
		's':'http://game.gtimg.cn/images/game/act/a20160415xmjtest/new/img/cj_top.png',//开始抽奖按钮图片
		'bx':0,//圆盘的图片位置x坐标 （转盘的中心点坐标为（0,0））
		'by':0,//圆盘的图片位置y坐标
		'sx':0,//开始抽奖按钮x坐标
		'sy':0,//开始抽奖按钮y坐标
		'contentId' : 'swfcontent',//嵌入swf 的div层的 id
		'onClickRollEvent' : callJsToStart,//对应上面接口
		'onCompleteRollEvent':callJsToComplete //对应上面接口
	});
}

function wbs(){
	$('.wb_pl').css({
		'-webkit-transform-origin':'0 0 0',
		'transform-origin':'0 0 0',
		'-webkit-transform':'scale('+winw/640+')',
		'transform':'scale('+winw/640+')',
	});
}

window.onload = function(){
	getHtml();
	getNews();
	cj();
	wbs();
	jiabinFun()//嘉宾展示
};

if(/bilibili/.test(location.search)){
	$('.btns_a2').hide();
	$('.btns_a1').css({'margin-left':'50%','left':'-7.25rem'});
}

TGMobileShare({
    shareTitle:'2016 腾讯动漫-星漫奖',
    shareDesc:'腾讯动漫-星漫奖-因为你爱',
    shareImgUrl:'http://game.gtimg.cn/images/game/act/a20160415xmjtest/new/m/ossweb-img/share.jpg',
    shareLink:'http://m.ac.qq.com/xmj',
    actName:'null',
    reportTcss:false,
    onInit:function(tgms){

    },
    onShare:{}
});
