// 变量声明
var h = $(window).height();
var w = $(window).width();
var current=0;
var cur_bool=true;
var cur_time=null;
var lens=$('.wrap_ul').find('.wrap_li').length;
var H = h - $('.wrap_top').height()-2;
var tips = null;
var zw_bool = false;
var zw_n = 0;


//视频vid
var vids = [
	['r0330p0ylb4','w0305bia58c'],//主题曲vid
	['o0020gvegnv','b0020n3l3es','l0020e0x3wv'],//动漫vid
	[
		'i0328y9x6mo','z03294y7n7b','o0328frt9v8','g0328gj6ndb','c032835z0go',
		'l0328zfiyog','u0329xvabua','w0328yt9u6j','e0329ippb9j','j0329m115d1',
		'e03283rqu97','o03303x5gwy','u0331re35br','i0328e12anz','z0329saq4zf',
		'e0329oq97qm','s03285mmwtd','q0328g4w2o4','i0330e5228e'
	],
	['w03301qqxgq']

];
$('.wrap_content,.wrap_li').css('height',H+'px');

// Gallary 数据
var zw_Arr = [
	['D7','烈火酱(左) 西瓜_DUN(右)','北京赛区','长生诀'],
	['夜莺 Dynasty','康康、小幽、福子、小白、小支、智熙、雷雷','北京赛区','ヒビカセ'],
	['照月鱼 木之舟','照月鱼、木之舟','成都赛区','原创编舞some like it hot(武士之魂)'],
	['666骰子战队','漫漫、baby、客北、小妖、节子、玲玲、R、诗小轩','成都赛区','Burning'],
	['もう団_毛团','毛团','广州赛区','queen of heart_红心皇后'],
	['百鬼PROJECT','螺、Noise_汰、暴徒、東','广州分赛区','jelLy（GUMIオリジナル曲，编舞以lockin元素为主）'],
	['亦以','亦以','郑州赛区','爱YOU READY 爱我READY'],
	['feeler触角','猫咪、壹、千代、吉尔、韭菜','河南郑州','刀剑春秋'],
	['奉天城马卡龙','金金、黏糕','辽宁赛区','【MARiA 217 Miume】四作集锦：Girls之舞+Lamb+Pink Cat+极乐净土【Perfume】OPENING ACT MTV VMAJ'],
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


var main = {
	init:function() {
		// 滚轮移动
		this.scrollFn()
				.lotteryFn();
		$(window).resize(function(){
			window.location.reload();
		});
	},
	scrollFn:function() {
		$('.wrap_ul').mousewheel(function(event, delta) {
			mouseFun(delta);
		});

		return this;
	},
	lotteryFn:function() {

		$('.btn_yd').on('click',function() {
				// showDia('flash_cj');
		});
		return this;
	}
}

main.init();


// 导航移动
$('.nav_ul_left').find('li').each(function(index){
	$(this).click(function(e){
		var e = e || window.event;
		e.preventDefault();
		current = index+1;
		current = -current;
		movePage(current);
	});
});

//首页按钮动画
function tips_a(){
	tips = setInterval(function(){
		$('.tipsBtn').stop(true).animate({
			'bottom':'30px'
			},400,function(){
					$('.tipsBtn').stop(true).animate({
					'bottom':'20px'
				},400);}
		);
	},800)
}

// 首页flash
function flash(){
	$('.flash').html('<div id="flash"></div>');
	var params = { scale:"noscale", wmode:"transparent",align: "middle",allowFullscreen: "true",allowScriptAccess: "always",base: ''
}
    swfobject.embedSWF("http://game.gtimg.cn/images/game/act/a20160415xmjtest/new/flash/logo.swf", "flash", "100%", "574", "8.0.0","http://ossweb-img.qq.com/images/swf/expressInstall.swf", null, params);
}

// 页面滚轮移动
function mouseFun(a){
	if(cur_bool){
		cur_time=setTimeout(function(){
			clearTimeout(cur_time);
			if(a<0){
			    current--;
			    if(current<=1-lens){
			    	current=1-lens;
			    }
			}else{
				current++;
				if(current>=1){
					current=0;
				}
			}
			movePage(current);

		},300);
		cur_bool = false;
	}
}

//移动函数
function movePage(is){
	$('.nav_ul_left').find('li').eq(-is-1).addClass('on').siblings().removeClass('on');
	$('.wrap_ul').stop(true).animate({
		'top':is*H+'px'
	},600,function(){
		cur_bool = true;
	});
	if(is!=0){
		clearTimeout(tips);
		$('.tipsBtn').css('display','none');
		$('.flash').html('');
		$('.nav_box').stop(true).animate({
			'left':0
		},300);
		if(-is==lens-1){
			$('#footer_ied').animate({'bottom':0},600);
			$('.b_navs').stop(true).animate({
				'right':0,
				'bottom':'240px'
			},300);
		}else{
			var f_H = $('#footer_ied').height();
			$('#footer_ied').animate({'bottom':-f_H+'px'},600);
			$('.b_navs').stop(true).animate({
				'right':0,
				'bottom':0
			},300);
		}
	}else{
		$('.tipsBtn').css('display','block');
		$('.nav_box').stop(true).animate({
			'left':'-220px'
		},300);
		$('.b_navs').stop(true).animate({
			'right':'-146px'
		},300);
		tips_a();
		flash();
	}
}


// 宅舞弹窗
$('.zw_ul').find('li').each(function(index){
	$(this).click(function(){
		var len = $('.zw_ul').find('li').length;
		zw_bool = true;
		zw_n = index;
		if(index == len){
			return;
		}
		$('.zw_box_l').find('img').attr('src','http://game.gtimg.cn/images/game/act/a20160415xmjtest/new/img/zw_big_'+(index+1)+'.jpg');
		$('.show_name').find('em').html(zw_Arr[index][0]);
		$('.show_other').find('li').eq(0).find('span').html(zw_Arr[index][1]);
		$('.show_other').find('li').eq(1).find('span').html(zw_Arr[index][2]);
		$('.show_other').find('li').eq(2).find('span').html(zw_Arr[index][3]);
		$('#zw_tips').attr('src','http://game.gtimg.cn/images/game/act/a20160415xmjtest/new/img/zw_t_'+(index+1)+'.png');
		$('.zw_video').find('img').attr('src','http://game.gtimg.cn/images/game/act/a20160415xmjtest/new/img/zw_v'+(index+1)+'.jpg');
		showZw('zw_pop');
	});
});
// Gallary 弹窗
function autoSize(){
	// Gallary 初始化放缩
	var p_w = $('.zw_box_l').find('img').width();
	var box_w =$('.zw_box_l').width();
	var scale = $('.show_tips').width()/652;
	if(box_w>p_w){
		$('.zw_box_l').css({
			'width':$('.zw_box_l').find('img').width()+'px'
		});
	}else{
		$('.zw_box_l').find('img').css({
			'left':(box_w-p_w)/2+'px'
		});
	}
	$('.show_name').css({
		'font-size':Math.ceil(34*scale)+'px',
		'height':Math.ceil(84*scale)+'px',
		'line-height':Math.ceil(84*scale)+'px'
	});
	$('.show_other').find('em').css({
		'font-size':Math.ceil(22*scale)+'px',
		'line-height':Math.ceil(36*scale)+'px'
	});
	$('.show_other').find('span').css({
		'font-size':Math.ceil(22*scale)+'px',
		'line-height':Math.ceil(36*scale)+'px'
	});
}
// Gallary
function getHtml(){
	var str = '';
	var strli = '';
	var Gallary_len = 48;//总共的图片数量
	var Gallary_w = 965;//移动一屏的宽度
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
				strli+='<li><img src="http://game.gtimg.cn/images/game/act/a20160415xmjtest/new/img/g_'+(20*j+i+1)+'.jpg" alt="Gallary" width="193" height="124"><em class="mask"></em></li>';
			}
		}else{
			strli='';
			for(var i = 0;i < Gallary_len-j*20;i++){
				strli+='<li><img src="http://game.gtimg.cn/images/game/act/a20160415xmjtest/new/img/g_'+(20*j+i+1)+'.jpg" alt="Gallary" width="193" height="124"><em></em></li>';
			}
		}

		str+='<ul class="Gallary_ul c">'+strli+'</ul>';
	}
	$('.Gallary_ulbox').html(str);
	$('.Gallary_prev').click(function(){
		Gallary_current--;
		if(Gallary_current <= -1){
			Gallary_current = 0
		}
		GallaryMove(Gallary_current);
	});
	$('.Gallary_next').click(function(){
		Gallary_current++;
		if(Gallary_current >= Gallary_n){
			Gallary_current = Gallary_n-1;
		}
		GallaryMove(Gallary_current);
	});
	$('.Gallary_ulbox').find('li').each(function(index){
		$(this).hover(
			function(){
				$(this).find('em').css('display','none');
			},
			function(){
				$(this).find('em').css('display','block');
			}
		);
		$(this).click(function(){
			$('#Gallary_img').attr('src','http://game.gtimg.cn/images/game/act/a20160415xmjtest/new/img/g_big_'+(index+1)+'.jpg');
			showDia('Gallary_pop');
		});
	});
	function GallaryMove(is){
		$('.Gallary_ulbox').stop(true).animate({
			'left':-Gallary_w*is+'px'
		},500);
	}
}

