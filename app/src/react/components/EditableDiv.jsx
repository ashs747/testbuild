//Editable DIV

import React from 'react';

export class EditableDiv extends React.Component{
	constructor() {
		super();
	}
	render() {
		if (this.props.editing) {
			return (<textarea classList={this.props.classList} onChange={this.props.onChange}>{this.props.content}</textarea>);
		}
		return (<div classList={this.props.classList}>{this.props.content}</div>)
	}
}