import React from 'react';

// router
import { withRouter } from 'react-router-dom';

function PostFormComponent(props) {return (<div>PostForm, id = {props.match.params.id}</div>)}

export const PostForm = withRouter(PostFormComponent);
