// 创建一个悬浮窗口显示时间
var window = floaty.window(
    <frame>
      <frame id="background" bg="#FFFFFF" alpha="0.5"/>
      <frame gravity="center">
        <text id="timeText" text="00:00:00.000" textColor="black" textSize="24sp"/>
      </frame>
    </frame>
  );
  
  // 记录触摸开始时的位置
  var startX, startY;
  
  // 设置文本框的触摸事件监听器
  window.timeText.setOnTouchListener(function(view, event) {
      switch (event.getAction()) {
          case event.ACTION_DOWN: // 触摸按下事件
              // 记录按下时的位置
              startX = event.getRawX();
              startY = event.getRawY();
              return true; // 返回true表示该事件被处理，不再传递给其他事件监听器
  
          case event.ACTION_MOVE: // 触摸移动事件
              // 计算偏移量
              var offsetX = event.getRawX() - startX;
              var offsetY = event.getRawY() - startY;
  
              // 更新窗口位置
              window.setPosition(window.getX() + offsetX, window.getY() + offsetY);
  
              // 更新开始位置为当前位置，以备下次移动计算
              startX = event.getRawX();
              startY = event.getRawY();
              return true;
  
          default:
              return false; // 其他事件不处理，返回false
      }
  });
  

// 定时更新时间显示
setInterval(() => {
damaiTimestamp = getDamaiTimestamp();
damaiTimestamp = parseInt(damaiTimestamp, 10); // 将字符串时间戳转换为数值
ui.run(() => {
    window.timeText.setText(TimestampToDate(damaiTimestamp));
});
}, 50); // 每毫秒更新一次


//获取大麦服务器时间戳
/**
 * @returns 大麦服务器时间戳
 */
function getDamaiTimestamp() {
    return JSON.parse(http.get("https://mtop.damai.cn/gw/mtop.common.getTimestamp/", {
        headers: {
            'Host': 'mtop.damai.cn',
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': '*/*',
            'User-Agent': 'floattime/1.1.1 (iPhone; iOS 15.6; Scale/3.00)',
            'Accept-Language': 'zh-Hans-CN;q=1, en-CN;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive'
        }
    }).body.string()).data.t;
}



function TimestampToDate(damaiTimestamp){
    const date = new Date(damaiTimestamp);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

    const timeWithMilliseconds = `${hours}:${minutes}:${seconds}.${milliseconds}`;
    return timeWithMilliseconds;
}




