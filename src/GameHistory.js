import React from 'react';


export function GameHistory({win, loss, tie}) {

    return (
        <div>
            <div className={'row'}>
                <div className={'col-xs-3 text-capitalize'}>win</div>
                <div className={'col-xs-9'}> {win}</div>
            </div>
            <div className={'row'}>
                <div className={'col-xs-3 text-capitalize'}>loss</div>
                <div className={'col-xs-9'}> {loss}</div>
            </div>
            <div className={'row'}>
                <div className={'col-xs-3 text-capitalize'}>tie</div>
                <div className={'col-xs-9'}> {tie}</div>
            </div>

        </div>
    )
}