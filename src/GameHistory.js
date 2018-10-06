import React from 'react';


export function GameHistory({win, loss, tie}) {

    return (
        <div className={'my-3 mx-auto gameHistory'}>
            <table className={'table'}>
                <thead>

                <tr>

                    <td className={'text-right'}>Win</td>
                    <td className={'text-right'}>Losses</td>
                    <td className={'text-right'}>Tie</td>
                </tr>
                </thead>
                <tbody>

                <tr>
                    <td className={'text-right'}>{win}</td>
                    <td className={'text-right'}>
                        <p>{loss}</p>
                    </td>
                    <td className={'text-right'}>{tie}</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}
