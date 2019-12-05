// Promise 的三种状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function MyPromise(executor) {
    this.state = PENDING; // 初始状态
    this.value = undefined; // 成功结果
    this.reason = undefined; // 失败原因

    executor(resolve, reject); // 立即执行

    function resolve(value) {
        // todo
    }

    function reject(reason) {
        // todo
    }
}

Promise.MyPromise.then = function (onFulfilled, onRejected) {
    // todo
};

module.exports = MyPromise;