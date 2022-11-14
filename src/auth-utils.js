
import AuthApi from "@/services/auth-api";

    /**
     * Login user with given details
     */
     const loginUser = (email, password) => {
        return new Promise((resolve, reject) => {
            AuthApi.signIn(email, password)
            .then(response => {
                sessionStorage.setItem("username", response.username);
                sessionStorage.setItem("userFullName", response.fullName);
                sessionStorage.setItem("token", response.token);
                sessionStorage.setItem("rtoken", response.refreshToken);
                sessionStorage.setItem("userr", response.role);
                sessionStorage.setItem("companyName", response.companyName);
                resolve(response.username);
            }, (error) => {
                reject(error);
            });
        });
    }

        /**
     * Logout the user
     */
         const logout = () => {
            return new Promise((resolve, reject) => {
                AuthApi.logout()
                .then(() => {
                    sessionStorage.removeItem('username');
                    sessionStorage.removeItem('token');
                    sessionStorage.removeItem('rtoken');
                    sessionStorage.removeItem('userFullName');
                    sessionStorage.removeItem('userr');
                    sessionStorage.removeItem('companyName');
                    resolve(true);
                }, (error) => {
                    reject(error);
                });
            });
    
        }
    


const refreshToken = () => {

    const refreshingCall = AuthApi.refresh(sessionStorage.getItem('rtoken')).then((response) => {
        sessionStorage.setItem("token", response.token);
        return Promise.resolve(true);
        }, () => {
        return Promise.reject(false);
                
            }
    );
    return refreshingCall;
}




export {loginUser,logout, refreshToken };
