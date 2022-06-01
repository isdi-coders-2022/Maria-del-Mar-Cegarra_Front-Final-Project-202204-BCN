const LoginForm = (): JSX.Element => {
  return (
    <>
      <form noValidate autoComplete="off">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" placeholder="Username..." />
        <label htmlFor="password">Password</label>
        <input type="text" id="password" placeholder="Password..." />
        <input type="submit" value="LOGIN" />
      </form>
    </>
  );
};

export default LoginForm;
