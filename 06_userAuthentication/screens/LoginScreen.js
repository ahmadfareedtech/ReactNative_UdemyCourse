import { useState } from 'react';
import { Alert } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { login } from '../util/auth';

function LoginScreen() {

    const [isAuthenticating, setIsAuthenticating] = useState(false)

    async function loginHandler({email, password}) {
        setIsAuthenticating(true)
        try {
            await login(email, password)

        } catch (error) {
            Alert.alert(
                'Authentication Error!',
                'Cannot log in.'
            )
        }
        setIsAuthenticating(false)
    }

    if (isAuthenticating) {
        return <LoadingOverlay message='Loging in...' />
    }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;