export function autenticar() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                user: {
                  id: 1,
                  cpf: "33212057009",
                  nome: "Jao Silva"
                },
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGlwb1VzdWFyaW8iOiJjbGllbnRlIiwiaWF0IjoxNTg4MzQ0OTE4LCJleHAiOjE1ODg5NDk3MTh9.CApEb6gAnT96wViCWIC9114xVk5f59cSobsmOOTnzw0"
              })
        }, 2000);
    });
}