<template>
  <h2>{{ customTitle }}</h2>
  <p>{{ counter }}</p>
  <p>{{ counter }} <sup>2</sup> = {{ squareCounter }}</p>

  <div>
    <button @click="increment">+1</button>
    <button @click="decrement">-1</button>
  </div>
</template>

<script>
export default {
  name: "Counter",
  props: {
    title: String,
    start: {
      type: Number,
      // required: true,
      default: 0,
      validator(value) {
        return value >= 0;
      },
    },
  },
  data() {
    return {
      counter: this.start,
    };
  },

  methods: {
    getSquareValue() {
      return this.counter ** 2;
    },
    increment() {
      this.counter = this.counter + 1;
    },
    decrement() {
      this.counter = this.counter - 1;
    },
  },
  computed: {
    squareCounter() {
      // console.log("Computed square counter");
      return this.counter ** 2;
    },
    customTitle() {
      return this.title ? this.title : "Counter";
    },
  },
};
</script>

<style scoped>
button {
  background-color: #64db87;
  border-radius: 5px;
  border: none;
  color: #fff;
  cursor: pointer;
  margin: 0 5px;
  padding: 5px 15px;
  transition: 0.3s ease-in-out;
}
button:hover {
  background-color: #5aa67b;
}
</style>