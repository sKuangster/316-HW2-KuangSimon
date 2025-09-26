import React from "react";

export default class PlaylistCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: this.props.keyNamePair.name,
            editActive: false,
        }
    }
    handleClick = (event) => {
        if (event.detail === 1) {
            this.handleLoadList(event);
        }
        else if (event.detail === 2) {
            this.handleToggleEdit(event);
        }
    }
    handleLoadList = (event) => {
        let listKey = event.target.id;
        if (listKey.startsWith("playlist-card-text-")) {
            listKey = listKey.substring("playlist-card-text-".length);
        }
        this.props.loadListCallback(listKey);
    }
    handleDeleteList = (event) => {
        event.stopPropagation();
        this.props.deleteListCallback(this.props.keyNamePair);
    }
    handleToggleEdit = (event) => {
        this.setState({
            editActive: !this.state.editActive
        });
    }
    handleUpdate = (event) => {
        this.setState({ text: event.target.value });
    }

    enableEdit = (event) => {
    event.stopPropagation();
    this.setState({ editActive: true, text: this.props.keyNamePair.name }, () => {
        this.props.onListNameEditChange && this.props.onListNameEditChange(true);
    });
    };

    finishEdit = () => {
    const { key, name } = this.props.keyNamePair;
    const newName = this.state.text.trim();
    if (newName && newName !== name) {
        this.props.renameListCallback(key, newName);
    }
    this.setState({ editActive: false }, () => {
        this.props.onListNameEditChange && this.props.onListNameEditChange(false);
    });
    };

    // hook finishEdit to both Enter and blur
    handleKeyPress = (e) => {
    if (e.key === "Enter") this.finishEdit();
    };
    handleBlur = () => this.finishEdit();

    handleCopyList = (e) =>
    {
        e.stopPropagation()
        this.props.copyListCallback(this.props.keyNamePair);
    }

    render() {
        const { keyNamePair, selected } = this.props;
        if (this.state.editActive) {
            return (
                <input
                    id={"playlist-" + keyNamePair.name}
                    className='playlist-card'
                    type='text'
                    onKeyPress={this.handleKeyPress}
                    onBlur={this.handleBlur}
                    onChange={this.handleUpdate}
                    defaultValue={keyNamePair.name}
                />)
        }
        else {

            let selectClass = "unselected-playlist-card";
            if (selected) {
                selectClass = "selected-playlist-card";
            }
            return (
                <div
                    id={keyNamePair.key}
                    key={keyNamePair.key}
                    onClick={this.handleClick}
                    className={'playlist-card ' + selectClass}>
                    <span
                        id={"playlist-card-text-" + keyNamePair.key}
                        key={keyNamePair.key}
                        className="playlist-card-text">
                        {keyNamePair.name}
                    </span>
                    <input
                        type="button"
                        id={"delete-list-" + keyNamePair.key}
                        className="card-button"
                        onClick={this.handleDeleteList}
                        value={"🗑"} />
                    <input
                        type="button"
                        id={"copy-list-" + keyNamePair.key}
                        className="card-button"
                        onClick={this.handleCopyList}
                        value={"⎘"} />
                </div>
            );
        }
    }
}