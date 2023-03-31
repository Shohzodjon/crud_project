<template>
  <div class="doto__list">
    <h2>Todo card</h2>
    <ul class="input__wrapp">
      <li>
        <input type="text" placeholder="Product name ..." v-model="postObject.name_uz" />
      </li>
      <li>
        <input type="number" placeholder="Product cost ..." v-model="postObject.cost" />
      </li>
      <li>
        <input type="text" placeholder="Address ..." v-model="postObject.address" />
      </li>
      <li>
        <button v-if="!isEdit" @click="handleClick" class="add__btn btn">Add data</button>
        <div v-if="isEdit">
          <button class="edit__btn btn" @click="editFunc(productId)">Edit</button>
          <button class="unchange__btn btn" @click="unchangeProduct">No change</button>
        </div>
      </li>
    </ul>

    <div
      v-for="(item, index) in productList"
      :key="item.product_type_id"
      class="list__card"
      ref="wrapp"
    >
      <ul>
        <li>Name : {{ item.name_uz }}</li>
        <li>Address : {{ item.address }}</li>
        <li>
          Created at :
          <span v-if="item.created_date !== ''">{{ dateFormat(item?.created_date) }} </span>
        </li>
      </ul>
      <div class="card__btns">
        <button @click="productEdit(item.id, index)" class="edit__btn btn">Edit</button>
        <button @click="deleteData(item.id, index)" class="delete__btn btn">Delete</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      year: new Date().getFullYear(),
      months: new Date().getMonth() + 1,
      days: new Date().getDate(),
      hour: new Date().getHours(),
      minut: new Date().getMinutes(),
      second: new Date().getSeconds(),
      isEdit: false,
      isDlete: false,
      productId: 0,
      postObject: {
        name_uz: '',
        cost: '',
        address: '',
        product_type_id: Math.floor(Math.random() * 200),
        created_date: '',
        product_index: ''
      }
    }
  },
  computed: {
    productList() {
      return this.$store.state.products
    }
  },
  mounted() {
    this.$store.dispatch('getProducts')
  },
  methods: {
    dateFormat(seconds) {
      if (seconds !== undefined || seconds !== NaN) {
        let numyears = Math.floor(seconds / 31536000)
        let nummonths = Math.floor((seconds % 31536000) / 2628000)
        let numdays = Math.floor(((seconds % 31536000) % 2628000) / 86400)
        let numhours = Math.floor((((seconds % 31536000) % 2628000) % 86400) / 3600)
        let numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60)
        let monthsArr = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'Otkober',
          'November',
          'December'
        ]
        let monthName = nummonths > 0 ? monthsArr[nummonths - 1] : monthsArr[nummonths]
        let result =
          numyears +
          ' year , ' +
          numdays +
          '-' +
          monthName +
          ' , ' +
          numhours +
          ':' +
          numminutes +
          ' minutes'
        return result
      } else {
        return 0
      }
    },

    deleteData(id, index) {
      this.$store.commit('DELETE__DATA', id)
      let box = this.$refs.wrapp[index]
      box.classList.add('fall')
      axios
        .delete(`product/${id}`)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    },

    handleClick() {
      if (
        this.postObject.address !== '' &&
        this.postObject.cost !== '' &&
        this.postObject.name_uz !== ''
      ) {
        this.$store.commit('ADD__DATA', this.postObject)
        axios
          .post('product', {
            product_type_id: this.postObject.product_type_id,
            name_uz: this.postObject.name_uz,
            cost: this.postObject.cost,
            address: this.postObject.address,
            created_date: `${this.year}-${this.months <= 9 ? '0' + this.months : this.months}-${
              this.days
            }T${this.hour}:${this.minut}:${this.second}.056Z`
          })
          .then((response) => {
            this.postObject.address = ''
            this.postObject.cost = ''
            this.postObject.name_uz = ''
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        alert('Fill out input')
      }
    },
    productEdit(id, index) {
      let box = this.$refs.wrapp[index]
      box.classList.add('unactive__card')
      this.productId = id
      this.isEdit = true
      let obj = this.$store.state.products.filter((item) => item.id == id)
      this.postObject.name_uz = obj[0].name_uz
      this.postObject.address = obj[0].address
      this.postObject.cost = obj[0].cost
      this.postObject.product_index = index
    },

    unchangeProduct() {
      let box = this.$refs.wrapp[this.postObject.product_index]
      box.classList.remove('unactive__card')
      this.isEdit = false
      this.postObject.address = ''
      this.postObject.cost = ''
      this.postObject.name_uz = ''
    },
    editFunc(id) {
      let box = this.$refs.wrapp[this.postObject.product_index]
      this.$store.commit('ADD__DATA', this.postObject)
      this.$store.commit('DELETE__DATA', id)
      box.classList.remove('unactive__card')
      axios
        .put('product', {
          id: this.productId,
          product_type_id: this.postObject.product_type_id,
          name_uz: this.postObject.name_uz,
          cost: this.postObject.cost,
          address: this.postObject.address,
          created_date: `${this.year}-${this.months <= 9 ? '0' + this.months : this.months}-${
            this.days
          }T${this.hour}:${this.minut}:${this.second}.056Z`
        })
        .then((response) => {
          this.postObject.address = ''
          this.postObject.cost = ''
          this.postObject.name_uz = ''
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
<style scoped>
.btn {
  background: none;
  border: none;
  outline: none;
  border-radius: 5px;
  padding: 3px 7px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  margin-right: 5px;
}
.edit__btn {
  background: green;
  color: #fff;
  padding: 3px 9px;
}
.unchange__btn {
  background: #0bcbdc;
  color: #fff;
}
.delete__btn {
  background: #ec1802;
  color: #fff;
}
.add__btn {
  background: #0bcbdc;
  color: #fff;
}
h2 {
  text-align: center;
  margin: 20px 0;
}
.input__wrapp {
  border: 1px solid #999;
  border-radius: 5px;
  padding: 10px 5px;
}
.input__wrapp li {
  margin-bottom: 8px;
}
.input__wrapp li:last-child {
  margin-bottom: 5px;
}
.input__wrapp input {
  padding: 3px;
  font-size: 14px;
  padding-left: 6px;
  outline: none;
  border: 1px solid #999;
  border-radius: 4px;
  width: 300px;
}
.input__wrapp input:focus {
  border-color: #0bcbdc;
}
.list__card {
  border: 1px solid #999;
  padding: 6px;
  border-radius: 5px;
  margin-top: 10px;
  background: linear-gradient(90deg, #f47fff 10%, #1bd6c973);
  transition: all linear 0.4s;
  overflow: hidden;
}
.list__card li {
  margin: 3px 0;
  font-size: 15px;
}
.card__btns {
  display: flex;
  align-items: center;
  gap: 15px;
}
.fall {
  transform: translateY(10rem) rotateZ(20deg);
  opacity: 0;
}
.unactive__card {
  position: relative;
}
.unactive__card::before {
  position: absolute;
  top: 0;
  content: '';
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.329);
  z-index: 222;
}
</style>
