class MyApp extends React.Component{
  constructor(props){
    super(props);
    this.state={
      input:"",
      currentPage:"All",
      todo: [{"details": "Do coding challenges 1", "completed": "false"},{"details": "Do coding challenges 2", "completed": "false"},{"details": "Do coding challenges 3", "completed": "true"},{"details": "Do coding challenges 4", "completed": "true"}],
    }; 
    this.handlePage=this.handlePage.bind(this);
    this.showPage=this.showPage.bind(this);
    this.showInput=this.showInput.bind(this);
    this.showDelete=this.showDelete.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleCheckbox=this.handleCheckbox.bind(this);
    this.handleDelete=this.handleDelete.bind(this);
    this.handleDeleteAll=this.handleDeleteAll.bind(this);
  }
  
  handlePage(event){
   this.setState({
      currentPage : event.target.id,
    });
  }
  
  showPage(){
    switch(this.state.currentPage){
      case "Active":
      return <ListBoxActive 
      todo={this.state.todo} 
      currentPage={this.state.currentPage}
      handleCheckbox={this.handleCheckbox}
      handleDelete={this.handleDelete}
      />;
      break;
      case "Completed":
      return <ListBoxCompleted
      todo={this.state.todo} 
      currentPage={this.state.currentPage}
      handleCheckbox={this.handleCheckbox}
      handleDelete={this.handleDelete}
      />;
      break;
      default:
      return <ListBox 
      todo={this.state.todo} 
      currentPage={this.state.currentPage}
      handleCheckbox={this.handleCheckbox}
      handleDelete={this.handleDelete}
      />;
    }
  }
  
  showInput(){
    if(this.state.currentPage == "Completed"){
      return null;
    }else{
      return <Input 
               input={this.state.input} 
               handleChange={this.handleChange} 
               handleSubmit={this.handleSubmit}
             />;
    }
  }
  
  showDelete(){
    if(this.state.currentPage == "Completed"){
      return <Delete handleDeleteAll={this.handleDeleteAll}/>;
    }else{
      return null;
    }
  }
  
  handleChange(event){
    this.setState({
      input:event.target.value
    });
  }
  
  handleSubmit(event){
    event.preventDefault();
    let newItem = {
      "details": this.state.input, 
      "completed": "false"
    };
    if(this.state.input != ""){
      this.setState({
        todo: this.state.todo.concat(newItem),
        input:""
      });
    } 
  }
  
  handleCheckbox(event){
    const index = event.target.id.substr(6);
    const newTodo = this.state.todo;
    newTodo[index].completed = event.target.checked.toString();
    this.setState({
         todo: newTodo,
    });
  }
  
  handleDelete(event){
    const index = event.target.id.substr(6);
    const newTodo = this.state.todo;
    newTodo.splice(index,1);
    this.setState({
         todo: newTodo,
    });
  }
  
  handleDeleteAll(){
    console.log("deleteAll")
    const newTodo = this.state.todo.filter(item => item.completed == "false");
    this.setState({
         todo: newTodo,
    });
  }
  
    render(){
     const className = (id)=>(this.state.currentPage == id)? "todo-btn todo-btn-active": "todo-btn";
    return(
 <div>
 <h1>#todo</h1>
 <div class="todo-options">
 <button class={className("All")} onClick={this.handlePage} id="All">
   All
   </button>
 <button class={className("Active")} onClick={this.handlePage} id="Active">
   Active
   </button>
 <button class={className("Completed")} onClick={this.handlePage} id="Completed">
   Completed
   </button>
 </div>
 <div  class="all-box">
     {this.showInput()}
     {this.showPage()}
     {this.showDelete()}
 </div>
 </div>
)
}
}

class Input extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <form class="input-box" onSubmit={this.props.handleSubmit}>
      <input 
        class="add-details" 
        placeholder="add details" 
        value={this.props.input} 
        onChange={this.props.handleChange}
      />
      <button class="add-btn" type="submit">Add</button>
    </form>
    )
  }
}

class ListBox extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <ul class="all-list" id="all-list">
        {this.props.todo.map(
          (item, index) => (item.completed == "true")?
          <List 
            completed={true} 
            details={item.details} 
            currentPage={this.props.currentPage} 
            handleCheckbox={this.props.handleCheckbox}
            index={index}
            handleDelete={this.props.handleDelete}
            /> :
          <List completed={false} 
            details={item.details} 
            currentPage={this.props.currentPage} 
            handleCheckbox={this.props.handleCheckbox}
            index={index}
            handleDelete={this.props.handleDelete}
            />                               
          )
        }
     </ul>
    )
  }
}

class ListBoxActive extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <ul class="all-list" id="all-list">
        {this.props.todo.map(
          (item, index) => (item.completed == "true")?
          null:
          <List 
            completed={false} 
            details={item.details} 
            currentPage={this.props.currentPage} 
            handleCheckbox={this.props.handleCheckbox}
            index={index}
            handleDelete={this.props.handleDelete}
            />                               
          )
        }
     </ul>
    )
  }
}

class ListBoxCompleted extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <ul class="all-list" id="all-list">
        {this.props.todo.map(
          (item, index) => (item.completed == "true")?
          <List 
            completed={true} 
            details={item.details} 
            currentPage={this.props.currentPage} 
            handleCheckbox={this.props.handleCheckbox}
            index={index}
            handleDelete={this.props.handleDelete}
            /> :
          null                               
          )
        }
     </ul>
    )
  }
}

class List extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    const className = (this.props.currentPage == "Completed")?"delete-btn":"delete-btn hidden";
    const detailID = "detail"+ this.props.index;
    const deleteID = "delete"+ this.props.index;
    return(
<li>
<input 
  type="checkbox" 
  class="checkbox" 
  defaultChecked={this.props.completed} 
  onClick={this.props.handleCheckbox}
  id={detailID}
/>
<label class="label">{this.props.details}</label>
<button 
  class={className}
  onClick={this.props.handleDelete}  
  title="Delete">
<span class="material-icons-outlined delete-list-icon" id={deleteID}>delete</span>  
</button>
</li>
    )
  }
}


class Delete extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <button class="delete-all-btn" onClick={this.props.handleDeleteAll}>
      <span class="material-icons-outlined delete-btn-icon">
        delete
      </span>
      delete all
      </button>
    )
  }
}

ReactDOM.render(<MyApp />, document.getElementById('myApp'));
