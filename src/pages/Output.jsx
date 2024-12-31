/* eslint-disable react/prop-types */
import {
  Button,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Paper,
  Grid,
  Box,
} from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Output = ({ output, loading, setOutput }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user) return navigate("/login");
      if (!output) return navigate("/");
    }, 10);

    return () => clearTimeout(timer);
  }, [user, navigate]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: "1rem",
      }}
    >
      {loading ? (
        <CircularProgress size={80} color="primary" />
      ) : (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%", margin: "0 auto" }}
        >
          <Grid item xs={12} sm={10} md={8} lg={6}>
            {!output ? (
              <Paper
                elevation={4}
                sx={{
                  padding: "2rem",
                  minHeight: "300px",
                  textAlign: "center",
                  borderRadius: "12px",
                  backgroundColor: "#ffffff",
                }}
              >
                <Typography
                  variant="h4"
                  color="error"
                  gutterBottom
                  sx={{ fontSize: { xs: "1.8rem", sm: "2rem" } }}
                >
                  Missing Information!
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  paragraph
                  sx={{ fontSize: { xs: "1rem", sm: "1.2rem" } }}
                >
                  You need to fill all the details to predict your output.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    marginTop: "1rem",
                    fontSize: { xs: "0.8rem", sm: "1rem" },
                  }}
                  onClick={() => navigate("/")}
                >
                  Fill Your Data Here
                </Button>
              </Paper>
            ) : (
              <Card
                elevation={6}
                sx={{
                  padding: "1.5rem",
                  borderRadius: "12px",
                  textAlign: "center",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h3"
                    color="primary"
                    gutterBottom
                    sx={{ fontSize: { xs: "2rem", sm: "2.5rem" } }}
                  >
                    Result
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      color: "#333",
                      marginBottom: "1.5rem",
                      fontSize: { xs: "1.2rem", sm: "1.5rem" },
                    }}
                  >
                     {output}
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{
                        fontSize: { xs: "0.8rem", sm: "1rem" },
                      }}
                      onClick={() => {
                        navigate("/");
                        setOutput("");
                      }}
                    >
                      Predict Again
                    </Button>
                    <Link
                      to="/"
                      onClick={() => setOutput("")}
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        sx={{
                          fontSize: { xs: "0.8rem", sm: "1rem" },
                        }}
                      >
                        Go Back to Home
                      </Button>
                    </Link>
                  </Box>
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Output;
