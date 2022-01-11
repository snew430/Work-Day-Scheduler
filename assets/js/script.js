var tasks = [];

// ==============STATE THE CURRENT DATE=============

// Timer at the top================WORKS
$(document).ready(function () {
  $("#currentDay").text("Today is " + moment().format("MMM Do YY"));
});

// ==============================================

// ==============SAVE THE CALENDAR INFO=============

var saveTask = function () {
  var textToSave = $(this).siblings("textarea").val();
  var textId = $(this).siblings("textarea").attr("id");

  var taskToSave = {
    text: textToSave,
    id: textId,
  };

  tasks.push(taskToSave);

  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// ==============================================

// ==============LOAD TASK======================

var loadTasks = function () {

  tasks = JSON.parse(localStorage.getItem("tasks"));

  // if nothing in localStorage, create a new object to track all task status arrays
  if (!tasks) {
    tasks = [];
  }

  $(tasks).each(function(index) {
    console.log(tasks[index].id)
    $("#"+tasks[index].id).val(tasks[index].text)
  })


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

// ========AUDIT THE TASKS EVERY 15 MINUTES=======WORKS
setInterval(function () {
  $(".time-block .event-info").each(function (index, el) {
    auditTask(el);
  });
}, 180000);
// ==============================================

$(".saveBtn").on("click", saveTask);

loadTasks();