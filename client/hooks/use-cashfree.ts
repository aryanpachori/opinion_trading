const initCashFree = () => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
        script.async = true
        script.onload = () => {
          resolve(true)
        }
        script.onerror = () => {
          reject(false)
        }
        document.body.appendChild(script)
      })
}

export const useCashFree = () => {
    
}