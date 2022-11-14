import axios from 'axios';
import Vue from 'vue'

export default {

    getEmployees (filter,page,pageSize) {
        return axios.get('/api/employees/list', { params: {filter: filter,page: page, pageSize: pageSize} })
        .then(response => {
            if (response && response.data) return response.data;
        })
        .catch(error => {Vue.prototype.$snotify.error(error);})
    },

    saveEmployee(employee){
        var employeeDTO = {id: employee.id, name: employee.name,surname:employee.surname,email:employee.email,address:employee.address,salary:employee.salary}
        return axios.post('/api/employees/save', employeeDTO)
        .then(response => {
            if (response && response.data) {
                Vue.prototype.$snotify.success("Employee Infos Saved Successfully")
                return response.data;
            }
        })
        .catch(error => {Vue.prototype.$snotify.error(error);})
    },

    deleteEmployee(id){
        return axios.delete('/api/employees/delete/'+id)
        .then(response => {
            if (response && response.data) {
                Vue.prototype.$snotify.success("Employee Deleted Successfully")
                return response.data;
            }
        })
        .catch(error => {Vue.prototype.$snotify.error(error);})
    },

    getAverageSalary () {
        return axios.get('/api/employees/average')
        .then(response => {
            if (response && response.data) return response.data;
        })
        .catch(error => {Vue.prototype.$snotify.error(error);})
    },

}