import React, {FC, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StatusBar,
  Linking,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

//helpers
import {AuthScreenParamList} from '../routes/RouteType';
import HelpCard from './component/HelpCard';
import {Title} from '../components';
import {colors, fonts} from '../theme';
import {useAppDispatch, useAppSelector} from '../hooks';
import {allqueriesAction} from '../redux/actions/helpAction';

type NavigationProp = StackNavigationProp<AuthScreenParamList>;

const HelpSupport: FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const ITEMS_PER_PAGE = 25;
  const [pageStart, setPageStart] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const {allQueriesData, loading, total} = useAppSelector(state => state.help);
  const dispatch = useAppDispatch();
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  useEffect(() => {
    dispatch(allqueriesAction({startIndex: 1, endIndex: ITEMS_PER_PAGE}));
  }, [pageStart]);

  const onRefresh = () => {
    dispatch(allqueriesAction({startIndex: 1, endIndex: ITEMS_PER_PAGE}));
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setPageStart(pageStart + ITEMS_PER_PAGE);
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setPageStart(pageStart - ITEMS_PER_PAGE);
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.primary,
        }}>
        <ActivityIndicator size={'large'} color={colors.red} />
      </View>
    );
  }

  const handleEmailPress = () => {
    const email =
      'mailto:info@godevil.in?subject=Help%20&%20Support&body=Describe%20your%20issue%20here';
    Linking.openURL(email).catch(err => console.error('Error occurred', err));
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
      }}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        hidden={false}
        barStyle="light-content"
      />
      <Title
        title="Help & Support"
        hasBackAction={true}
        actions={[
          {icon: 'plus', onPress: () => navigation.navigate('HelpNext')},
          {icon: 'email', onPress: () => handleEmailPress()},

          {
            icon: 'home-outline',
            onPress: () => navigation.navigate('BottomNavigator'),
          },
        ]}
      />

      <FlatList
        data={allQueriesData}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
        contentContainerStyle={{paddingBottom: 20, margin: 10}}
        renderItem={({item, index}) => {
          return <HelpCard item={item} key={index.toString()} />;
        }}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '70%',
            }}>
            {/* <Image
              source={require('../../assets/images/logo.png')}
              style={{
                height: 250,
                width: 250,
                marginTop: 100,
                alignSelf: 'center',
              }}
              resizeMode="cover"
            /> */}

            <Text
              style={{
                letterSpacing: 1.5,
                color: colors.red,
                textAlign: 'center',
                marginTop: 10,
                fontFamily: fonts.bold,
              }}>
              No queries raised yet!
            </Text>
          </View>
        )}
      />

      <View style={[styles.pagination, {backgroundColor: colors.primary}]}>
        <TouchableOpacity
          style={[styles.button, currentPage === 1 && styles.disabledButton]}
          disabled={currentPage === 1}
          onPress={handlePrev}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <Text style={[styles.pageInfo, {color: colors.white}]}>
          Page {currentPage} of {total}
        </Text>
        <TouchableOpacity
          style={[
            styles.button,
            currentPage === totalPages && styles.disabledButton,
          ]}
          disabled={currentPage === totalPages}
          onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HelpSupport;
const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
    top: 0,
  },
  button: {
    backgroundColor: colors.red,
    padding: 5,
    borderRadius: 0,
    margin: 10,
    marginHorizontal: 20,
  },
  disabledButton: {
    backgroundColor: colors.drakgrey,
  },
  buttonText: {
    color: 'white',
    fontFamily: fonts.semibold,
    fontSize: 12,
  },
  pageInfo: {
    fontSize: 12,
    fontFamily: fonts.semibold,
    color: colors.white,
  },
});
