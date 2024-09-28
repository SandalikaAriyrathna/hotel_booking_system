import { Menu } from 'react-feather';
import Link from 'next/link';
import {
	Nav,
	Navbar,
	Form,
	ListGroup,
	Dropdown,
	Image,
	Row,
	Col,
} from 'react-bootstrap';

const NavbarTop = () => {
	return (
		<Navbar
			expanded="lg"
			className="navbar-classic navbar navbar-expand-lg mt-2 mb-5"
			style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
		>
			<Row className="w-100 align-items-center" style={{ height: '70px', marginLeft: '50px' }}>
				<Col sm={3} className="d-flex align-items-center">
					<Image alt="logo" style={{ height: '60px' }} src='/images/logo-black.jpeg' className='ms-5' />
				</Col>
				<Col sm={6}>
					<Form className="d-flex align-items-center">
						<Form.Control
							type="search"
							placeholder="Search"
							className="form-control-style w-100"
						/>
					</Form>
				</Col>
				<Col sm={3} className="d-flex justify-content-end">
					<Nav className="navbar-right-wrap ms-2 d-flex nav-top-wrap">
						<ListGroup as="ul" bsPrefix='navbar-nav' className="navbar-right-wrap d-flex nav-top-wrap">
							<Dropdown as="li" className="ms-2">
								<Dropdown.Toggle
									as="a"
									bsPrefix=' '
									className="rounded-circle"
									id="dropdownUser">
									<div className="avatar avatar-md avatar-indicators avatar-online mb-2">
										<Image alt="avatar" style={{ height: '60px' }} src='/images/avatar/avatar-1.jpg' className="rounded-circle me-5" />
									</div>
								</Dropdown.Toggle>
								<Dropdown.Menu
									className="dropdown-menu dropdown-menu-end me-5"
									align="end"
									aria-labelledby="dropdownUser"
									show
								>
									<Dropdown.Item as="div" className="px-4 pb-0 pt-2" bsPrefix=' '>
										<div className="lh-1">
											<h5 className="mb-1"> Admin</h5>
											<Link href="#" className="text-inherit fs-6">View my profile</Link>
										</div>
										<div className=" dropdown-divider mt-3 mb-2"></div>
									</Dropdown.Item>
									<Dropdown.Item eventKey="2">
										<i className="fe fe-user me-2"></i> Edit Profile
									</Dropdown.Item>
									<Dropdown.Item>
										<i className="fe fe-power me-2"></i>Sign Out
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</ListGroup>
					</Nav>
				</Col>
			</Row>
		</Navbar>
	);
};

export default NavbarTop;
