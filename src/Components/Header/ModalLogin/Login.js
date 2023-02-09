import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import auth from '../../../firebase';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAccountGoogle } from '../../Actions/shop24h.Actions';
import ModalLogin from './ModalLogin';

const provider = new GoogleAuthProvider()

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { card} = useSelector((reduxData) => {
        return reduxData.shop24hReduces
    })
    const [modal, setModal] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setModal(!modal);
    const toggleDropdow = () => setDropdownOpen((prevState) => !prevState);

    const openModalLogin = () => {
        toggle()
    }
    const [user, setUser] = useState(null)

    const loginGoogle = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            
            setUser(result.user)
        })
        .catch((error) => {
            console.error(error)
        });
        toggle();
    }
  const logOutGoogle = () => {
    signOut(auth)
      .then(() => {
        setUser(null)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect (() => {
    onAuthStateChanged(auth, (result) => {
      setUser(result)

    })
  })

    return (
        <div>
            <a  className='text-white' href='#'><i style={{fontSize: "25px"}} class="far fa-bell"></i></a>&emsp; &emsp;
            <a className='text-white position-relative' type='button'
                onClick={() => navigate("/card")}
                >
                    <i style={{fontSize: "25px"}} class="fas fa-shopping-cart"></i>
                        { card.length > 0 ?
                        <span className='icon-cart position-absolute end-1 bottom-0'>{card.length}</span> 
                        : null
                        }
                </a>&emsp; &emsp;
            {
                user ?
                    <>
                        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdow}>
                            <DropdownToggle color='none'>
                                <img width={40} style={{borderRadius: "50%"}} src={user.photoURL}/>
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={logOutGoogle}>
                                    Log out
                                </DropdownItem>                               
                            </DropdownMenu>
                        </Dropdown>

                    </>
                    :
                    <>
                        <a className='text-white' type='button' onClick={openModalLogin}> <i style={{fontSize: "25px"}} class="far fa-user-circle"></i></a>
                        <ModalLogin modal={modal} toggle={() => setModal(!modal)} loginGoogle = {loginGoogle} />
                        {/*<Modal isOpen={modal} toggle={toggle} className='text-center'>
                            <ModalBody>
                                <h2> Sign In</h2>
                                <Form className='mt-5'>
                                    <FormGroup floating>
                                        <Input
                                            placeholder="Email"
                                            style={{ borderRadius: "30px" }}
                                        />
                                        <Label >
                                            Email address
                                        </Label>
                                    </FormGroup>
                                    {' '}
                                    <FormGroup floating>
                                        <Input
                                            style={{ borderRadius: "30px" }}
                                            placeholder="Password"
                                            type="password"
                                        />
                                        <Label >
                                            Password
                                        </Label>
                                    </FormGroup>
                                    {' '}
                                    <Button
                                        color='success'
                                        style={{ borderRadius: "30px" }}
                                        block
                                        size='lg'
                                    >
                                        Sign in</Button>
                                </Form>

                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color='danger'
                                    style={{ borderRadius: "30px" }}
                                    block
                                    size='lg'
                                    onClick={loginGoogle}
                                >
                                    Sign in with <b> GOOGLE</b> </Button>

                            </ModalFooter>
                        </Modal> */}
                    </>


            }


        </div>
    );
}

export default Login;