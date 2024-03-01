"use strict";
class TaskManager {
  constructor(tasksInfo, id, callback) {
    this.id = id;
    this.callback = callback;
    this.tasks = tasksInfo;
  }

  render(date) {
    document.getElementById(this.id).innerHTML = "";
    let prevButton = document.createElement("button");
    prevButton.innerHTML = "Prev";
    prevButton.addEventListener("click", () => {
      this.render(new Date(date - 8 * 24 * 60 * 60 * 1000));
    });

    let dateview = document.createElement("h2");
    dateview.innerHTML = date.toLocaleDateString("pt-PT");

    let nextButton = document.createElement("button");
    nextButton.innerHTML = "Next";
    nextButton.addEventListener("click", () => {
      this.render(new Date(date.getTime() + 8 * 24 * 60 * 60 * 1000));
    });
    document.getElementById(this.id).appendChild(prevButton);
    document.getElementById(this.id).appendChild(dateview);
    document.getElementById(this.id).appendChild(nextButton);

    let tasklist = [];
    for (let i = 0; i < this.tasks.length; i++) {
      if (
        this.tasks[i].dueDate - date < 7 * 24 * 60 * 60 * 1000 &&
        this.tasks[i].dueDate - date > -1
      ) {
        tasklist.push(this.tasks[i]);
      }
    }

    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    for (let i = date.getDay(); i <= 7; i++) {
      let day = i % 7;

      let dayHeader = document.createElement("h3");
      dayHeader.textContent = weekday[day];
      document.getElementById(this.id).appendChild(dayHeader);
      let listofTasks = document.createElement("ul");

      for (let i = 0; i < tasklist.length; i++) {
        if (tasklist[i].dueDate.getDay() === day) {
          let individualTask = document.createElement("li");
          individualTask.textContent = tasklist[i].name;
          individualTask.addEventListener("click", () => {
            this.callback(tasklist[i]);
          });
          listofTasks.appendChild(individualTask);
        }
      }
      document.getElementById(this.id).appendChild(listofTasks);
    }
  }
}
