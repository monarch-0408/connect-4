import React from 'react'
import {
  GAME_STATE_PLAYING,
  GAME_STATE_WIN,
  GAME_STATE_DRAW
} from "../Constants"

const Header = ({ player, winPlayer, gameState }) => {

  const renderLabel = () => {
    switch(gameState){

      case GAME_STATE_PLAYING:
        return <div>Player { player } turn</div>

      case GAME_STATE_WIN:
        return <div>Player { winPlayer } won</div>

      case GAME_STATE_DRAW:
        return <div>Game draw</div>
      
      default:
    }
  };

    return (
      <div className='panel header'>
          <div className='header-text'> { renderLabel() } </div>
      </div>
    )
}

export default Header