// 新闻列表
function getNews(){
	var str = '';
	var news_nums = 11;//每一屏最多放的条数
	var news_len = newsList.length;//新闻数据的长度
	var news_n = Math.ceil(news_len/news_nums);//屏数
	var news_screen_n = 0;//初始化当前屏的条数
	var news_current = 0;//当前第几屏
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
				str+='<li><a href="'+newsList[news_nums*is+i][1]+'" target="_blank">'+newsList[news_nums*is+i][0]+' target="_blank"></a></li>'
			}
		}
		$('.news_list').html(str);
	}
}

function playVideo(vid){
	var video = new tvp.VideoInfo();
    video.setVid(vid);
    var player = new tvp.Player();
    player.create({
        width: 800,
        height: 450,
        video: video,
        modId: "video_id",
        vodFlashSkin: "http://imgcache.qq.com/minivideo_v1/vd/res/skins/TencentPlayerMiniSkin.swf",  //精简皮肤
        autoplay: true   //是否自动播放
    });
}
// 弹窗
function showDia(id){
    showDialog.show({
        id:id,      //需要弹出的id，如果是弹出页面上的div，则该选项为必选
        bgcolor:"#000000",//弹出“遮罩”的颜色，格式为"#FF6600"，可选，默认为"#fff"
        opacity:50     //弹出“遮罩”的透明度，格式为｛10-100｝，可选
    });
}
function showZw(id){
	$('#'+id).css('left',0);
}

