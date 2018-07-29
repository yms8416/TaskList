var yms = {
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
            title: ""
        };
    },
    methods: {
        addNew: function () {
            var task = yms.helpers.createTask(this.title);
            if (!task.title) {
                return;
            }
            this.tasks.push(task);
            this.title = "";
        },
        remove: function (index) {
            this.tasks.splice(index, 1);
        },
        sendToInProgress: function (index, task) {
            this.$parent.saveToInProgress(task)
            this.tasks.splice(index, 1);
        }
    },
    mounted: function () {
        var self = this;
        self.$parent.$on("onSentToToDo", function (task) {
            self.tasks.push(task);
        });
    }
});
yms.components.inProgress = Vue.component("yms-inprogress", {
    template: '#tmpInprogress',
    data: function () {
        return {
            tasks: []
        };
    },
    methods: {
        sendToToDo: function (index, task) {
            this.$parent.saveToToDo(task);
            this.tasks.splice(index, 1);
        },
        sendToDone: function (index, task) {
            this.$parent.saveToDone(task);
            this.tasks.splice(index, 1);
        }
    },
    mounted: function () {
        var self = this;
        self.$parent.$on("onSentToInProgress", function (task) {
            self.tasks.push(task);
        });
    }
});
yms.components.done = Vue.component("yms-done", {
    template: '#tmpDone',
    data: function () {
        return {
            tasks: []
        };
    },
    methods: {
        sendToInProgress: function (index, task) {
            this.$parent.saveToInProgress(task);
            this.tasks.splice(index, 1);
        },
        finish: function (index, task) {
            this.$parent.sendToArchive(task);
            this.tasks.splice(index, 1);
        }
    },
    mounted: function () {
        var self = this;
        self.$parent.$on("onSentToDone", function (task) {
            self.tasks.push(task);
        });
    }
});
yms.components.archive = Vue.component("yms-archive", {
    template: '#tmpArchive',
    data: function () {
        return {
            tasks: [],
            isVisible: false,
            buttonText : "Arşivi Göster"
        };
    },
    methods: {
        toggleArchive: function () {
            this.isVisible = !this.isVisible;
            if (this.isVisible) {
                this.buttonText = "Arşivi Gizle";
            }
            else {
                this.buttonText = "Arşivi Göster";
            }
        }
    },
    mounted: function () {
        var self = this;
        self.$parent.$on("onSentToArchive", function (task) {
            self.tasks.push(task);
        });
    }
});
new Vue({
    el: "#taskList",
    methods: {
        saveToInProgress: function (task) {
            this.$emit("onSentToInProgress", task);
        },
        saveToToDo: function (task) {
            this.$emit("onSentToToDo", task);
        },
        saveToDone: function (task) {
            this.$emit("onSentToDone", task);
        },
        sendToArchive: function (task) {
            this.$emit("onSentToArchive", task);
        }
    }
});