import React from 'react';
import PropTypes from 'prop-types';
import './TicTacToeBoard.css';


function mapToIcon(cell, winningCombo, idx) {

    let klass = '';
    if (cell === 'O') {
        klass += 'far fa-circle';

        if (winningCombo.length && winningCombo.includes(idx)) {

            klass += ' text-success';
        }
        else klass += ' text-info'
    } else if (cell === 'X') {

        klass += 'fa fa-times';

        if (winningCombo.length && winningCombo.includes(idx)) {

            klass += ' text-success';
        }
        else klass += ' text-danger'

    }

    return klass;
}


function TicTacToeBoard({turn = 'computer', board, handlePlaceUserPiece, winningCombo = []}) {

    const cells = board.map((cell, idx) => {

        return (
            <i
                key={idx}
                className={mapToIcon(cell, winningCombo, idx)}
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
                    className={'cell d-flex justify-content-center align-items-center'}>{cells[i]}</div>
                <div
                    onClick={() => turn === 'player' && handlePlaceUserPiece(i + 1)}
                    className={'cell d-flex justify-content-center align-items-center'}>{cells[i + 1]}</div>
                <div
                    onClick={() => turn === 'player' && handlePlaceUserPiece(i + 2)}
                    className={'cell d-flex justify-content-center align-items-center'}>{cells[i + 2]}</div>
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
