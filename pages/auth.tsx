import { useState, useCallback } from "react";
import { getSession, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import GoogleIcon from "@mui/icons-material/Google";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useRegisterUserMutation } from "@/slices/apiSlice";
import { useToast } from "@/components/ui/use-toast";

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

const Auth = () => {
  const router = useRouter();
  const { data: session } = useSession(); // Added useSession hook
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");
  const [loading, setLoading] = useState(false); // Added loading state

  const [registerUser] = useRegisterUserMutation();

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    setLoading(true);
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/",
    });

    if (result?.error) {
      console.log("Error logging in:", result.error);
      setLoading(false);
      alert(result.error);
    } else {
      router.push("/");
      setLoading(false);
    }
  }, [email, password, router]);

  const register = useCallback(async () => {
    setLoading(true);
    try {
      await registerUser({ email, name, password });
      login();
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      alert("Something went wrong...");
    }
  }, [email, name, password, registerUser, login]);

  // Automatically redirect if session exists
  if (session) {
    router.push("/");
  }

  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "5%",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {variant === "login" ? "Sign in" : "Register"}
          </Typography>

          <div style={{ width: "100%", marginTop: "2%" }}>
            {variant === "register" && (
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
              label="Email "
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
              style={{ marginTop: "2%" }}
              onClick={variant === "login" ? login : register}
              disabled={loading}
            >
              {loading
                ? "Signing In..."
                : variant === "login"
                ? "Login"
                : "Register"}
            </Button>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "2%",
              }}
            >
              <Button onClick={() => signIn("google", { callbackUrl: "/" })}>
                <GoogleIcon />
              </Button>
            </div>

            <Typography align="center" style={{ marginTop: "5%" }}>
              {variant === "login"
                ? "First time using the app ?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                style={{ color: "blue", cursor: "pointer", marginLeft: "1%" }}
              >
                {variant === "login" ? "Create an account" : "Login"}
              </span>
            </Typography>
          </div>
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default Auth;
