// Promise 的三种状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function MyPromise(executor) {
    let _this = this; // 拷贝this指针
    _this.state = PENDING; // 初始状态
    _this.value = undefined; // 成功结果
    _this.reason = undefined; // 失败原因

    // 如果executor是同步代码 进行try catch获取其中的异常 如果有异常 把异常传到reject
    try {
        executor(resolve, reject);  // 立即执行 
    } catch (e) {  
        reject(e);  //调用reject并把捕获的error作为参数传给reject
    }

    function resolve(value) {
         // 当状态为pending时再做更新
         if (_this.state === PENDING) {
            _this.value = value; // 保存成功结果
            _this.state = FULFILLED;
        }
    }

    function reject(reason) {
        // 当状态为pending时再做更新
        if (_this.state === PENDING) {
            _this.reason = reason; // 保存失败原因
            _this.state = REJECTED;
        }
    }
}

Promise.MyPromise.then = function (onFulfilled, onRejected) {
    let _this = this;
    if (_this.state === FULFILLED) {
        //判断参数类型，是函数执行之
        if (typeof onFulfilled === 'function') {
            onFulfilled(_this.value);
        }

    }
    if (_this.state === REJECTED) {
        if (typeof onRejected === 'function') {
            onRejected(_this.reason);
        }
    }
};

module.exports = MyPromise;