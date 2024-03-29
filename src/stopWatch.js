const stopWatch = {
  fromTime: 0,
  toTime: null,
  timeList: [],
  start: () => {
    stopWatch.fromTime = new Date();
    stopWatch.interval = setInterval(stopWatch.print, 1000);
  },
  print: () => {
    stopWatch.toTime = new Date();
    var diff = (stopWatch.toTime - stopWatch.fromTime) / 1000;
    if (diff > 1000)
      stopWatch.stop();
    return diff;
  },
  stop: () => {
    clearInterval(stopWatch.interval);
  }
}

export default stopWatch
