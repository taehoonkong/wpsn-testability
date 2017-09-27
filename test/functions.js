const assert = require('assert')

const {
  addAsync,
  multSync,
  addSync,
  multAsync,
  throwErrorIfNegative
} = require('../src/functions')

describe('functions', function () {
  describe('addSync', function() {
    it('기본 기능', function() {
      const result = addSync(1, 2)
      assert.equal(result, 3)
    })
  })
  
  describe('multSync', function(){
    it('곱셈 기능', function() {
      const result = multSync(2, 2)
      assert.equal(result, 4)
    })
  })

  describe('addAsync', function() {
    // 비동기 작업의 테스트가 완료되었다는 사실을 알리기 위해 done 콜백을 호출합니다.
    it('기본 기능 (done)', function(done) {
      addAsync(1, 2)
        .then(result => {
          assert.equal(result, 3)
          done()
        })
    })

    // 혹은 Promise를 리턴하거나
    it('기본 기능 (Promise)', function() {
      return addAsync(1, 2)
        .then(result => {
          assert.equal(result, 3)
        })
    })

    // async/await 를 사용할 수도 있습니다.
    it('기본 기능 (async/await)', async function() {
      const result = await addAsync(1, 2)
      assert.equal(result, 3)
    })
  })

  describe('multAsync', function() {  
    it('곱셈 비동기 (done)', function(done) {
      multAsync(2, 2)
        .then(result => {
          assert.equal(result, 4)
          done()
        })
    })

    it('곱셈 비동기 (Promise)', function() {
      return multAsync(2, 2)
        .then(result => {
          assert.equal(result, 4)
        })
    })

    it('곱셈 비동기 (async/await)', async function() {
      const result = await multAsync(2, 2)
      assert.equal(result, 4)
    })
  })

  describe('throwErrorIfNegative', function() {
    it('양수일 때 문제 없이 값을 반환', function() {
      const result = throwErrorIfNegative(1)
      assert.equal(result, 1)
    })

    it('음수일 때 에러 발생', function() {
      assert.throws(() => {
        throwErrorIfNegative(-1)
      })
    })
  })
})