function hideZw(id){
	$('#'+id).css('left','-999em');
}
// 视频弹窗
function playData(is,index){
	showDia('video_pop');
	playVideo(vids[is][index]);
	zw_bool = false;
}
$('.video_ula').find('li').each(function(index){
	$(this).click(function(){
		if(index==($('.video_ula').find('li').length-1)){
			alert('敬请期待!');
		}else{
			playData(0,index);
		}

	});
});
$('.dm_ulb').find('li').each(function(index){
	$(this).click(function(){
		playData(1,index);
	});
});
$('.zw_video').click(function(){
	if(zw_bool){
		playData(2,zw_n);
	}
});
$('.videoClose').click(function(){
	$('#video_id').html('');
});
$('.video_js').click(function(){
	playData(3,0);
});
//导航
$('.nav_ul').find('a').each(function(index){
	$(this).hover(
		function(){
			if(index==1){
				$('.nav_lia').css('display','block');
			}else if(index==2){
				$('.nav_lib').css('display','block');
			}
		},
		function(){
			$('.nav_lia').css('display','none');
			$('.nav_lib').css('display','none');
		}
	);
});
$('.nav_lia').hover(
	function(){
		$('.nav_ul').find('li').eq(1).addClass('on');
		$('.nav_lia').css('display','block');
	},
	function(){
		$('.nav_ul').find('li').eq(1).removeClass('on');
		$('.nav_lia').css('display','none');
	}
);
$('.nav_lib').hover(
	function(){
		$('.nav_ul').find('li').eq(2).addClass('on');
		$('.nav_lib').css('display','block');
	},
	function(){
		$('.nav_ul').find('li').eq(2).removeClass('on');
		$('.nav_lib').css('display','none');
	}
);

