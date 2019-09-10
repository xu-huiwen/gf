/**
 * Created by bin on 2017/2/10.
 * canvas�����ද�����
 * 17.2.20����:�����Ը���,���ݵ�ie9.
 * 17.2.28����:�����Ը���,���ݵ�ie6.
 * ie8����,�������ʵ��������ı���,�����ú��������ӿ���ͬ������
 * 17.4.6����:ȥ��for in,Ԥ����Щ����ԭ������Ӷ���.
 * 17.9.27����,������ʱע������Ч��,δ���µ�UI����,���һ������:
 * ������:{��ʼ���ٸ�����,�̶�����֡����,һ��ע����ٸ�����
 * delayFill{initNumber:10,fixed:3,oneTimesNumber:2,}
 * 17.9.27����,���������½�����Ļ�Ĳ���Ϊ:reverseDirection(�ӳ��������쵽��Ļ��Ե��λ��)��ʱ��,֧��һ��ʼ���Ǵ����������Ļ.
 * reverseDirection:'replaceInitPosition';
 */

(function () {
    /*����*/
    var point = function (param, canvas) {
        /***�����㹹�캯��***/
        var tempPoint, tempReIn, tempposition, tempRota;
        //��ԭ��
        var tempPoint = {
            type: param.type,
            reIn: param.reIn,
            cacheImage: null, //��������,����API����.
            color: param.color,
            x: null,
            y: null,
            reInX: null,
            reInY: null,
            rota: {},
            zoom: param.zoom.min + (param.zoom.max - param.zoom.min) * Math.random(),
            speed: param.speed.min + (param.speed.max - param.speed.min) * Math.random(),
            size: null,
            flowAngle: param.flowAngle,
            mouseAngle: null,
            opc: param.op.min + (param.op.max - param.op.min) * Math.random(),
            angle: param.angle.value + (param.angle.float * Math.random() - param.angle.float / 2),
            img: null//Ϊ�˼���IE8����,�����excanvas��֧����������,ÿ�ζ�Ҫʵ��һ��img����.����������һ��ʵ��,ֻʵ��һ��,Ҳ��������˸.
        }
        //��ʼ��size
        tempPoint.size = this.dealSize(param.type, param.size);

        //��ʼ����ת����
        if (param.rota.value !== 0) {
            tempRota = this.dealRota(param.rota);
            tempPoint.rota['value'] = tempRota.value;
            tempPoint.rota['speed'] = tempRota.speed;
        }
        //���ɳ�ʼ����
        tempposition = this.createPosition(param.area);
        tempPoint.x = tempposition.x;
        tempPoint.y = tempposition.y;

        //�������½��뻭��������
        tempReIn = this.reIn(canvas, tempPoint.reIn, tempPoint.angle, tempPoint.x, tempPoint.y, tempPoint.size, tempPoint.speed,param,tempPoint);
        tempPoint.reInX = tempReIn.x>>0;
        tempPoint.reInY = tempReIn.y>>0;


        /*������������*/
        tempPoint.cacheImage = this.drawPoint(tempPoint.type, tempPoint.size, tempPoint.opc, tempPoint.color, tempPoint.zoom);
        //���������ı�size��С,���»�ȡһ��
        tempPoint.size = tempPoint.cacheImage.width;
        return tempPoint;
    };
    point.prototype = {
        /*���Ƶ�����������ͼ��*/
        drawPoint: function (type, size, opc, color, zoom) {
            var cacheCanvas, cacheCtx;
            //��������
            cacheCanvas = document.createElement('canvas');
            //Ϊ�˼���ie8,������excanvas.js,���Ƕ�̬����canvas��Ҫ�ֶ�ʵ����
            if (window.G_vmlCanvasManager !== undefined) {
                cacheCanvas = window.G_vmlCanvasManager.initElement(cacheCanvas);
            }
            cacheCtx = cacheCanvas.getContext('2d');
            switch (type.typeName) {
                case 'circle': {
                    //�������������С
                    cacheCanvas.width = size * 2;
                    cacheCanvas.height = size * 2;
                    //����͸����,��Ϊֻ������һ��,���ñ���ͻָ�����
                    cacheCtx.globalAlpha = opc;
                    //������ɫ
                    cacheCtx.fillStyle = color;
                    //��ʼ����
                    cacheCtx.beginPath();
                    cacheCtx.arc(size, size, size, 0, Math.PI * 2, true);
                    cacheCtx.closePath();
                    cacheCtx.fill();
                    break;
                }
                case 'image': {
                    cacheCanvas.width = size;
                    cacheCanvas.height = size;
                    cacheCtx.globalAlpha = opc;
                    var img = new Image();
                    img.src = type.url;
                    if (img.complete) {
                        cacheCtx.drawImage(img, 0, 0, size, size);
                    } else {
                        img.onload = function () {
                            cacheCtx.drawImage(img, 0, 0, size, size);
                        };
                        img.onerror = function () {
                            console.log(type.url + '����ʧ�ܣ�������');
                        };
                    }
                    break;
                }
                case 'shape': {
                    size = size * zoom;
                    cacheCanvas.width = size;
                    cacheCanvas.height = size;

                    cacheCtx.globalAlpha = opc;
                    cacheCtx.fillStyle = color;
                    cacheCtx.strokeStyle = color;
                    cacheCtx.lineWidth = type.lineWidth;

                    var tempVertexData;
                    tempVertexData = type.vertexData;
                    cacheCtx.scale(zoom, zoom);
                    cacheCtx.beginPath();
                    cacheCtx.moveTo(tempVertexData[0][0], tempVertexData[0][1]);
                    for (var j = tempVertexData.length, i = 1; i < j; ++i) {
                        cacheCtx.lineTo(tempVertexData[i][0], tempVertexData[i][1]);
                    }
                    cacheCtx.lineTo(tempVertexData[0][0], tempVertexData[0][1]);
                    cacheCtx.stroke();
                    cacheCtx.fill();
                    cacheCtx.closePath();

                }
                default: {
                    break;
                }
            }
            //������ɷ���
            return cacheCanvas;
        }
        ,
        /*�������½��뻭����λ��*/
        reIn: function (canvas, way, angle, initX, initY, size, speed,param,tempPoint) {
            var rX, rY, tempX, tempY, radian, opAngle;
            switch (way) {
                /*���ݽǶ�ȥ�ҵ��Ƴ���Ļ֮��,���½�����Ļ�ĵ�.*/
                case 'reverseDirection': { //�ҵ��෴�ķ���
                    if (angle > 180) {
                        opAngle = angle - 180;
                    } else {
                        opAngle = angle - 180;
                    }
                    //�෴�����Ӧ�Ļ���
                    radian = opAngle / 180 * Math.PI;
                    //�����෴�ķ��򻡶�ȥ�������½�����Ļʱ������
                    for (var j = 1; j <= canvas.width; j += speed) {
                        tempX = initX + Math.cos(radian) * j;
                        tempY = initY + Math.sin(radian) * j;
                        if (angle > 270 && angle <= 360) {
                            if (tempX <= 0 || tempY >= canvas.height) {
                                tempX -= size;
                                tempY += size;
                                break;
                            }
                        } else if (angle > 180 && angle <= 270) {
                            if (tempX >= canvas.width || tempY >= canvas.height) {
                                tempX += size;
                                tempY += size;
                                break;
                            }
                        } else if (angle > 90 && angle <= 180) {
                            if (tempX >= canvas.width || tempY <= 0) {
                                tempX += size;
                                tempY -= size;
                                break;
                            }
                        } else {
                            if (tempX <= 0 || tempY <= 0) {
                                tempX -= size;
                                tempY -= size;
                                break;
                            }
                        }
                    }
                    rX = tempX;
                    rY = tempY;
                    if(param.reverseDirection === 'replaceInitPosition'){
                        tempPoint.x = tempX>>0;
                        tempPoint.y = tempY>>0;
                    }
                    break;
                }
                default: {
                    rX = initX;
                    rY = initY;
                    break;
                }
            }
            return {x: rX>>0, y: rY>>0};
        }
        ,
        /*������ɳ�ʼ��*/
        createPosition: function (area) {
            var x, y;
            x = Math.random() * (area.rightBottom[0] - area.leftTop[0]) + area.leftTop[0] >> 0;
            y = Math.random() * (area.rightBottom[1] - area.leftTop[1]) + area.leftTop[1] >> 0;
            return {x: x, y: y};
        },
        /*������ת��Ϣ*/
        dealRota: function (rota) {
            var value, speed;
            if (rota.floatValue)
                value = Math.random() * rota.floatValue - rota.floatValue / 2 + rota.value;
            if (rota.floatSpeed)
                speed = Math.random() * rota.floatSpeed - rota.floatSpeed / 2 + rota.speed;
            return {'value': value, 'speed': speed};
        },
        /*��ʼ��size*/
        dealSize: function (tpye, size) {
            var tempSize;
            switch (tpye.typeName) {
                case 'shape': {
                    var temp, maxX, maxY;

                    temp = tpye.vertexData;
                    maxX = temp[0][0];
                    maxY = temp[0][1];

                    for (var i = temp.length - 1; i >= 0; --i) {
                        //�ҳ����X
                        if (temp[i][0] > maxX) {
                            maxX = temp[i][0];
                        }
                        //�ҳ����Y
                        if (temp[i][0] > maxY) {
                            maxY = temp[i][1];
                        }
                    }
                    //�����ҳ�������ֵ��Ϊ�����εĸ߿�,������֧�־���,������������,���ڸĽ�
                    if (maxX > maxY) {
                        tempSize = maxX;
                    } else {
                        tempSize = maxY;
                    }
                    break;
                }
                default: {
                    tempSize = size.min + (size.max - size.min) * Math.random();
                    break;
                }
            }
            return tempSize;
        }
    };
    /*�����*/
    var particleCanvas = function (canvasId, paramArray) {
        /***������캯��***/
        /*��ȡcanvas����*/
        this.canvasE = document.getElementById(canvasId);
        this.ctx = this.canvasE.getContext('2d');
        //��ȡ�������
        this.canvasWidth = this.canvasE.width;
        this.canvasHeight = this.canvasE.height;
        particleCanvas.defaultParameter.area.rightBottom[0] = this.canvasWidth;
        particleCanvas.defaultParameter.area.rightBottom[1] = this.canvasHeight;

        /*��ʽ������*/
        if (paramArray.length !== 0) { //��ȡ�б����
            var temp;
            //��ȡcanvas��id
            this.canvasId = canvasId;
            //��ȡ����ĵ��������
            temp = [];
            for (var i = 0, j = paramArray.length; i < j; ++i) {
                temp.push(paramArray[i]);
            }
            //�Ѵ���ĵ���ز�����Ĭ�ϲ����ϲ�������ʹ�õ�"ʹ�ò���"
            this.useParameter = this.formatParameter(temp);
        } else { //û�в����б�,��������.
            console.log("û���ҵ����ʵ��������");
            return;
        }

        /*���ɵ�����,δ������Ƶ�����*/
        this.unDrawPoint = this.createpointGroup();
        //���ڻ��Ƶ������
        this.pointGroup = [];

        //�����һ��ע����Ƶ�
        this.dealInitFill();

        //��ȡ�����������Ӧ�ĵ������±�
        this.mouseArrayIndex = this.onMouse();
        /*����*/
        if (this.pointGroup.length > 0) {
            //֪ͨ���ƺ�������
            this.draw(this);
        } else {
            console.log("û�пɻ��Ƶ�ͼ��,���number�����Ƿ����0");
        }
    };
    particleCanvas.prototype = {
        /*��ʽ������*/
        formatParameter: function (data) {
            var temp, tempUseParameter, data;
            tempUseParameter = [];
            data = data || {};
            //�Ѳ����ϲ�,û����Ĳ���ʹ��Ĭ�ϲ���
            for (var index = 0; index < data.length; ++index) {
                temp = {};
                for (var key in particleCanvas.defaultParameter) {
                    temp[key] = (data[index][key]) ? data[index][key] : particleCanvas.defaultParameter[key];
                }
                tempUseParameter.push(temp);
            }
            return tempUseParameter;
        },
        /*����������*/
        createpointGroup: function () {
            var temp, tempArray, tempPoints;
            tempArray = []; //ȫ��������ļ���
            for (var index = 0; index < this.useParameter.length; ++index) {
                tempPoints = []; //ĳһ��ĵ㼯��
                temp = this.useParameter[index];
                //������һ���Ӧ��number���ɵ�
                for (var i = temp.number; i > 0; --i) {
                    tempPoints.push(new point(temp, this.canvasE));
                }
                tempArray.push(tempPoints);
            }
            return tempArray;
        },
        /*�����һ������ע��*/
        dealInitFill:function () {
            for(var pi=0,pj=this.unDrawPoint.length;pi<pj;++pi){
                var index = pi,tempParameter=this.useParameter[pi];
                var fillNumber = (tempParameter['delayFill']=='undefined')? this.unDrawPoint[index].length : tempParameter.delayFill.initNumber;

                if(fillNumber === this.unDrawPoint[index].length){
                    this.pointGroup[index] = this.unDrawPoint[index];
                    continue;
                }
                this.pointGroup[index]=[];
                for(var i=0,j=fillNumber;i<j;++i){
                    //���δ���Ƶ���������û������,��������,������ִ����
                    if(this.unDrawPoint[index].length<=0)return;

                    this.pointGroup[index].push(this.unDrawPoint[index].pop());
                }
            }
        },
        /*������ʱע��*/
        dealDelayFill : function (index,tempParameter) {
            var tpd = tempParameter.delayFill;
            //���δ���Ƶ���������û������,����
            if(this.unDrawPoint[index].length<=0)return;
            //�ж��Ƿ���֡����¼����
            (typeof(tempParameter['nowFrame']) == 'undefined') && (tempParameter.nowFrame = 0);

            //�ж��Ƿ񵽴���Ӧ��ע���֡����
            if(tempParameter.nowFrame === tpd.fixed){
                //����,������������

                this.pointGroup[index].push.apply(this.pointGroup[index],this.unDrawPoint[index].splice(0,tpd.oneTimesNumber));

                //��λ
                tempParameter.nowFrame=0;
            }
            ++tempParameter.nowFrame;
        },
        /*����ͼ�������*/
        update: function () {
            var tempArray, tempPoint;
            if (this.mouseArrayIndex !== null) {
                for (var i = this.mouseArrayIndex.length - 1; i >= 0; --i) {
                    var tempPointGroup = this.pointGroup[this.mouseArrayIndex[i]];
                    for (var j = tempPointGroup.length - 1; j >= 0; --j) {
                        if (window.particleCanvasMouseAngle !== undefined) {
                            tempPointGroup[j].mouseAngle = window.particleCanvasMouseAngle;
                        }
                    }
                }
            }
            for (var index = 0; index < this.pointGroup.length; ++index) {
                tempArray = this.pointGroup[index];
                for (var i = tempArray.length - 1; i >= 0; --i) {
                    tempPoint = tempArray[i];
                    //����λ����Ϣ
                    if (tempPoint.x < -tempPoint.size - tempPoint.speed - 10 ||
                        tempPoint.y < -tempPoint.size - tempPoint.speed - 10 ||
                        tempPoint.x > this.canvasWidth + tempPoint.size + tempPoint.speed + 10 ||
                        tempPoint.y > this.canvasHeight + tempPoint.size + tempPoint.speed + 10) {
                        //���������Ļ��,�ص��ؽ�������λ��
                        tempPoint.x = tempPoint.reInX;
                        tempPoint.y = tempPoint.reInY;
                    } else {
                        //û�г�����Ļ,�����ƶ�
                        tempPoint.x += Math.cos(tempPoint.angle / 180 * Math.PI) * tempPoint.speed;
                        tempPoint.y += Math.sin(tempPoint.angle / 180 * Math.PI) * tempPoint.speed;
                    }
                    //������ת��Ϣ
                    if (tempPoint.rota.value !== 0) {
                        tempPoint.rota.value += tempPoint.rota.speed;
                    } else if (tempPoint.flowAngle === 'on') {
                    }
                }
            }

        },
        /*���ƺ���*/
        draw: function (data) {
            //���������excanvas��ʹ�õͰ汾��������ƺ���
            if (window.G_vmlCanvasManager !== undefined) {
                this.draw = this.drawLow;
            } else {
                this.draw = this.drawHigh;
            }
            this.draw(data);
        },
        /*�߰汾��������ƺ���*/
        drawHigh: function (data) {
            //�����ԭ������Ϊdata���ݽ���,���requestAnimationFrameִ�к���ʱ,thisָ����window
            var temp, tempArray, tempSize, tempParameter;
            //������
            this.canvasE.width = this.canvasE.width;

            //ѭ������
            for (var index = 0; index < this.pointGroup.length; ++index) {
                //�����ӳ�ע��
                tempParameter = this.useParameter[index];
                tempParameter['delayFill'] && this.dealDelayFill(index,tempParameter);

                //�õ�����������
                tempArray = this.pointGroup[index];
                for (var i = tempArray.length - 1; i >= 0; --i) {
                    temp = tempArray[i];
                    //��������������Ӧ,�����ĽǶȴ��ݸ����ڵĽǶ�
                    if (temp.mouseAngle !== null) {
                        temp.angle = temp.mouseAngle;
                    }
                    //���û����ת
                    if (temp.rota.speed === 0) {
                        this.ctx.drawImage(temp.cacheImage, temp.x - temp.size, temp.y - temp.size);
                    }
                    //����нǶȸ���
                    else if (temp.flowAngle == 'on') {
                        this.ctx.save();
                        tempSize = temp.size / 2;
                        this.ctx.translate(temp.x + tempSize, temp.y + tempSize);
                        this.ctx.rotate(temp.angle * Math.PI / 180);
                        this.ctx.translate(-temp.x - tempSize, -temp.y - tempSize);
                        this.ctx.drawImage(temp.cacheImage, temp.x, temp.y);
                        this.ctx.restore();
                    }
                    else {
                        this.ctx.save();
                        tempSize = temp.size / 2;
                        this.ctx.translate(temp.x + tempSize, temp.y + tempSize);
                        this.ctx.rotate(temp.rota.value * Math.PI / 180);
                        this.ctx.translate(-temp.x - tempSize, -temp.y - tempSize);
                        this.ctx.drawImage(temp.cacheImage, temp.x, temp.y);
                        this.ctx.restore();
                    }
                }
            }
            //�������,��������
            this.update();
            //������һ�λ���
            rAF(function () {
                data.draw(data);
            });
        },
        /*ie8�����°汾���ƺ���*/
        drawLow: function (data) {
            var ctx, temp, size;
            ctx = this.ctx;
            this.canvasE.width = this.canvasE.width;
            for (var index = 0; index < this.pointGroup; ++index) {
                for (var j = this.pointGroup[index].length, i = 0; i < j; ++i) {
                    temp = this.pointGroup[index][i];
                    switch (temp.type.typeName) {
                        case 'circle': {
                            //����͸����,��Ϊֻ������һ��,���ñ���ͻָ�����
                            ctx.globalAlpha = temp.opc;
                            //������ɫ
                            ctx.fillStyle = temp.color;
                            //��ʼ����
                            ctx.beginPath();
                            ctx.arc(temp.x, temp.y, temp.size, 0, Math.PI * 2, true);
                            ctx.closePath();
                            ctx.fill();
                            break;
                        }
                        case 'image': {
                            //����Ѿ�����img����,������ʵ��
                            if (temp.img === null) {
                                var img = new Image();
                                img.src = temp.type.url;
                            }
                            ctx.drawImage(img, temp.x, temp.y, temp.size, temp.size);
                            break;
                        }
                        case 'shape': {
                            size = temp.size * temp.zoom;

                            ctx.globalAlpha = temp.opc;
                            ctx.fillStyle = temp.color;
                            ctx.strokeStyle = temp.color;
                            ctx.lineWidth = temp.type.lineWidth;

                            var tempVertexData;
                            tempVertexData = temp.type.vertexData;
                            ctx.save();
                            ctx.scale(temp.zoom, temp.zoom);
                            ctx.beginPath();
                            ctx.moveTo(temp.x + tempVertexData[0][0], temp.y + tempVertexData[0][1]);
                            for (var j = tempVertexData.length, i = 1; i < j; ++i) {
                                ctx.lineTo(temp.x + tempVertexData[i][0], temp.y + tempVertexData[i][1]);
                            }
                            ctx.lineTo(temp.x + tempVertexData[0][0], temp.y + tempVertexData[0][1]);
                            ctx.stroke();
                            ctx.fill();
                            ctx.closePath();
                            ctx.restore();
                        }
                        default: {
                            break;
                        }
                    }
                }
            }
            this.update();
            //������һ�λ���
            rAF(function () {
                data.draw(data);
            });
        },
        onMouse: function () {
            var temp = [];//�����Ƕ��ƶ�����
            for (var i = this.useParameter.length - 1; i >= 0; --i) {
                if (this.useParameter[i].respondMouse === 'on') {
                    temp.push(i);
                }
            }
            //û���鿪�������Ӧ,�˳�
            if (temp.length == 0) {
                return null;
            }
            else {//�����,�������ƶ��¼�
                document.getElementById(this.canvasId).onmousemove = function () {
                    deal_mouse(event, 1000, 600);
                }
                return temp;
            }
        }
    };
    var deal_mouse = function (event, width, height) {
        var event = event || window.event;
        //��ֹ������ͬ�¼�,IE10���²�֧������ֹ
        event.preventDefault ? event.preventDefault() : (event.returnValue = false);
        //��ȡ����,����IE10���²�֧��pageX/Y
        var touches = event.touches ? event.touches[0] : event;
        var x = (touches.pageX) ? touches.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
        var y = (touches.pageY) ? touches.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);

        //����������canvas���ĵ�ĽǶ�
        var dx = x - width / 2,
            dy = y - height / 2,
            dd = Math.sqrt(dx * dx + dy * dy),
            acos = Math.acos(dx / dd);
        //��Ϊacos���յĲ�����-1~1.����������Ļ���Ҳ����0-PI,���ʺϵ�ǰ0-2PI(360��)���趨.������Ҫ���������180��ʱ��,Ҳ����dy<0��ʱ��,ȡ180�ȵĶԽ�.
        if (dy >= 0) {
            window.particleCanvasMouseAngle = acos * 180 / Math.PI >> 0;
        } else {
            window.particleCanvasMouseAngle = 180 - (acos * 180 / Math.PI) + 180 >> 0;
        }
    }
    /*Ĭ�ϲ���*/
    particleCanvas.defaultParameter = {
        area: {
            leftTop: [0, 0],
            rightBottom: [null, null]
        },
        number: 50, //������
        type: {
            typeName: 'circle'
        },
        rota: {
            value: 0,
            speed: 0,
            floatValue: 100,
            floatSpeed: .1
        },
        zoom: {
            min: 1,
            max: 1
        },
        reIn: 'reverseDirection',
        color: "#FF4040", //����ɫ,֧��16����/RGB/RGBA
        size: { //���С
            min: 2,
            max: 2
        },
        speed: { //�ƶ��ٶ�
            min: 4,
            max: 4
        },
        angle: { //�ƶ��Ƕ�
            value: 30,
            float: 0
        },
        op: {
            min: 1,
            max: 1
        },
        reverseDirection:null,//'replaceInitPosition',
        respondMouse: 'off',
        flowAngle: 'off', //on
        delayFill:'undefined'
    };
    /*����ӿ�*/
    window.particleCanvas = particleCanvas;
    /*����requestAnimationFrame������*/
    window.rAF = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    /*����ie8����֧��canvas*/
    (function () {
        if (!document.createElement('canvas').getContext) {
            //����canvas��ǩ,�Ա�IE8���������ʶ��
            document.createElement('canvas');
            //��excanvas���뵽head����
            var sci_excanvas = document.createElement('script');
            sci_excanvas.src = 'js/excanvas.js';
            document.getElementsByTagName('head')[0].appendChild(sci_excanvas);
        }
    })();
})(window);