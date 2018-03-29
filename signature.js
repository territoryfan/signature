/**
 * Author:territory
 */
function Signature() {
  this.lineWidth = 1; // 设置线宽
  this.strokeStyle = "#000"; // 线条颜色
  this.signData = ''; // 结果

  this.init = function () {
    var thisObj = this;
    var canvas = document.getElementById('signature')

    // 获取画布宽高
    var _guaWidth = canvas.width;
    var _guaHeight = canvas.height;

    // 获取画布距离页面顶端和左端的距离
    var _leftSpace = canvas.offsetLeft;
    var _topSpace = canvas.offsetTop;

    if (canvas.getContext) {
      // 获取2D引擎
      var ctx = canvas.getContext('2d');

      ctx.clearRect(0, 0, _guaWidth, _guaHeight);

      // 配置约束
      ctx.lineWidth = thisObj.lineWidth
      ctx.strokeStyle = thisObj.strokeStyle

      canvas.addEventListener('touchstart', function (e) {
        e.preventDefault();
        var touchX = e.targetTouches[0].clientX - _leftSpace;
        var touchY = e.targetTouches[0].clientY - _topSpace;
        if (touchX >= 0 && touchX <= _guaWidth && touchY >= 0 && touchY <= _guaHeight) {
          thisObj.drawStart(ctx,touchX,touchY)
        }

      })
      canvas.addEventListener('touchend', function (e) {
        e.preventDefault();
        thisObj.drawEnd(canvas)
      })
      canvas.addEventListener('touchmove', function (e) {
        e.preventDefault();
        var touchX = e.targetTouches[0].clientX - _leftSpace;
        var touchY = e.targetTouches[0].clientY - _topSpace;
        if (touchX >= 0 && touchX <= _guaWidth && touchY >= 0 && touchY <= _guaHeight) {
          thisObj.drawMixin(ctx,touchX,touchY)
        }

      })

    }

  }
}
/**
 * 初始化坐标
 * 参数说明：
 * ctx : 画布引擎
 * touchX :  坐标X轴
 * touchY : 坐标Y轴
 */
Signature.prototype.drawStart = function (ctx,touchX,touchY) {
  ctx.beginPath();
  ctx.moveTo(touchX,touchY);
}
/**
 * 画线
 * 参数说明：
 * ctx : 画布引擎
 * touchX :  坐标X轴
 * touchY : 坐标Y轴
 */
Signature.prototype.drawMixin = function (ctx,touchX,touchY) {
  ctx.lineTo(touchX,touchY)
  ctx.stroke()
}
/**
 * 存储
 * 参数说明：
 * canvas : 画布
 */
Signature.prototype.drawEnd = function (canvas) {
  console.log(canvas.toDataURL())
}
