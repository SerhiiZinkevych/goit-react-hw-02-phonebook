import React, { Component } from 'react';
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';

export default class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  static propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (!this.state.name || !this.state.number) {
      return;
    }

    this.props.onFormSubmit({ ...this.state });
    this.reset();
  };

  reset() {
    this.setState({
      name: '',
      number: '',
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            value={this.state.name}
            name="name"
            required
            onChange={this.handleChange}
          />
        </label>
        <label htmlFor="number">
          Number
          <MaskedInput
            mask={[
              '(',
              /\d/,
              /\d/,
              /\d/,
              ')',
              ' ',
              /\d/,
              /\d/,
              /\d/,
              '-',
              /\d/,
              /\d/,
              /\d/,
              /\d/,
            ]}
            name="number"
            value={this.state.number}
            onChange={this.handleChange}
            placeholder="(___) ___-____"
          />
        </label>
        <button type="submit">Add contact</button>
      </form>
    );
  }
}
