var resizeableImage = function(image_target) {
  // Some variable and settings
  var $container,
    event_state = {},
    init = function() {
      $(image_target).wrap('<div class="resize-container"></div>');

      // Assign the container to a variable
      $container = $(image_target).parent(".resize-container");

      // Add events
      $container.on("mousedown", "img", startMoving);
    };

  saveEventState = function(e) {
    // Save the initial event details and container state
    event_state.container_width = $container.width();
    event_state.container_height = $container.height();
    event_state.container_left = $container.offset().left;
    event_state.container_top = $container.offset().top;
    event_state.mouse_x = (e.clientX || e.pageX) + $(window).scrollLeft();
    event_state.mouse_y = (e.clientY || e.pageY) + $(window).scrollTop();

    event_state.evnt = e;
  };

  startMoving = function(e) {
    e.preventDefault();
    e.stopPropagation();
    saveEventState(e);
    $(document).on("mousemove", moving);
    $(document).on("mouseup", endMoving);
  };

  endMoving = function(e) {
    e.preventDefault();
    $(document).off("mousemove", moving);
    $(document).off("mouseup", endMoving);
  };

  moving = function(e) {
    var mouse = {},
      touches;
    e.preventDefault();
    e.stopPropagation();

    touches = e.originalEvent.touches;

    mouse.x = (e.clientX || e.pageX || touches[0].clientX) + $(window).scrollLeft();
    mouse.y = (e.clientY || e.pageY || touches[0].clientY) + $(window).scrollTop();

    $container.offset({
      left: mouse.x - (event_state.mouse_x - event_state.container_left),
      top: mouse.y - (event_state.mouse_y - event_state.container_top)
    });
  };

  init();
};

// Kick everything off with the target image
resizeableImage($(".resize-image"));
