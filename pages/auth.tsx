import axios from 'axios';
import { useCallback, useState } from 'react';
import { NextPageContext } from 'next';
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    };
  }

  return {
    props: {}
  };
}

const Auth = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [variant, setVariant] = useState('login');

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/'
      });

      router.push('/');
    } catch (error) {
      console.log(error);
    }
  }, [email, password, router]);

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        email,
        name,
        password
      });

      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '5%' }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {variant === 'login' ? 'Sign in' : 'Register'}
          </Typography>
          
          <div style={{ width: '100%', marginTop: '2%' }}>
            {variant === 'register' && (
              <TextField
                fullWidth
                id="name"
                type="text"
                label="Username"
                value={name}
                onChange={(e: any) => setName(e.target.value)}
                variant="outlined"
                margin="normal"
              />
            )}
            <TextField
              fullWidth
              id="email"
              type="email"
              label="Email address or phone number"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              id="password"
              type="password"
              label="Password"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              variant="outlined"
              margin="normal"
            />
            
            
            <Button
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: '2%' }}
              onClick={variant === 'login' ? login : register}
            >
              {variant === 'login' ? 'Login' : 'Sign up'}
            </Button>
            
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2%' }}>
              <Button onClick={() => signIn('google', { callbackUrl: '/' })}>
                <FcGoogle size={24} />
              </Button>
              <Button onClick={() => signIn('github', { callbackUrl: '/' })} style={{ marginLeft: '2%' }}>
                <FaGithub size={24} />
              </Button>
            </div>
            
            <Typography align="center" style={{ marginTop: '5%' }}>
              {variant === 'login' ? 'First time using Netflix?' : 'Already have an account?'}
              <span onClick={toggleVariant} style={{ color: 'blue', cursor: 'pointer', marginLeft: '1%' }}>
                {variant === 'login' ? 'Create an account' : 'Login'}
              </span>
            </Typography>
          </div>
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default Auth;
