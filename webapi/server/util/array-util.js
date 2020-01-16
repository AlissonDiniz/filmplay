export default class ArrayUtil {

    static async asyncForEachParalell(array, asyncCallback) {
        return Promise.all(array.map((it, index) => asyncCallback(it, index)));
    }

    static async asyncForEach(array, asyncCallback) {
        return Promise.each(array, (it, index) => asyncCallback(it, index));
    }
}
