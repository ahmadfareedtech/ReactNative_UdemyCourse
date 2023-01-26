import { useState } from 'react';
import { Alert } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { useAuth } from '../store/auth-context';
import { createUser } from '../util/auth';

function SignupScreen() {

    const [isAuthenticating, setIsAuthenticating] = useState(false)

    const authCtx = useAuth()

    async function signupHandler({email, password}) {
        setIsAuthenticating(true)
        try {
            const token = await createUser(email, password)
            authCtx.authenticate(token)
        } catch (error) {
            Alert.alert(
                'Authentication Failed!',
                'Could not sign you up!'
            )
            setIsAuthenticating(false)
        }
    }

    if (isAuthenticating) {
        return <LoadingOverlay message='Creating user...' />
    }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;