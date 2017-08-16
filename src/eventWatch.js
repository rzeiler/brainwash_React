class eventWatch {

  constructor(keyData, callBack) {
    /* key object */
    this.keyData = keyData;
    this.setEventWatcher();
    this.callBack = callBack;
  }

  setEventWatcher() {
    document.addEventListener("keydown", this.eventKeyDown.bind(this));
  }

  eventKeyDown(event) {
    var kc = event.keyCode,
      res2 = null;
    for (var Item of this.keyData) {
      for (var Code of Item.keyCode) {
        if (Code === kc) {
          res2 = Item;
        }
      }
    }
    if (res2) {
      this.callBack(res2);
      event.stopPropagation();
    }
  }

}

export default eventWatch
