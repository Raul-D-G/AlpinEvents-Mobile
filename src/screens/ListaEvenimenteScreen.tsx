import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useEffect, useRef} from 'react';
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
import {EvenimentModel} from '../redux/actions/evenimentActions';
import {bindActionCreators} from 'redux';

const ListaEvenimenteScreen: FC<any> = ({navigation}) => {
  const dispatch = useDispatch();
  const {setEvents} = bindActionCreators(actionCreators, dispatch);

  const {evenimente} = useSelector(
    (state: ApplicationState) => state.evenimenteReducer,
  );

  const ITEM_SIZE = 70 + 20 * 3;

  const scrollY = useRef(new Animated.Value(0)).current;

  const handleAddEvent = () => {
    navigation.navigate('AddEvenimentScreen');
  };

  const detalii = (eveniment: EvenimentModel) => {
    navigation.navigate('DetaliiEvenimentScreen', {eveniment: eveniment});
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      evenimente.sort((a: EvenimentModel, b: EvenimentModel) => {
        return a.data.getTime() - b.data.getTime();
      });
      setEvents(evenimente);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation, evenimente]);

  return (
    <View style={{flex: 1}}>
      <Image source={BG_IMG} style={styles.logo}></Image>

      <Animated.FlatList
        keyboardShouldPersistTaps="handled"
        data={evenimente}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        keyExtractor={(item: EvenimentModel) => item.id}
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
            ITEM_SIZE * (index + 1),
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
                detalii(item);
              }}>
              <Animated.View
                style={[
                  styles.animatedView,
                  {
                    transform: [{scale}],
                    opacity,
                  },
                ]}>
                <View
                  style={[
                    {
                      backgroundColor:
                        item.nrPersoane <= 300
                          ? '#0ce846'
                          : item.nrPersoane > 300 && item.nrPersoane <= 600
                          ? '#f0f70c'
                          : item.nrPersoane > 600
                          ? '#e0115f'
                          : '#0ce846',
                    },
                    styles.color,
                  ]}
                />
                {item.image[0] !== '.' ? (
                  <View>
                    <Image style={styles.image} source={{uri: item.image}} />
                  </View>
                ) : item.nume === TIPURI_EVENIMENTE[0].tip ? (
                  <Image source={nuntaImg} style={styles.image} />
                ) : item.nume === TIPURI_EVENIMENTE[1].tip ? (
                  <Image source={majoratImg} style={styles.image} />
                ) : item.nume === TIPURI_EVENIMENTE[2].tip ? (
                  <Image source={onomasticaImg} style={styles.image} />
                ) : item.nume === TIPURI_EVENIMENTE[3].tip ? (
                  <Image source={petrecereImg} style={styles.image} />
                ) : null}

                {/* {item.nume === TIPURI_EVENIMENTE[0].tip ? (
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
                ) : null} */}

                <View>
                  <Text style={styles.nume}>{item.nume}</Text>

                  <Text>Organizator: {item.organizator}</Text>
                  <Text style={styles.data}>
                    Dată: {formateazaDataToString(item.data)}
                  </Text>
                  <Text style={styles.nrPersoane}>
                    Număr persoane: {item.nrPersoane}
                  </Text>
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
    fontSize: 20,
    textAlign: 'center',
  },
  data: {
    fontSize: 16,
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
    alignItems: 'center',
    marginBottom: 18,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '100%',
    elevation: 20,
    shadowColor: '#52006A',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 60,
    marginRight: 10,
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  color: {
    width: 20,
    height: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
});
