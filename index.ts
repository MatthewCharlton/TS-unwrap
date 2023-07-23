export { }

type Result<T> = {
    error: unknown;
    value: T
}

declare global {
    interface Promise<T> {
        unwrap(...args: any): Promise<Result<T>>
    }
}

Promise.prototype.unwrap = async function <T>(...args: any) {
    let res = undefined;
    let err = undefined;

    try {
        res = await this.then<T>(...args)
    } catch (e) {
        err = e
    }

    return {
        value: res,
        error: err
    }
}
