var yms = {
    components: {}
};

yms.components.todo = Vue.component("yms-todo", {
    template: '#tmpTodo'
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