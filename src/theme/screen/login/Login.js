import React, {Component} from 'react';
import {
  View, Text, TouchableOpacity, TextInput,
  StyleSheet, Image, KeyboardAvoidingView,
  CheckBox, SafeAreaView, StatusBar, Keyboard,
  TouchableWithoutFeedback, Alert, AsyncStorage,
} from 'react-native';
import construct from '@babel/runtime/helpers/esm/construct';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidePassword: true,
      phone: '',
      password: '',
      checkLogin: 0,
      token: '',
      kq: null
    };
  }

  CheckTextInput = async() => {
    this.props.navigation.navigate('Login');
    fetch('http://kidsnow.edu.vn/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: this.state.phone,
        password: this.state.password,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
         console.log(responseJson);

        if(responseJson.success === true){
          this.props.navigation.navigate('DrawerNavigator');
      this.setState({
        phone: '',
        password:''
      })
        }
        else{
          // console.warn(responseJson);
          Alert.alert("Thông báo!","Vui lòng điền đúng thông tin đăng nhập!");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  managePasswordVisibility = () => {
    this.setState({hidePassword: !this.state.hidePassword});
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#284EAC" translucent = {true}/>
        <TouchableWithoutFeedback style={styles.container1}
                                  onPress={Keyboard.dismiss}>
          <View style={styles.logoContainer}>
            <View style={styles.logoContainer}>
              <Image style={styles.logo}
                     source={require('../../../asset/image/logo.png')}>
              </Image>
            </View>
            <View style={styles.infoContainer}>
              <TextInput style={styles.input}
                         placeholder="Tên đăng nhập"
                         keyboardType='numeric'
                         returnKeyType='next'
                         autoCorrect={false}
                         onChangeText={(phone) => this.setState({phone})}
                         onSubmitEditing={() => this.refs.txtPassword.focus()}
                         value={this.state.phone}
              />
              <View style={styles.pass}>
                <TextInput underlineColorAndroid="transparent" style={styles.input}
                           placeholder="Mật khẩu"
                           returnKeyType='go'
                           onChangeText={(password) => this.setState({password})}
                           secureTextEntry={this.state.hidePassword}
                           value={this.state.password}
                />

                <TouchableOpacity style={styles.iconpass} onPress={this.managePasswordVisibility}>
                  <Image source={(this.state.hidePassword)
                    ? require('../../../asset/image/hide.png')
                    : require('../../../asset/image/uhide.png')}
                         style={styles.hide}/>
                </TouchableOpacity>

              </View>
              <TouchableOpacity style={{}}>
                <Text style={{color:'#fff',marginLeft:"66%",marginBottom:10}}>Quên mật khẩu?</Text>
              </TouchableOpacity>
          <TouchableOpacity  onPress={this.CheckTextInput} style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
      </View>
        </TouchableWithoutFeedback>
        <View style={{position:'absolute',bottom:6, justifyContent: 'center',
          alignItems: 'center',width:'100%'}}>
          <Text style={{fontSize:18,color:'#fff', alignItems: 'center'}}>TỔNG CÔNG TY BƯU ĐIỆN VIỆT NAM</Text>
          <Text style={{color:'#fff',marginTop:4}}>Số 5 Phạm Hùng - Mỹ Đình 2 - Nam Từ Liêm - Hà Nội</Text>
          <Text style={{color:'#fff',marginTop:4}}>Hotline: 19008000</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#284EAC',
    marginTop: 20
   //flexDirection: 'column',
  },
  logoContainer: {
    alignItems: 'center',
     justifyContent: 'flex-start',
    //flex: 1,
  },
  logo: {
    width: 250,
    height: 200,
  },
  infoContainer: {
    //position: 'absolute',
    marginTop:80,
    left: 0,
    right: 0,
    //top: '50%',
    marginLeft:30,
    marginRight:30,
    //padding: 30,
  },
  input: {
    position: 'relative',
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 30,
    fontSize: 18,
    backgroundColor: '#fff',
    paddingVertical: 5,
    borderRadius: 10,
  },
  buttonContainer: {
    backgroundColor: '#FCB71E',
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff1f3',
    fontSize: 18,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    paddingTop: 5,
  },
  pass: {
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  iconpass: {
    position: 'absolute',
    right: 3,
    height: 30,
    width: 30,
    paddingBottom: 5,
    opacity: 0.3,
  },
  hide: {
    height: '100%',
    width: '100%',
  },
});

export default Login;
