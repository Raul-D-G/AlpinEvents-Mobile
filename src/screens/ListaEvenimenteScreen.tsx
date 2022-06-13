import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useEffect, useRef} from 'react';
import {bindActionCreators} from 'redux';
import {actionCreators, ApplicationState} from '../redux';
import {useDispatch, useSelector} from 'react-redux';

import nuntaImg from '../../assets/nunta.jpg';
import majoratImg from '../../assets/majorat.jpg';
import onomasticaImg from '../../assets/onomastica.jpg';
import petrecereImg from '../../assets/petrecere.jpg';

import BG_IMG from '../../assets/logoApp-removebg-preview.png';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {formateazaDataToString} from '../utils/Functions';
import {TIPURI_EVENIMENTE} from '../utils/AppConst';

export type RootStackParamList = {
  EvenimentScreen: undefined;
};

const ListaEvenimenteScreen: FC<any> = ({navigation}) => {
  const {evenimente} = useSelector(
    (state: ApplicationState) => state.evenimenteReducer,
  );

  const ITEM_SIZE = 70 + 20 * 3;

  const scrollY = useRef(new Animated.Value(0)).current;

  const handleAddEvent = () => {
    navigation.navigate('AddEvenimentScreen');
  };

  const test = () => {
    console.log(evenimente);
  };

  return (
    <View style={{flex: 1}}>
      <Image source={BG_IMG} style={styles.logo}></Image>

      <Animated.FlatList
        data={evenimente}
        keyboardShouldPersistTaps="always"
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          padding: 20,
          paddingTop: 80,
        }}
        renderItem={({item, index}) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2),
          ];
          const opacityInputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 0.8),
          ];

          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });

          const opacity = scrollY.interpolate({
            inputRange: opacityInputRange,
            outputRange: [1, 1, 1, 0],
          });
          return (
            <TouchableOpacity
              onPress={() => {
                test();
              }}>
              <Animated.View
                style={[
                  styles.animatedView,
                  {
                    transform: [{scale}],
                    opacity,
                  },
                ]}>
                {item.nume === TIPURI_EVENIMENTE[0].tip ? (
                  <Image source={nuntaImg} style={styles.image} />
                ) : null}

                {item.nume === TIPURI_EVENIMENTE[1].tip ? (
                  <Image source={majoratImg} style={styles.image} />
                ) : null}

                {item.nume === TIPURI_EVENIMENTE[2].tip ? (
                  <Image source={onomasticaImg} style={styles.image} />
                ) : null}

                {item.nume === TIPURI_EVENIMENTE[3].tip ? (
                  <Image source={petrecereImg} style={styles.image} />
                ) : null}

                {/* <Image source={{uri: item.image}} style={styles.image} /> */}

                <View>
                  <Text style={styles.nume}>{item.nume}</Text>
                  <Text style={styles.data}>
                    {formateazaDataToString(item.data)}
                  </Text>
                  <Text style={styles.nrPersoane}>{item.nrPersoane}</Text>
                </View>
              </Animated.View>
            </TouchableOpacity>
          );
        }}></Animated.FlatList>

      <TouchableOpacity style={styles.button}>
        <FontAwesome5
          name="plus"
          size={30}
          color="#01a699"
          onPress={handleAddEvent}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ListaEvenimenteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 70,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  nume: {
    fontSize: 22,
  },
  data: {
    fontSize: 18,
    opacity: 0.7,
    fontFamily: 'DancingScript-VariableFont_wght',
  },
  nrPersoane: {
    fontSize: 14,
    opacity: 0.8,
    fontFamily: 'DancingScript-VariableFont_wght',
  },
  logo: {
    position: 'absolute',
    top: 400,
    left: 150,
  },
  animatedView: {
    flexDirection: 'row',
    padding: 20,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '100%',
    elevation: 20,
    shadowColor: '#52006A',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 70,
    marginRight: 10,
  },
});
