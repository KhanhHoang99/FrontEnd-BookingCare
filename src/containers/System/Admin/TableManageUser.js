import React, { Component } from 'react';
import * as actions from "../../../store/actions";
import { connect } from 'react-redux';
import './TableManageUser.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}

class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        this.props.fetchAllUserRedux();
    }

    componentDidUpdate(prevProps) {
        if (this.props.users !== prevProps.users) {
            let users = this.props.users
            this.setState({
                users: users
            })
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteUserRedux(user.id);
    }

    handleEditUser = (user) => {
        this.props.handleEditUserFromParent(user);
    }
    
    render() {
        return (
            <>
                <div className='users-container container'>

                    <table className="table table-hover mt-3">
                            <thead>
                                <tr>
                                    <th scope="col">Emai</th>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                this.state.users && this.state.users.length > 0 && 
                                this.state.users.map((user) => {
                                        return (
                                            <tr key={user.id}>
                                                <td>{user.email}</td>
                                                <td>{user.firstName}</td>
                                                <td>{user.lastName}</td>
                                                <td style={{textTransform: "capitalize"}}>{user.address}</td>
                                                <td>
                                                    <button 
                                                        type="button" 
                                                        className='btn btn-primary px-4 mx-1 mb-1'
                                                        onClick={() => this.handleEditUser(user)}
                                                    >
                                                        <i className="fas fa-pencil-alt"></i>
                                                    </button>
                                                    <button 
                                                        type="button" 
                                                        className='btn btn-danger px-4 mx-1 mb-1'
                                                        onClick={() => this.handleDeleteUser(user)}
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                    </table>
                    <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUserRedux : () => dispatch(actions.fetchAllUserStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteUser(id))
    };
};

    export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
