import { Form, Button } from 'react-bootstrap';

export const Login = ({
    username,
    password,
    message,
    loading,
    onChangeUsername,
    onChangePassword,
    handleLogin,
}: any): JSX.Element => {
    return (
        <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Korisničko ime</Form.Label>
                <Form.Control type="text" placeholder="" value={username} onChange={onChangeUsername} required />
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
                    <span>Prijavi se</span>
                </Button>
            </div>

            {message && (
                <div className="form-group mt-3">
                    <div className="alert alert-danger" role="alert">
                        {message}
                    </div>
                </div>
            )}
        </Form>
    );
};
