
(function($){
    $.zUI = $.zUI || {}
    $.zUI.emptyFn = function(){};
    $.zUI.asWidget = [];
    /*
     * core浠ｇ爜锛屽畾涔夊鍔犱竴涓彃浠剁殑楠ㄦ灦
     */
    $.zUI.addWidget = function(sName,oSefDef){
        //璁剧疆瑙勮寖涓殑甯搁噺sFlagName銆乻EventName銆乻OptsName
        $.zUI.asWidget.push(sName);
        var w = $.zUI[sName] = $.zUI[sName] || {};
        var sPrefix = "zUI" + sName
        w.sFlagName = sPrefix;
        w.sEventName = sPrefix + "Event";
        w.sOptsName = sPrefix + "Opts";
        w.__creator = $.zUI.emptyFn;
        w.__destroyer = $.zUI.emptyFn;
        $.extend(w,oSefDef);
        w.fn = function(ele,opts){
            var jqEle = $(ele);
            jqEle.data(w.sOptsName,$.extend({},w.defaults,opts));
            //濡傛灉璇ュ厓绱犲凡缁忔墽琛岃繃浜嗚鎻掍欢锛岀洿鎺ヨ繑鍥烇紝浠呯浉褰撲簬淇敼浜嗛厤缃弬鏁�
            if(jqEle.data(w.sFlagName)){
                return;
            }
            jqEle.data(w.sFlagName,true);
            w.__creator(ele);
            jqEle.on(jqEle.data(w.sEventName));
        };
        w.unfn = function(ele){
            w.__destroyer(ele);
            var jqEle = $(ele);//绉婚櫎鐩戝惉浜嬩欢
            if(jqEle.data(w.sFlagName)){
                jqEle.off(jqEle.data(w.sEventName));
                jqEle.data(w.sFlagName,false);
            }
        }

    }
    /*
     * draggable
     * 鍙傛暟锛歰bj{
     * bOffsetParentBoundary:鏄惁浠ュ畾浣嶇埗浜插厓绱犱负杈圭晫,
     * oBoundary:鎸囧畾鍏冪礌left鍜宼op鐨勮竟鐣屽€硷紝褰㈠{iMinLeft:...,iMaxLeft:...,iMinTop:...,iMaxTop:...},涓庝笂涓€涓弬鏁颁簰鏂�
     * fnComputePosition:鎵╁睍鍑芥暟锛岃繑鍥炲舰濡倇left:...,top:...}鐨勫璞�
     * }
     * 鏀寔鐨勮嚜瀹氫箟浜嬩欢:
     * "draggable.start":drag璧峰锛屽氨鏄紶鏍嘾own鍚庤Е鍙�
     * "draggable.move":drag杩囩▼涓娆¤Е鍙�
     * "draggable.stop":drag缁撴潫瑙﹀彂锛屽氨鏄紶鏍噓p鍚庤Е鍙�
     */
//娉ㄥ唽draggable缁勪欢
    $.zUI.addWidget("draggable",{
        defaults:{
            bOffsetParentBoundary:false,//鏄惁浠ュ畾浣嶇埗浜插厓绱犱负杈圭晫
            oBoundary:null,//杈圭晫
            fnComputePosition:null//璁＄畻浣嶇疆鐨勫嚱鏁�
        },
        __creator:function(ele){
            var jqEle = $(ele);
            jqEle.data($.zUI.draggable.sEventName,{
                mousedown:function(ev){
                    var jqThis = $(this);
                    var opts = jqThis.data($.zUI.draggable.sOptsName);

                    jqThis.trigger("draggable.start");
                    var iOffsetX = ev.pageX - this.offsetLeft;
                    var iOffsetY = ev.pageY - this.offsetTop;

                    function fnMouseMove (ev) {
                        var oPos = {};
                        if(opts.fnComputePosition){
                            oPos = opts.fnComputePosition(ev,iOffsetX,iOffsetY);
                        }else{
                            oPos.iLeft = ev.pageX - iOffsetX;
                            oPos.iTop = ev.pageY - iOffsetY;
                        }

                        var oBoundary = opts.oBoundary;
                        if(opts.bOffsetParentBoundary){//濡傛灉浠ffsetParent浣滀负杈圭晫
                            var eParent = jqThis.offsetParent()[0];
                            oBoundary = {};
                            oBoundary.iMinLeft = 0;
                            oBoundary.iMinTop = 0;
                            oBoundary.iMaxLeft = eParent.clientWidth - jqThis.outerWidth();
                            oBoundary.iMaxTop = eParent.clientHeight - jqThis.outerHeight();
                        }

                        if(oBoundary){//濡傛灉瀛樺湪oBoundary锛屽皢oBoundary浣滀负杈圭晫
                            oPos.iLeft = oPos.iLeft < oBoundary.iMinLeft ? oBoundary.iMinLeft : oPos.iLeft;
                            oPos.iLeft = oPos.iLeft > oBoundary.iMaxLeft ? oBoundary.iMaxLeft : oPos.iLeft;
                            oPos.iTop = oPos.iTop < oBoundary.iMinTop ? oBoundary.iMinTop : oPos.iTop;
                            oPos.iTop = oPos.iTop > oBoundary.iMaxTop ? oBoundary.iMaxTop : oPos.iTop;
                        }

                        jqThis.css({left:oPos.iLeft,top:oPos.iTop});
                        ev.preventDefault();
                        jqThis.trigger("draggable.move");
                    }

                    var oEvent = {
                        mousemove:fnMouseMove,
                        mouseup:function(){
                            $(document).off(oEvent);
                            jqThis.trigger("draggable.stop");
                        }
                    };

                    $(document).on(oEvent);
                }});
        }
    });
    /*
     * panel
     * 鍙傛暟锛歰bj{
     * 	iWheelStep:榧犳爣婊戣疆婊氬姩鏃舵杩涢暱搴�
     *	sBoxClassName:婊氬姩妗嗙殑鏍峰紡
     * 	sBarClassName:婊氬姩鏉＄殑鏍峰紡
     * }
     */
    $.zUI.addWidget("panel",{
        defaults : {
            iWheelStep:16,
            sBoxClassName:"zUIpanelScrollBox",
            sBarClassName:"zUIpanelScrollBar"
        },
        __creator:function(ele){
            var jqThis = $(ele);
            //濡傛灉鏄痵tatic瀹氫綅锛屽姞涓妑elative瀹氫綅
            if(jqThis.css("position") === "static"){
                jqThis.css("position","relative");
            }
            jqThis.css("overflow","hidden");

            //蹇呴』鏈変竴涓敮涓€鐨勭洿鎺ュ瓙鍏冪礌,缁欑洿鎺ュ瓙鍏冪礌鍔犱笂缁濆瀹氫綅
            var jqChild = jqThis.children(":first");
            if(jqChild.length){
                jqChild.css({top:0,position:"absolute"});
            }else{
                return;
            }

            var opts = jqThis.data($.zUI.panel.sOptsName);
            //鍒涘缓婊氬姩妗�
            var jqScrollBox = $("<div style='position:absolute;display:block;line-height:0;'></div>");
            jqScrollBox.addClass(opts.sBoxClassName);
            //鍒涘缓婊氬姩鏉�
            var jqScrollBar= $("<div style='position:absolute;display:block;line-height:0;'></div>")
                .append($('<div class="barTop"></div>')).append($('<div class="barBot"></div>'));
            jqScrollBar.addClass(opts.sBarClassName);
            jqScrollBox.appendTo(jqThis);
            jqScrollBar.appendTo(jqThis);

            opts.iTop = parseInt(jqScrollBox.css("top"));
            opts.iWidth = jqScrollBar.width();
            opts.iRight = parseInt(jqScrollBox.css("right"));


            //娣诲姞鎷栨嫿瑙﹀彂鑷畾涔夊嚱鏁�
            jqScrollBar.on("draggable.move",function(){
                var opts = jqThis.data($.zUI.panel.sOptsName);
                fnScrollContent(jqScrollBox,jqScrollBar,jqThis,jqChild,opts.iTop,0);
            });

            //浜嬩欢瀵硅薄
            var oEvent ={
                mouseenter:function(){
                    fnFreshScroll();
                    //jqScrollBox.css("display","block");
                    //jqScrollBar.css("display","block");
                },
                mouseleave:function(){
                    //jqScrollBox.css("display","none");
                    //jqScrollBar.css("display","none");
                }
            };

            var sMouseWheel = "mousewheel";
            if(!("onmousewheel" in document)){
                sMouseWheel = "DOMMouseScroll";
            }
            oEvent[sMouseWheel] = function(ev){
                var opts = jqThis.data($.zUI.panel.sOptsName);
                var iWheelDelta = 1;
                ev.preventDefault();//闃绘榛樿浜嬩欢
                ev = ev.originalEvent;//鑾峰彇鍘熺敓鐨別vent
                if(ev.wheelDelta){
                    iWheelDelta = ev.wheelDelta/120;
                }else{
                    iWheelDelta = -ev.detail/3;
                }
                var iMinTop = jqThis.innerHeight() - jqChild.outerHeight();
                //澶栭潰姣旈噷闈㈤珮锛屼笉闇€瑕佸搷搴旀粴鍔�
                if(iMinTop>0){
                    jqChild.css("top",0);
                    return;
                }
                var iTop = parseInt(jqChild.css("top"));
                var iTop = iTop + opts.iWheelStep*iWheelDelta;
                iTop = iTop > 0 ? 0 : iTop;
                iTop = iTop < iMinTop ? iMinTop : iTop;
                jqChild.css("top",iTop);
                fnScrollContent(jqThis,jqChild,jqScrollBox,jqScrollBar,0,opts.iTop);
            }
            //璁板綍娣诲姞浜嬩欢
            jqThis.data($.zUI.panel.sEventName,oEvent);
            //璺熼殢婊氬姩鍑芥暟
            function fnScrollContent(jqWrapper,jqContent,jqFollowWrapper,jqFlollowContent,iOffset1,iOffset2){
                var opts = jqThis.data($.zUI.panel.sOptsName);
                var rate = (parseInt(jqContent.css("top"))-iOffset1)/(jqContent.outerHeight()-jqWrapper.innerHeight())//鍗疯捣鐨勬瘮鐜�
                var iTop = (jqFlollowContent.outerHeight()-jqFollowWrapper.innerHeight())*rate + iOffset2;
                jqFlollowContent.css("top",iTop);
            }

            //鍒锋柊婊氬姩鏉�
            function fnFreshScroll(){

                var opts = jqThis.data($.zUI.panel.sOptsName);
                var iScrollBoxHeight = jqThis.innerHeight()-2*opts.iTop;
                var iRate = jqThis.innerHeight()/jqChild.outerHeight();
                var iScrollBarHeight = iScrollBarHeight = Math.round(iRate*iScrollBoxHeight);
                //濡傛灉姣旂巼澶т簬绛変簬1锛屼笉闇€瑕佹粴鍔ㄦ潯,鑷劧涔熶笉闇€瑕佹坊鍔犳嫋鎷戒簨浠�
                if(iRate >= 1){
                    jqScrollBox.css("height",0);
                    jqScrollBar.css("height",0);
                    return;
                }
                jqScrollBox.css("height",iScrollBoxHeight);
                jqScrollBar.css("height",iScrollBarHeight);
                //璁＄畻鎷栨嫿杈圭晫锛屾坊鍔犳嫋鎷戒簨浠�
                var oBoundary = {iMinTop:opts.iTop};
                oBoundary.iMaxTop = iScrollBoxHeight - Math.round(iRate*iScrollBoxHeight)+opts.iTop;
                oBoundary.iMinLeft = jqThis.innerWidth() - opts.iWidth - opts.iRight;
                oBoundary.iMaxLeft = oBoundary.iMinLeft;
                fnScrollContent(jqThis,jqChild,jqScrollBox,jqScrollBar,0,opts.iTop);
                jqScrollBar.draggable({oBoundary:oBoundary});
            }
        },
        __destroyer:function(ele){
            var jqEle = $(ele);
            if(jqEle.data($.zUI.panel.sFlagName)){
                var opts = jqEle.data($.zUI.panel.sOptsName);
                jqEle.children("."+opts.sBoxClassName).remove();
                jqEle.children("."+opts.sBarClassName).remove();
            }
        }
    });

    $.each($.zUI.asWidget,function(i,widget){
        unWidget = "un"+widget;
        var w = {};
        w[widget] = function(args){
            this.each(function(){
                $.zUI[widget].fn(this,args);
            });
            return this;
        };
        w[unWidget] = function(){
            this.each(function(){
                $.zUI[widget].unfn(this);
            });
            return this;
        }
        $.fn.extend(w);
    });
   
})(jQuery);
	/*  |xGv00|c0f83b9b438e57df11adb8f6357dbebd */