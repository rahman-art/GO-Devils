import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  Pressable,
} from 'react-native';

import DraggableFlatList from 'react-native-draggable-flatlist';
import Title from './Title';
import {colors, fonts, Icon} from '../theme';
import Logout from './Logout';

type TabItem = {
  name: string;
  icon: string;
  component: React.ElementType;
  visible: boolean;
};

interface ManageTabProps {
  tabs: TabItem[];
  setTabs: React.Dispatch<React.SetStateAction<TabItem[]>>;
  navigation: any;
}

const ManageTab: React.FC<ManageTabProps> = ({tabs, setTabs, navigation}) => {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';

  const updateTabVisibility = (name: string) => {
    const updatedTabs = tabs.map(tab => {
      if (tab.name === name) {
        return {
          ...tab,
          visible: !tab.visible,
        };
      }
      return tab;
    });

    setTabs(updatedTabs);
  };

  const handleDragEnd = ({data}: {data: TabItem[]}) => {
    setTabs(data);
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'home':
        return Icon.Feather;
      case 'customerservice':
        return Icon.AntDesign;
      case 'contacts':
        return Icon.MaterialIcons;
      case 'phone-call':
        return Icon.Feather;

      default:
        return Icon.Feather;
    }
  };

  const visibleTabs = tabs.filter(tab => tab.visible).slice(0, 4);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkTheme == true ? '#28282B' : 'whitesmoke',
      }}>
      <Title
        title="More"
        hasBackAction={true}
        onBackPress={() => console.log('Back pressed')}
        actions={[
          {icon: 'refresh', onPress: () => console.log('Search pressed')},
          {
            icon: 'bell-outline',
            onPress: () => navigation.navigate('Notification'),
            badgeCount: 5,
          },
        ]}
      />

      <View
        style={{
          margin: 10,
          backgroundColor: isDarkTheme == true ? 'black' : 'white',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 15,
          borderRadius: 15,
          elevation: 2,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.2,
          shadowRadius: 2,
          height: 100,
        }}>
        {visibleTabs.map(tab => {
          const IconComponent = getIconComponent(tab.icon);
          return (
            <Pressable
              key={tab.name}
              style={{alignItems: 'center'}}
              //onPress={() => navigation.navigate(tab.component)}
            >
              <IconComponent name={tab.icon} size={30} />
              <Text>{tab.name}</Text>
            </Pressable>
          );
        })}
      </View>

      <DraggableFlatList
        ListHeaderComponent={<></>}
        data={tabs}
        keyExtractor={item => item.name}
        onDragEnd={handleDragEnd}
        renderItem={({item, drag}: any) => {
          const IconComponent = getIconComponent(item.icon);
          return (
            <TouchableOpacity
              style={[
                styles.tabItem,
                {backgroundColor: isDarkTheme == true ? 'black' : 'white'},
              ]}
              onLongPress={drag}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <IconComponent name={item.icon} size={20} />
                <Text
                  style={[
                    styles.tabName,
                    {color: isDarkTheme == true ? 'white' : 'black'},
                  ]}>
                  {item.name}
                </Text>
              </View>

              {item.name !== 'Home' && (
                <TouchableOpacity
                  onPress={() => updateTabVisibility(item?.name)}
                  style={
                    [
                      //styles.button,
                      //item.visible ? styles.hideButton : styles.showButton,
                    ]
                  }>
                  <Icon.FontAwesome
                    name={item.visible ? 'eye' : 'eye-slash'}
                    size={20}
                    color={item.visible ? colors.grey : colors.red}
                  />
                  {/* <Text style={styles.buttonText}>
                    {item.visible ? 'Hide' : 'Show'}
                  </Text> */}
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          );
        }}
        showsVerticalScrollIndicator={false}
      />
      <View
        style={{
          margin: 10,
          justifyContent: 'flex-end',
          flex: 1,
          marginBottom: 20,
        }}>
        <Logout />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    margin: 5,
  },
  tabName: {
    fontSize: 14,
    fontFamily: fonts.semibold,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    justifyContent: 'center',
  },
  showButton: {
    backgroundColor: 'green',
  },
  hideButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 5,
    fontWeight: '500',
  },
  backButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'blue',
    borderRadius: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  scrollContainer: {
    marginHorizontal: 10,
    paddingVertical: 15,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: 100,
    marginRight: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});

export default ManageTab;
