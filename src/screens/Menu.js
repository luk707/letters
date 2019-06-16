import React from "react";

function Menu({ setScreen, screenNames, screenName }) {
  const buttons = screenNames
    .filter(name => name !== screenName)
    .map(screenName => (
      <button key={screenName} onClick={() => setScreen(screenName)}>
        {screenName}
      </button>
    ));
  return (
    <>
      <span className="title">Menu</span>
      {buttons}
    </>
  );
}

export default Menu;
