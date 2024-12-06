import data from "./tasks.json" with { type: "json" };

let listTasks = data.notes

const formHigh = document.querySelector(".inputWrapper");
const highBlock = document.querySelector(".highPriority");
const formLow = document.querySelector(".inputWrapperLow");
const lowBlock = document.querySelector(".lowPriority");

function idGenerator() {
    return Math.random().toFixed(6);
}

const LIST_BLOCKS = [{ HIGH: highBlock }, { LOW: lowBlock }];

const STATUSES = {
    TO_DO: "TO_DO",
    DONE: "DONE",
};

const PRIORITIES = {
    HIGH: "HIGH",
    LOW: "LOW",
};

const renderList = (listNote) => {
    const injectHTML = {
        HIGH: "",
        LOW: "",
    };

    listNote.forEach((el) => {
        const classNameText = el.status !== STATUSES.TO_DO ? "done" : "";
        const inputEl =
            el.status !== STATUSES.TO_DO
                ? `<input id="status" class="checkbox" type="checkbox" checked/>`
                : `<input id="status" class="checkbox" type="checkbox"/>`;
        const classNote =
            el.status !== STATUSES.TO_DO ? "note noteDone" : "note";
        injectHTML[el.priority] += `<div class="${classNote}" id=${el.id}>
                    <div>
                    ${inputEl}
                    </div>
                    <div class="text ${classNameText}">
                        ${el.note}
                    </div>
                    <button
                        id="btnDeleteTask"
                        class="btnDeleteTask">
                    </button>
                </div>`;
    });

    LIST_BLOCKS.forEach((block) => {
        const keys = Object.keys(block);
        const lowOrHigh = keys[0];
        block[lowOrHigh].innerHTML = injectHTML[lowOrHigh];
    });
};

renderList(listTasks);

const addTask = (form, list, priority) => {
    const inputElement = form.querySelector(".mainInput");
    const task = new Task(inputElement.value, priority)
    list.push(task)
    renderList(list);
    inputElement.value = "";
}

function Task (value, priority) {
    try {
        if (value === "" || value.trim() === '') {
            throw new Error("Поле ввода не может быть пустым");
        }
    } catch (e) {
        console.error(e.message);
        return alert(e.message);
    }
    this.id = idGenerator()
    this.note = value
    this.status = STATUSES.TO_DO
    this.priority = priority
}

formHigh.addEventListener("submit", (e) => {
    e.preventDefault();
    addTask(formHigh, listTasks, PRIORITIES.HIGH);
});

renderList(listTasks);

formLow.addEventListener("submit", (e) => {
    e.preventDefault();
    addTask(formLow, listTasks, PRIORITIES.LOW);
});

const deleteTask = (target) => {
    if (target.id === "btnDeleteTask") {
        const currentId = target.parentElement.id;
        listTasks = listTasks.filter((note) => note.id !== currentId);
        renderList(listTasks);
    }
};

const changeStatus = (target) => {
    if (target.id === "status") {
        const noteId = target.parentElement.parentElement.id;
        listTasks.forEach((note) => {
            if (note.id === noteId) {
                note.status =
                    note.status === STATUSES.TO_DO
                        ? STATUSES.DONE
                        : STATUSES.TO_DO;
            }
        });
        renderList(listTasks);
    }
};

highBlock.addEventListener("click", (e) => {
    deleteTask(e.target);
    changeStatus(e.target);
});

lowBlock.addEventListener("click", (e) => {
    deleteTask(e.target);
    changeStatus(e.target);
});
