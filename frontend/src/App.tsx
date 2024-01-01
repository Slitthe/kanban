import { Provider } from 'react-redux';
import store from './store';
import {
    ApolloClient,
    ApolloLink,
    ApolloProvider,
    HttpLink,
    InMemoryCache,
    NextLink,
    Operation,
} from '@apollo/client';
import { getToken } from './auth-utils';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './pages/AppRoutes.tsx';
import ThemeWrapper from './components/theme-wrapper';

const httpLink = new HttpLink({ uri: 'http://localhost:3001/graphql' });

const authLink = new ApolloLink((operation: Operation, forward: NextLink) => {
    const token = getToken();

    if (token) {
        operation.setContext({
            headers: {
                authorization: token ? `${token}` : '',
            },
        });
    }

    return forward(operation);
});

const client = new ApolloClient({
    link: ApolloLink.from([authLink, httpLink]),
    cache: new InMemoryCache(),
});

function App() {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <ApolloProvider client={client}>
                    <ThemeWrapper>
                        <Toaster />
                        <AppRoutes />
                    </ThemeWrapper>
                </ApolloProvider>
            </Provider>
        </BrowserRouter>
    );
}

export default App;
