import React from 'react';

// router
import { withRouter } from 'react-router-dom';

function UserFormComponent(props) {return (<div>UserForm, id = {props.match.params.id}</div>)}

export const UserForm = withRouter(UserFormComponent);
