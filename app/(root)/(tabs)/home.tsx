import { useUser } from '@clerk/clerk-expo';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const { user } = useUser();

  const [time, setTime] = useState('');

  useEffect(() => {
    fetch('http://10.0.2.2:3000/api/time')
      .then((response) => response.json())
      .then((data) => {
        setTime(data.now);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <SafeAreaView>
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <Text>Current time from PostgreSQL: {time}</Text>
      </SignedIn>
      <SignedOut>
        <Link href="/(auth)/sign-in">
          <Text>Sign In</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text>Sign Up</Text>
        </Link>
      </SignedOut>
    </SafeAreaView>
  );
};

export default Home;
