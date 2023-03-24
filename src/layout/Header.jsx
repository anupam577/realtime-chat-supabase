import { Button, Grid, GridItem, Image } from "@chakra-ui/react";
import { FaGithub, FaGoogle } from "react-icons/fa";

import { useAppContext } from "../context/appContext";
import NameForm from "./NameForm";
export default function Header() {
  const { username, setUsername, auth, randomUsername } = useAppContext();
  return (
    <Grid
      templateColumns="max-content 1fr min-content"
      justifyItems="center"
      alignItems="center"
      bg="white"
      position="sticky"
      top="0"
      zIndex="10"
      borderBottom="20px solid #edf2f7"
    >
      <GridItem justifySelf="start" m="2">
        <Image src="https://upload.wikimedia.org/wikipedia/commons/2/24/LEGO_logo.svg" height="30px" ml="2" />
      </GridItem>
      {auth.user() ? (
        <>
          <GridItem justifySelf="end" alignSelf="center" mr="4">
            Welcome <strong>{username}</strong>
          </GridItem>
          <Button
            marginRight="4"
            size="sm"
            variant="link"
            onClick={() => {
              const { error } = auth.signOut();
              if (error) return console.error("error signOut", error);
              const username = randomUsername();
              setUsername(username);
              localStorage.setItem("username", username);
            }}
          >
            Log out
          </Button>
        </>
      ) : (
        <>
          <GridItem justifySelf="end" alignSelf="end">
            <NameForm username={username} setUsername={setUsername} />
          </GridItem>
          <Button
            size="sm"
            marginRight="2"
            colorScheme="teal"
            rightIcon={<FaGoogle />}
            variant="outline"
            onClick={() =>
              auth.signIn({
                provider: "google",
              })
            }
          >
            Login
          </Button>
        </>
      )}
    </Grid>
  );
}
