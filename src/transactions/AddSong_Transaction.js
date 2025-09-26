import { jsTPS_Transaction } from "jstps";

export default class AddSong_Transaction extends jsTPS_Transaction {
  constructor(app) {
    super();
    this.app = app;
    this.deleteIndex = null;
  }

  executeDo() {
    const list = { ...this.app.state.currentList };

    const songs = [...list.songs];

    const newSong = {
      title: "Untitled",
      artist: "???",
      year: "2000",
      youTubeId: "???",
    };

    this.deleteIndex = songs.length
    songs.push(newSong)
    list.songs = songs;

    this.app.setState({ currentList: list });
    this.app.db.mutationUpdateList(list);
  }

  executeUndo() {
    const currentList = { ...this.app.state.currentList };
    
    // Remove the last song (the one we just added)
    currentList.songs = currentList.songs.slice(0, -1);
    
    // Update the state and database
    this.app.setState({ currentList: currentList });
    this.app.db.mutationUpdateList(currentList);
  }
}