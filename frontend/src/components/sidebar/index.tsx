import React, { SyntheticEvent, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';

import * as classNames from 'classnames';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { CREATE_BOARD, DELETE_BOARD } from '../../graphql/mutations.ts';
import {
    addBoard,
    removeBoard,
    resetSelectedBoard,
    setSelectedBoard,
} from '../../store/slices/boardSlice.ts';
import { Board } from '../../types/board.ts';
import { RootState, useAppDispatch, useAppSelector } from '../../store';
interface FormValues {
    name: string;
}

const validationSchema: Yup.Schema<FormValues> = Yup.object().shape({
    name: Yup.string().required('Required'),
});

const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const [createBoardMutation] = useMutation(CREATE_BOARD);
    const [deleteBoardMutation] = useMutation(DELETE_BOARD);
    const dispatch = useAppDispatch();
    const boards = useAppSelector((state: RootState) => state.boards.boards);
    const selectedBoard = useAppSelector(
        (state: RootState) => state.boards.selectedBoard
    );

    useEffect(() => {
        if (selectedBoard) {
            navigate(`/dashboard/${selectedBoard.id}`);
        } else {
            navigate(`/dashboard`);
        }
    }, [selectedBoard]);
    const handleSubmit = async (values: FormValues) => {
        try {
            const { data } = await createBoardMutation({
                variables: { name: values.name },
            });

            if (
                data &&
                data.createBoard &&
                data.createBoard.id &&
                data.createBoard.name
            ) {
                const { name, id } = data.createBoard;
                dispatch(addBoard({ name, id }));
            }
        } catch {}
    };

    function selectBoardHandler(board: Board) {
        dispatch(setSelectedBoard(board));
    }

    async function deleteBoardHandler(event: SyntheticEvent, board: Board) {
        event.stopPropagation();
        try {
            await deleteBoardMutation({
                variables: { deleteBoardId: board.id },
            });
            dispatch(removeBoard(board));
            dispatch(resetSelectedBoard());
        } catch (error: any) {
            toast.error(error?.message);
        }
    }

    return (
        <>
            <div>
                <Formik
                    initialValues={{
                        name: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form>
                            <div className="flex flex-col gap-4">
                                <div>
                                    <label htmlFor="name">Name</label>
                                    <Field type="password" name="name" />
                                    <ErrorMessage
                                        name="name"
                                        component="div"
                                        className="text-red-500"
                                    />
                                </div>
                                <div>
                                    <button type="submit">Submit</button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>

            <div>
                {boards.map((board: Board) => (
                    <div
                        className={classNames(`bg-fuchsia-200`, {
                            ['bg-violet-700']: selectedBoard?.id === board.id,
                        })}
                        key={board.id}
                        onClick={() => selectBoardHandler(board)}
                    >
                        {board.name}
                        <button
                            className="ml-2 bg-emerald-200"
                            onClick={(e) => deleteBoardHandler(e, board)}
                        >
                            DEL{' '}
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Sidebar;
