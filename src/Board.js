import React from 'react';
import {Col, Grid, Row} from "react-bootstrap";


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
            <Row>

                <Col xs={4} className={'cell'}>{cells[i]}</Col>
                <Col xs={4} className={'cell'}>{cells[i + 1]}</Col>
                <Col xs={4} className={'cell'}>{cells[i + 2]}</Col>
            </Row>
        )

    }

    return (

        <Grid>
            <Col xs={11} sm={8} md={6} xl={4}>
                {BOARD}
            </Col>
        </Grid>

    )

}