const Reset = () => {
  return (
    <div className="auth-section">
      <form>
        <h1>Reset Password</h1>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter Your Email Address"
          className="input-field"
        />
        <button type="submit" className="btn btn-full">
          Reset
        </button>
      </form>
    </div>
  );
};

export default Reset;
