import {Keyboard, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {formateazaDataToString, verificaData} from '../utils/Functions';
import {useDispatch, useSelector} from 'react-redux';
import {actionCreators, ApplicationState} from '../redux';
import {bindActionCreators} from 'redux';
import DatePicker from 'react-native-date-picker';
import {COLORS} from '../utils/AppConst';

const VerificareDataScreen: FC<any> = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {setEventData} = bindActionCreators(actionCreators, dispatch);
  const [open, setOpen] = useState(false);
  const {data} = useSelector(
    (state: ApplicationState) => state.evenimentReducer,
  );
  const [errors, setErrors] = useState({
    data: null,
  });

  const validate = (date: Date) => {
    Keyboard.dismiss();
    let valid = true;

    if (!verificaData(route.params.evenimente, date)) {
      handleError(`Data: ${formateazaDataToString(date)} este ocupată`, 'data');
      setEventData(new Date());
      valid = false;
    }

    return valid;
  };

  const handleError = (error: string | null, input: string) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      validate(data);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          handleError(null, 'data');
          setOpen(true);
        }}
        style={styles.button}>
        <Text style={styles.buttonText}>Alege Data!</Text>
      </TouchableOpacity>

      <DatePicker
        modal
        mode="date"
        minimumDate={new Date()}
        textColor={'#9C89FF'}
        open={open}
        date={data}
        onConfirm={date => {
          setEventData(date);
          setOpen(false);
          validate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />

      {errors.data ? (
        <Text style={{marginTop: 7, color: COLORS.red, fontSize: 16}}>
          {errors.data}
        </Text>
      ) : (
        <Text style={styles.text}>
          Data: {formateazaDataToString(data)} este liberă
        </Text>
      )}
    </View>
  );
};

export default VerificareDataScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#9C89FF',
    width: '80%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  text: {
    fontSize: 16,
    paddingTop: 20,
  },
});
