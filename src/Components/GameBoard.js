import React, { useEffect, useState } from 'react'
import GameCircle from './GameCircle'
import '../Game.css'
import Header from './Header';
import Footer from './Footer';
import { isWinner, isDraw, getComputerMove } from '../helper';
import {
    NO_CIRCLES,
    NO_PLAYER,
    PLAYER_1,
    PLAYER_2,
    GAME_STATE_PLAYING,
    GAME_STATE_WIN,
    GAME_STATE_DRAW
} from "../Constants"

const GameBoard = (id) => {
    const [gameBoard, setGameBoard] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState();
    const [winPlayer, setWinPlayer] = useState();
    const [gameState, setGameState] = useState();

    useEffect(() => {
      initGame();
    }, []);

    const initGame = () => {
        setGameBoard(Array(NO_CIRCLES).fill(NO_PLAYER));
        setCurrentPlayer(PLAYER_1);
        setGameState(GAME_STATE_PLAYING);
    };

    const suggestMove = () => {
        circleClick(getComputerMove(gameBoard))
    };

    const circleClick = (id) => {
        console.log('circle clicked ' + id);

        if(gameBoard[id] !== 0) return;
        if(gameState !== GAME_STATE_PLAYING) return;

        setGameBoard(prev => {
            return prev.map((circle, pos) => {
                if(pos === id) return currentPlayer;
                return circle;
            })
        })

        if(isWinner(gameBoard, id, currentPlayer)){
            setGameState(GAME_STATE_WIN);
            setWinPlayer(currentPlayer);
            return;
        }

        if(isDraw(gameBoard, id, currentPlayer)){
            setGameState(GAME_STATE_DRAW);
            setWinPlayer(NO_PLAYER);
            return;
        }

        setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);        

    };

    const initBoard = () => {
        const circles = [];

        for(let i = 0; i < NO_CIRCLES; i++){
            circles.push(renderCircle(i));
        }

        return circles;
    };

    const renderCircle = (id) => {
        return (
            <GameCircle 
                key={id} 
                id={id} 
                className={ `p-${ gameBoard[id] }` } 
                onCircleClicked={ circleClick } 
            /> 
        )
    };

  return (
    <>
        <Header player = { currentPlayer } winPlayer = { winPlayer } gameState = { gameState } />

        <div className = 'gameBoard'>
            { initBoard() }
        </div>

        <Footer onNewGameClick = { initGame } onSuggestClick = { suggestMove } gameState={ gameState }/>
    </>
  )
}

export default GameBoard