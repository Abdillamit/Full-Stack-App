export default function Input({ leble, state, setStage, type = "text" }) {
  return (
    <div className="form-floating">
      <input
        value={state}
        onChange={(e) => setStage(e.target.value)}
        type={type}
        className="form-control mb-3"
        id="floatingInput"
        placeholder={leble}
        data-ddg-inputtype="credentials.username"
      />
      <label htmlFor="floatingInput">{leble}</label>
    </div>
  );
}
