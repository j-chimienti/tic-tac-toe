import React from 'react';


export function Board({board, handlePlaceUserPiece, turn}) {

    const cells = board.map((cell, idx) => {

        return (
            <div

                className={'cell_inner'}
                key={cell + idx}
                onClick={() => turn === 'player' && handlePlaceUserPiece(idx)}
            >

                {cell === '.' ? '' : cell === 'O' ? <i className={'fa fa-circle-o'}></i> :
                    <i className={'fa fa-times'}></i>}
            </div>
        )
    });

    const BOARD = [];

    for (let i = 0; i <= cells.length - 1; i += 3) {

        BOARD.push(
            <div
                key={i + 'row'}
                className={'row'}>
                <div
                    className={'col-xs-4 cell'}> {cells[i]}</div
                >
                <div
                    className={'col-xs-4 cell'}> {cells[i + 1]}</div
                >
                <div
                    className={'col-xs-4 cell'}> {cells[i + 2]}</div
                >
            </div>
        )

    }

    return (
        <div className={'row'}>
            <div
                className={'col-xs-10 col-sm-8 col-md-6 col-lg-4 col-xs-offset-1 col-sm-offset-2 col-md-offset-3 col-lg-offset-4'}>
                {BOARD}

            </div>
        </div>
    )

}