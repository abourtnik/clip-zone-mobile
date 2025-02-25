import {View, StyleSheet, ScrollView, Linking, Pressable} from 'react-native';
import {Button, TextInput, Text, IconButton} from 'react-native-paper';
import { useForm, Controller } from "react-hook-form"
import {useAuth} from "@/hooks/useAuth";
import {useMutation} from "@tanstack/react-query";
import Svg, {Path} from 'react-native-svg';
import {Alert} from "@/components/commons";
import {useNavigation} from "@react-navigation/native";
import {RouteProps} from "@/navigation/AccountStack";
import {useState} from "react";

type FormData = {
    username: string,
    password: string
}
export default function Login() {

    const navigation = useNavigation<RouteProps>();

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const {
        control,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm<FormData>();

    const {login} = useAuth()

    const {
        mutate,
        isError,
        error,
        isPending,
    } = useMutation({
        mutationFn: ({username, password}: FormData) => login(username, password),
        onSuccess: () => navigation.goBack()
    });

    const onSubmit = (formData: FormData) => {
        mutate(formData)
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Svg height="600" width="100%" viewBox="0 0 1440 720">
                    <Path
                        fill="#6B4EAB"
                        fill-opacity="1"
                        d="M0,192L60,186.7C120,181,240,171,360,186.7C480,203,600,245,720,250.7C840,256,960,224,1080,218.7C1200,213,1320,235,1380,245.3L1440,256L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
                    />
                </Svg>
            </View>
            <View style={styles.content}>
                <Text variant={'titleLarge'} style={styles.title}>Login</Text>
                <Text variant={'bodyMedium'} style={styles.text}>Welcome back !</Text>
                <View style={styles.form}>
                    <Controller
                        control={control}
                        rules={{required: true}}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                label="Email"
                                onChangeText={onChange}
                                value={value}
                                autoCapitalize={'none'}
                                mode={'outlined'}
                            />
                        )}
                        name="username"
                    />
                    <Controller
                        control={control}
                        rules={{required: true}}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                label="Password"
                                onChangeText={onChange}
                                value={value}
                                secureTextEntry={!showPassword}
                                mode={'outlined'}
                                right={<TextInput.Icon icon={showPassword ? 'eye-off' : 'eye'} size={20} onPress={() => setShowPassword(!showPassword)} />}

                            />
                        )}
                        name="password"
                    />
                    <Pressable onPress={() => Linking.openURL('https://clip-zone.com/forgot-password')}>
                        <Text style={styles.forgot_text} variant={'bodyMedium'}>Forgot your password ?</Text>
                    </Pressable>
                    <Button
                        mode={'contained'}
                        style={styles.button}
                        disabled={!isValid || isPending}
                        loading={isPending}
                        onPress={handleSubmit(onSubmit)}
                    >
                        Sign In
                    </Button>
                    {isError && <Alert type={'danger'} message={error?.message}/>}
                </View>
                <View style={styles.socials}>
                    <Text variant={'bodyMedium'} style={styles.socials_text}>Or continue with</Text>
                    <View style={styles.buttons}>
                        <IconButton
                            containerColor='#DD4B39'
                            iconColor={'white'}
                            mode={'contained'}
                            icon="google"
                            size={25}
                            onPress={() => console.log('Pressed')}
                        />
                        <IconButton
                            containerColor='#47639E'
                            iconColor={'white'}
                            mode={'contained'}
                            icon="facebook"
                            size={25}
                            onPress={() => console.log('Pressed')}
                        />
                    </View>
                </View>
                <View style={styles.create}>
                    <Text>Do not have an account ?</Text>
                    <Pressable onPress={() => Linking.openURL('https://clip-zone.com/register')}>
                        <Text variant={'bodyMedium'} style={styles.create_text}>Sign Up</Text>
                    </Pressable>

                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor:'#6B4EAB',
        height:215,
        width:'100%'
    },
    content: {
        position:'absolute',
        top:50,
        left:0,
        paddingHorizontal: 20,
        width: '100%'
    },
    title : {
        color:'white',
        fontSize:20,
        fontWeight:'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    text: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
        color:'white',
    },
    form: {
        padding: 15,
        backgroundColor:'white',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 3,
        marginHorizontal: 'auto',
        width:350,
        marginVertical: 30
    },
    input: {
        marginVertical: 10,
        borderRadius: 10,
    },
    forgot_text: {
        textAlign: 'right',
        color : '#6B4EAB',
        fontWeight: 'bold',
    },
    button :{
        marginTop: 25,
        marginBottom: 15,
    },
    socials: {

    },
    socials_text: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    },
    create:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    create_text: {
        textAlign: 'center',
        fontWeight: 'bold',
        color : '#6B4EAB'
    },
});