import React, { useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import toast from 'react-hot-toast';
import { CREATE_COLUMN } from '../../graphql/mutations.ts';
import { RootState, useAppDispatch, useAppSelector } from '../../store';
import { addColumn } from '../../store/slices/columnSlice.ts';

interface FormValues {
    name: string;
}

const validationSchema: Yup.Schema<FormValues> = Yup.object().shape({
    name: Yup.string().required('Name is required'),
});

const AddColumnForm: React.FC = () => {
    const [createColumMutation, { error }] = useMutation(CREATE_COLUMN);
    const selectedBoard = useAppSelector(
        (state: RootState) => state.boards.selectedBoard
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (error?.message) {
            toast.error(error.message);
        }
    }, [error?.message]);

    async function createColumn(formValues: FormValues) {
        if (selectedBoard?.id) {
            const { name } = formValues;
            try {
                const { data } = await createColumMutation({
                    variables: { name, boardId: selectedBoard.id },
                });

                const column = data?.createColumn;
                if (column && column.boardId && column.name && column.id) {
                    dispatch(
                        addColumn({
                            boardId: column.boardId,
                            name: column.name,
                            id: column.id,
                        })
                    );
                }
            } catch {}
        }
    }
    const handleSubmit = (values: FormValues) => {
        createColumn(values);
    };

    return (
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
                            <Field type="text" name="name" />
                            <ErrorMessage
                                name="name"
                                component="div"
                                className="text-red-500"
                            />
                        </div>
                        <div>
                            <button className="bg-red-600" type="submit">
                                Submit
                            </button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default AddColumnForm;
