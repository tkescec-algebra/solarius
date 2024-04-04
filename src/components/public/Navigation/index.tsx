import { Link, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './index.scss';
import { NavDropdown } from 'react-bootstrap';

const Navigation = (props: any): JSX.Element => {
    const loaction = useLocation();
    const { user, logout } = props;
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="bg-violet">
            <Container fluid>
                <Navbar.Brand href="#home">
                    <img
                        src={require('../../../assets/img/logo.png')}
                        height="40"
                        className="d-inline-block align-top"
                        alt="Solarius"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to={'/'} className={`nav-link ${location.pathname == '/' ? 'active' : ''}`}>
                            Naslovna
                        </Link>
                        <Link
                            to={'/estimate'}
                            className={`nav-link ${location.pathname == '/estimate' ? 'active' : ''}`}
                        >
                            Procjena
                        </Link>
                    </Nav>
                    {user && (
                        <NavDropdown title={user.username} id="basic-nav-dropdown" align="end">
                            <NavDropdown.Item href={'/user/profile'}>Profil</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href={'/'} onClick={logout}>
                                Odjavi se
                            </NavDropdown.Item>
                        </NavDropdown>
                    )}

                    {!user && (
                        <Nav>
                            <Link to={'/login'} className={`nav-link ${location.pathname == '/login' ? 'active' : ''}`}>
                                Prijavi se
                            </Link>
                            <Link
                                to={'/register'}
                                className={`nav-link ${location.pathname == '/register' ? 'active' : ''}`}
                            >
                                Registriraj se
                            </Link>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
