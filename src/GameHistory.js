import React from 'react';
import {Col, Grid, Panel, Row} from "react-bootstrap";


export function GameHistory({win, loss, tie}) {

    return (
        <Panel>
            <Row>
                <Col xs={3}>Win</Col>
                <Col xs={9} className={'text-center'}>{win}</Col>
            </Row>
            <Row>
                <Col xs={3}>Losses</Col>
                <Col xs={9} className={'text-center'}>
                    <p>{loss}</p>
                </Col>
            </Row>
            <Row>
                <Col xs={3}>Tie</Col>
                <Col xs={9} className={'text-center'}>{tie}</Col>
            </Row>
        </Panel>
    )
}