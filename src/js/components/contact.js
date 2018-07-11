import React, { Component } from "react";
import UserStore from "../stores/UserStore"
import * as UserStoreActions from "../actions/UserStoreActions";
 
export default class Home extends Component {
  constructor(){
    super()
    this.state = {
      user: {},
      posts: [],
      todos: [],
      show: false,
      ptitle: '',
      ttitle: '',
      text: '',
      completed: '',
      spbb: '',
      lpbb: '',
      spbt: '',
      lpbt: '',
      stbt: '',
      ltbt: ''
    };

    this.changeParams = this.changeParams.bind(this);
    this.clear = this.clear.bind(this);
    this.getPosts = this.getPosts.bind(this);
    this.getTodos = this.getTodos.bind(this);
  }

  componentWillMount(){
    UserStore.on("postChange", this.getPosts)
    UserStore.on("todoChange", this.getTodos);

    UserStore.buildUser(5)
    .then((data) => {
      this.setState({
        ['user']: data.user,
        ['posts']: data.post,
        ['todos']: data.todos
      })
    })
  }

  componentWillUnmount() {
    UserStore.removeListener("postChange", this.getPosts);
    UserStore.removeListener("todoChange", this.getTodos);
  }

  getPosts(){
    this.setState({
      ['posts']: UserStore.getPosts()
    })
  }

  getTodos(){
    this.setState({
      ['todos']: UserStore.getTodos()
    })
  }

  changeParams(e){
    this.setState({
      [e.target.id]: e.target.value
    },() => console.log(this.state))
  }

  addPost() {
    UserStoreActions.insertPost(5, this.state.ptitle, this.state.text);
  }

  addTodo() {
    UserStoreActions.insertTodo(5, this.state.ttitle, this.state.completed)
  }

  clear(){
    this.setState({
      ['spbb']: '',
      ['lpbb']: '',
      ['spbt']: '',
      ['lpbt']: '',
      ['stbt']: '',
      ['ltbt']: '',
      ['show']: false
    })
  }

  smallestPostByBody(){
    if(this.state.show){
      this.clear();
    }else{
      let index = 0;
      let length = 0;

      this.state.posts.forEach((post, idx) => {
          if(idx == 0){
              index = 0;
              length = post.body.length;
          }else{
              if(post.body.length < length){
                  index = idx;
                  length = post.body.length;
              }
          }
      })

      this.setState({
        ['spbb']: this.state.posts[index],
        ['show']: true
      }, () => {
        console.log(this.state.spbb)
      });
    }
  }

  smallestPostByTitle(){
    if(this.state.show){
      this.clear();
    }else{
      let index = 0;
      let length = 0;

      this.state.posts.forEach((post, idx) => {
          if(idx == 0){
              index = 0;
              length = post.title.length;
          }else{
              if(post.title.length < length){
                  index = idx;
                  length = post.title.length;
              }
          }
      })

      this.setState({
        ['spbt']: this.state.posts[index],
        ['show']: true
      }, () => {
        console.log(this.state.spbt)
      });
    }
  }

  smallestTodoByTitle(){
    if(this.state.show){
      this.clear();
    }else{
      let index = 0;
      let length = 0;

      this.state.todos.forEach((todo, idx) => {
          if(idx == 0){
              index = 0;
              length = todo.title.length;
          }else{
              if(todo.title.length < length){
                  index = idx;
                  length = todo.title.length;
              }
          }
      })

      this.setState({
        ['stbt']: this.state.todos[index],
        ['show']: true
      }, () => {
        console.log(this.state.stbt)
      });
    }
  }

  longestPostByBody(){
    if(this.state.show){
      this.clear();
    }else{
      let index = 0;
      let length = 0;

      this.state.posts.forEach((post, idx) => {
          if(idx == 0){
              index = 0;
              length = post.body.length;
          }else{
              if(post.body.length > length){
                  index = idx;
                  length = post.body.length;
              }
          }
      })

      this.setState({
        ['lpbb']: this.state.posts[index],
        ['show']: true
      }, () => {
        console.log(this.state.ltbt)
      });
    }
  }

