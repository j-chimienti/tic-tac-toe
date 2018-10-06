import React from 'react';
import PropTypes from 'prop-types';
import './TicTacToeBoard.css';


function mapToIcon(cell) {

    let klass = '';
    if (cell === 'O') {
        klass += 'far fa-circle'
    } else if (cell === 'X') {

        klass += 'fa fa-times'
    }

    return klass;
}

function mapToCell(idx, winningCombo) {

    let klass = 'cell d-flex justify-content-center align-items-center';

    if (winningCombo.length) {

        if (winningCombo.includes(idx)) {

            klass += ' cell-winner'

        }

    }
    return klass;
}

function TicTacToeBoard({turn = 'computer', board, handlePlaceUserPiece, winningCombo = []}) {

    const cells = board.map((cell, idx) => {

        return (
            <i
                key={idx}
                className={mapToIcon(cell)}
            >
            </i>
        )
    });

    const BOARD = [];

    for (let i = 0; i <= cells.length - 1; i += 3) {

        BOARD.push(
            <div className={'row'} key={i}>
                <div
                    onClick={() => turn === 'player' && handlePlaceUserPiece(i)}
                    className={mapToCell(i, winningCombo)}>{cells[i]}</div>
                <div
                    onClick={() => turn === 'player' && handlePlaceUserPiece(i + 1)}
                    className={mapToCell(i + 1, winningCombo)}>{cells[i + 1]}</div>
                <div
                    onClick={() => turn === 'player' && handlePlaceUserPiece(i + 2)}
                    className={mapToCell(i + 2, winningCombo)}>{cells[i + 2]}</div>
            </div>
        )

    }

    return (
        <div className={'container my-4 mx-auto board'}>
            {BOARD}
        </div>
    )

}


TicTacToeBoard.propTypes = {
    turn: PropTypes.string.isRequired,
    board: PropTypes.array,
    handlePlaceUserPiece: PropTypes.func.isRequired,
};
TicTacToeBoard.defaultProps = {};

export default TicTacToeBoard;
