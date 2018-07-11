import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class UsersStore extends EventEmitter {
    constructor(){
        super()
        this.user; 
        this.posts;
        this.todos;
    }


    async buildUser(id){
        let data = {};
      
        const responseUser = await fetch('https://jsonplaceholder.typicode.com/users/' + id);
        data.user = await responseUser.json();
        this.user = data.user;
      
        const responsePost = await fetch('https://jsonplaceholder.typicode.com/posts?userId=' + id);
        data.post = await responsePost.json();
        this.posts = data.post;
      
        const responseToDos = await fetch('https://jsonplaceholder.typicode.com/todos?userId=' + id);
        data.todos = await responseToDos.json();
        this.todos = data.todos;
      
        return await data;
    }
    
    insertPost(id, title, text){
        this.posts.push({
            userId: id,
            id: this.posts.length + 1,
            title: title,
            text: text
        });

        this.emit("postChange");
    }

    insertTodo(id, title, completed){
        this.todos.push({
            userId: id,
            id: this.todos.length + 1,
            title: title,
            completed: completed
        })

        this.emit("todoChange");
    }

    getPosts(){
        return this.posts;
    }

    getTodos(){
        return this.todos;
    }

    handleActions(action){
        switch(action.type){
            case "INSERT_POST": {
                this.insertPost(action.id, action.title, action.text);
                break;
            }
            case "INSERT_TODO": {
                this.insertTodo(action.id, action.title, action.completed);
                break;
            }
        }
    }
}

const usersStore = new UsersStore;
dispatcher.register(usersStore.handleActions.bind(usersStore));

window.usersStore = usersStore;
export default usersStore;