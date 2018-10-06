import React from 'react';


export class ChooseWeapon extends React.Component {

    constructor(props) {
        super();
    }

    componentDidMount() {
        window.$('#chooseWeaponModal').modal({
            show: true,
            backdrop: 'static',
            keyboard: false,
            focus: true,
        });
    }

    handleChoosePiece(choice) {

        window.$('#chooseWeaponModal').modal('hide');
        this.props.choosePiece(choice);

    }

    render() {

        return (

            <div className="modal fade" id={'chooseWeaponModal'} tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Choose Weapon</h5>
                        </div>
                        <div className="modal-body">
                            <div className={'px-1 row d-flex justify-content-center align-items-center'}>
                                <button className={'btn btn-info btn-block'} onClick={() => this.handleChoosePiece('O')}
                                >
                                    <i className="far fa-circle fa-2x ">

                                    </i>
                                </button>

                                <button className={'btn btn-danger btn-block'} onClick={() => this.handleChoosePiece('X')}
                                >
                                    <i className={'fa fa-times fa-2x'}>

                                    </i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}
