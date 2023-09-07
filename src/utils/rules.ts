export const rules = {
    required: (message: string) => ({
        required: true, message
    }),
    email: (message: string) => ({
        type: 'email', message
    }),
    phone: (message: string) => ({
        validator: (_:string, value:string) => {
            if (value) {
                if(value.includes("_")) {
                    return Promise.reject(message)
                }
            } else {
                return Promise.reject(message)
            }
            return Promise.resolve()
        }
    })
}