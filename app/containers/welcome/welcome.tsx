import * as React from 'react';
import { View, Text, Button, SafeAreaView } from "react-native";
import { useDispatch } from 'react-redux'
import { navigate } from '../../navigation/navigation';
import { testAction, testThunk } from "../../redux/modules/auth/auth-reducer";

export default function WelcomeScreen() {
    const dispatch = useDispatch();


    return (<SafeAreaView>
        <View>
            <Text>Welcome Screen</Text>
            <Button title="Go To Login" onPress={() => dispatch(testThunk({ firstName: "", lastName: "", initials: "", email: "", password: "" }))}></Button>
        </View>
    </SafeAreaView>);
}