import { useUser } from '@clerk/clerk-expo';
import { useAuth } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import GoogleTextInput from '@/components/GoogleTextInput';
import RideCard from '@/components/RideCard';
import { icons, images } from '@/constants';
import { Ride } from '@/types/type';
import React from 'react';

const Home = () => {
  const { user } = useUser();
  console.log(user);
  const { signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    router.replace('/(auth)/sign-in');
  };
  const loading = true;
  const recentRides: Ride[] = [
    {
      origin_address: 'Kathmandu, Nepal',
      destination_address: 'Pokhara, Nepal',
      origin_latitude: parseFloat('27.717245'),
      origin_longitude: parseFloat('85.323961'),
      destination_latitude: parseFloat('28.209583'),
      destination_longitude: parseFloat('83.985567'),
      ride_time: 391,
      fare_price: parseFloat('19500.00'),
      payment_status: 'paid',
      driver_id: 2,
      user_email: '',
      created_at: '2024-08-12 05:19:20.620007',
      driver: {
        first_name: 'David',
        last_name: 'Brown',
        car_seats: 5,
      },
    },
    {
      origin_address: 'Jalkot, MH',
      destination_address: 'Pune, Maharashtra, India',
      origin_latitude: parseFloat('18.609116'),
      origin_longitude: parseFloat('77.165873'),
      destination_latitude: parseFloat('18.520430'),
      destination_longitude: parseFloat('73.856744'),
      ride_time: 491,
      fare_price: parseFloat('24500.00'),
      payment_status: 'paid',
      driver_id: 1,
      user_email: '',
      created_at: '2024-08-12 06:12:17.683046',
      driver: {
        first_name: 'James',
        last_name: 'Wilson',
        car_seats: 4,
      },
    },
    {
      origin_address: 'Zagreb, Croatia',
      destination_address: 'Rijeka, Croatia',
      origin_latitude: parseFloat('45.815011'),
      origin_longitude: parseFloat('15.981919'),
      destination_latitude: parseFloat('45.327063'),
      destination_longitude: parseFloat('14.442176'),
      ride_time: 124,
      fare_price: parseFloat('6200.00'),
      payment_status: 'paid',
      driver_id: 1,
      user_email: '',
      created_at: '2024-08-12 08:49:01.809053',
      driver: {
        first_name: 'James',
        last_name: 'Wilson',
        car_seats: 4,
      },
    },
    {
      origin_address: 'Okayama, Japan',
      destination_address: 'Osaka, Japan',
      origin_latitude: parseFloat('34.655531'),
      origin_longitude: parseFloat('133.919795'),
      destination_latitude: parseFloat('34.693725'),
      destination_longitude: parseFloat('135.502254'),
      ride_time: 159,
      fare_price: parseFloat('7900.00'),
      payment_status: 'paid',
      driver_id: 3,
      user_email: '',
      created_at: '2024-08-12 18:43:54.297838',
      driver: {
        first_name: 'Michael',
        last_name: 'Johnson',
        car_seats: 4,
      },
    },
  ];

  const handleDestinationPress = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {};

  return (
    <SafeAreaView className="bg-general-500">
      <FlatList
        data={recentRides?.slice(0, 5)}
        renderItem={({ item }) => <RideCard ride={item} />}
        keyExtractor={(item, index) => index.toString()}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center">
            {!loading ? (
              <>
                <Image
                  source={images.noResult}
                  className="w-40 h-40"
                  alt="No recent rides found"
                  resizeMode="contain"
                />
                <Text className="text-sm">No recent rides found</Text>
              </>
            ) : (
              <ActivityIndicator size="small" color="#000" />
            )}
          </View>
        )}
        ListHeaderComponent={
          <>
            <View className="flex flex-row items-center justify-between my-5">
              <Text className="text-2xl font-JakartaExtraBold">
                Welcome {user?.emailAddresses[0].emailAddress}👋
              </Text>
              <TouchableOpacity
                onPress={handleSignOut}
                className="justify-center items-center w-10 h-10 rounded-full bg-white"
              >
                <Image source={icons.out} className="w-4 h-4" />
              </TouchableOpacity>
            </View>

            <GoogleTextInput
              icon={icons.search}
              containerStyle="bg-white shadow-md shadow-neutral-300"
              handlePress={handleDestinationPress}
            />

            <>
              <Text className="text-xl font-JakartaBold mt-5 mb-3">
                Your current location
              </Text>
            </>
          </>
        }
      />
    </SafeAreaView>
  );
};

export default Home;
