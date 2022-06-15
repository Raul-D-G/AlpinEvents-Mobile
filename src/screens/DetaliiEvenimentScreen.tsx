import React, {useState, FC} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Image,
  Alert,
} from 'react-native';
import Share from 'react-native-share';

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
import RNFS from 'react-native-fs';

import filesBase64 from '../../assets/filesBase64';

const DetaliiEvenimentScreen: FC<any> = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {setEventData, setEventPret, setEvent, setEvents, setEventImg} =
    bindActionCreators(actionCreators, dispatch);
  const {evenimente} = useSelector(
    (state: ApplicationState) => state.evenimenteReducer,
  );
  const {user} = useSelector((state: ApplicationState) => state.userReducer);

  const eveniment = route.params.eveniment;

  const [errors, setErrors] = useState({
    organizator: null,
    nume: null,
    data: null,
    nrPersoane: null,
    idMeniu: null,
  });
  const [isValid, setIsValid] = useState(true);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = React.useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;

    setIsValid(true);

    // TODO
    if (!eveniment.data) {
      handleError('Alege data evenimentului!', 'data');
      setEventData(new Date());
      setIsValid(false);
      valid = false;
    }
    if (eveniment.nrPersoane === 0) {
      handleError('Salvează numărul de invitați', 'nrPersoane');
      // setEventNrPersoane(0);
      setIsValid(false);
      valid = false;
    }
    if (eveniment.idMeniu === 0) {
      handleError('Alege meniul pentru eveniment', 'idMeniu');
      // setEventIdMeniu(0);
      setIsValid(false);
      valid = false;
    }

    return valid;
  };

  const handleEditEvent = () => {
    if (validate()) {
      setLoading(true);

      const pretLocal =
        eveniment.nrPersoane * TIPURI_MENIU[eveniment.idMeniu - 1].pret;
      setEventPret(pretLocal);

      let newEvenimnet = {
        organizator: eveniment.organizator,
        nume: eveniment.nume,
        data: eveniment.data,
        nrPersoane: eveniment.nrPersoane,
        idMeniu: eveniment.idMeniu,
        pret: pretLocal,
        avans: eveniment.avans,
        plata: eveniment.plata,
        image: eveniment.image,
        uid: eveniment.uid,
        id: eveniment.id,
      };

      setEvent(newEvenimnet);

      const putEvent = {
        data: newEvenimnet.data.toISOString(),
        nrPersoane: newEvenimnet.nrPersoane,
        idMeniu: newEvenimnet.idMeniu,
        pret: newEvenimnet.pret,
        avans: newEvenimnet.avans,
        plata: newEvenimnet.plata,
        image: newEvenimnet.image,
        id: newEvenimnet.id,
      };

      axios
        .put(BASE_URL + `eveniment/${eveniment.id}`, putEvent, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.idToken,
          },
        })
        .then(res => {
          evenimente.forEach(event => {
            if (event.id === eveniment.id) {
              event.data = newEvenimnet.data;
              event.nrPersoane = putEvent.nrPersoane;
              event.idMeniu = putEvent.idMeniu;
              event.avans = putEvent.avans;
              event.plata = putEvent.plata;
              event.image = putEvent.image;
            }
          });

          setEvents(evenimente);

          setLoading(false);
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

  const handleDeleteEvent = () => {
    axios
      .delete(BASE_URL + `eveniment/${eveniment.id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + user.idToken,
        },
      })
      .then(res => {
        evenimente.splice(
          evenimente.findIndex(
            (event: EvenimentModel) => event.id === eveniment.id,
          ),
          1,
        ),
          setEvents(evenimente);
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
  };

  function deleteImage() {
    setLoading(true);
    RNFS.unlink(eveniment.image)
      .then(() => {
        const index = evenimente.findIndex(event => event.id === eveniment.id);
        if (index > -1) {
          let newEvenimente = [...evenimente];

          let img: string = '../../assets/nunta.jpg';
          TIPURI_EVENIMENTE.forEach(event => {
            if (event.tip === eveniment.nume) {
              img = event.image;
            }
          });
          newEvenimente[index].image = img;
          eveniment.image = img;
          setEventImg(img);

          let putEvent = newEvenimente[index];

          axios
            .put(BASE_URL + `eveniment/${eveniment.id}`, putEvent, {
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + user.idToken,
              },
            })
            .then(res => {
              setEvents(newEvenimente);
              setLoading(false);

              Alert.alert('Succes!', 'Imaginea evenimentului a fost ștearsă!');
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
      })
      .catch(err => console.log(err));
  }

  const handleError = (error: string | null, input: string) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const myCustomShare = async () => {
    let img = filesBase64.default;

    if (eveniment.nume === TIPURI_EVENIMENTE[1].tip) {
      img = filesBase64.majorat;
    } else if (eveniment.nume === TIPURI_EVENIMENTE[2].tip) {
      img = filesBase64.onomastica;
    } else if (eveniment.nume === TIPURI_EVENIMENTE[3].tip) {
      img = filesBase64.petrecere;
    }

    const shareOptions = {
      message: `${eveniment.organizator} organizează ${eveniment.nume}
      Data evenimentului: ${formateazaDataToString(eveniment.data)}
      Numărul de invitați: ${eveniment.nrPersoane}
      Meniul Ales: ${TIPURI_MENIU[eveniment.idMeniu - 1].nume}`,
      url: img,
    };

    try {
      const ShareResponse = await Share.open(shareOptions);
      console.log(JSON.stringify(ShareResponse));
    } catch (error) {
      console.log('Error => ', error);
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.scrollView}>
      <Loader visible={loading} />

      {/* Detalii evenimet */}
      <View>
        <Text style={styles.titlu}>
          {eveniment.organizator} organizează {eveniment.nume}
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <View style={styles.inputContainer}>
            {/* DATA EVENIMENT */}
            <View style={styles.input}>
              <TouchableOpacity
                onPress={() => setOpen(true)}
                style={styles.button}>
                <Text style={styles.buttonText}>Modifică Data!</Text>
              </TouchableOpacity>

              <DatePicker
                modal
                mode="date"
                textColor={'#9C89FF'}
                minimumDate={new Date()}
                open={open}
                date={eveniment.data}
                onConfirm={date => {
                  eveniment.data = date;
                  setOpen(false);
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
                <Text>Data: {formateazaDataToString(eveniment.data)}</Text>
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
                value={eveniment.nrPersoane}
                onChange={value => {
                  eveniment.nrPersoane = value;
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
                Număr Persoane: {eveniment.nrPersoane}
              </Text>
              {errors.nrPersoane ? (
                <Text style={{marginTop: 7, color: COLORS.red, fontSize: 12}}>
                  {errors.nrPersoane}
                </Text>
              ) : null}
            </View>

            {/* MENIU */}
            <View style={{padding: 5}}>
              {eveniment.idMeniu ? (
                <Text>
                  Meniul Ales: {TIPURI_MENIU[eveniment.idMeniu - 1].nume}
                </Text>
              ) : null}

              <SelectDropdown
                defaultButtonText="Modifică Meniul"
                data={TIPURI_MENIU}
                onSelect={(selectedItem, index) => {
                  eveniment.idMeniu = index + 1;
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
            {eveniment.idMeniu ? (
              <Text>
                Pret meniu: {TIPURI_MENIU[eveniment.idMeniu - 1].pret}{' '}
                <MaterialCommunityIcons name="account-cash-outline" size={18} />
              </Text>
            ) : null}

            {eveniment.nrPersoane !== 0 && eveniment.idMeniu !== 0 ? (
              <Text>
                Pret Total:{' '}
                {eveniment.nrPersoane *
                  TIPURI_MENIU[eveniment.idMeniu - 1].pret}{' '}
                <FontAwesome5 name="money-bill-alt" size={18} />
              </Text>
            ) : null}

            <View style={styles.container}>
              <View style={styles.checkboxContainer}>
                <CheckBox
                  value={eveniment.avans}
                  onValueChange={value => {
                    eveniment.avans = value;
                  }}
                  style={styles.checkbox}
                  tintColors={{true: '#541675', false: 'black'}}
                />
                <Text style={styles.label}>A fost achitat avansul?</Text>
                <Text style={{paddingTop: 5}}>
                  {' '}
                  {eveniment.avans ? '👍' : '👎'}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.extra_row}>
            <TouchableOpacity
              onPress={handleEditEvent}
              style={styles.extra_button}>
              <Text style={styles.buttonText}>Salvează!</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.extra_button}
              onPress={() => {
                navigation.navigate('CameraScreen', {id: eveniment.id});
              }}>
              <FontAwesome5 name={'camera'} size={25} color={'#ffffff'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.extra_button}
              onPressIn={myCustomShare}>
              <Text style={{color: '#ffffff'}}>Distribuie</Text>
              <FontAwesome5 name={'share'} size={25} color={'#ffffff'} />
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            {/* <TouchableOpacity onPress={handleEditEvent} style={styles.button}>
              <Text style={styles.buttonText}>Modifică Eveniment!</Text>
            </TouchableOpacity> */}

            <TouchableOpacity
              onPress={handleDeleteEvent}
              style={styles.deleteButton}>
              <Text style={styles.buttonText}>Anulează Evenimentul!</Text>
            </TouchableOpacity>
          </View>

          <View>
            {eveniment.image[0] !== '.' ? (
              <View>
                <Image style={styles.image} source={{uri: eveniment.image}} />
                <TouchableOpacity
                  style={styles.delete}
                  onPress={() => {
                    deleteImage();
                  }}>
                  <FontAwesome5 name={'trash'} size={25} color={'#ff3636'} />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

export default DetaliiEvenimentScreen;

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
    marginBottom: 20,
  },
  deleteButton: {
    backgroundColor: '#541675',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
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
  titlu: {
    fontSize: 18,
    opacity: 0.7,
    textAlign: 'center',
  },
  extra_row: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  extra_button: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9C89FF',
  },
  delete: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#ffffff80',
    margin: 10,
    borderRadius: 5,
  },
  image: {
    width: 300,
    height: 300,
    margin: 20,
  },
});
