<template>
  <div class="searchable-dropdown" @click="toggleDropdown"  ref="dropdownRef">
    <input v-model="searchTerm" @input="filterOptions" placeholder="주모를 검색하세요(기본: 전체)" class="select" />
    <ul v-show="showDropdown">
      <li v-for="(seller, index) in filteredOptions" :key="index" @click="selectSeller(seller)">
        {{ seller.label }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
const dropdownRef = ref(null);

export default {
  props: {
    sellers: Array,
    selectedSeller: Number,
  },
  data() {
    return {
      searchTerm: '',
      showDropdown: false,
    };
  },
  computed: {
    filteredOptions() {
      if (this.searchTerm === '') return this.sellers;
      const regex = new RegExp(this.searchTerm, 'i');
      return this.sellers.filter(seller => regex.test(seller.label));
    },
  },
  methods: {
    filterOptions() {
      this.showDropdown = this.searchTerm === '' || this.filteredOptions.length > 0;
    },
    selectSeller(seller) {
      this.searchTerm = seller.label;
      this.$emit('select', seller.value);
      this.showDropdown = false;
    },
    toggleDropdown() {
      console.log("TOGGLE");
      this.showDropdown = !this.showDropdown;
    },
    closeDropdown (event)  {
      console.log("HERE")
      if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
        this.showDropdown = false;
      }
    },
    showAllOptions() {
      this.showDropdown = true;
    },
    mounted() {
         document.addEventListener('click', this.closeDropdown);
    },
    beforeUnmount() {
    document.removeEventListener('click', this.closeDropdown);
  },
  },
  watch: {
    showDropdown: function (value) {
      console.log(value);
    },
  },
  
};
</script>

<style scoped>
.searchable-dropdown {
  position: relative;
  width: 200px; /* Adjust width as needed */
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  width: 100%;
}

li {
  padding: 8px;
  cursor: pointer;
}

li:hover {
  background-color: #f0f0f0;
}

select::-ms-expand {
  display: none;
}

.select {
  margin-bottom: 1rem;
  background-size: 20px;
  padding: 5px 30px 5px 10px;
  border-radius: 4px;
  outline: 0 none;
  background: url('@/assets/arrow.jpeg') no-repeat 95% 50%;
  -o-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.select option {
  background: black;
  color: #fff;
  padding: 3px 0;
}

select:hover {
  border-color: #888;
}

select:focus {
  border-color: #aaa;
  box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7);
  box-shadow: 0 0 0 3px -moz-mac-focusring;
  color: #222;
  outline: none;
}

select:disabled {
  opacity: 0.5;
}

</style>
