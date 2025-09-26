import React from "react";

export default class SidebarHeading extends React.Component {
  render() {
    const { canCreateList, createNewListCallback } = this.props;
    const btnClass = "toolbar-button" + (canCreateList ? "" : " disabled");

    return (
      <div id="sidebar-heading">
        <input
            type="button"
            id="add-list-button"
            value="+"
            className={btnClass}
            disabled={!canCreateList}
            onClick={canCreateList ? createNewListCallback : undefined}
            aria-disabled={!canCreateList}
        />
        <h3>Your Playlists</h3>
      </div>
    );
  }
}
