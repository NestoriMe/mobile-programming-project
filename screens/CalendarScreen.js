import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { Calendar, Agenda } from 'react-native-calendars';
import Dialog from 'react-native-dialog';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Content,
  Body,
  H1,
  Form,
  Picker,
  Card,
  CardItem,
  Left,
  Right,
  Fab,
  Button,
} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import { calendarScreen } from '../styles/ProjectStyles.js';
import {
  fetchAllCalendarEvents,
  addCalendarEvent,
  deleteCalendarEvent,
} from '../connection/DBConnection';

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const CalendarScreen = () => {
  const [items, setItems] = useState({});
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventModalVisible, setEventModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [startTime, setStartTime] = useState({ default: 'unsetted' });
  const [endTime, setEndTime] = useState('');
  const [newTopic, setNewTopic] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [mode, setMode] = useState('time');
  const [showClock, setShowClock] = useState(false);
  const [timestampDay, setTimestampDay] = useState();

  const fetch = async () => {
    await fetchAllCalendarEvents()
      .then((res) => {
        setCalendarEvents(res.rows._array);
      })
      .then(() => {
        addCalendarEventsToItems();
      });
  };

  const selectedDayHandler = (day) => {
    setSelectedDay(day.dateString);
    setTimestampDay(day.timestamp);
    // console.log('dayhandlerin objecti', day.dateString);
  };

  const topicHandler = (enteredText) => {
    setNewTopic(enteredText);
  };

  const messageHandler = (enteredText) => {
    setNewMessage(enteredText);
  };

  const startTimeHandler = (event, selectedTime) => {
    setStartTime(selectedTime);
    console.log(startTime);
    console.log(typeof startTime);
    console.log(`select time: ${selectedTime}`);
    // console.log(event);
    setShowClock(false);
  };

  const endTimeHandler = (enteredText) => {
    setEndTime(enteredText);
  };

  const calendarEventControl = () => {
    if (newTopic === '' || newMessage === '') {
      alert('please fill topic and message fields.');
    } else {
      addCalendarEventHandler();
    }
  };

  const addCalendarEventHandler = async () => {
    const date = selectedDay;
    const timeStart = '9:00';
    const timeEnd = '10:00';

    await addCalendarEvent(1, date, timeStart, timeEnd, newTopic, newMessage);
    setEventModalVisible(false);
  };

  const addCalendarEventsToItems = () => {
    const obj = {};
    let keys = calendarEvents.map((item) => item.date); // store dates in array
    keys = [...new Set(keys)]; // remove duplicate dates from array
    keys.map((item) => (obj[item] = [])); // assign a key for each date with value of empty array
    calendarEvents.map(
      (item) =>
        obj[item.date].push({
          timeStart: item.timeStart,
          timeEnd: item.timeEnd,
          topic: item.topic,
          message: item.message,
          id: item.id,
        }) // push messages from each day to the object
    );

    setItems(obj);
    setLoading(!loading);
  };

  // useEffect(() => {
  //   console.log('Items changed');
  //   console.log(items);
  // }, [items]);

  const onFabPress = () => {
    setEventModalVisible(true);
  };

  const loadItems = (day) => {
    fetch();
    console.log('toimiiko?');
    // setTimeout(() => {
    //   for (let i = -15; i < 85; i++) {
    //     const time = day.timestamp + i * 24 * 60 * 60 * 1000;
    //     const strTime = timeToString(time);
    //     if (!items[strTime]) {
    //       items[strTime] = [];
    //       const numItems = Math.floor(Math.random() * 3 + 1);
    //       for (let j = 0; j < numItems; j++) {
    //         items[strTime].push({
    //           name: `Item for ${strTime} #${j}`,
    //           height: Math.max(50, Math.floor(Math.random() * 150)),
    //         });
    //       }
    //     }
    //   }
    //   const newItems = {};
    //   Object.keys(items).forEach((key) => {
    //     newItems[key] = items[key];
    //   });
    //   setItems(newItems);
    // }, 1000);
  };

  const deleteItemAlert = (id) =>
    Alert.alert(
      'Delete event',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'Yes', onPress: () => deleteCardItem(id) },
      ],
      { cancelable: false }
    );

  const deleteCardItem = async (id) => {
    console.log('delete pressin toiminta?', id);
    await deleteCalendarEvent(id).then(() => fetch());
  };

  const renderItem = (item) => (
    <TouchableOpacity
      onLongPress={() => {
        deleteItemAlert(item.id);
      }}
      style={{
        marginRight: 10,
        marginTop: 17,
      }}
    >
      <Card>
        <CardItem>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <Text style={calendarScreen.itemCardTopic}>
              {item.timeStart} - {item.timeEnd}
            </Text>
            <Text>{item.topic}</Text>
            <Text>{item.message}</Text>
            {/* <Avatar.Text label="A" /> */}
          </View>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView style={calendarScreen.calendar}>
      <Agenda
        items={items}
        // loadItemsForMonth={loadItems}
        loadItemsForMonth={(month) => {
          console.log('trigger items loading', fetch());
        }}
        selected={Date}
        firstDay={1}
        renderItem={renderItem}
        onDayPress={selectedDayHandler}
      />
      <Fab>
        <Icon name="plus" onPress={onFabPress} />
      </Fab>
      {showClock && (
        <DateTimePicker
          mode={mode}
          value={timestampDay}
          is24Hour
          display="default"
          onChange={startTimeHandler}
        />
      )}
      <Dialog.Container visible={eventModalVisible}>
        <Dialog.Title>{selectedDay}</Dialog.Title>
        <Dialog.Button
          label="Clock time"
          onPress={() => {
            setShowClock(true);
          }}
        />
        {/* <Dialog.Title>
          {startTime !== undefined ? startTime : startTime.default}
        </Dialog.Title> */}
        <Dialog.Input onChangeText={topicHandler} placeholder="Topic" />
        <Dialog.Input onChangeText={messageHandler} placeholder="Message" />
        <Dialog.Button
          label="Cancel"
          onPress={() => {
            setEventModalVisible(false);
          }}
        >
          {/* <Text>Cancel</Text> */}
        </Dialog.Button>
        <Dialog.Button
          label="Add"
          onPress={() => {
            calendarEventControl();
          }}
        >
          <Text>Add</Text>
        </Dialog.Button>
      </Dialog.Container>
    </KeyboardAvoidingView>
  );
};
// onPress={setEventModalVisible(false)}
export default CalendarScreen;

