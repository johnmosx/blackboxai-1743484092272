import {Container, DropdownButton, Navbar, NavDropdown} from "react-bootstrap";
import {useAuth} from "../contexts/AuthContext";
import {BsFillInfoCircleFill} from "react-icons/bs";

const Header = () => {
    const auth = useAuth();
    const handleLogOut = () => {
        auth.globLSignOut();
    };

    return (
        <header className="bg-green-700 text-white shadow-md">
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">Vision Terra CRM</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <DropdownButton title={
                                <BsFillInfoCircleFill />
                            } id="basic-nav-dropdown" drop={"start"}>
                                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogOut}>Logout</NavDropdown.Item>
                            </DropdownButton>


                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </header>
    );
};

export default Header;