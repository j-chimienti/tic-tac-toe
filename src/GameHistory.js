import React from 'react';


export function GameHistory({win, loss, tie}) {

    return (
        <div className={'my-3 mx-auto gameHistory'}>
            <table className={'table'}>
                <thead>

                <tr>

                    <th className={'text-right'}>Wins</th>
                    <th className={'text-right'}>Losses</th>
                    <th className={'text-right'}>Ties</th>
                </tr>
                </thead>
                <tbody>

                <tr>
                    <td className={'text-right text-mono'}>{win}</td>
                    <td className={'text-right text-mono'}>{loss}</td>
                    <td className={'text-right text-mono'}>{tie}</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}
