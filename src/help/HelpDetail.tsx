import React, {FC, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  useColorScheme,
} from 'react-native';
import {Divider} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthScreenParamList} from '../routes/RouteType';
import {useAppDispatch, useAppSelector} from '../hooks';
import {CustomButton, Title} from '../components';
import {colors, fonts} from '../theme';
import {queriesMessage} from '../redux/actions/helpAction';

// helpers

interface ProposalDetailProp {
  route: any;
}

type NavigationProp = StackNavigationProp<AuthScreenParamList>;

const HelpDetail: FC<ProposalDetailProp> = ({}) => {
  const navigation = useNavigation<NavigationProp>();
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';

  const {queryData, loading, total, replyMessageData} = useAppSelector(
    state => state.help,
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(queriesMessage(''));
  }, []);
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
      <Title title="Help & Support" hasBackAction={true} />
      {loading && <ActivityIndicator />}
      <ScrollView>
        <View
          style={{
            padding: 10,
            backgroundColor: isDarkTheme ? colors.black : colors.white,
            borderRadius: 8,
            elevation: 3,
            shadowColor: '#000',
            shadowOffset: {width: 1, height: 1},
            shadowOpacity: 0.2,
            shadowRadius: 0.5,
            margin: 15,
          }}>
          <Text
            style={[
              styles.cardTitle,
              {color: isDarkTheme ? colors.white : colors.black},
            ]}>
            Ticket No : #12
          </Text>
          <Text
            style={[
              styles.cardSubtitle,
              {color: isDarkTheme ? colors.white : colors.black},
            ]}>
            Title Name:{' '}
            <Text style={styles.description}>
              <Text
                style={{
                  fontFamily: fonts.medium,
                  color: isDarkTheme ? colors.white : colors.black,
                  letterSpacing: 1,
                  fontSize: 16,
                }}>
                Title here
              </Text>
            </Text>
          </Text>
          <Divider style={styles.divider} />
          <Text style={styles.sectionTitle}>Help Description</Text>
          <Text style={styles.descriptionText}>Description here</Text>
          <Divider style={styles.divider} />
          <View style={styles.button}>
            <CustomButton
              disabled
              title="Chat Now"
              // onPress={() => {
              //   navigation.navigate('ChatCard');
              // }}
            />
          </View>
        </View>

        <View
          style={{
            padding: 10,
            backgroundColor: isDarkTheme ? colors.black : colors.white,
            borderRadius: 8,
            elevation: 3,
            shadowColor: '#000',
            shadowOffset: {width: 1, height: 1},
            shadowOpacity: 0.2,
            shadowRadius: 0.5,
            margin: 15,
          }}>
          <Text
            style={[
              styles.sectionTitle,
              {bottom: 20, color: isDarkTheme ? colors.white : colors.black},
            ]}>
            Help & support notes
          </Text>
          <Text
            style={[
              styles.descriptionText,
              {bottom: 20, color: isDarkTheme ? 'whitesmoke' : colors.grey},
            ]}>
            Reason here
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 10,
  },
  headerText: {
    fontFamily: fonts.medium,
    fontSize: 16,
  },

  cardTitle: {
    fontFamily: fonts.semibold,
    fontSize: 18,
    paddingVertical: 5,
    letterSpacing: 1,
  },
  cardSubtitle: {
    fontFamily: fonts.regular,
    paddingVertical: 5,
    letterSpacing: 1,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  detailsItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },

  divider: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: fonts.semibold,
    marginTop: 20,
  },
  descriptionText: {
    fontFamily: fonts.regular,
    marginTop: 10,
    fontSize: 14,
    letterSpacing: 1,
  },
  description: {
    fontFamily: fonts.regular,
    color: colors.grey,
    marginTop: 10,
  },
  button: {
    marginTop: 20,
  },
});

export default HelpDetail;
