import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/user';

class LogInForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  renderField(field) {
    const {
      input,
      className,
      label,
      type,
      meta: { touched, error },
    } = field;
    return (
      <div>
        {touched && error && <span className="msg-err">{error}</span>}
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
    await this.props.login(values);
    this.props.history.push('/');
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit)} className="login_form">
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
            <input
              type="submit"
              value="ログイン"
              disabled={pristine || submitting}
              className="submit"
            />
          </div>
          <Link to="/" className="back">
            戻る
          </Link>
          <Link to="/signup" className="link_to_signup_page">
            新規登録はこちら
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

  return erros;
};

const mapDispatchToProps = { login };

export default connect(
  null,
  mapDispatchToProps
)(reduxForm({ validate, form: 'loginForm' })(withRouter(LogInForm)));
