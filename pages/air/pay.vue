<template>
  <div class="container">
    <div class="main">
      <div class="pay-title">
        支付总金额
        <span class="pay-price">￥ {{$store.state.air.totalPrice}}</span>
      </div>
      <div class="pay-main">
        <h4>微信支付</h4>
        <el-row type="flex" justify="space-between" align="middle" class="pay-qrcode">
          <div class="qrcode">
            <!-- 二维码 -->
            <canvas id="qrcode-stage"></canvas>
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay-example">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt />
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode"; //引入生成二维码插件
export default {
  data() {
    return {
      // 订单详情
      orderData: {},
      timer: false //定时器
    };
  },
  methods: {
    //   轮询
    //   每个3秒验证是否已支付
    checkPay() {
      this.timer = setInterval(() => {
        this.$axios({
          url: "/airorders/checkpay",
          method: "POST",
          headers: {
            // Bearer是token字符串前面必须要声明的，后面加上空格，再连接上token
            Authorization: "Bearer " + this.$store.state.user.userInfo.token
          },
          data: {
            id: this.orderData.id, // 订单id
            nonce_str: this.orderData.price, // 订单的金额
            out_trade_no: this.orderData.orderNo // 订单编号
          }
        }).then(res => {
          if (res.data.statusTxt !== "订单未支付") {
            this.$alert("支付成功", "提示");
            // 停止定时器
            clearInterval(this.timer);
          }
        });
      }, 3000);
    }
  },
  mounted() {
    //  获取订单数据
    // 获取id
    const { id } = this.$route.query;
    //  因发送请求需从本地拿取Authorization，而mounted在组件一加载就会执行，不能保证拿取Authorization更快，
    //  为保证先拿取到Authorization，给发送请求添加一个定时器
    setTimeout(() => {
      this.$axios({
        url: "/airorders/" + id,
        headers: {
          // Bearer是token字符串前面必须要声明的，后面加上空格，再连接上token
          Authorization: "Bearer " + this.$store.state.user.userInfo.token
        }
      }).then(res => {
        // 订单详情
        this.orderData = res.data;
        //   生成二维码
        var msg = document.getElementById("qrcode-stage");
        var val = this.orderData.payInfo.code_url;
        QRCode.toCanvas(msg, val);
      });
    }, 1);
    // 判断是否支付成功
    this.checkPay();
  },
  //   生命周期函数，组件卸载时触发
  destroyed() {
    // 退出该页面时停止定时器
    clearInterval(this.timer);
  }
};
</script>

<style scoped lang="less">
.container {
  background: #f5f5f5;
  padding: 30px 0;
  .main {
    width: 1000px;
    margin: 0 auto;
    .pay-title {
      text-align: right;
      span {
        font-size: 28px;
        color: orangered;
      }
    }
    .pay-main {
      background: #fff;
      margin-top: 10px;
      border-top: 5px orange solid;
      padding: 30px;
      h4 {
        font-size: 28px;
        font-weight: normal;
        margin-bottom: 10px;
      }
      .pay-qrcode {
        padding: 0 80px;
      }
      .qrcode {
        border: 1px #ddd solid;
        padding: 15px;
        height: fit-content;
        #qrcode-stage {
          width: 200px;
          height: 200px;
          margin-bottom: 10px;
        }
        p {
          line-height: 2;
          text-align: center;
        }
      }
    }
  }
}
</style>