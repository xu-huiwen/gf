	alert('����alertΪ��ʾ���߽�����䣬��ʽ����Ҫɾ��');
	var random_old=[];   //������ɲ��ظ�1-7����
	var random_now=0;
	var restSum=0;  //ͼƬ�ļ�����
	var dont=false; //����ֵ�����ڳ齱�ǲ��ɵ��
	var initialize =function (id)
	{
		var _this = this;
		this.wrap = typeof id === "string" ? document.getElementById(id) : id;
		this.oUl = this.wrap.getElementsByTagName("ul")[0];
		this.aLi = this.wrap.getElementsByTagName("li");
		this.oImg=this.wrap.getElementsByTagName("img");
		this.prev = document.getElementById('prev');
		this.next = document.getElementById('next');
		this.timer = null;  //Ĭ���ֲ�ѭ����ʱ����ʼ��
		this.timerSatrt = null;  //��ʼ�齱��ʱ����ʼ��
		this.aSort = [];
		this.iCenter = 3;
		this._doPrev = function () {return _this.doPrev.apply(_this)};
		this._doNext = function () {return _this.doNext.apply(_this)};
		//���ÿ�ߴ�С����
		this.options = [
			{width:120, height:150, top:134, left:134, zIndex:-99},
			{width:130, height:170, top:61, left:0, zIndex:2},
			{width:170, height:218, top:37, left:110, zIndex:3},
			{width:224, height:288, top:0, left:262, zIndex:4},
			{width:170, height:218, top:37, left:468, zIndex:3},
			{width:130, height:170, top:61, left:620, zIndex:2},
			{width:120, height:150, top:71, left:496, zIndex:-99}
		];
		for (var i = 0; i < this.aLi.length; i++) this.aSort[i] = this.aLi[i];
		this.aSort.unshift(this.aSort.pop());
		this.setUp();
		this.prev.onclick=function(){
			if(dont!==true){
				_this._doPrev();
			}else{
				alert('���ڳ齱�С�������ֹͣ�齱�鿴��Ʒչʾ')
			};
			return false;
		};
		this.next.onclick=function(){
			if(dont!==true){
				_this.doNext();
			}else{
				alert('���ڳ齱�С�������ֹͣ�齱�鿴��Ʒչʾ')
			}
			return false;
		};
		
		this.doImgClick();	
		addclassName(this.aLi); //3D����
		pathWay(true); //��ʼ���ͼƬ*** ����ֵΪ��ʼ�齱���ú�������***��
		this.start=document.getElementById('start');
		this.stop=document.getElementById('stop');
		this.rest=document.getElementById('rest');
		this.start.onclick=function(){
			clearInterval(_this.timer);
			clearInterval(_this.timerSatrt);
			_this.timerSatrt = setInterval(function ()
			{
				pathWay(false);
				_this.doNext();
				dont=true;
			}, 100);
			return false;
		};
		this.stop.onclick=function(){
			if(dont!==false){
				clearInterval(_this.timerSatrt);
				clearInterval(_this.timer);
				dont=false;
				SetImgSrc();
				console.log(restSum)   //�齱�õ����ļ���
				console.log(random_old[3])  //�齱�õ�����
				//�����ɵ��ú�̨����
				alert('�õ�ossweb-img�����ļ���'+restSum+'�����Ϊ'+random_old[3]+'��ͼƬ'); 
			}else{
				alert('���ȿ�ʼ�齱');
			};
			return false;
		};	
		this.rest.onclick=function(){
			pathWay(true);
			if(dont==true){
				alert('���ڳ齱�С�������ֹͣ�齱���ý�Ʒ')
			};
			return false;
		};
		//Ĭ���Զ��ֲ����ÿ�ע�͵�
		this.timer = setInterval(function ()
		{
			_this.doNext()	
		}, 3000);		
		this.wrap.onmouseover = function ()
		{
			clearInterval(_this.timer);
			return;
		};
		this.wrap.onmouseout = function ()
		{
			_this.timer = setInterval(function ()
			{
				_this.doNext()	
			}, 3000);	
		}
		//Ĭ���Զ��ֲ�END
	};

	var doPrev = function ()
	{
		this.aSort.unshift(this.aSort.pop());
		this.setUp()
	};
	var doNext= function ()
	{
		this.aSort.push(this.aSort.shift());
		this.setUp()
	};
	var doImgClick= function ()
	{
		var _this = this;
//		//���ͼƬ����ǰ����Ҫ�ͷ�
//		for (var i = 0; i < this.aSort.length; i++)
//		{
//			this.aSort[i].onclick = function ()
//			{
//				alert()
//				if (this.index > _this.iCenter)
//				{
//					for (var i = 0; i < this.index - _this.iCenter; i++) _this.aSort.push(_this.aSort.shift());
//					_this.setUp()
//				}
//				else if(this.index < _this.iCenter)
//				{
//					for (var i = 0; i < _this.iCenter - this.index; i++) _this.aSort.unshift(_this.aSort.pop());
//					_this.setUp()
//				}
//			}
//		}
};
	var setUp=function ()
	{
		var _this = this;
		var i = 0;
		
		for (i = 0; i < this.aSort.length; i++) this.oUl.appendChild(this.aSort[i]);
		for (i = 0; i < this.aSort.length; i++)
		{
			this.aSort[i].index = i;
			this.d=_this.aSort[_this.iCenter].parentNode.getElementsByTagName("img")
			if (i < 7)
			{
				this.css(this.aSort[i], "display", "block");
				this.doMove(this.aSort[i], this.options[i], function ()
				{
					for (var k=0;k<7;k++) {
						this.doMove(this.d[k], {opacity:30},function(){
							//��ǰ����
							_this.doMove(this.d[_this.iCenter], {opacity:100});
							
						});
						
					}	
					
				});
				addclassName(this.aSort)
			}
			else
			{
				this.css(this.aSort[i], "display", "none");
				this.css(this.aSort[i], "width", 0);
				this.css(this.aSort[i], "height", 0);
				this.css(this.aSort[i], "top", 37);
				this.css(this.aSort[i], "left", this.oUl.offsetWidth / 2)
			}
			if (i < this.iCenter || i > this.iCenter)
			{
				this.css(this.aSort[i].getElementsByTagName("img")[0], "opacity", 30)
				//��꾭��������ú�doImgClick
				this.aSort[i].onmouseover = function ()
				{
//					_this.doMove(this.getElementsByTagName("img")[0], {opacity:100})	
				};
				this.aSort[i].onmouseout = function ()
				{
//					_this.doMove(this.getElementsByTagName("img")[0], {opacity:35})
				};
				this.aSort[i].onmouseout();
			}
			else
			{
				this.aSort[i].onmouseover = this.aSort[i].onmouseout = null
			};
		}		
	};
	var css =function (oElement, attr, value)
	{
		if (arguments.length == 2)
		{
			return oElement.currentStyle ? oElement.currentStyle[attr] : getComputedStyle(oElement, null)[attr]
		}
		else if (arguments.length == 3)
		{
			switch (attr)
			{
				case "width":
				case "height":
				case "top":
				case "left":
				case "bottom":
					oElement.style[attr] = value + "px";
					break;
				case "opacity" :
					oElement.style.filter = "alpha(opacity=" + value + ")";
					oElement.style.opacity = value / 100;
					break;
				default :
					oElement.style[attr] = value;
					break
			}	
		}
	};
	var doMove=function (oElement, oAttr, fnCallBack)
	{
		var _this = this;
		clearInterval(oElement.timer);
		oElement.timer = setInterval(function ()
		{
			var bStop = true;
			for (var property in oAttr)
			{
				var iCur = parseFloat(_this.css(oElement, property));
				property == "opacity" && (iCur = parseInt(iCur.toFixed(2) * 100));
				var iSpeed = (oAttr[property] - iCur) / 5;
				iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
				
				if (iCur != oAttr[property])
				{
					bStop = false;
					_this.css(oElement, property, iCur + iSpeed);
					
				};
			}
			if (bStop)
			{
				clearInterval(oElement.timer);
				fnCallBack && fnCallBack.apply(_this, arguments)	
			};
		},10);
			
	};
	var addclassName=function (obj){
		this.arrySort=[];
		for (var j = 0; j < obj.length; j++) {
			obj[j].style.display='none';
			var posName='pos'+(j);
			this.arrySort.push(posName);
			obj[j].className=this.arrySort[j];
		};
		for (var i = 0; i < 5; i++) {
			obj[i+1].style.display='block';
		};
	};
	
	var usual_search=function (key){
		for(var i=0,j=random_old.length;i<j;i++){
			if(random_old[i]==key){
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
		random_now=Math.floor(Math.random()*7+1);
		if(random_old.length==0){
			random_old.push(random_now);
		}else{
			if(usual_search(random_now)){
				random_old.push(random_now);
			};
		};
	};
	var LoopGet=function(){
		for(var l=0;l<100;l++){
			if(random_old.length==9){
				break;
			}
			getNums();
		};
	};
	
	var pathWay=function(b){
		if(dont!==true){
			LoopGet();
			if(random_old.length==7){
				random_old.length=[];
				LoopGet();
			};
			if(b!==false){
				restSum++;
				if(restSum>random_old.length){
					restSum=1
				};
			};
			SetImgSrc();
		};
	};
	var SetImgSrc=function(){
		for (var i = 0; i < oImg.length; i++) {
			//����ͼƬ�ļ��а����Լ����ͼƬ��
			oImg[i].src='ossweb-img/'+(restSum)+'/'+random_old[i]+'.jpg?'+Date.now();
		};
	};
window.onload=function(){
	initialize('box');
	return false;
};


