import SongCard from './SongCard.jsx';
import React from "react";

export default class SongCards extends React.Component {
    render() {
        const { currentList, moveSongCallback, openEditSong } = this.props;
        if 
            (!currentList) return <div id="song-cards" />
        else {
            return (
                <div id="song-cards">
                    {currentList.songs.map((song, index) => (
                        <SongCard
                            key={`song-card-${index+1}`}
                            id={`song-card-${index+1}`}
                            num={index+1}
                            song={song}
                            moveCallback={moveSongCallback}
                            editCallback={() => openEditSong(index)}
                    />
                    ))}
                </div>
            )
        }
    }
}