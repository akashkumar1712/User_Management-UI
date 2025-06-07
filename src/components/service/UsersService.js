import axios from "axios";

class UsersService {
    static BASE_URL = "https://edutech-login-backend.onrender.com"

    // static async login(email, password){
    //     try{
    //         const response = await axios.post(`${UsersService.BASE_URL}/auth/login`, {email, password})
    //         return response.data;

    //     }catch(err){
    //         throw err;
    //     }
    // }

    static async login(email, password) {
        try {
          const response = await axios.post(`${UsersService.BASE_URL}/auth/login`, {
            email,
            password,
          });
    
          // ✅ Check for HTTP status code 200
          if (response.data.statusCode === 200) {
            return response.data.data; // Continue login flow
          } else {
            throw new Error("Login failed. Please try again.");
          }
    
        }catch (error) {
            console.error('Auth error:', error.response?.data || error.message);
            alert('Authentication failed. Please check credentials.');
          }
    }

    // static async register(userData, token){
    //     try{
    //         const response = await axios.post(`${UsersService.BASE_URL}/auth/register`, userData, 
    //         {
    //             headers: {Authorization: `Bearer ${token}`}
    //         })
    //         return response.data;
    //     }catch(err) {
    //         throw err;
    //     }
    // }

    static async register(userData) {
        try {
          const response = await axios.post(`${UsersService.BASE_URL}/auth/register`, userData);
          return response.data.data;
        } catch (err) {
          throw err;
        }
      }

    static async getAllUsers(token){
        try{
            const response = await axios.get(`${UsersService.BASE_URL}/admin/get-all-users`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data.data;
        }catch(err){
            throw err;
        }
    }


    static async getYourProfile(token){
        try{
            const response = await axios.get(`${UsersService.BASE_URL}/adminuser/get-profile`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data.data;
        }catch(err){
            throw err;
        }
    }

    static async getUserById(userId, token){
        try{
            const response = await axios.get(`${UsersService.BASE_URL}/admin/get-users/${userId}`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async deleteUser(userId, token){
        try{
            const response = await axios.delete(`${UsersService.BASE_URL}/admin/delete/${userId}`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data.data;
        }catch(err){
            throw err;
        }
    }


    static async updateUser(userId, userData, token){
        try{
            const response = await axios.put(`${UsersService.BASE_URL}/admin/update/${userId}`, userData,
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data.data;
        }catch(err){
            throw err;
        }
    }

    /**AUTHENTICATION CHECKER */
    static logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('role')
    }

    static isAuthenticated(){
        const token = localStorage.getItem('token')
        return !!token
    }

    static isAdmin(){
        const role = localStorage.getItem('role')
        return role === 'ADMIN'
    }

    static isUser(){
        const role = localStorage.getItem('role')
        return role === 'USER'
    }

    static adminOnly(){
        return this.isAuthenticated() && this.isAdmin();
    }

}

export default UsersService;