import React, {Component} from 'react';
import './App.css';
import {Button, Modal} from "react-bootstrap";


const initState = {

    board: '.........'.split(''),
    playerPiece: null,
    computerPiece: null,
    turn: null,
    history: {
        win: 0,
        loss: 0,
        tie: 0,
    },
    __alert__: null,
};

class App extends Component {


    state = initState;

    constructor(props) {

        super();

        this.choosePiece = this.choosePiece.bind(this);
        this.checkWinningCombinations = this.checkWinningCombinations.bind(this);
        this.handlePlaceUserPiece = this.handlePlaceUserPiece.bind(this);
        this.placeComputerPiece = this.placeComputerPiece.bind(this);
        this.isGameOver = this.isGameOver.bind(this);
        this.getHistory = this.getHistory.bind(this);
        this.saveGameResult = this.saveGameResult.bind(this);
    }

    componentDidMount() {

        const history = this.getHistory();

        this.setState({
            ...this.state,
            history
        });
    }

    getHistory() {


        try {
            const gameData = JSON.parse(localStorage.getItem('gameData'));

            return {
                win: gameData.win,
                loss: gameData.loss,
                tie: gameData.tie,
            }

        } catch (e) {


            localStorage.clear();

            return {
                win: 0,
                loss: 0,
                tie: 0,
            }
        }


    }

    saveGameResult(result = 'tie') {


        const {playerPiece, computerPiece} = this.state;

        const history = this.getHistory();

        const turn = result === 'loss' ? 'computer' : 'player';


        history[result] += 1;

        localStorage.setItem('gameData', JSON.stringify(history));

        this.setState({
            ...initState,
            playerPiece,
            computerPiece,
            turn,
            __alert__: turn === 'computer' ? 'computer will go first' : 'go first',
            history,
        });


        setTimeout(() => this.setState({__alert__: null}, () => {

            turn === 'computer' ? this.placeComputerPiece() : null;
        }), 1000);
    }

    isGameOver(piece) {

        const {turn} = this.state;

        const won = this.checkWinningCombinations(piece);

        let result = null;

        if (won) {

            alert(`${piece} won`);

            result = piece === this.state.playerPiece ? 'win' : 'loss';
        } else {

            const tie = this.state.board.every(b => b !== '.');

            if (tie) {

                alert('tie');

                result = 'tie';
            }
        }

        if (result) {


            this.saveGameResult(result);

            return true;

        }


        const nextTurn = turn === 'computer' ? 'player' : 'computer';

        this.setState({turn: nextTurn});

        return false;
    }

    checkWinningCombinations(piece) {

        const {board} = this.state;

        const pieces = piece.repeat(3);


        return checkDiagionals(piece) || checkHorizontal(piece) || checkVertical(piece);

        function checkHorizontal(piece) {


            return board[0] + board[1] + board[2] === pieces ||

                board[3] + board[4] + board[5] === pieces ||
                board[6] + board[7] + board[8] === pieces


        }

        function checkVertical(piece) {

            return board[0] + board[3] + board[6] === pieces ||

                board[1] + board[4] + board[7] === pieces ||
                board[2] + board[5] + board[8] === pieces


        }


        function checkDiagionals(piece) {


            return board[0] + board[4] + board[8] === pieces ||

                board[2] + board[4] + board[6] === pieces;


        }


    }


    choosePiece(piece) {

        const turn = piece === 'O' ? 'player' : 'computer';

        const computerPiece = piece === 'O' ? 'X' : 'O';

        this.setState({
            playerPiece: piece,
            computerPiece,
            turn,
            __alert__: turn === 'player' ? 'go first!' : 'computer will go first'
        }, () => {


            if (turn === 'computer') {

                this.placeComputerPiece();
            }


            setTimeout(() => this.setState({__alert__: null}), 1000);
        });


    }

    handlePlaceUserPiece(idx) {


        const {board, playerPiece} = this.state;

        if (board[+idx] !== '.') {

            alert('spot taken');

            return;
        }


        const newBoard = board.slice();

        newBoard[idx] = playerPiece;

        this.setState({
            board: newBoard,
        }, () => {
            const isGameOver = this.isGameOver(playerPiece);

            if (!isGameOver) {

                this.placeComputerPiece();

            }
        });


    }

    placeComputerPiece() {

        const {board, computerPiece} = this.state;

        const board_ = board.slice();

        const empty = board_.findIndex(b => b === '.');


        board_[empty] = computerPiece;


        this.setState({board: board_}, () => {

            this.isGameOver(computerPiece);

        });


    }


    render() {


        const {__alert__, playerPiece, board, turn, history: {win, loss, tie}} = this.state;

        const cells = board.map((cell, idx) => {

            return (
                <div

                    className={'cell_inner'}
                    key={cell + idx}
                    onClick={() => turn === 'player' && this.handlePlaceUserPiece(idx)}
                >

                    {cell === '.' ? '' : cell === 'O' ? <i className={'fa fa-circle-o'}></i> :
                        <i className={'fa fa-times'}></i>}
                </div>
            )
        });

        const rows = [];

        for (let i = 0; i <= cells.length - 1; i += 3) {

            rows.push(
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
            <div className={'container'}>
                <div className={'row'}>

                    {__alert__}
                </div>

                <Modal
                    show={!playerPiece}>

                    <Modal.Header>
                        Choose Piece
                    </Modal.Header>

                    <Button onClick={() => this.choosePiece('O')}
                            bsStyle={'primary'}
                    >
                        <i className={'fa fa-circle-o'}></i>
                    </Button>

                    <Button onClick={() => this.choosePiece('X')}
                            bsStyle="primary">
                        <i className={'fa fa-times'}></i>
                    </Button>

                </Modal>

                <div className={'row'}>
                    <div className={'col-sm-8 col-md-6 col-lg-4 col-sm-offset-2 col-md-offset-3 col-lg-offset-4'}>
                        {rows}

                    </div>
                </div>

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
        );
    }
}

export default App;
