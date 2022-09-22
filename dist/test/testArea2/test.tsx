import { message } from '@tauri-apps/api/dialog';
import React from "react";
import ReactDOM from "react-dom/client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});  
}
  handleSubmit(event) {
    message('Le nom a été soumis : ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Nom :
          <input type="text" value={this.state.value} onChange={this.handleChange} />        </label>
        <input type="submit" value="Envoyer" />
      </form>
    );
  }
}



class Example extends React.Component{
    count: number;
    constructor(props: any){
        super(props);
        this.count = 0;
    }
    addCount(event){
        this.count = this.count + 1;
        event.preventDefault();
        this.forceUpdate()
    }
    removeCount(event){
        this.count = this.count - 1;
        event.preventDefault();
        this.forceUpdate();
    }
    render(){
        return (
            <div>
                <p>{this.props.text}</p>
                <p>the count is: {this.count}</p>
                <div>
                    <button onClick={this.addCount.bind(this)}>Add count</button>
                    <button onClick={this.removeCount.bind(this)}>Remove count</button>
                </div>
                <div>
                    <h2>Children</h2>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Example text="lol">
        <NameForm/>
        <p>
            <i className="fa fa-home"></i>
            <span>lol</span>
        </p>
    </Example>
);