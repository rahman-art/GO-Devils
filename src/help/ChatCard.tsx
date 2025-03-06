import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Platform,
  FlatList,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import moment from 'moment';

//icons
import Feather from 'react-native-vector-icons/Feather';
import {colors, fonts} from '../theme';
import {Title} from '../components';
import {useAppDispatch, useAppSelector} from '../hooks';
import {addMessageQueries, replyAddAction} from '../redux/actions/helpAction';

//helpers

const ChatCard = ({route}: any) => {
  const {item} = route.params;
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  const {loading, replyMessageData} = useAppSelector(state => state.help);
  const [data, setData] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const scrollToEnd = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({animated: true});
    }
  };

  const onPressMessage = () => {
    dispatch(
      replyAddAction({
        message: newMessage,
        query_id: item?.query_id,
      }),
    );

    const newData = {
      createdAt: new Date(),
      message: newMessage,
    };

    // @ts-ignore
    setData([...data, newData]);
    setNewMessage('');
  };

  useEffect(() => {
    dispatch(addMessageQueries(item?.query_id));
  }, []);

  useEffect(() => {
    // @ts-ignore
    setData(replyMessageData);
  }, [replyMessageData]);

  const LeftMessage = ({message, createdAt}: any) => {
    const messageDate = moment(createdAt);
    const currentTime = moment();
    const diffDays = currentTime.diff(messageDate, 'days');

    let displayDate = '';
    if (diffDays === 0) {
      displayDate = `Today, ${messageDate.format('LT')}`;
    } else if (diffDays === 1) {
      displayDate = `Yesterday, ${messageDate.format('LT')}`;
    } else {
      displayDate = messageDate.format('MMM D, LT');
    }

    return (
      <View style={{width: '100%'}}>
        <View
          style={{
            padding: 10,
            maxWidth: '75%',
            marginVertical: 5,
            alignSelf: 'flex-start',
            backgroundColor: colors.light,
            marginHorizontal: 10,
            borderRadius: 18,
            borderTopLeftRadius: 0,
          }}>
          <Text style={{color: colors.black, fontSize: 14}}>{message}</Text>
        </View>
        <Text
          style={{
            fontFamily: fonts.regular,
            color: colors.grey,
            fontSize: 10,
            alignSelf: 'flex-start',
            marginHorizontal: 20,
          }}>
          {displayDate}
        </Text>
      </View>
    );
  };

  const RightMessage = ({message, createdAt}: any) => {
    const messageDate = moment(createdAt);
    const currentTime = moment();
    const diffDays = currentTime.diff(messageDate, 'days');

    let displayDate = '';
    if (diffDays === 0) {
      displayDate = `Today, ${messageDate.format('LT')}`;
    } else if (diffDays === 1) {
      displayDate = `Yesterday, ${messageDate.format('LT')}`;
    } else {
      displayDate = messageDate.format('MMM D, LT'); // e.g., "Sep 11, 10:30 AM"
    }

    return (
      <>
        <View
          style={{
            backgroundColor: '#25D366',
            maxWidth: '75%',
            marginVertical: 5,
            alignSelf: 'flex-end',
            marginHorizontal: 10,
            padding: 10,
            borderRadius: 18,
            borderTopRightRadius: 0,
          }}>
          <Text style={{color: 'white', fontSize: 14}}>{message}</Text>
        </View>
        <Text
          style={{
            fontFamily: fonts.regular,
            color: colors.grey,
            fontSize: 10,
            alignSelf: 'flex-end',
            marginHorizontal: 20,
          }}>
          {displayDate}
        </Text>
      </>
    );
  };

  const renderItem = ({item}: any) => {
    return (
      <View
        style={{
          alignItems: item.isSenderAdmin ? 'flex-start' : 'flex-end',
          marginVertical: 8,
        }}>
        {item.role == 'admin' ? (
          <LeftMessage message={item.message} createdAt={item.createdAt} />
        ) : (
          <RightMessage message={item.message} createdAt={item.createdAt} />
        )}
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
        paddingBottom: insets.bottom - 50,
      }}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        hidden={false}
        barStyle="light-content"
      />
      <Title title="Chat" hasBackAction={true} />
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{flexGrow: 1}}
        onLayout={scrollToEnd}
        onContentSizeChange={scrollToEnd}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 8,
              backgroundColor: colors.drakgrey,
              justifyContent: 'space-evenly',
            }}>
            <TextInput
              style={{
                borderRadius: 8,
                padding: 10,
                width: '80%',
                backgroundColor: colors.primary,
                color: colors.red,
                borderWidth: 1,
                borderColor: colors.red,
              }}
              placeholder="Type a message..."
              placeholderTextColor={colors.red}
              value={newMessage}
              onChangeText={text => setNewMessage(text)}
            />
            {loading ? (
              <ActivityIndicator />
            ) : (
              <TouchableOpacity onPress={onPressMessage}>
                <Feather name="send" size={20} color={colors.red} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatCard;
