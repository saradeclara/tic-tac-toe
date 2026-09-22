import React from "react";
import Board from "./Board";

export type Player = "X" | "O";

type Coord = {
	x: number;
	y: number;
};

type TurnOutcome = "win" | "draw" | "continue";

type TurnSignal = "nearVictory" | "blockOpponent" | "noSignal";

export type GameState = {
	turnNumber: number;
	player: Player;
	move: Coord;
	outcome: TurnOutcome;
	signal: TurnSignal;
};

function App() {
	const [gameState, updateGameState] = React.useState<GameState[] | null>(null);
	const [currentPlayer, setCurrentPlayer] = React.useState<Player>("X");
	const boardSize = { rows: 3, cols: 3 };

	const onCellClick = (rowIndex: number, colIndex: number) => {
		const nextPlayer = currentPlayer === "X" ? "O" : "X";

		updateGameState((prevState) => {
			const nextTurnNumber: number = prevState
				? prevState[prevState.length - 1].turnNumber + 1
				: 0;

			const newEntry: GameState = {
				turnNumber: nextTurnNumber,
				player: currentPlayer,
				move: { x: rowIndex, y: colIndex },
				outcome: "continue", //TODO
				signal: "noSignal", //TODO
			};
			return prevState ? [...prevState, newEntry] : [newEntry];
		});

		setCurrentPlayer(nextPlayer);
	};

	return (
		<div>
			<h1>Tic Tac Toe</h1>
			<h2>Current Player: {currentPlayer}</h2>
			<h3>Game State:</h3>
			<Board
				{...boardSize}
				gameState={gameState}
				onCellClick={onCellClick}
			/>
		</div>
	);
}

export default App;
