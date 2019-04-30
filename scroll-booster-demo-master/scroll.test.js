(function() {
  var viewportEl = document.querySelector("#scroll .wrapper");
  var scr;

  scr = new ScrollBooster({
    viewport: viewportEl,
    emulateScroll: true,
    onUpdate: function(data) {
      console.log(data.position.y);
      console.log(data.position.x);
      viewportEl.scrollTop = data.position.y;
      viewportEl.scrollLeft = data.position.x;
    }
  });
  scr.setPosition({ x: 100, y: 100 });
})();
