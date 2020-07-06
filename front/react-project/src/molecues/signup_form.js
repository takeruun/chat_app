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
      className,
      meta: { touched, error },
    } = field;
    return (
      <div>
        {touched && error && <span>{error}</span>}
        <input
          {...input}
          placeholder={label}
          type={type}
          className={className}
        />
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
        <form onSubmit={handleSubmit(this.onSubmit)} className="signup_form">
          <div>
            <Field
              label="メールアドレス"
              name="email"
              type="email"
              component={this.renderField}
              className="email"
            />
          </div>
          <div>
            <Field
              label="パスワード"
              name="password"
              type="password"
              component={this.renderField}
              className="password"
            />
          </div>
          <div>
            <Field
              label="名前"
              name="name"
              type="text"
              component={this.renderField}
              className="name"
            />
          </div>
          <div>
            <input
              type="submit"
              value="登録"
              disabled={pristine || submitting}
              className="submit"
            />
          </div>
          <Link to="/" className="back">
            戻る
          </Link>
          <Link to="/login" className="link_to_login_page">
            ログインはこちら
          </Link>
        </form>
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
