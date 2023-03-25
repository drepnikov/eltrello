import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

type RegisterDto = {
  email: string;
  username: string;
  password: string;
};

export const RegisterForm: React.FC = () => {
  const { handleSubmit, register } = useForm<RegisterDto>();
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <div className="form-container">
      <div className="login-header">Register to Trello</div>
      <div className="errors"></div>

      <form onSubmit={onSubmit}>
        <input
          {...register('email', { required: true })}
          type="email"
          placeholder="Email"
          className="login-input"
        />
        <input
          {...register('username', { required: true })}
          placeholder="Username"
          className="login-input"
        />
        <input
          {...register('password', { required: true })}
          type="password"
          placeholder="Password"
          className="login-input"
        />
        <button type="submit" className="login-submit-button">
          Register
        </button>
      </form>

      <div className="bottom-form-links">
        <Link to="/login" className="register-link">
          Sign in
        </Link>
      </div>
    </div>
  );
};