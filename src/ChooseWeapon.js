import React from 'react';

import {Button, Col, Modal, Row} from "react-bootstrap";


export function ChooseWeapon({choosePiece, show}) {

    return (
        <Modal
            show={show}>

            <Modal.Header className={'text-center'}>
                <h3>Choose Weapon</h3>
            </Modal.Header>

            <Modal.Body className={'text-center'}>
                <Row>
                    <Col xs={6}>
                        <Button onClick={() => choosePiece('O')}
                                bsStyle={'primary btn-block'}
                        >
                            <i className={'fa fa-circle-o fa-2x'}></i>
                        </Button>

                    </Col>
                    <Col xs={6}>
                        <Button onClick={() => choosePiece('X')}
                                bsStyle="danger btn-block">
                            <i className={'fa fa-times fa-2x'}></i>
                        </Button>
                    </Col>
                </Row>
            </Modal.Body>

        </Modal>
    )
}