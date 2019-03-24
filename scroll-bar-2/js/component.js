var draggableCanvas = function (canvas) {
  // Some variable and settings
  var $container,
    event_state = {},
    init = function () {
      $(canvas).wrap('<div class="canvas-container"></div>');

      // Assign the container to a variable
      $container = $(canvas).parent(".canvas-container");

      // Add events
      $container.on("mousedown", $("#canvas"), startMoving);
    };

  saveEventState = function (e) {
    // Save the initial event details and container state
    event_state.container_left = $container.offset().left;
    event_state.container_top = $container.offset().top;
    event_state.mouse_x = (e.clientX || e.pageX) + $(window).scrollLeft();
    event_state.mouse_y = (e.clientY || e.pageY) + $(window).scrollTop();

    event_state.evnt = e;
  };

  startMoving = function (e) {
    e.preventDefault();
    e.stopPropagation();
    saveEventState(e);
    $(document).on("mousemove", moving);
    $(document).on("mouseup", endMoving);
  };

  endMoving = function (e) {
    e.preventDefault();
    $(document).off("mousemove", moving);
    $(document).off("mouseup", endMoving);
  };

  moving = function (e) {
    var mouse = {};
    e.preventDefault();
    e.stopPropagation();

    mouse.x = (e.clientX || e.pageX) + $(window).scrollLeft();
    mouse.y = (e.clientY || e.pageY) + $(window).scrollTop();

    console.log({
      left: mouse.x - (event_state.mouse_x - event_state.container_left),
      top: mouse.y - (event_state.mouse_y - event_state.container_top)
    });

    // relative to the document http://api.jquery.com/offset/
    $container.offset({
      left: mouse.x - (event_state.mouse_x - event_state.container_left),
      top: mouse.y - (event_state.mouse_y - event_state.container_top)
    });
  };

  init();
};

// Kick everything off with the target image
draggableCanvas($("#canvas"));
