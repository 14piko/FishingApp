import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import useAuth from '../hooks/useAuth';

export default function Login() {
  const { login } = useAuth();
  const [passwordVisible, setPasswordVisible] = useState(false); 

  function handleSubmit(e) {
    e.preventDefault();
    const results = new FormData(e.target);

    login({
      email: results.get('email'),
      password: results.get('password'),
    });
  }

  return (
    <Container className='mt-5' style={{ maxWidth: '400px', border: '1px solid #ccc', padding: '20px', borderRadius: '8px', backgroundColor: '#f8f9fa' }}>
      <h2 className='text-center mb-4'>Login</h2>
      <hr></hr>
      <p className='text-muted mb-2'>
        <strong>Email:</strong> <span style={{ color: '#000' }}>admin@edunova.hr</span><br />
      </p>
      <p className='text-muted mb-4'>
        <strong>Password:</strong> <span style={{ color: '#000' }}>a</span>
      </p>
      <hr></hr>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email' 
            name='email'
            placeholder='Enter your email'
            maxLength={255}
            required
          />
        </Form.Group>

      
        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={passwordVisible ? 'text' : 'password'} 
              name='password'
              placeholder='Enter your password'
              required
            />
            <InputGroup.Text
              onClick={() => setPasswordVisible(!passwordVisible)}
              style={{ cursor: 'pointer' }}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />} 
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>

      
        <Button variant='primary' className='w-100' type='submit'> 
          Log in
        </Button>
      </Form>
    </Container>
  );
}
