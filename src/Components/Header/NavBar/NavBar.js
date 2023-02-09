import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  NavbarBrand,
  NavbarToggler,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import routerList from '../../../router';


  export default function NavbarHeader ()  {
    const navigate = useNavigate()

    const handleCloseNavMenu = (path) => {
        navigate(path)
    }
    return (
      <div className='text-center div-navbar'>
            <Navbar tag="b" color="red" light expand="md" style={{fontSize: "20px"}}>
                 
                <Collapse navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink 
                            style={{color:"white"}} type='Button' onClick={() => navigate("/")}>Trang chủ</NavLink>                  
                            
                        </NavItem>&emsp; &emsp;
                        <NavItem>
                            <NavLink style={{color:"white"}} type='Button' onClick={() => navigate("/products")}>Cửa hàng</NavLink>
                        </NavItem>&emsp; &emsp;
                        <NavItem>
                            <NavLink style={{color:"white"}} type='Button' href='/'>Giới thiệu</NavLink>
                        </NavItem>&emsp; &emsp;
                        <NavItem>
                            <NavLink style={{color:"white"}} type='Button' href='/'>Liên hệ</NavLink>
                        </NavItem>&emsp; &emsp;
                        {/* <NavItem>
                            <NavLink style={{color:"white"}} href="#">Contact</NavLink>
                        </NavItem> &emsp; &emsp;
                        <UncontrolledDropdown  nav inNavbar>
                            <DropdownToggle style={{color:"white"}} nav caret>
                                Pages
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    About Us
                                </DropdownItem>
                                <DropdownItem>
                                    Shop Detail
                                </DropdownItem>
                                <DropdownItem>
                                    Shopping Cart
                                </DropdownItem>
                                <DropdownItem>
                                    Check Out
                                </DropdownItem>
                                <DropdownItem>
                                    Blog Detail
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown> */}
                    </Nav>
                </Collapse>
            </Navbar>
      </div>
    );
  
}