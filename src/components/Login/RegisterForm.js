import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import axios from "axios";

const RegisterForm = ({ showLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successRegister, setSuccessRegister] = useState(false);

  const onSubmitRegister = async (e) => {
    e.preventDefault();
    let body = {
      userName: username,
      userEmail: email,
      userPassword: password,
    };
    const registerResult = await axios.post(
      "http://localhost:5000/register",
      body
    );
    if (registerResult.status === 200) {
      setSuccessRegister(true);
      setTimeout(() => {
        showLogin(true);
      }, 3000);
    }
  };
  return (
    <Box component="form" onSubmit={onSubmitRegister}>
      <Grid container spacing={1} padding={5}>
        <Grid item xs={12} md={12}>
          <TextField
            id="standard-basic"
            label="username"
            variant="standard"
            onChange={(e) => setUsername(e.target.value)}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            id="standard-basic"
            label="email"
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            id="standard-basic"
            label="password"
            variant="standard"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} mt={5}>
          {successRegister && (
            <Alert severity="success" style={{ marginBottom: "10px" }}>
              Register Success
            </Alert>
          )}
          <Button variant="outlined" fullWidth type="submit">
            Sign up
          </Button>
        </Grid>
        <span style={{ margin: "10px" }}>
          Already have an account?{" "}
          <span
            style={{ cursor: "pointer", color: "rgb(29, 155, 240)" }}
            onClick={() => {
              showLogin(true);
            }}
          >
            {" "}
            Sign in
          </span>
        </span>
      </Grid>
    </Box>
  );
};

export default RegisterForm;
