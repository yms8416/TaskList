﻿var yms = {
    components: {},
    models: {
        task: {
            id: 0,
            title: ""
        }
    },
    helpers: {
        increment: function () {
            return ++yms.index;
        },
        createTask: function (t) {
            var newTask = Object.create(yms.models.task);
            newTask.id = yms.helpers.increment();
            newTask.title = t;
            return newTask;
        }
    },
    index: 0
};

yms.components.todo = Vue.component("yms-todo", {
    template: '#tmpTodo',
    data: function () {
        return {
            tasks: [],
            title : ""
        };
    },
    methods: {
        addNew: function () {
            var task = yms.helpers.createTask(this.title);
            this.tasks.push(task);
            this.title = "";
        }
    }
});
yms.components.inProgress = Vue.component("yms-inprogress", {
    template: '#tmpInprogress'
});

yms.components.done = Vue.component("yms-done", {
    template: '#tmpDone'
});

new Vue({
    el: "#taskList"
});