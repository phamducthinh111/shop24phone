import React from 'react'
import { Button, Modal, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
export default function ModalLogin( {modal, toggle, loginGoogle }) {
  return (
      <>
          <Modal isOpen={modal} toggle={toggle} className='text-center'>
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
          </Modal>
      </>
  )
}
