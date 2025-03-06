import { NavigationContainerRef, CommonActions } from '@react-navigation/native';

let _navigator: NavigationContainerRef<any> | null = null;

function setTopLevelNavigator(navigatorRef: NavigationContainerRef<any> | null) {
  _navigator = navigatorRef;
}

function navigate(routeName: string, params?: object) {
  if (_navigator) {
    _navigator.navigate(routeName, params);
  }
}

function goBack() {
  if (_navigator) {
    _navigator.dispatch(CommonActions.goBack());
  }
}

export default {
  navigate,
  setTopLevelNavigator,
  goBack,
};
