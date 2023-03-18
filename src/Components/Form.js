import React from "react";
import { v4 } from "uuid";

export default class Form extends React.Component {
  state = {
    value: "",
    id: v4(),
    list: [],
    showCheckedState: false,
    AllList: [],
    listOnlyCompleted: [],
    listForNotCompleted: [],
  };
  onChangingValue = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  AddItem = (evt) => {
    const NewItem = {
      id: v4(),
      NewItem: this.state.value,
      isCompleted: false,
    };
    const newList = [...this.state.list];
    newList.push(NewItem);
    this.setState({
      value: "",
      list: newList,
    });
  };
  DeleateAllItems = (e) => {
    const UpdatedList = this.state.list.filter((item) => item.e === false);
    this.setState({
      list: UpdatedList,
      value: "",
      AllList: [],
      listOnlyCompleted: [],
      listForNotCompleted: [],
    });
    console.log(UpdatedList);
  };
  CompletedState = (item, val, id) => {
    const array = this.state.list;
    const index = array.indexOf(item);
    const newItem = {
      NewItem: val,
      isCompleted: !this.state.showCheckedState,
      id: id,
    };
    array[index] = newItem;
    this.setState({
      list: array,
      showCheckedState: !this.state.showCheckedState,
      AllList: array,
    });
  };

  DeleateItem = (id) => {
    const UpdatedList = this.state.list.filter((item) => id !== item.id);
    this.setState({ list: UpdatedList });
    console.log(UpdatedList);
  };
  EditingFunction = (item, id) => {
    const array = [...this.state.list];
    const index = array.indexOf(item);
    const val = item.NewItem;
    const newVal = {
      id: v4(),
      NewItem: prompt(`Write Editable Value for number ${index + 1} `, val),
      isCompleted: !this.state.showCheckedState,
    };

    // const updatedList = this.state.list.filter(item => item.id !== id)
    array[index] = newVal;
    this.setState({
      list: array,
      value: "",
    });
  };

  ShowAllItems = () => {
    if (this.state.list.length !== 0) {
      const AllItemsList = this.state.AllList;
      this.setState({
        list: AllItemsList,
        AllList: AllItemsList,
      });
    }
  };
  ShowCompleteds = () => {
    const list = this.state.AllList;
    const CompletedList = list.filter((item) => item.isCompleted === true);
    this.setState({
      list: CompletedList,
    });
  };
  ShowNotCompleteds = () => {
    const list = this.state.AllList;
    const NotCompletedList = list.filter((item) => item.isCompleted === false);
    this.setState({
      list: NotCompletedList,
    });
  };

  render() {
    return (
      <div className="Container">
        <h1> To-DO list </h1>
        <input
          className="input"
          type="text"
          placeholder="Write Your Todos"
          value={this.state.value}
          onChange={(evt) => this.onChangingValue(evt)}
        />
        <button onClick={(e) => this.AddItem(e)} className="Add-Button">
          {" "}
          <b className="b"> + </b>{" "}
        </button>
        <button onClick={(e) => this.DeleateAllItems(e)} className="red-button">
          <b> Clear list </b>
        </button>
        <br />
        <ol className="Ol-list">
          {this.state.list.map((item) => {
            return (
              <li key={item.id} className="li-items">
                <>{item.NewItem}</>

                <button
                  className="Comp-NotComp"
                  onClick={() =>
                    this.CompletedState(item, item.NewItem, item.id)
                  }
                >
                  {item.isCompleted ? "Completed " : "Uncompleted"}
                </button>

                <button
                  className="button-x"
                  onClick={() => this.DeleateItem(item.id)}
                >
                  Deleate
                </button>
                <button
                  className="button-edit"
                  onClick={() => this.EditingFunction(item, item.id)}
                >
                  Edit
                </button>
              </li>
            );
          })}
        </ol>
        <span>
          {" "}
          <button className="btn-All" onClick={(e) => this.ShowAllItems(e)}>
            {" "}
            All Items
          </button>
          <button
            className="btn-Checked"
            onClick={(e) => this.ShowCompleteds(e)}
          >
            {" "}
            Only Completed Items{" "}
          </button>
          <button
            className="btn-UnChecked"
            onClick={(e) => this.ShowNotCompleteds(e)}
          >
            {" "}
            Not Completed Items{" "}
          </button>
        </span>
      </div>
    );
  }
}
