// Promise 的三种状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function MyPromise(executor) {
    let _this = this; // 拷贝this指针
    _this.state = PENDING; // 初始状态
    _this.value = undefined; // 成功结果
    _this.reason = undefined; // 失败原因
    _this.onFilFulledCallbacks = [];
    _this.onRejectedCallbacks = [];

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
            _this.onFilFulledCallbacks.forEach((fn) => {
                fn();
            });
        }
    }

    function reject(reason) {
        // 当状态为pending时再做更新
        if (_this.state === PENDING) {
            _this.reason = reason; // 保存失败原因
            _this.state = REJECTED;
            _this.onRejectedCallbacks.forEach((fn) => {
                fn();
            });
        }
    }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
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
    // 当调用then时可能没成功 也没失败
    if(_this.status === PENDING) { // 此时没有resolve也没有reject
        _this.onResolvedCallbacks.push(function(){ // 用数组是为了保证在异步时有多次promise.then的情况 
            onFulfiled(_this.value);
        });
        _this.onRejectedCallbacks.push(function(){
            onRejected(_this.reason);
        });
    }
};

MyPromise.deferred = function() {
    let dfd = {};
    dfd.promise = new MyPromise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
}

module.exports = MyPromise;