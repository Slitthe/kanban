import { AuthContext } from '../types/auth';
import { GraphQLError } from 'graphql/error';
import { createBoard, getBoard, getBoards, updateBoard } from '../db';
import { DbItem } from '../types/db';
import { deleteBoard } from '../db';
import { BoardDetails } from '../types/board';

export async function getBoardsResolver(
    parent: {},
    _: {},
    context: AuthContext
) {
    if (!context.isAuthenticated || !context.user?.userId) {
        throw new GraphQLError('Unauthorized');
    }

    try {
        return await getBoards(context.user.userId);
    } catch {
        throw new GraphQLError('Failed to fetch boards');
    }
}
export async function getBoardResolver(
    parent: {},
    boardDetails: DbItem,
    context: AuthContext
) {
    if (!context.isAuthenticated || !context.user?.userId) {
        throw new GraphQLError('Unauthorized');
    }

    const { id } = boardDetails;

    try {
        return await getBoard(context.user.userId, id);
    } catch {
        throw new GraphQLError('Failed to fetch boards');
    }
}

export async function deleteBoardResolver(
    parent: any,
    boardDetails: DbItem,
    context: AuthContext
) {
    const { id } = boardDetails;

    if (!context.isAuthenticated || !context.user?.userId) {
        throw new GraphQLError('Unauthorized');
    }

    try {
        return await deleteBoard(id, context.user.userId);
    } catch {
        throw new Error('Failed to delete board');
    }
}

export async function createBoardResolver(
    parent: any,
    boardDetails: BoardDetails,
    context: AuthContext
) {
    console.log({ boardDetails });
    const { name } = boardDetails;
    if (!context.isAuthenticated || !context.user?.userId) {
        throw new GraphQLError('Unauthorized');
    }

    try {
        return await createBoard(name, context.user.userId);
    } catch {
        throw new Error('Failed to save board');
    }
}

export async function updateBoardResolver(
    parent: any,
    boardDetails: BoardDetails & DbItem,
    context: AuthContext
) {
    const { name, id } = boardDetails;

    if (!context.isAuthenticated || !context.user?.userId) {
        throw new GraphQLError('Unauthorized');
    }

    try {
        return await updateBoard(name, id, context.user.userId);
    } catch {
        throw new Error('Failed to update board');
    }
}
