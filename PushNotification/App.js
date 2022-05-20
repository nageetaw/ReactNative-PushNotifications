import React, {useEffect} from 'react';
import notifee from '@notifee/react-native';
import {View, Button} from 'react-native';
import messaging from '@react-native-firebase/messaging';

async function onAppBootstrap() {
  // Register the device with FCM
  await messaging()
    .registerDeviceForRemoteMessages()
    .catch(err => {
      console.log('err ' + err);
    });

  // Get the token
  const token = await messaging().getToken();
  console.log('token is from here ' + token + ' to here ');

  // Save the token
  // await postToApi('/users/1234/tokens', {token});
}

// Note that an async function or a function that returns a Promise
// is required for both subscribers.
async function onMessageReceived(message) {
  console.log('message recieved');
  const data = await JSON.parse(message.data.notification);
  console.log(data);
  const channelId = await notifee.createChannel({
    id: '123',
    name: 'Default Channel',
  });
  notifee.displayNotification({
    body: data['body'],
    title: data['title'],
    android: {
      channelId,
      smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
    },
  });
}
messaging().onMessage(onMessageReceived);
messaging().setBackgroundMessageHandler(onMessageReceived);

const App = () => {
  useEffect(() => {
    onAppBootstrap();
  });
  // async function onDisplayNotification() {
  //   // Create a channel
  //   const channelId = await notifee.createChannel({
  //     id: '123',
  //     name: 'Default Channel',
  //   });

  //   // Display a notification
  //   await notifee.displayNotification({
  //     title: 'Notification Title',
  //     body: 'Main body content of the notification',
  //     android: {
  //       channelId,
  //       smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
  //     },
  //   });
  // }
  // async function cancel(notificationId) {
  //   await notifee.cancelNotification(notificationId);
  // }
  return (
    <View>
      {/* <Button
        title="Display Notification"
        onPress={() => onDisplayNotification()}
      />
      <Button title="Cancel Notification" onPress={() => cancel('123')} /> */}
    </View>
  );
};

export default App;
