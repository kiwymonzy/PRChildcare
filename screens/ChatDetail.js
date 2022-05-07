// @flow
import React ,{ useState, useEffect, useCallback } from "react";
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList
} from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

import { COLORS, FONTS, SIZES, icons, images } from '../constants';

import Fire from '../screens/Fire';

type Props = {
  name?: string,
};

class ChatDetail extends React.Component<Props> {
  state = {
    messages: [],
  };

  get user() {
    return {
      name: Fire.shared.uid,
      _id: Fire.shared.uid,
    };
  }

  enterLogin = ()=>{
      return(
          this.props.navigation.replace("LoginScreen")
      )
  }

  render() {
    if(this.user){
    return (
                <View style={{ flex: 1, justifyContent: 'top',backgroundColor: COLORS.secondary }}>
                          <GiftedChat
                            //renderBubble={renderBubble}
                            messages={this.state.messages}
                            onSend={Fire.shared.send}
                            user={this.user}
                            placeholder="Type here..."
                            bottomOffset={40}
                            showAvatarForEveryMessage={true}
                            showUserAvatar={true}       
                            isCustomViewBottom={true}
                            renderAvatarOnTop={true}
                            renderUsernameOnMessage={false}
                            alwaysShowSend={true}
                            scrollToBottom={true}  
                          /> 
              </View>
    );
    }else{
      this.enterLogin();
    }
  }

  componentDidMount() {
    Fire.shared.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }
  componentWillUnmount() {
    Fire.shared.off();
  }
}

export default ChatDetail;
