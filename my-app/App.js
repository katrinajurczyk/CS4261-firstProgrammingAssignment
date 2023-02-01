import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import * as firebase from 'firebase/app';
import { get, getDatabase, onValue, ref, set, child } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// try {
//   const app = firebase.initializeApp(firebaseConfig);
//   const auth = getAuth(app);
//   const db = getDatabase();
// } catch(error) {
//   console.log('Error:', error)
// }

const firebaseConfig = {
  apiKey: 'AIzaSyCUn2IalJ8sIac-u1dRp-jbKcdqD9e9_-0',
  authDomain: 'first-programming-assign-da4ab.firebaseapp.com',
  databaseURL: "XXX",
  projectId:"XXX",
  storageBucket: "XXX",
  databaseURL: 'https://first-programming-assign-da4ab-default-rtdb.firebaseio.com',
  projectId: 'first-programming-assign-da4ab',
  storageBucket: 'first-programming-assign-da4ab.appspot.com',
};

const app = firebase.initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// const db = getFirestore(app);
const db = getDatabase();

export { db };

var numYeses = 0;
var numNos = 0;

const dbRef = ref(getDatabase());
get(child(dbRef, 'numYes')).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
    numYeses = snapshot.val();
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

get(child(dbRef, 'numNo')).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
    numNos = snapshot.val();
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

function updateNumYes() {
  console.log("original numYeses: " + numYeses);
  numYeses = numYeses + 1;
  set(ref(db), {
      numYes: numYeses
  });
  console.log("numYeses after update: " + numYeses);
  Alert.alert('Thank you for your feedback!');
}

function updateNumNo() {
  console.log("original numNos: " + numNos);
  numNos = numNos + 1;
  set(ref(db), {
      numNo: numNos
  });
  console.log("numNos after update: " + numNos);
  Alert.alert('Thank you for your feedback!');
}

function shakeMagic8Ball() {
  var num = Math.random();
  if (num < 0.34) {
    Alert.alert('Yes');
  } else if (num < 0.67) {
    Alert.alert('No');
  } else {
    Alert.alert('Maybe');
  }
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Magic 8 Ball</Text>
      <Text>Press the button bellow to receive the answer to your question</Text>
      <Button
        title="Magic 8 Ball"
        onPress={() => shakeMagic8Ball()}
      />
      <Text>Are you happy with this app?</Text>
      <Button
        title="Yes"
        onPress={() => updateNumYes()}
      />
      <Button
        title="No"
        onPress={() => updateNumNo()}
      />
      {/* <Text>Num Yeses = {numYeses}</Text> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
