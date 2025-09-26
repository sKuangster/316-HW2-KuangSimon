import { jsTPS_Transaction } from "jstps";

export default class RemoveSong_Transaction extends jsTPS_Transaction {
  constructor(app, index, song) {
    super();
    this.app = app;
    this.index = index;
    this.song = song;
  }
  
  executeDo() {
    // Get the current list and make a copy
    const currentList = { ...this.app.state.currentList };
    
    // Remove the song at the specified index
    currentList.songs = currentList.songs.filter((_, i) => i !== this.index);
    
    // Update the state and database
    this.app.setState({ currentList: currentList });
    this.app.db.mutationUpdateList(currentList);
  }

  executeUndo() {
    // Get the current list and make a copy
    const currentList = { ...this.app.state.currentList };
    
    // Insert the song back at the original index
    currentList.songs = [...currentList.songs];
    currentList.songs.splice(this.index, 0, this.song);
    
    // Update the state and database
    this.app.setState({ currentList: currentList });
    this.app.db.mutationUpdateList(currentList);
  }
}