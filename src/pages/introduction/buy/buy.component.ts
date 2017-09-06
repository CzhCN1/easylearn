import { Component, Input } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { AjaxService } from '../../../services/ajax.service';

declare var wx: any;

@Component({
    selector: 'buy',
    templateUrl: 'buy.component.html',
    providers: [AjaxService]
})
export class Buy {
    courseType: String;
    sellList: any;
    course: Object;
    @Input() courseIdx: any;
    @Input() inviteCode: String;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public ajax: AjaxService,
        public alertCtrl: AlertController
    ) {
        this.courseType = navParams.get('courseType');
        this.course = navParams.get("course");
        this.sellList = [];
        this.hasBuy(this.courseType);
        this.getSellCourse(this.courseType);
        
        wx.showAllNonBaseMenuItem();
    }

    hasBuy(courseType){
        let self =this;
        this.ajax.get("/hasBuy?courseType=" + courseType).then(data=>{
            console.log(data);
            if(data["success"]){
                if(data["result"]=="false"){
                //未购买
                }else{
                //已购买
                    let alert  = self.alertCtrl.create({
                        title: "信息",
                        subTitle: "您已购买过此课程，请勿重复购买。",
                        buttons: ["ok"]
                    });
                    alert.present();
                    self.navCtrl.pop();
                }
            }else{
                //用户未登录
            }
        });
    }


    //获取要卖的课程售价及信息
    getSellCourse(courseType){
        let self = this;
        this.ajax.get("/sellCourseList?courseType=" + courseType).then(data=>{
            console.log(data);
            self.sellList = data;
            self.courseIdx = 0;

        });
    }

    //发送购买课程的请求
    buyCourse(){
        let course = this.sellList[this.courseIdx];
        let price = course["coursePrice"];
        let courseId = course["id"];

        console.log("price="+price+"courseId="+courseId);
        console.log(this.inviteCode);
        let self = this;

        let appId = "wxd595883477646872";
        let nonceStr = self.randomWord(false,32,32);
        let signType = "MD5";
        let date = new Date();
        let timeStamp = Math.floor(date.getTime()/1000);
        let totalFee = price * 100;
        let url = "/payTest?appId=wxd595883477646872&nonceStr="+ nonceStr + "&timeStamp=" + timeStamp + "&totalFee=" + totalFee;
        
        //统一下单
        this.ajax.get(url).then(data=>{
            var packAge = data["packAge"];
            let sign = data["paySign"];
            //调用jssdk
            wx.chooseWXPay({
                timestamp: timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                nonceStr: nonceStr, // 支付签名随机串，不长于 32 位
                package: packAge, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                signType: signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: sign, // 支付签名
                success: function (res) {
                    // 支付成功后的回调函数
                    console.log("wxpay success");
                    self.ajax.get("/buyCourse?buyId=" + courseId + "&inviteCode=" + self.inviteCode).then(data=>{
                        console.log(data);
                        
                        let title = "",
                            subTitle = "";
                        //购买成功
                        if(data["success"]){
                            title = "成功";
                            subTitle = "购买成功，请等待每晚八点的课程推送！";
                        }else{  ////购买失败
                            title = "失败";
                            subTitle = "课程购买失败，请您及时联系客服。";
                        }
            
                        let alert  = self.alertCtrl.create({
                            title: title,
                            subTitle: subTitle,
                            buttons: ["ok"]
                        });
                        alert.present();
                        self.navCtrl.pop();
                    });
                },
                fail: function(res) {
                    console.error("JSSDK支付调用失败！");
                }
            });
        });
    }

    //随机字符串生成
    randomWord(randomFlag, min, max){
        var str = "",
            range = min,
            arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    
        // 随机产生
        if(randomFlag){
            range = Math.round(Math.random() * (max-min)) + min;
        }
        for(var i=0; i<range; i++){
            let pos = Math.round(Math.random() * (arr.length-1));
            str += arr[pos];
        }
        return str;
    }
}