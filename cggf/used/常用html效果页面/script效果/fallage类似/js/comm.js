//��Ϸ���ܸ���
$('.intro-btn').hover(function(){
	$('.intro-fc').show();
},function(){
	$('.intro-fc').hide();
})
//΢�Ŷ�ά�븡��
$('.wx').hover(function(){
	$('.wx-fc').show();
},function(){
	$('.wx-fc').hide();
})
//�����ά�븡��
$('.tribe').hover(function(){
	$('.bl-fc').show();
},function(){
	$('.bl-fc').hide();
})
//����hoverЧ��
$(".nav a").each(function(){
	$(this).hover(function(){
		$(this).addClass("on");
	},function(){
		$(this).removeClass("on");
	})
})
//����
function TGDialogS(e){
	need("biz.dialog-min",function(Dialog){
		Dialog.show({
			id:e,
			bgcolor:'#000', //���������֡�����ɫ����ʽΪ"#FF6600"�����޸ģ�Ĭ��Ϊ"#fff"
			opacity:50      //���������֡���͸���ȣ���ʽΪ��10-100������ѡ
		});
	});
}
function closeDialog(){
	need("biz.dialog-min",function(Dialog){
		Dialog.hide();
	});
}
