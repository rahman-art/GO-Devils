import React, {createContext, useContext, useState, ReactNode} from 'react';
import {Snackbar} from 'react-native-paper';

type SnackbarOptions = {
  duration?: number;
  backgroundColor?: string;
  action?: {
    label: string;
    onPress: () => void;
  };
};

type SnackbarContextType = {
  showSnackbar: (message: string, options?: SnackbarOptions) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined,
);

export const SnackbarProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const [snackbar, setSnackbar] = useState<{
    visible: boolean;
    message: string;
    duration: number;
    backgroundColor: string;
    action?: {
      label: string;
      onPress: () => void;
    };
  }>({
    visible: false,
    message: '',
    duration: 1000,
    backgroundColor: '#323232',
  });

  const showSnackbar = (message: string, options?: SnackbarOptions) => {
    setSnackbar({
      visible: true,
      message,
      duration: options?.duration || 1000,
      backgroundColor: options?.backgroundColor || '#323232',
      action: options?.action,
    });
  };

  return (
    <SnackbarContext.Provider value={{showSnackbar}}>
      {children}
      <Snackbar
        wrapperStyle={{top: 50}}
        visible={snackbar.visible}
        onDismiss={() => setSnackbar({...snackbar, visible: false})}
        duration={snackbar.duration}
        style={{
          backgroundColor: snackbar.backgroundColor,
        }}
        action={snackbar.action}>
        {snackbar.message}
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};
