import React, { Component } from 'react';

export default class EditSongModal extends Component {
  constructor(props) {
    super(props);
    this.state = this.deriveStateFromProps(props);
    this.modalRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.song !== this.props.song || prevProps.open !== this.props.open) {
      this.setState(this.deriveStateFromProps(this.props));
    }
    
    // Trigger animation when modal opens
    if (!prevProps.open && this.props.open && this.modalRef.current) {
      // Force reflow to restart animation
      this.modalRef.current.classList.remove('is-visible');
      this.modalRef.current.offsetHeight; // Trigger reflow
      this.modalRef.current.classList.add('is-visible');
    }
  }

  deriveStateFromProps = (props) => {
    const s = props.song || {};
    return {
      open: !!props.open,
      title: s.title ?? '',
      artist: s.artist ?? '',
      year: s.year ?? '',
      youTubeId: s.youTubeId ?? '',
    };
  };

  handleConfirm = () => {
    const { title, artist, year, youTubeId } = this.state;
    this.props.onConfirm?.({ title, artist, year, youTubeId });
  };

  handleCancel = () => {
    this.props.onCancel?.();
  };

  render() {
    const { open } = this.props;
    const { title, artist, year, youTubeId } = this.state;
    
    // Use the same visibility pattern as DeleteListModal
    let modalClass = "modal";
    if (open) {
      modalClass += " is-visible";
    }
    return (
      <div id="edit-song-modal" className={modalClass} data-animation="slideInOutLeft">
        <div id="edit-song-root" className="modal-root">
          <div id="edit-song-modal-header" className="modal-north">Edit Song</div>
          <div id="edit-song-modal-content" className="modal-center">
            <div id="title-prompt" className="modal-prompt">Title:</div>
            <input
              id="edit-song-modal-title-textfield"
              className="modal-textfield"
              type="text"
              value={title}
              onChange={(e) => this.setState({ title: e.target.value })}
              autoFocus
            />
            <div id="artist-prompt" className="modal-prompt">Artist:</div>
            <input
              id="edit-song-modal-artist-textfield"
              className="modal-textfield"
              type="text"
              value={artist}
              onChange={(e) => this.setState({ artist: e.target.value })}
            />
            <div id="year-prompt" className="modal-prompt">Year:</div>
            <input
              id="edit-song-modal-year-textfield"
              className="modal-textfield"
              type="text"
              value={year}
              onChange={(e) => this.setState({ year: e.target.value })}
            />
            <div id="you-tube-id-prompt" className="modal-prompt">You Tube Id:</div>
            <input
              id="edit-song-modal-youTubeId-textfield"
              className="modal-textfield"
              type="text"
              value={youTubeId}
              onChange={(e) => this.setState({ youTubeId: e.target.value })}
            />
          </div>
          <div className="modal-south">
            <input
              type="button"
              id="edit-song-confirm-button"
              className="modal-button"
              value="Confirm"
              onClick={this.handleConfirm}
            />
            <input
              type="button"
              id="edit-song-cancel-button"
              className="modal-button"
              value="Cancel"
              onClick={this.handleCancel}
            />
          </div>
        </div>
      </div>
    );
  }
}
