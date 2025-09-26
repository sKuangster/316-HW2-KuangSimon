import React from "react";

export default class SongCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDragging: false,
            draggedTo: false,
        }
    }
    
    getItemNum = () => {
        return this.props.id.substring("song-card-".length);
    }

    handleDragStart = (e) => {
    // Always take the wrapper’s id
    const id = e.currentTarget.id;         // "song-card-5"
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "move";
    this.setState({ isDragging: true });
    };

    handleDragOver = (e) => { e.preventDefault(); this.setState({ draggedTo: true }); };
    handleDragEnter = (e) => { e.preventDefault(); this.setState({ draggedTo: true }); };
    handleDragLeave = (e) => { e.preventDefault(); this.setState({ draggedTo: false }); };

    handleDrop = (e) => {
        e.preventDefault();
        const src = e.dataTransfer.getData("text/plain"); // "song-card-5"
        const dst = e.currentTarget.id;                   // "song-card-2"
        const srcIdx = parseInt(src.split("-").pop(), 10); // 1-based
        const dstIdx = parseInt(dst.split("-").pop(), 10); // 1-based
        this.setState({ isDragging: false, draggedTo: false });
        this.props.moveCallback(srcIdx, dstIdx); // your MoveSong_Transaction will call app.moveSong
    };

    handleDoubleClick = (e) => {
        e.stopPropagation()
        e.preventDefault();
        const num = this.getItemNum(); // This is 1-based (song-card-1, song-card-2, etc.)
        const zeroBasedIndex = parseInt(num, 10) - 1; // Convert to 0-based index
        this.props.editCallback(zeroBasedIndex); // Pass 0-based index to editCallback
    };

    handleDeleteSong = (e) => {
        e.stopPropagation()
        e.preventDefault();
        const num = this.getItemNum(); // This is 1-based (song-card-1, song-card-2, etc.)
        const zeroBasedIndex = parseInt(num, 10) - 1; // Convert to 0-based index
        const { song, deleteSongCallback } = this.props
        deleteSongCallback(zeroBasedIndex, song);
    }

    handleDuplicateSong = (e) => {
        e.stopPropagation()
        e.preventDefault();
        const num = this.getItemNum(); // This is 1-based (song-card-1, song-card-2, etc.)
        const zeroBasedIndex = parseInt(num, 10) - 1; // Convert to 0-based index
        this.props.duplicateSongCallBack(zeroBasedIndex, this.props.song);
    }

    render() {
        const { song } = this.props;
        const num = this.getItemNum();
        let itemClass = "song-card";
        
        return (
            <div
                id={'song-' + num}
                className={itemClass}
                onDragStart={this.handleDragStart}
                onDragOver={this.handleDragOver}
                onDragEnter={this.handleDragEnter}
                onDragLeave={this.handleDragLeave}
                onDrop={this.handleDrop}
                onDoubleClick={(e) => this.handleDoubleClick(e, num)}
                draggable="true"
            >
                <span className="song-card-index">{num}. </span>
                <a 
                    href={`https://www.youtube.com/watch?v=${song.youTubeId}`} 
                    target="1" 
                    className="song-card-title">
                        {song.title}
                </a>{' '}
                <span className="song-card-year">({song.year})</span>{' '}
                <span className="song-card-by">by</span>{' '}
                <span className="song-card-artist">{song.artist}</span>

                <input type="button" onClick={this.handleDeleteSong} className="song-card-delete-button" value="🗑"></input>
                <input type="button" onClick={this.handleDuplicateSong} className="song-card-delete-button" value="⎘"></input>
            </div>
        )
    }
}