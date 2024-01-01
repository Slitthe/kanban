import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar';
import { useQuery } from '@apollo/client';
import { Board as GQLBoard } from '../../gql/graphql.ts';
import { GET_BOARDS } from '../../graphql/queries.ts';
import { useAppDispatch } from '../../store';
import { Board } from '../../types/board.ts';
import { setBoards } from '../../store/slices/boardSlice.ts';
import { clearToken } from '../../auth-utils';

function DashboardLayout({ children }: PropsWithChildren) {
    const navigate = useNavigate();
    const { loading, error, data } = useQuery(GET_BOARDS);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!loading && data?.boards) {
            const boards: Board[] = [];
            data?.boards.forEach((board: GQLBoard | null) => {
                if (board !== null && board.name && board.id) {
                    boards.push({ name: board.name, id: board.id });
                }
            });

            dispatch(setBoards(boards));
        }
    }, [loading, error, data]);

    function logOut() {
        clearToken();
        navigate('/login');
    }

    return (
        <div className="min-h-full">
            <header className="w-full bg-amber-300 p-5">
                <button
                    className="bg-blue-600 text-white p-2 hover:bg-blue-400"
                    onClick={logOut}
                >
                    Log Out
                </button>
            </header>
            <div className="flex h-full">
                <div>
                    <Sidebar />
                </div>
                <div className="bg-lime-100 flex-1">{children}</div>
            </div>
        </div>
    );
}

export default DashboardLayout;
