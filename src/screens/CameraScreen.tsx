import axios from 'axios';
import React, {FC} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import CustomButton from '../components/CustomButton';
import Loader from '../components/Loader';
import {actionCreators, ApplicationState} from '../redux';
import {BASE_URL} from '../utils/AppConst';

const CameraScreen: FC<any> = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {setEvents} = bindActionCreators(actionCreators, dispatch);
  const [loading, setLoading] = React.useState(false);

  const [{cameraRef}, {takePicture}] = useCamera();
  const {evenimente} = useSelector(
    (state: ApplicationState) => state.evenimenteReducer,
  );
  const {user} = useSelector((state: ApplicationState) => state.userReducer);

  const captureHandle = async () => {
    try {
      setLoading(true);
      const data = await takePicture();
      const filePath = data.uri;
      updateTask(route.params.id, filePath);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = (id: string, path: string) => {
    const index = evenimente.findIndex(eveniment => eveniment.id === id);
    if (index > -1) {
      let newEvenimente = [...evenimente];
      newEvenimente[index].image = path;
      const putEvent = newEvenimente[index];

      axios
        .put(BASE_URL + `eveniment/${id}`, putEvent, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.idToken,
          },
        })
        .then(res => {
          setEvents(newEvenimente);
          Alert.alert('Succes!', 'Imaginea evenimentului a fost salvată!');

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

  return (
    <View style={styles.body}>
      <Loader visible={loading} />
      <RNCamera
        ref={cameraRef}
        type={RNCamera.Constants.Type.back}
        style={styles.preview}>
        <CustomButton
          title="Capture"
          color="#1eb900"
          onPressFunction={() => captureHandle()}
        />
      </RNCamera>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  preview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
