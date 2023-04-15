const API_JOB = process.env.REACT_APP_JOB
const API_INFO = process.env.REACT_APP_INFO
const urls = {
    API_JOB : API_JOB,
    API_INFO : API_INFO
}
export default urls;
/*depending the number of pixels size image , we define a custom timeout for progression
* and granularity of update request
* */
export function getIntervalle(value) {
    const arrayRange = (start, stop, step) =>
        Array.from(
            { length: (stop - start) / step + 1 },
            (value, index) => start + index * step
        );
    const rangeList = [
        arrayRange(1, 5, 1),
        arrayRange(6, 27, 1),
        arrayRange(28, 57, 1),
        arrayRange(58, 127, 1),
        arrayRange(128, 511, 1),
        arrayRange(512, 1023, 1),
        arrayRange(1024, 2047, 1),
        arrayRange(2048, 4072, 1)
    ]
    const timeOutList = [10, 200, 4000, 20000, 40000, 380000, 600000, 1000000]
    const granular = [5, 5, 5, 5, 5, 5, 5, 5]
    const myRange = rangeList.map((item, index) => item.includes(Number(value)))
    const indices = myRange.reduce((out, bool, index) => bool ? out.concat(index) : out, [])
    return [timeOutList[indices[0]],granular[indices[0]]]
}
