import React from "react";
import { GameState } from "./App";

type BoardProps = {
	rows: number;
	cols: number;
	onCellClick: (rowIndex: number, colIndex: number) => void;
	gameState: GameState[] | null;
};

const Board = ({
	rows,
	cols,
	onCellClick,
	gameState,
}: BoardProps) => {
	const rowsArray = Array.from({ length: rows }, (_, i) => i);
	const colsArray = Array.from({ length: cols }, (_, i) => i);

	const isCurrentCellMarked = (
		gameState: GameState[] | null,
		currentRow: number,
		currentCol: number,
	): string | null => {
		if (!gameState) return null;

		for (const { move, player } of gameState) {
			if (move.x === currentRow && move.y === currentCol) {
				return player;
			}
		}

		return null;
	};

	return (
		<>
			<div>Board</div>
			{rowsArray.map((_row, rowIndex) => {
				return (
					<div
						style={{
							border: "1px solid black",
							display: "flex",
							justifyContent: "center",
						}}
					>
						{colsArray.map((_col, colIndex) => {
							const result = isCurrentCellMarked(gameState, rowIndex, colIndex);

							return (
								<div
									onClick={() => onCellClick(rowIndex, colIndex)}
									style={{
										width: "200px",
										height: "200px",
										border: "1px solid black",
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										cursor: "pointer",
									}}
								>
									{result}
								</div>
							);
						})}
					</div>
				);
			})}
		</>
	);
};

export default Board;
