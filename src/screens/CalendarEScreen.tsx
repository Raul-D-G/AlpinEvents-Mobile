import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {FC, useEffect} from 'react';
import {bindActionCreators} from 'redux';
import {actionCreators, ApplicationState} from '../redux';
import {useDispatch, useSelector} from 'react-redux';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {DAYS, MONTHS} from '../utils/AppConst';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MarkerModel} from '../redux/actions/CalendarActions';
import BG_IMG from '../../assets/logoApp-removebg-preview.png';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const timeToString = (time: Date) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const CalendarEScreen: FC<any> = ({route, navigation}) => {
  LocaleConfig.locales['ro'] = {
    monthNames: MONTHS,
    monthNamesShort: [
      'Ian.',
      'Feb.',
      'Mar',
      'Apr',
      'Mai',
      'Iun',
      'Iul.',
      'Aug',
      'Sept.',
      'Oct.',
      'Nov.',
      'Dec.',
    ],
    dayNames: DAYS,
    dayNamesShort: ['Dum.', 'Lun.', 'Mar.', 'Mie.', 'Joi.', 'Vin.', 'Sam.'],
    today: 'Astăzi',
  };
  LocaleConfig.defaultLocale = 'ro';

  const dispatch = useDispatch();
  const {setMarker} = bindActionCreators(actionCreators, dispatch);

  const {evenimente} = useSelector(
    (state: ApplicationState) => state.evenimenteReducer,
  );

  const {marker} = useSelector(
    (state: ApplicationState) => state.calendarReducer,
  );

  const verificaData = () => {
    navigation.navigate('');
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      let markedDate: MarkerModel = {};

      evenimente.forEach(eveniment => {
        let dotColor: string = '#0ce846';
        if (eveniment.nrPersoane > 300 && eveniment.nrPersoane <= 600)
          dotColor = '#f0f70c';
        if (eveniment.nrPersoane > 600) {
          dotColor = '#e0115f';
        }

        markedDate[timeToString(eveniment.data)] = {
          selected: true,
          marked: true,
          selectedColor: '#9C89FF',
          dotColor: dotColor,
          eveniment: eveniment,
        };
      });

      setMarker(markedDate);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation, evenimente]);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={BG_IMG} style={styles.logo}></Image>
      <Calendar
        markedDates={marker}
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          // height: 350,
          // width: '100%',
        }}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          // selectedDayBackgroundColor: '#00adf5',
          // selectedDayTextColor: '#ffffff',
          todayTextColor: '#ffffff',
          todayBackgroundColor: '#ff82f9',
          // dayTextColor: '#de4d41',
          // textDisabledColor: '#d9e1e8',
        }}
        current={timeToString(new Date())}
        pastScrollRange={50}
        futureScrollRange={50}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={timeToString(new Date())}
        onDayPress={day => {
          // console.log('selected day', day);
          if (marker[day.dateString]) {
            navigation.navigate('DetaliiEvenimentScreen', {
              eveniment: marker[day.dateString].eveniment,
            });
          }
        }}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={day => {
          console.log('selected day', day);
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={'MMMM yyyy'}
        // // Handler which gets executed when visible month changes in calendar. Default = undefined
        // onMonthChange={month => {
        //   console.log('month changed', month);
        // }}
        // Do not show days of other months in month page. Default = false
        hideExtraDays={true}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
        firstDay={1}
        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
        disableAllTouchEventsForDisabledDays={true}
        // Enable the option to swipe between months. Default = false
        enableSwipeMonths={true}
      />

      <TouchableOpacity style={styles.button}>
        <FontAwesome5
          name="calendar-alt"
          size={30}
          color="#01a699"
          onPressIn={verificaData}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CalendarEScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    paddingTop: 41,
  },
  logo: {
    position: 'absolute',
    top: 400,
    left: 150,
  },
  button: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    bottom: 10,
    left: 10,
    height: 70,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
});
