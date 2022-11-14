<script>
import EmployeesApi from "@/services/employee-api";
import Main from "@/components/Main.vue";
import Vue from "vue";
import Swal from "sweetalert2";

export default {
  components: { Main },
  title: "Employee Management",

  mounted() {
    this.getEmployees();
  },

  data() {
    return {
      isTableBusy: false,
      filter: "",
      pagemodelMain: { currentPage: 1, perPage: 10, totalRows: 0 },
      list: [],
      selected: {
        id: null,
        name: "",
        surname: "",
        email: "",
        address: "",
        salary: 0.0,
      },
      showModal: false,
      averageSalary:0
    };
  },
  methods: {
    getEmployees() {
      this.isTableBusy = true;
      this.getAverageSalary()
      EmployeesApi.getEmployees(
        this.filter,
        this.pagemodelMain.currentPage,
        this.pagemodelMain.perPage
      )
        .then((response) => {
          if (response) {
            this.list = response.list;
            this.pagemodelMain.totalRows = response.total;
            this.pagemodelMain.currentPage = response.page;
            this.pagemodelMain.perPage = response.pageSize;
            this.pagemodelMain.pageSize = response.pageSize;
          }
        })
        .finally(() => {
          this.isTableBusy = false;
        });
    },

    emptyEmployee() {
      this.selected.id = null;
      this.selected.name = "";
      this.selected.surname = "";
      this.selected.email = "";
      this.selected.address = "";
      this.selected.salary = 0.0;
    },

    openModal() {
      this.emptyEmployee();
      this.showModal = true;
    },

    cancelEdit() {
      this.emptyEmployee();
      this.showModal = false;
    },

    isEmptyString(string) {
      return !string || (string && string.length == 0);
    },

    saveEmployee() {
      if (
        this.isEmptyString(this.selected.name) ||
        this.isEmptyString(this.selected.surname) ||
        this.isEmptyString(this.selected.email) ||
        this.isEmptyString(this.selected.address) ||
        this.selected.salary == null ||
        this.selected.salary < 0
      ) {
        Vue.prototype.$snotify.error("Verify Mandatory fields");
        return;
      }
      EmployeesApi.saveEmployee(this.selected).then((response) => {
        if (response) {
          this.getEmployees();
          this.emptyEmployee();
          this.showModal = false;
        }
      });
    },

    edit(employee) {
      this.selected.id = employee.id;
      this.selected.name = employee.name;
      this.selected.surname = employee.surname;
      this.selected.email = employee.email;
      this.selected.address = employee.address;
      this.selected.salary = employee.salary;
      this.showModal = true;
    },

    deleteEmployee(employee) {
      if (employee.id == null) {
        Vue.prototype.$snotify.error("Selected Employee was not found");
        return;
      }
      Swal.fire({
        title: "Delete ?",
        html: employee.name + " " + employee.surname,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#34c38f",
        cancelButtonColor: "#f46a6a",
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes, delete!",
      }).then((result) => {
        if (result.value) {
          EmployeesApi.deleteEmployee(employee.id).then((response) => {
            if (response) {
              this.getEmployees();
            }
          });
        }
      });
    },

    getAverageSalary(){
      EmployeesApi.getAverageSalary().then(
        (response)=>{
          this.averageSalary=response ? response : 0
        }
      )
    }
  },
};
</script>

