import React from 'react';

import {Button, Modal} from "react-bootstrap";


export function Modal_({choosePiece, show}) {

    return (
        <Modal
            show={show}>

            <Modal.Header className={'text-center'}>
                Choose Piece
            </Modal.Header>

            <Modal.Body className={'text-center'}>
                <Button onClick={() => choosePiece('O')}
                        bsStyle={'primary'}
                >
                    <i className={'fa fa-circle-o'}></i>
                </Button>
                {' '}

                <Button onClick={() => choosePiece('X')}
                        bsStyle="primary">
                    <i className={'fa fa-times'}></i>
                </Button>
            </Modal.Body>

        </Modal>
    )
}