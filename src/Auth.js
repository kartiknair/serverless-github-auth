import React, { useEffect } from "react";
import { navigate } from "@reach/router";

const Auth = () => {
  useEffect(() => {
    const code = new URLSearchParams(window.location.search.substring(1)).get(
      "code"
    );

    if (code) {
      // '/api/auth' for Vercel & '.netlify/functions/auth' for Netlify
      fetch(`/.netlify/functions/auth?code=${code}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          navigate("/", { state: { token: data.token } });
        });
    } else navigate("/", { state: { token: null } });
  });

  return <p>Loading...</p>;
};

export default Auth;
