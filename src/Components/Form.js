import React from "react";
import { v4 } from "uuid";
import { BsPlusSquareFill } from 'react-icons/fa'

export default class Form extends React.Component {
    state = {
        value: "",
        id: v4(),
        list: [],
    };

    ChangedValue(e) {
        this.setState({
            value: e.target.value
        });

    }

    AddItem = (evt) => {
        const NewItem = {
            id: v4(),
            NewItem: this.state.value
        };
        const newList = [...this.state.list];
        newList.push(NewItem);
        this.setState({
            value: "",
            list: newList
        });
    };

    DeleateAllItems = (id) => {
        const UpdatedList = this.state.list.filter((item) => id === item.id);
        this.setState({
            list: UpdatedList,
            value: ""
        });
        console.log(UpdatedList)
    };

    DeleateItem = (id) => {
        const UpdatedList = this.state.list.filter((item) => id !== item.id);
        this.setState({ list: UpdatedList });
        console.log(UpdatedList)
    };

    EditingFunction = (item, id) => {
        const array = [...this.state.list]
        const index = array.indexOf(item)
        const val = item.NewItem
        const newVal = {
            id: v4(),
            NewItem: prompt("Write Editable Value", val)
        }

        // const updatedList = this.state.list.filter(item => item.id !== id)
        array[index] = newVal
        this.setState({
            value: "",
            list: array
        })


    }


    render() {
        return (
            <div className="Container">
                <h1> To-DO list </h1>
                <input className="input"
                    type="text"
                    placeholder="Write Your Todos"
                    value={this.state.value}
                    onChange={(evt) => this.ChangedValue(evt)}
                />
                <button onClick={e => this.AddItem(e)} className="Add-Button"> + </button>

                <button onClick={(e) => this.DeleateAllItems(e)} className="red-button"> Clear list </button>

                <br />
                <ol className="Ol-list">
                    {this.state.list.map((item) => {
                        return (
                            <li key={item.id} className="li-items">
                        <div> 
                                    {item.NewItem}
                           </div>    
             
                                    <button className="button-x" onClick={() => this.DeleateItem(item.id)}>  Deleate </button>
                                    <button className="button-edit" onClick={() => this.EditingFunction(item, item.id)}> Edit </button>
                              
                            </li>
                        );
                    })}
                </ol>
            </div>
        );
    }
}
