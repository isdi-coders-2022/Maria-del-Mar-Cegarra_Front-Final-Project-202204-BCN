const RegisterForm = (): JSX.Element => {
  return (
    <>
      <form>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" placeholder="Name..." />
        <label htmlFor="username">Username</label>
        <input type="text" id="username" placeholder="Username..." />
        <label htmlFor="email">Email</label>
        <input type="text" id="email" placeholder="Email..." />
        <label htmlFor="password">Password</label>
        <input type="text" id="password" placeholder="Password..." />
        <label htmlFor="repeatPassword">Repeat password</label>
        <input
          type="text"
          id="repeatPassword"
          placeholder="Repeat password..."
        />
        <input type="submit" value="REGISTER" />
      </form>
    </>
  );
};

export default RegisterForm;
