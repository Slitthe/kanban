import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { useMutation } from '@apollo/client';
import { CREATE_BOARD } from '@/graphql/mutations';
import { setToken } from '@/auth-utils';
import { Board } from '@/types/board';
import { addBoard } from '@/store/slices/boardSlice';

interface FormValues {
    name: string;
}

const validationSchema: Yup.Schema<FormValues> = Yup.object().shape({
    name: Yup.string().required('Required'),
});

const Sidebar: React.FC = () => {
    const [createBoardMutation] = useMutation(CREATE_BOARD);
    const dispatch = useAppDispatch();
    const boards = useAppSelector((state: RootState) => state.boards.boards);
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

    return (
        <>
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
            {boards.map((board: Board) => (
                <div>{board.name}</div>
            ))}
        </>
    );
};

export default Sidebar;
