import React, {useState, FC} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-date-picker';
import {actionCreators, ApplicationState} from '../redux';
import {bindActionCreators} from 'redux';
import SelectDropdown from 'react-native-select-dropdown';
import {
  BASE_URL,
  COLORS,
  TIPURI_EVENIMENTE,
  TIPURI_MENIU,
} from '../utils/AppConst';
import NumericInput from 'react-native-numeric-input';
import CheckBox from '@react-native-community/checkbox';
import {formateazaDataToString} from '../utils/Functions';
import axios from 'axios';
import {EvenimentModel} from '../redux/actions/evenimentActions';
import Loader from '../components/Loader';

const Eveniment: FC<any> = ({navigation}) => {
  const dispatch = useDispatch();
  const {
    setEventOrganizator,
    setEventNume,
    setEventData,
    setEventNrPersoane,
    setEventIdMeniu,
    setEventAvans,
    setEventImg,
    setEventPret,
    setEvent,
    setEvents,
    setEventUid,
  } = bindActionCreators(actionCreators, dispatch);

  const {organizator, nume, data, nrPersoane, idMeniu, avans, plata} =
    useSelector((state: ApplicationState) => state.evenimentReducer);
  const {evenimente} = useSelector(
    (state: ApplicationState) => state.evenimenteReducer,
  );
  const {user} = useSelector((state: ApplicationState) => state.userReducer);

  const [errors, setErrors] = useState({
    organizator: null,
    nume: null,
    data: null,
    nrPersoane: null,
    idMeniu: null,
  });
  const [isValid, setIsValid] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = React.useState(false);

  const validate = () => {
    Keyboard.dismiss();

    setIsValid(true);

    if (!organizator || organizator.length <= 3) {
      handleError(
        'Acest câmp este obligatoriu (mai mult de 3 caractere)',
        'organizator',
      );
      setEventOrganizator('');
      setIsValid(false);
    }
    if (nume === '') {
      handleError('Alege tipul evenimentului!', 'nume');
      setEventNume('');
      setIsValid(false);
    }
    // TODO
    if (!data) {
      handleError('Alege data evenimentului!', 'data');
      setEventData(new Date());
      setIsValid(false);
    }
    if (nrPersoane === 0) {
      handleError('Salvează numărul de invitați', 'nrPersoane');
      // setEventNrPersoane(0);
      setIsValid(false);
    }
    if (idMeniu === 0) {
      handleError('Alege meniul pentru eveniment', 'idMeniu');
      // setEventIdMeniu(0);
      setIsValid(false);
    }
  };

  const handleError = (error: string | null, input: string) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const handleAddEvent = () => {
    validate();

    if (isValid) {
      setLoading(true);

      const pretLocal = nrPersoane * TIPURI_MENIU[idMeniu - 1].pret;
      setEventPret(pretLocal);

      let img: string = '../../assets/nunta.jpg';
      TIPURI_EVENIMENTE.forEach(eveniment => {
        if (eveniment.tip === nume) {
          setEventImg(eveniment.image);
          img = eveniment.image;
        }
      });

      let newEvenimnet = {
        organizator: organizator,
        nume: nume,
        data: data,
        nrPersoane: nrPersoane,
        idMeniu: idMeniu,
        pret: pretLocal,
        avans: avans,
        plata: plata,
        image: img,
        uid: user.uid,
        id: '',
      };

      setEvent(newEvenimnet);

      setEventOrganizator('');
      setEventNume('');
      setEventData(new Date());
      setEventNrPersoane(0);
      setEventIdMeniu(0);
      setEventPret(0);
      setEventAvans(false);
      setEventUid('');
      setEventImg('');

      const postEvent = {
        organizator: newEvenimnet.organizator,
        nume: newEvenimnet.nume,
        data: newEvenimnet.data.toISOString(),
        nrPersoane: newEvenimnet.nrPersoane,
        idMeniu: newEvenimnet.idMeniu,
        pret: newEvenimnet.pret,
        avans: newEvenimnet.avans,
        plata: newEvenimnet.plata,
        image: newEvenimnet.image,
        uid: newEvenimnet.uid,
      };

      axios
        .post(BASE_URL + 'eveniment', postEvent, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.idToken,
          },
        })
        .then(eventId => {
          const newEvent: EvenimentModel = {
            organizator: postEvent.organizator,
            nume: postEvent.nume,
            data: new Date(postEvent.data),
            nrPersoane: postEvent.nrPersoane,
            idMeniu: postEvent.idMeniu,
            pret: postEvent.pret,
            avans: postEvent.avans,
            plata: postEvent.plata,
            image: postEvent.image,
            uid: postEvent.uid,
            id: String(eventId),
          };
          setLoading(false);
          const newEvents = [...evenimente, newEvent];
          setEvents(newEvents);

          navigation.goBack();
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
        });
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      contentContainerStyle={styles.scrollView}>
      <Loader visible={loading} />
      <View style={styles.inputContainer}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <View style={styles.inputContainer}>
            {/* ORGANIZATOR */}
            <TextInput
              placeholder="Organizator"
              placeholderTextColor={'black'}
              value={organizator}
              onChangeText={text => setEventOrganizator(text)}
              style={styles.input}
              onFocus={() => handleError(null, 'organizator')}
            />
            {errors.organizator ? (
              <Text style={{marginTop: 7, color: COLORS.red, fontSize: 12}}>
                {errors.organizator}
              </Text>
            ) : null}

            {/* NUME / TIP EVENIMENT */}
            <View style={{padding: 5}}>
              <SelectDropdown
                defaultButtonText="Tip eveniment"
                data={TIPURI_EVENIMENTE}
                onSelect={(selectedItem, index) => {
                  setEventNume(selectedItem.tip);
                  handleError(null, 'nume');
                }}
                buttonStyle={styles.button}
                buttonTextStyle={styles.buttonText}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem.tip;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item.tip;
                }}
              />
              {errors.nume ? (
                <Text style={{marginTop: 7, color: COLORS.red, fontSize: 12}}>
                  {errors.nume}
                </Text>
              ) : null}
            </View>

            {/* DATA EVENIMENT */}
            <View style={styles.input}>
              <TouchableOpacity
                onPress={() => setOpen(true)}
                style={styles.button}>
                <Text style={styles.buttonText}>Alege Data!</Text>
              </TouchableOpacity>

              <DatePicker
                modal
                mode="date"
                open={open}
                date={data}
                onConfirm={date => {
                  setOpen(false);
                  setEventData(date);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />

              <View
                style={[
                  styles.container,
                  {
                    paddingTop: 10,
                  },
                ]}>
                <Text>Data: {formateazaDataToString(data)}</Text>
              </View>

              {errors.data ? (
                <Text style={{marginTop: 7, color: COLORS.red, fontSize: 12}}>
                  {errors.data}
                </Text>
              ) : null}
            </View>

            {/* NUMAR PERSOANE */}
            <View style={styles.input}>
              <NumericInput
                containerStyle={{alignSelf: 'center'}}
                value={nrPersoane}
                onChange={value => {
                  setEventNrPersoane(value);
                  handleError(null, 'nrPersoane');
                }}
                minValue={0}
                maxValue={1000}
                onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                totalWidth={240}
                totalHeight={50}
                iconSize={25}
                step={10}
                valueType="real"
                rounded
                textColor="#9C89FF"
                leftButtonBackgroundColor="#99CCED"
                rightButtonBackgroundColor="#7E38B7"
              />
              <Text style={{paddingTop: 10, alignSelf: 'center'}}>
                Număr Persoane: {nrPersoane}
              </Text>
              {errors.nrPersoane ? (
                <Text style={{marginTop: 7, color: COLORS.red, fontSize: 12}}>
                  {errors.nrPersoane}
                </Text>
              ) : null}
            </View>

            {/* MENIU */}
            <View style={{padding: 5}}>
              {idMeniu ? (
                <Text>Meniul Ales: {TIPURI_MENIU[idMeniu - 1].nume}</Text>
              ) : null}

              <SelectDropdown
                defaultButtonText="Alege Meniul"
                data={TIPURI_MENIU}
                onSelect={(selectedItem, index) => {
                  setEventIdMeniu(index + 1);
                  handleError(null, 'idMeniu');
                }}
                buttonStyle={styles.button}
                buttonTextStyle={styles.buttonText}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem.nume;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item.nume;
                }}
              />

              {errors.idMeniu ? (
                <Text style={{marginTop: 7, color: COLORS.red, fontSize: 12}}>
                  {errors.idMeniu}
                </Text>
              ) : null}
            </View>

            {/* PRET */}
            {idMeniu ? (
              <Text>
                Pret meniu:
                {TIPURI_MENIU[idMeniu - 1].pret}{' '}
                <MaterialCommunityIcons name="account-cash-outline" size={18} />
              </Text>
            ) : null}

            {nrPersoane !== 0 && idMeniu !== 0 ? (
              <Text>
                Pret Total: {nrPersoane * TIPURI_MENIU[idMeniu - 1].pret}{' '}
                <FontAwesome5 name="money-bill-alt" size={18} />
              </Text>
            ) : null}

            <View style={styles.container}>
              <View style={styles.checkboxContainer}>
                <CheckBox
                  value={avans}
                  onValueChange={setEventAvans}
                  style={styles.checkbox}
                  tintColors={{true: '#541675', false: 'black'}}
                />
                <Text style={styles.label}>A fost achitat avansul?</Text>
                <Text style={{paddingTop: 5}}> {avans ? '👍' : '👎'}</Text>
              </View>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleAddEvent} style={styles.button}>
              <Text style={styles.buttonText}>Adaugă Eveniment!</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

export default Eveniment;

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '90%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    color: 'black',
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#9C89FF',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
});
