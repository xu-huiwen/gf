// µÇÂ¼
milo.addEvent(g("dologin"), "click", function() {
	need("biz.login-min",function(LoginManager){
		LoginManager.init({
			needReloadPage:true
		});
		LoginManager.login();
	});
	return false;
});
milo.addEvent(g("dologout"), "click", function() {
	need("biz.login-min",function(LoginManager){
		LoginManager.logout();
	});
	return false;
});
milo.ready(function() {
	need("biz.login-min",function(LoginManager){
		LoginManager.checkLogin(function(){
			g("login-qq").innerHTML = LoginManager.getUserUin();//»ñÈ¡QQºÅ
		});
	});
});
//tab
function swing(t,c){
	$(t).each(function(i){
		$(this).click(function(){
			$(this).addClass('on').siblings().removeClass('on');
			$(c).eq(i).show().siblings(c).hide();
		})
	})
}
swing('.live_tab li', '.live_ctm');
swing('.ly_tab a', '.ly_ctm');
swing('.zyxs a', '.zyxs_ct');
swing('.mnzb a', '.mnzb_ct');
swing('.shzj a', '.shzj_ct');
swing('.mjds a', '.mjds_ct');











