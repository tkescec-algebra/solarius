import { Form, Button } from 'react-bootstrap';

export const Register = ({
    username,
    email,
    password,
    message,
    loading,
    successful,
    onChangeUsername,
    onChangeEmail,
    onChangePassword,
    handleRegister,
}: any): JSX.Element => {
    return (
        <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Ime</Form.Label>
                <Form.Control type="text" placeholder="" value={username} onChange={onChangeUsername} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>E-mail adresa</Form.Label>
                <Form.Control type="email" placeholder="" value={email} onChange={onChangeEmail} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Lozinka</Form.Label>
                <Form.Control
                    type="password"
                    placeholder=""
                    value={password}
                    onChange={onChangePassword}
                    required
                    minLength={8}
                />
            </Form.Group>
            <div className="d-grid gap-2">
                <Button variant="primary" type="submit" disabled={loading}>
                    {loading && <span className="spinner-border spinner-border-sm me-2"></span>}
                    <span>Registriraj se</span>
                </Button>
            </div>

            {message && (
                <div className="form-group mt-3">
                    <div className={successful ? 'alert alert-success' : 'alert alert-danger'} role="alert">
                        {message}
                    </div>
                </div>
            )}
        </Form>
    );
};
