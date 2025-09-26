import { jsTPS_Transaction } from "jstps";

export default class EditSong_Transaction extends jsTPS_Transaction {
  constructor(app, index, oldSong, newSong) {
    super();
    this.app = app;
    this.index = index;
    this.oldSong = oldSong;
    this.newSong = newSong;
  }
  executeDo() {
    const list = { ...this.app.state.currentList };
    list.songs = list.songs.map((s, i) => (i === this.index ? { ...s, ...this.newSong } : s));
    this.app.setState({ currentList: list });
    this.app.db.mutationUpdateList(list);
  }
  executeUndo() {
    const list = { ...this.app.state.currentList };
    list.songs = list.songs.map((s, i) => (i === this.index ? { ...s, ...this.oldSong } : s));
    this.app.setState({ currentList: list });
    this.app.db.mutationUpdateList(list);
  }
}
