export function singIn() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                token: "adsa45das4ds5a6d6a4da56sd89sa4da949dasdasda",
                user: {
                    name: "Samu",
                    email: "samu@gmail.com",
                    profile: "Aluno",
                    avatar: "https://avatars1.githubusercontent.com/u/33751384?s=460&u=bba99304003d18646b6e4ed1152f02a23f00d081&v=4"
                }
            })
        }, 2000)
    });
}