const mockDb = {
    users: [{ username: "username", password: "password" }]
};
type DBClient = {
    users: {
        find: ({ username, password }: { username: string; password: string }) => Promise<boolean>;
    };
};
const mockDbClient: DBClient = {
    users: {
        find: ({ username, password }): Promise<boolean> =>
            new Promise(res => {
                const found = mockDb.users.some(user => user.username === username && user.password === password);
                res(found);
            })
    }
};
// TODO: replace with real implementation
type MakeLoginUseCaseParams = {
    db: DBClient;
};
type LoginUseCaseParams = {
    username: string;
    password: string;
};
export const makeLoginUseCase = function makeLoginUseCase({ db }: MakeLoginUseCaseParams) {
    return async function loginUseCase({ username, password }: LoginUseCaseParams): Promise<boolean> {
        const found = await db.users.find({ username, password });
        return found;
    };
};

export const login = makeLoginUseCase({ db: mockDbClient });