<template>
  <div>
    <Main />
    <div class="row">
      <div class="col-lg-12">
        <div
          class="card border-info overflow-hidden m-4 p-4"
          style="background-color: white; height: 100%"
        >
          <div class="card-body">
            <b-alert show variant="info">
              <b-icon
                icon="info-square"
                variant="info"
                style="margin-right: 10px"
              >
              </b-icon>
              <span 
                >Total Number of Employees is :
                <span class="text-danger"> {{ pagemodelMain.totalRows }}</span>
              </span>
              <br />
              <b-icon
                icon="info-square"
                variant="info"
                style="margin-right: 10px"
              >
              </b-icon>
              <span 
                >Average Salary is :
                <span class="text-danger"> {{ averageSalary }} EUR</span>
                </span
              >
            </b-alert>

            <div class="row">
              <!--Filter input -->
              <div class="col-11">
                <b-input-group class="mb-4">
                  <b-form-input
                    placeholder="Search by employee name or surname"
                    v-model="filter"
                    @keyup.native.enter="getEmployees()"
                  ></b-form-input>
                </b-input-group>
              </div>
              <!-- End of Filter Input -->
              <!-- Add new Employee button -->
              <div class="col-1">
                <b-button
                  variant="info"
                  @click="openModal"
                  style="float: right"
                  class="text-white"
                  ><b-icon icon="plus" variant="white"></b-icon>New</b-button
                >
              </div>
              <!--End of Add new Employee button -->
            </div>

            <!--Table -->
            <div class="table-responsive">
              <table class="table table-centered table-nowrap table-hover">
                <thead class="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Surname</th>
                    <th scope="col">Email</th>
                    <th scope="col">Address</th>
                    <th scope="col">Salary(Yearly)</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="employee in list" :key="employee.id">
                    <td>{{ employee.name }}</td>
                    <td>{{ employee.surname }}</td>
                    <td>{{ employee.email }}</td>
                    <td>{{ employee.address }}</td>
                    <td>{{ employee.salary }}</td>
                    <td>
                      <ul class="list-inline font-size-24 contact-links mb-0">
                        <li class="list-inline-item px-2">
                          <a
                            v-b-tooltip.hover
                            title="Edit"
                            @click="edit(employee)"
                          >
                            <b-icon
                              icon="pencil-fill"
                              variant="warning"
                              style="cursor: pointer"
                            ></b-icon>
                          </a>
                        </li>
                        <li class="list-inline-item px-2">
                          <a
                            v-b-tooltip.hover
                            title="Delete"
                            @click="deleteEmployee(employee)"
                          >
                            <b-icon
                              icon="trash-fill"
                              variant="danger"
                              style="cursor: pointer"
                            ></b-icon>
                          </a>
                        </li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>

              <!-- Spinner -->
              <div v-if="isTableBusy" class="d-flex justify-content-center">
                <div class="spinner-border text-success" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
              <!-- End of Spinner -->

              <!-- Empty -->
              <span
                v-if="!isTableBusy & !list.length"
                class="d-flex justify-content-center m-4 text-danger"
                >No Employees Found
              </span>
              <!-- End of Empty -->
            </div>
            <!--End of Table -->
            <!-- Pagination -->

            <div v-if="list.length" class="d-flex justify-content-center">
              <div
                class="dataTables_paginate paging_simple_numbers float-right"
              >
                <ul class="pagination pagination-rounded mb-0">
                  <b-pagination
                    v-model="pagemodelMain.currentPage"
                    :disabled="isTableBusy"
                    :per-page="pagemodelMain.pageSize"
                    :total-rows="pagemodelMain.totalRows"
                    @input="getEmployees()"
                  ></b-pagination>
                </ul>
              </div>
            </div>
            <!-- End of Pagination  -->
          </div>
        </div>
      </div>
    </div>

    <!--Employee Edit Modal -->
    <b-modal
      v-if="selected"
      v-model="showModal"
      :title="selected.id ? 'Edit Employee' : 'Add New Employee'"
      centered
      title-class="text-info"
      title-tag="h5"
      size="xl"
      hide-header-close
    >
      <form class="needs-validation">
        <b-form-group>
          <label for="name" class="pt-1 pb-1 font-size-14 font-weight-bold"
            >Name<span class="text-danger mb-2" style="font-size: 1.2em"
              >*</span
            ></label
          >
          <input
            type="text"
            class="form-control font-size-13"
            v-model="selected.name"
          />
        </b-form-group>

        <b-form-group>
          <label for="surname" class="pt-1 pb-1 font-size-14 font-weight-bold"
            >Surname<span class="text-danger mb-2" style="font-size: 1.2em"
              >*</span
            ></label
          >
          <input
            type="text"
            class="form-control font-size-13"
            v-model="selected.surname"
          />
        </b-form-group>

        <b-form-group>
          <label for="email" class="pt-1 pb-1 font-size-14 font-weight-bold"
            >Email<span class="text-danger mb-2" style="font-size: 1.2em"
              >*</span
            ></label
          >
          <input
            type="text"
            class="form-control font-size-13"
            v-model="selected.email"
          />
        </b-form-group>

        <b-form-group>
          <label for="address" class="pt-1 pb-1 font-size-14 font-weight-bold"
            >Address<span class="text-danger mb-2" style="font-size: 1.2em"
              >*</span
            ></label
          >
          <input
            type="text"
            class="form-control font-size-13"
            v-model="selected.address"
          />
        </b-form-group>

        <b-form-group>
          <label for="salary" class="pt-1 pb-1 font-size-14 font-weight-bold"
            >Salary (Yearly)<span
              class="text-danger mb-2"
              style="font-size: 1.2em"
              >*</span
            ></label
          >
          <input
            type="float"
            class="form-control font-size-13"
            v-model="selected.salary"
          />
        </b-form-group>
      </form>

      <template v-slot:modal-footer>
        <b-button
          variant="secondary"
          @click="
            cancelEdit();
            showModal = false;
          "
          size="md"
          >Cancel</b-button
        >
        <b-button variant="primary" @click="saveEmployee()" size="md"
          >Save</b-button
        >
      </template>
    </b-modal>
    <!-- End Of Employee Edit Modal -->
  </div>
</template>