  longestPostByTitle(){
    if(this.state.show){
      this.clear();
    }else{
      let index = 0;
      let length = 0;

      this.state.posts.forEach((post, idx) => {
          if(idx == 0){
              index = 0;
              length = post.title.length;
          }else{
              if(post.title.length > length){
                  index = idx;
                  length = post.title.length;
              }
          }
      })

      this.setState({
        ['lpbt']: this.state.posts[index],
        ['show']: true
      }, () => {
        console.log(this.state.spbb)
      });
    }
  }

  longestTodoByTitle(){
    if(this.state.show){
      this.clear();
    }else{
      let index = 0;
      let length = 0;

      this.state.todos.forEach((todo, idx) => {
          if(idx == 0){
              index = 0;
              length = todo.title.length;
          }else{
              if(todo.title.length > length){
                  index = idx;
                  length = todo.title.length;
              }
          }
      })

      this.setState({
        ['ltbt']: this.state.todos[index],
        ['show']: true
      }, () => {
        console.log(this.state.ltbt)
      });
    }
  }

  render(){
    const { user, posts, todos } = this.state;

    const spbbContent = this.state.show
      ? <div>
          <p>{this.state.spbb.title}</p>
          <p>{this.state.spbb.body}</p>
        </div>  
      : null;
    
      const lpbbContent = this.state.show
      ? <div>
          <p>{this.state.lpbb.title}</p>
          <p>{this.state.lpbb.body}</p>
        </div>  
      : null;

      const spbtContect = this.state.show
      ? <div>
          <p>{this.state.spbt.title}</p>
          <p>{this.state.spbt.body}</p>
        </div>  
      : null;

      const lpbtContent = this.state.show
      ? <div>
          <p>{this.state.lpbt.title}</p>
          <p>{this.state.lpbt.body}</p>
        </div>  
      : null;

      const stbtContent = this.state.show
      ? <div>
          <p>{this.state.stbt.title}</p>
        </div>  
      : null;

      const ltbtContent = this.state.show
      ? <div>
          <p>{this.state.ltbt.title}</p>
        </div>  
      : null;

    return (
      <div>
        <h2>{user.name}</h2>

         <div class="usersData">
            <h5>Posts</h5>
            <select id="posts">
            {
              posts.map(el => <option key={el.id} value={Object.values(el)}> {el.title} </option>)
            }
            </select> 
            <h5>Insert New Post Below</h5>
            Title: <input id="ptitle"  onChange={this.changeParams}/><br/>
            Text: <input id="text" onChange={this.changeParams}/><br/>
            <button class="btn btn-primary" onClick={this.addPost.bind(this)}> Add Post </button>
          </div>

          <div class="usersData">
            <h5>Todos</h5>
            <select id="todos">
            {
              todos.map(el => <option key={el.id} value={Object.values(el)}> {el.title} </option>)
            }
            </select> 
            <h5>Insert New Todo Below</h5>
            Title: <input id="ttitle"  onChange={this.changeParams}/><br/>
            Completed: <input id="completed" onChange={this.changeParams}/><br/>
            <button class="btn btn-success" onClick={this.addTodo.bind(this)}> Add Todo </button>
          </div>
          <br/>
          <br/>
          <button class="btn btn-danger" onClick={this.smallestPostByBody.bind(this)}>SmallestPostByBody</button>
          <button class="btn btn-danger" onClick={this.longestPostByBody.bind(this)}>LongestPostByBody</button>
          <button class="btn btn-danger" onClick={this.smallestPostByTitle.bind(this)}>SmallestPostByTitle</button>
          <button class="btn btn-danger" onClick={this.longestPostByTitle.bind(this)}>LongestPostByTitle</button>
          <button class="btn btn-danger" onClick={this.smallestTodoByTitle.bind(this)}>SmallestTodoByTitle</button>
          <button class="btn btn-danger" onClick={this.longestTodoByTitle.bind(this)}>LongestTodoByTitle</button>
          <div> 
            { spbbContent }
            { lpbbContent }
            { spbtContect }
            { lpbtContent }
            { stbtContent }
            { ltbtContent }
          </div>
      </div>
    )
  }
}
