//游戏介绍浮层
$('.intro-btn').hover(function(){
	$('.intro-fc').show();
},function(){
	$('.intro-fc').hide();
})
//微信二维码浮层
$('.wx').hover(function(){
	$('.wx-fc').show();
},function(){
	$('.wx-fc').hide();
})
//部落二维码浮层
$('.tribe').hover(function(){
	$('.bl-fc').show();
},function(){
	$('.bl-fc').hide();
})
//导航hover效果
$(".nav a").each(function(){
	$(this).hover(function(){
		$(this).addClass("on");
	},function(){
		$(this).removeClass("on");
	})
})
//弹窗
function TGDialogS(e){
	need("biz.dialog-min",function(Dialog){
		Dialog.show({
			id:e,
			bgcolor:'#000', //弹出“遮罩”的颜色，格式为"#FF6600"，可修改，默认为"#fff"
			opacity:50      //弹出“遮罩”的透明度，格式为｛10-100｝，可选
		});
	});
}
function closeDialog(){
	need("biz.dialog-min",function(Dialog){
		Dialog.hide();
	});
}