$('.nav_lib').find('li').each(function(index){
	$(this).click(function(){
		if(index==0||index==1){
			current = -3;
		}else if(index == 2){
			current = -4;
		}else if(index == 3){
			current = -5;
		}
		movePage(current);
	});
});

$('.nav_alink').eq(0).click(function(){
	current = 0;
	movePage(current);
});
//嘉宾页面嘉宾特效
function jiabinFun(){
	var jz_w = $('.jz_lr_view').find('img').width();
	var jz_l = $('.jz_lr_view').find('img').length;
	var jz_current = 0;//嘉宾展示

	$('.jz_lr_l').click(function(){
		jz_current--;
		if(jz_current<0){
			jz_current = 0;
		}
		jz_jiabin();

	});
	$('.jz_lr_r').click(function(){
		jz_current++;
		if(jz_current>=jz_l-1){
			jz_current = jz_l-1;
		}
		jz_jiabin();
	});

	function jz_jiabin(){
		if(jz_current==0||jz_current==jz_l-1){
			if(jz_current==0){
				$('.jz_lr_l').css('display','none');
			}else{
				$('.jz_lr_r').css('display','none');
			}
		}else{
			$('.jz_lr_l').css('display','block');
			$('.jz_lr_r').css('display','block');
		}
		$('.jz_lr_view').animate({
			'left':-jz_current*jz_w
		},1000);
	}
}
// 底部人物动画导航
function b_navs(){
	var b_navsBool = true;
	var b_move = 0;
	$('.b_warp').click(function(){
		if(b_navsBool){
			$('.b_btn').css('display','block');
		}else{
			$('.b_btn').css('display','none');
		}
		b_navsBool = !b_navsBool;
	});
	function moveBB(){
		$('.b_warp').animate({
			'left':'40px'
		},300,function(){
			$('.b_warp').find('span').eq(b_move).css('display','block').siblings().css('display','none');
			b_move++;
			if(b_move>=3){
				b_move = 0;
			}
			moveBB();
		});
	}
	moveBB();
}



function cj_flash(){
	//点击开始抽奖 通知js  flash->js
	function callJsToStart(){
	//测试
		callFlashToRoll(1);
	}
	//开发获得抽奖结果 通知flash开始播放效果 js->flash
	function callFlashToRoll(id){
		//通知转盘转到对应的中奖产品的id （序号从0,1,2.....，0是指针初始指示的位置，沿着顺时针的方向递增）
		if(SWFOBJ) SWFOBJ.stopRoll(id);
	}
	//3、flash动画完成通知js  flash->js
	function callJsToComplete(){
	  alert('恭喜你获得大奖哟！！');
	}

	//初始化抽奖对象的SWFOBJ
	//转盘的中心点坐标为（0,0））
	var SWFOBJ= FlashManager.init({
	  'flashUrl':'http://game.gtimg.cn/images/flash/lottery/circle/lotteyround_2015_v1.swf',
	  'r':7,//奖品总数
		'width':413,//flash宽度
		'height':413,//flash高度
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

if(/bilibili/.test(location.search)){
	$('.btn_buy').hide();
	$('.jz_tipsc').css({'text-align':'left'})
}

window.onload = function(){

	autoSize();// Gallary 弹窗自适应
	tips_a();//首页动画
	flash();//首页flash
	getHtml();// Gallary 写入图片
	getNews();//新闻列表
	cj_flash();
	jiabinFun();//嘉宾展示
	b_navs();//底页导航
};
