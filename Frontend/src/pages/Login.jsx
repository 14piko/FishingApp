import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useAuth from '../hooks/useAuth';

export default function Login() {

  const { login } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    const results = new FormData(e.target);

    login({
      email: results.get('email'),
      password: results.get('password'),
    });
  }

  return (
    <Container className='mt-4'>
        <p>
            email: admin@edunova.hr
        </p>
        <p>
            lozinka: a
        </p>

      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='text'
            name='email'
            placeholder='admin@edunova.hr'
            maxLength={255}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Lozinka</Form.Label>
          <Form.Control type='password' name='password' required />
        </Form.Group>
        <Button variant='primary' className='button' type='submit'>
          Login
        </Button>
      </Form>
    </Container>
  );
}