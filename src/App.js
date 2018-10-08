import React, {Component} from 'react';
import './App.css';
import {ChooseWeapon} from "./ChooseWeapon";
import {GameHistory} from "./GameHistory";
import TicTacToeBoard from "./TicTacToeBoard";
import Notifications from "./Notifications";

const initState = {

    board: '.'.repeat(9).split(''),
    playerPiece: '',
    computerPiece: '',
    turn: '',
    history: {
        win: 0,
        loss: 0,
        tie: 0,
    },
    __alert__: '',
    winningCombo: [],
};

class App extends Component {


    state = initState;

    constructor(props) {

        super();

        this.choosePiece = this.choosePiece.bind(this);
        this.checkForPotentialWinningCombinations = this.checkForPotentialWinningCombinations.bind(this);
        this.handlePlaceUserPiece = this.handlePlaceUserPiece.bind(this);
        this.placeComputerPiece = this.placeComputerPiece.bind(this);
        this.isGameOver = this.isGameOver.bind(this);
        this.verifyWinningCombo = this.verifyWinningCombo.bind(this);
    }

    componentDidMount() {

        this.setState({
            history: App.fetchGameHistory()
        });
    }

    verifyWinningCombo(piece) {

        const {board} = this.state;

        const pieces = piece.repeat(3);

        let winningCombo = [];

        checkDiagionals(piece);
        checkHorizontal(piece);
        checkVertical(piece);

        this.setState({
            winningCombo,
        });

        return winningCombo;


        function checkHorizontal() {


            if (board[0] + board[1] + board[2] === pieces) {

                winningCombo = [0, 1, 2];

                return true;
            } else if (board[3] + board[4] + board[5] === pieces) {

                winningCombo = [3, 4, 5];

                return true;
            } else if (board[6] + board[7] + board[8] === pieces) {

                winningCombo = [6, 7, 8];

                return true;
            }


        }

        function checkVertical() {

            if (board[0] + board[3] + board[6] === pieces) {
                winningCombo = [0, 3, 6];
            } else if (board[1] + board[4] + board[7] === pieces) {
                winningCombo = [1, 4, 7];
            } else if (board[2] + board[5] + board[8] === pieces) {
                winningCombo = [2, 5, 8];
            }


        }


        function checkDiagionals() {


            if (board[0] + board[4] + board[8] === pieces) {
                winningCombo = [0, 4, 8];
            } else if (board[2] + board[4] + board[6] === pieces) {
                winningCombo = [2, 4, 6];
            }


        }


    }

