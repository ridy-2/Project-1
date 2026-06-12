import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Label from "../atoms/Label";

export default function Form({ onSubmit, email, setEmail, password, setPassword }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <Label text="Email" htmlFor="email" />
        <Input type="email" placeholder="Masukkan email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <Label text="Password" htmlFor="password" />
        <Input type="password" placeholder="Masukkan password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <Button label="Login" onClick={onSubmit} variant="primary" />
    </div>
  );
}