import React, { useEffect, useState } from "react";

const App = ({ location }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (location?.state?.token) {
      fetch("https://api.github.com/user", {
        headers: { Authorization: `token ${location.state.token}` },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setUser(data);
        });
    }
  }, [location]);

  const signIn = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&scope=repo}`;
  };

  return (
    <article>
      {user ? (
        <p>Hey there {user.name}</p>
      ) : (
        <button onClick={signIn}>Sign in with GitHub</button>
      )}
    </article>
  );
};

export default App;