//   const [selectedDay, setSelectedDay] = useState('');
//   const [eventModalVisible, setEventModalVisible] = useState(false);
//   const [modalDate, setModalDate] = useState('');
//   const [addFieldVisible, setAddFieldVisible] = useState(false);

//   // calendar date string format: yyyy-mm-dd
//   // addCalendarEvent = (userId, dateStart, dateEnd, topic, message)

//   const onDayPress = (day) => {
//     setSelectedDay(day.dateString);
//     console.log(day.dateString);
//     setModalDate(`${day.day}.${day.month}.${day.year}`);
//     setEventModalVisible(true);
//   };

//   return (
//     <View>
//       <View>
//         <Text style={calendarScreen.text} />
//         <Calendar
//           current={Date}
//           style={calendarScreen.calendar}
//           hideExtraDays={false}
//           onDayPress={onDayPress}
//           // longpress for testing purposes
//           onDayLongPress={(day) => {
//             console.log('selected day', day);
//           }}
//           firstDay={1}
//           enableSwipeMonths
//           markedDates={{
//             [selectedDay]: {
//               selected: true,
//               disableTouchEvent: false,
//               selectedColor: '',
//               selectedTextColor: '',
//               dotColor: '',
//             },
//             // testing: marking a day with a dot
//             '2020-10-16': { marked: true },
//           }}
//         />
//       </View>
//       <View>
//         <Dialog.Container visible={eventModalVisible}>
//           <Dialog.Title>{modalDate}</Dialog.Title>
//           <Dialog.Title>topic from db here</Dialog.Title>
//           <Dialog.Description>message from db here:</Dialog.Description>
//           <Dialog.Button
//             label="Close"
//             onPress={() => setEventModalVisible(false)}
//           />
//           <Dialog.Input label="new topic" placeholder="write topic here?" />
//           <Dialog.Input label="new message" placeholder="write message here?" />
//           <Dialog.Button
//             label="Add"
//             onPress={() => setEventModalVisible(false)}
//           />
//         </Dialog.Container>
//       </View>
//       {/* <View visible={addFieldVisible}>
//         <TextInput label="new topic" placeholder="new topic here" />
//         <TextInput label="new message" placeholder="new message here" />
//         <Button label="Cancel" onPress={() => setAddFieldVisible(false)} />
//         <Button label="Add" onPress={() => setAddFieldVisible(false)} />
//       </View> */}
//     </View>
//   );
// };

// export default CalendarScreen;
