import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { GET_COLUMNS } from '../../graphql/queries.ts';
import { RootState, useAppDispatch, useAppSelector } from '../../store';
import { Column } from '../../types/column.ts';
import { removeColumn, setColumns } from '../../store/slices/columnSlice.ts';
import AddColumnForm from '../../components/add-column';
import { DELETE_COLUMN } from '../../graphql/mutations.ts';

function Columns() {
    const { boardId } = useParams();
    const dispatch = useAppDispatch();
    const columns = useAppSelector((state: RootState) => state.columns.columns);
    const [deleteColumnMutation] = useMutation(DELETE_COLUMN);
    const { loading, error, data } = useQuery(GET_COLUMNS, {
        variables: {
            boardId: boardId as string,
        },
    });

    async function deleteColumn(column: Column) {
        const { errors } = await deleteColumnMutation({
            variables: {
                deleteColumnId: column.id,
            },
        });

        if (!errors) {
            dispatch(removeColumn(column));
        }
    }

    useEffect(() => {
        if (!loading && !error && data?.columns) {
            let columns: Column[] = [];
            data?.columns.forEach((column) => {
                if (column?.id && column.boardId && column.name) {
                    columns.push({
                        id: column.id,
                        name: column.name,
                        boardId: column.boardId,
                    });
                }
            });
            dispatch(setColumns(columns));
        }
    }, [data?.columns]);

    return (
        <div>
            <AddColumnForm />
            {!columns.length && <div>no columns</div>}
            {error && <div>error</div>}
            {loading && <div>Loading...</div>}
            <ul>
                {columns.map((column: Column) => (
                    <li className="list-disc ml-6" key={column.id}>
                        {column.name}
                        <button
                            className="bg-green-500"
                            onClick={() => deleteColumn(column)}
                        >
                            DELETE
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Columns;
