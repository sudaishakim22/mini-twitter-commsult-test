import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const LoginForm = ({ showRegister, onGetDataLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitLogin = (e) => {
    e.preventDefault();
    onGetDataLogin(username, password);
  };

  return (
    <Box component="form" onSubmit={onSubmitLogin}>
      <Grid container spacing={1} padding={2}>
        <Grid item xs={12} md={6}>
          <TextField
            id="standard-basic"
            label="username"
            variant="standard"
            required
            type="text"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="standard-basic"
            label="password"
            variant="standard"
            required
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} mt={5}>
          <Button variant="outlined" fullWidth type="submit">
            Sign in
          </Button>
        </Grid>
        <span style={{ margin: "10px" }}>
          Don’t have an account?
          <span
            style={{ cursor: "pointer", color: "rgb(29, 155, 240)" }}
            onClick={() => {
              showRegister(false);
            }}
          >
            {" "}
            Sign Up
          </span>
        </span>
      </Grid>
    </Box>
  );
};

export default LoginForm;
