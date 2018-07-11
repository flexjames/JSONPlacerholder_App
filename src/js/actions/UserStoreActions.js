import dispatcher from "../dispatcher";

export function insertPost(id, title, text){
    dispatcher.dispatch({
        type: "INSERT_POST",
        id: id,
        title: title,
        text: text
    });
}

export function insertTodo(id, title, completed){
    dispatcher.dispatch({
        type: "INSERT_TODO",
        id: id,
        title: title,
        completed: completed
    });
}