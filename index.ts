export {};

type Result<T> = {
    error: unknown | undefined;
    value: T | undefined;
};

declare global {
    interface PromiseConstructor {
        unwrap<T>(...args: any): Promise<Result<T>>;
    }

    interface Promise<T> {
        unwrap(...args: any): Promise<Result<T>>;
    }
}

// eslint-disable-next-line
Promise.prototype.unwrap = async function <T>(
    ...args: any
) {
    let res = undefined;
    let err = undefined;

    try {
        res = await this.then<T>(...args);
    } catch (e) {
        err = e;
    }

    return {
        value: res,
        error: err,
    };
};
// eslint-disable-next-line
Promise.unwrap = async function <T>(promise: Promise<T>) {
    let res = undefined;
    let err = undefined;

    try {
        res = await promise;
    } catch (e) {
        err = e;
    }

    return {
        value: res,
        error: err,
    };
};
