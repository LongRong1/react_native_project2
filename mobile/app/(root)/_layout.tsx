import { useUser } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import {Stack} from "expo-router";

export default function Layout() {
  const {isSignedIn} = useUser();

  // Redirect to sign-in page if not signed in
  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      
    </Stack>
  );
}