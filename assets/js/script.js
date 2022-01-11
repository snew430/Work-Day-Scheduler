var tasks = [];

// ==============STATE THE CURRENT DATE=============

// Timer at the top of the page
$(document).ready(function () {
  $("#currentDay").text("Today is " + moment().format("MMM Do YY"));
});

// ==============================================

// ==============SAVE THE CALENDAR INFO=============

var saveTask = function () {
  // save the text and the id
  var textToSave = $(this).siblings("textarea").val();
  var textId = $(this).siblings("textarea").attr("id");

  var taskToSave = {
    text: textToSave,
    id: textId,
  };

  // add the according text of the saved button pressed to the main array
  tasks.push(taskToSave);

  // push to local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// ==============================================

// ==============LOAD TASK======================

var loadTasks = function () {

  // pull the local storage
  tasks = JSON.parse(localStorage.getItem("tasks"));

  // if nothing in localStorage, create a new object to track all task status arrays
  if (!tasks) {
    tasks = [];
  }

  // For each task assign the text to the id
  $(tasks).each(function(index) {
    $("#"+tasks[index].id).val(tasks[index].text)
  })

  // check the initial time against the time-blocks
  $(".time-block .event-info").each(function (index, el) {
    auditTask(el);
  });

};

// ==============================================

// ==============AUDIT THE CALENDAR DATES EVERY 30 MINUTES=============WORKS

var auditTask = function (taskEl) {

  // Takes the current time and the ID of the textarea it is checking
  var currentTime = moment().format("HH");
  var time = $(taskEl).attr("id");

  // removes the past, present, and future classes
  $(taskEl).removeClass("past present future");

  // sets the appropriate class to the textarea depending on the current time
  if (time < currentTime) {
    $(taskEl).addClass("past");
    $(taskEl).prop("readonly", true);
  } else if (time === currentTime) {
    $(taskEl).addClass("present");
  } else if (time > currentTime) {
    $(taskEl).addClass("future");
  }
};

// ==============================================

// ========AUDIT THE TASKS EVERY 15 MINUTES=======

setInterval(function () {
  $(".time-block .event-info").each(function (index, el) {
    auditTask(el);
  });
}, 900000);

// ==============================================

$(".saveBtn").on("click", saveTask);

loadTasks();