    static fetchGameHistory() {


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

    resetGame(result, winningCombo) {

        const {playerPiece, computerPiece} = this.state;

        const history = App.saveGameResult(result);

        this.setState({
            winningCombo,
            history,
            __alert__: result === 'win' ? 'You won!' : result === 'tie' ? 'You tied' : 'You lost',
        }, () => {
            setTimeout(() => {

                this.setState({
                    ...this.state,
                    ...initState,
                    history,
                    playerPiece,
                    computerPiece,
                    turn: 'player',

                }, () => {


                    setTimeout(() => this.setState({__alert__: 'go first'}), 10);

                    setTimeout(() => this.setState({__alert__: null}), 4000);
                });
            }, 2000);
        })


    }

    static saveGameResult(result = 'tie') {


        const history = App.fetchGameHistory();

        history[result] += 1;

        localStorage.setItem('gameData', JSON.stringify(history));

        return history;


    }

    isGameOver(piece) {


        let result = null;

        const winningCombo = this.verifyWinningCombo(piece);

        if (winningCombo.length) {

            result = piece === this.state.playerPiece ? 'win' : 'loss';

        }

        const tie = this.state.board.every(b => b !== '.');

        if (tie) {

            result = 'tie';
        }


        return {
            result,
            winningCombo,
        }

    }

    checkForPotentialWinningCombinations(piece = this.state.computerPiece) {

        const {board} = this.state;

        let winningPiece = null;

        checkHorz();
        checkVert();
        checkDiag();

        return winningPiece;

        function checkHorz() {
            const rows = [];

            for (let i = 0; i <= 6; i += 3) {

                rows.push([
                    {item: board[i], index: i}, {item: board[i + 1], index: i + 1}, {
                        item: board[i + 2],
                        index: i + 2
                    }]);
            }

            return check_for_winning_piece(rows);

        }

        function checkVert() {

            const rows = [];

            for (let i = 0; i <= 2; i++) {

                rows.push([{item: board[i], index: i}, {item: board[i + 3], index: i + 3}, {
                    item: board[i + 6],
                    index: i + 6
                }]);
            }

            return check_for_winning_piece(rows);


        }


        function checkDiag() {

            const rows = [
                [{item: board[0], index: 0}, {item: board[4], index: 4}, {item: board[8], index: 8}],
                [{item: board[2], index: 2}, {item: board[4], index: 4}, {item: board[6], index: 6}],
            ];


            return check_for_winning_piece(rows);


        }

        function check_for_winning_piece(rows) {

            return rows.find(row => {

                const empty = [];

                const pieces = [];

                row.forEach((cell) => {
                    if (cell.item === '.') {

                        empty.push(cell)

                    } else if (cell.item === piece) {

                        pieces.push(cell);

                    }
                });


                if (empty.length === 1 && pieces.length === 2) {

                    winningPiece = empty[0];

                    return true;
                }
            })
        }


    }


    choosePiece(piece) {

        const turn = 'player';

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


            setTimeout(() => this.setState({__alert__: null}), 1300);
        });


    }

    handlePlaceUserPiece(idx) {


        const {board, playerPiece, turn} = this.state;


        if (turn !== 'player') {

            return false;
        }

        // if cell is not empty, do not place

        if (!(board[+idx] === '.')) {

            this.setState({__alert__: 'spot taken'}, () => {

                setTimeout(() => this.setState({__alert__: null}), 3000);
            });

            return;
        }


        const newBoard = board.slice();

        newBoard[idx] = playerPiece;

        this.setState({
            board: newBoard,
            turn: 'computer',
        }, () => {

            const {result, winningCombo} = this.isGameOver(playerPiece);
            if (result) {

                this.resetGame(result, winningCombo);

            }
            else this.placeComputerPiece();
        });


    }


    placeComputerPiece() {

        const {board, computerPiece, playerPiece} = this.state;

        const board_ = board.slice();


        const winPiece = this.checkForPotentialWinningCombinations(computerPiece);


        if (winPiece) {

            // alert(JSON.stringify(winPiece, null, 4));

            board_[winPiece.index] = computerPiece;
        }

        else {

            const blockPiece = this.checkForPotentialWinningCombinations(playerPiece);

            if (blockPiece) {

                // alert(JSON.stringify(blockPiece, null, 4));
                board_[blockPiece.index] = computerPiece;

            } else {

                const preferredPlays = [4, 0, 2, 6, 8, 1, 3, 5, 7];

                const empty = preferredPlays.find(index => board_[index] === '.');

                board_[empty] = computerPiece;
            }

        }


        this.setState({board: board_}, () => {

            const {result, winningCombo} = this.isGameOver(computerPiece);
            if (result) {

                this.resetGame(result, winningCombo);


            } else {

                this.setState({turn: 'player'});
            }

        });


    }


    render() {


        const {__alert__, playerPiece, board, turn, winningCombo, history: {win, loss, tie}} = this.state;


        return (

            <div className={'app'}>
                <ChooseWeapon
                    show={!playerPiece}
                    choosePiece={this.choosePiece}
                />

                <Notifications
                    notification={__alert__}
                />

                <TicTacToeBoard
                    turn={turn}
                    board={board}
                    winningCombo={winningCombo}
                    handlePlaceUserPiece={this.handlePlaceUserPiece}
                />
                <GameHistory
                    win={win}
                    loss={loss}
                    tie={tie}
                />


            </div>
        );
    }
}

export default App;
