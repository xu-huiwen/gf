	var random_old=[];   //随机生成不重复1-8数组 图片名
	var random_now=0;
	var restSum=1;  //图片文件夹名
	var $ul=$('#list');
	var $card=$ul.children('li');
	var $start=$('#start');
	var $rest=$('#rest');
	var one=true; //在动画和自动抽奖后不可鼠标点击抽奖
	var usual_search=function (key){
		for(var i=0,j=random_old.length;i<j;i++){   //遍历数组
			if(random_old[i]==key){      //对比原数组和新的随机数
				break;
			}else{
				if(i==(j-1)){
					return true;
				}else{
					continue;
				};
			};
		};
	};
	var getNums=function (){
		random_now=Math.floor(Math.random()*8+1);   //得到随机数
		if(random_old.length==0){
			random_old.push(random_now);   //判断添加
		}else{
			if(usual_search(random_now)){
				random_old.push(random_now);
			};
		};
	};
	var loopGetArry=function(){
		random_old=[];
		for(var l=0;l<100;l++){
			if(random_old.length==9){
				break;
			}
			getNums();
		};
	};
	loopGetArry();
	$card.each(function(i){
		$(this).css('left',($(this).width()+13)*i); //初始位置
		$(this).on('click',function(){
			if(one!==false){          //判断是否可以点击翻牌
				$(this).addClass('flip');
				$(this).find('a').css({
					'-webkit-transition':'all 1s',
					'transition':'all 1s'
				})
				SetImg($(this),i);
				one=false;   //只能点击一次
			};
			return false;
		});
	});
	$start.on('click',function(){
		animatefun(true);
		return false;
	});
	$rest.on('click',function(){
		restSum++;
		if(restSum>5){restSum=1};  //图片文件夹循环
		animatefun(false);
		return false;
	});
	var SetImg=function(obj,i){
		obj.find('.back img').attr('src','ossweb-img/'+restSum+'/'+random_old[i]+'.png'+'?'+Date.now());  //设置图片
	};
	var animatefun=function(b){
		one=false;   //动画开始后用户不可自己选
		loopGetArry();
		$card.removeClass('flip cardjap');
		$card.stop().animate({     //动画位置
			'left':'50%',
			'margin-left':-$card.width()/2+'px'
		},800,function(){
			$(this).addClass('cardjap');
		});
		setTimeout(function(){
			$card.removeClass('cardjap');
			$card.each(function(i){
				$(this).stop().animate({
					'left':($(this).width()+13)*i,  //动画完毕重置位置
					'margin-left':'0'
				},500,function(){
					SetImg($(this),i);
					if(b!==false){
						$card.removeClass('flip');
						var r=Math.floor(Math.random()*4); //自动抽奖得到的随机索引
						$card.find('a').css({
							'-webkit-transition':'all 1s',
							'transition':'all 1s'
						})
						$card.eq(r).addClass('flip');//展示得到的道具
					}else{
						one=true; //更换奖励后用户可以自己选、、重置
					}
				});
			});
		},3000)
	};

	
		






















