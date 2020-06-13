import React, { useEffect } from "react";
import { navigate } from "@reach/router";

const Auth = () => {
  useEffect(() => {
    const code = new URLSearchParams(window.location.search.substring(1)).get(
      "code"
    );

    if (code) {
      fetch(`/api/auth?code=${code}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          navigate("/", { state: { token: data.token } });
        });
    }
  });

  return <p>Loading...</p>;
};

export default Auth;
