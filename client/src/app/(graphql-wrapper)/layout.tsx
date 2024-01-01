'use client';

import {
    ApolloClient,
    ApolloLink,
    ApolloProvider,
    HttpLink,
    InMemoryCache,
    NextLink,
    Operation,
} from '@apollo/client';
import { Toaster } from 'react-hot-toast';
import { getToken } from '@/auth-utils';
import { Provider } from 'react-redux';
import store from '@/store';

const httpLink = new HttpLink({ uri: 'http://localhost:3001/graphql' });

const authLink = new ApolloLink((operation: Operation, forward: NextLink) => {
    const token = getToken();

    if (token) {
        operation.setContext({
            headers: {
                authorization: token ? `Bearer ${token}` : '',
            },
        });
    }

    return forward(operation);
});

const client = new ApolloClient({
    link: ApolloLink.from([authLink, httpLink]),
    cache: new InMemoryCache(),
});
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <ApolloProvider client={client}>
                <div>
                    <Toaster />
                </div>
                {children}
            </ApolloProvider>
        </Provider>
    );
}
