import { useState } from 'react';
import { Alert } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { useAuth } from '../store/auth-context';
import { login } from '../util/auth';

function LoginScreen() {

    const [isAuthenticating, setIsAuthenticating] = useState(false)

    const authCtx = useAuth()

    async function loginHandler({email, password}) {
        setIsAuthenticating(true)
        try {
            const token = await login(email, password)
            authCtx.authenticate(token)
        } catch (error) {
            Alert.alert(
                'Authentication Error!',
                'Cannot log in.'
            )
            setIsAuthenticating(false)
        }
    }

    if (isAuthenticating) {
        return <LoadingOverlay message='Loging in...' />
    }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;