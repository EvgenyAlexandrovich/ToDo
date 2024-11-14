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

let listTasks = [
    {
        id: "52465465",
        note: `Lorem ipsum dolor sit amet consectetur adipisicing
    elit. Laudantium, eaque`,
        status: STATUSES.TO_DO,
        priority: PRIORITIES.HIGH,
    },
    {
        id: "54553",
        note: `Artem ipsum dolor sit amet consectetur adipisicing
    elit. Laudantium, eaque`,
        status: STATUSES.DONE,
        priority: PRIORITIES.HIGH,
    },
    {
        id: "5246546536546",
        note: `Lorem ipsum dolor sit amet consectetur adipisicing
    elit. Laudantium, eaque`,
        status: STATUSES.TO_DO,
        priority: PRIORITIES.LOW,
    },
    {
        id: "54552134233",
        note: `Artem ipsum dolor sit amet consectetur adipisicing
    elit. Laudantium, eaque`,
        status: STATUSES.TO_DO,
        priority: PRIORITIES.LOW,
    },
];

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

const addTask = (form, list, priority, e) => {
    e.preventDefault();
    const inputElement = form.querySelector(".mainInput");
    try {
        if (inputElement.value === "") {
            throw new Error("Поле ввода не может быть пустым");
        }
    } catch (e) {
        console.error(e.message);
        alert(e.message);
    }

    list.push({
        id: idGenerator(),
        note: inputElement.value,
        status: STATUSES.TO_DO,
        priority,
    });
    renderList(list);
    inputElement.value = "";
};

formHigh.addEventListener("submit", (e) => {
    addTask(formHigh, listTasks, PRIORITIES.HIGH, e);
});

renderList(listTasks);

formLow.addEventListener("submit", (e) => {
    addTask(formLow, listTasks, PRIORITIES.LOW, e);
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
