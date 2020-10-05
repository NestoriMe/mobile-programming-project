import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Container, Content, Accordion } from 'native-base';

import EventCard from '../components/EventCard';
import { homeScreen } from '../styles/ProjectStyles';

// The imports will be separated into their appropriate screens/components, this is just for testing
import {
  init,
  addActivity,
  addAnnouncement,
  addCalendarEvent,
  addFloorballGame,
  addFloorballParticipant,
  addUser,
  fetchAllActivities,
  fetchAllAnnouncements,
  fetchAllCalendarEvents,
  fetchAllFloorballGames,
  fetchAllFloorballParticipants,
  fetchAllUsers,
} from '../connection/DBConnection';

init()
  .then(() => {
    console.log('Database creation successful');
  })
  .catch((error) => {
    console.log(`Database not created! ${error}`);
  });

// Accordion and it's data to own component
const dataArray = [
  {
    title: 'Prevent COVID-19',
    content:
      'Wear Batman masks. Use hand sanitizer. Trump contracted COVID-19, oops.',
  },
];

const HomeScreen = () => (
  <Container>
    <Content style={homeScreen.pageLayout}>
      <Accordion
        headerStyle={homeScreen.header}
        dataArray={dataArray}
        expanded={0}
      />
      <Text style={homeScreen.title}>Today's events</Text>
      <EventCard />
    </Content>
  </Container>
);

export default HomeScreen;