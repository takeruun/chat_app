import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { signUp } from '../actions/user';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  renderField(field) {
    const {
      input,
      label,
      type,
      meta: { touched, error },
    } = field;
    return (
      <div>
        {touched && error && <span>{error}</span>}
        <input {...input} placeholder={label} type={type} />
      </div>
    );
  }

  async onSubmit(values) {
    await this.props.signUp(values);
    this.props.history.push('/');
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div>
            <Field
              label="メールアドレス"
              name="email"
              type="email"
              component={this.renderField}
            />
          </div>
          <div>
            <Field
              label="パスワード"
              name="password"
              type="password"
              component={this.renderField}
            />
          </div>
          <div>
            <Field
              label="名前"
              name="name"
              type="text"
              component={this.renderField}
            />
          </div>
          <div>
            <input
              type="submit"
              value="登録"
              disabled={pristine || submitting}
            />
            <Link to="/">戻る</Link>
          </div>
        </form>
        <style jsx>{`
          span {
            display: block;
          }
          input {
            padding-left: 10px;
            width: 100%;
            height: 32px;
            margin-bottom: 40px;
            font-size: 15px;
          }
          button {
            display: block;
            width: 60px;
            height: 32px;
            margin-left: auto;
          }
        `}</style>
      </div>
    );
  }
}

const validate = (values) => {
  const erros = {};

  if (!values.email) erros.email = 'Enter a email, please';
  if (!values.password) erros.password = 'Enter a password, please';
  if (!values.name) erros.name = 'Enter a name, please';

  return erros;
};

const mapDispatchToProps = { signUp };

export default connect(
  null,
  mapDispatchToProps
)(reduxForm({ validate, form: 'signUpForm' })(withRouter(SignUpForm)));
