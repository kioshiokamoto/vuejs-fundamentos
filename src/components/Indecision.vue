<template>
  <img v-if="img" :src="img" alt="ve" />
  <div class="bg-dark"></div>
  <div class="indecision-container">
    <input type="text" placeholder="Realiza una pregunta" v-model="question" />
    <p>Recuerda terminar con un signo de interrogación (?)</p>
    <div>
      <h2 v-if="isValidQuestion">{{ question }}</h2>
      <h1 v-if="isValidQuestion">{{ answer }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "Indecision",
  data() {
    return {
      question: null,
      answer: null,
      img: null,
      isValidQuestion: false,
    };
  },
  methods: {
    async getAnswer() {
      try {
        this.answer = "Pensando...";

        const res = await fetch("https://yesno.wtf/api");
        const { answer, image } = await res.json();

        this.answer =
          answer === "yes" ? "Si" : answer === "no" ? "No!" : "Puede ser";
        this.img = image;
      } catch (error) {
        this.answer="No se pudo cargar del API"
        this.img=null;
      }
    },
  },
  watch: {
    question(value, oldValue) {
      this.isValidQuestion = false;
      console.log({ value });
      if (!value.includes("?")) return;
      this.isValidQuestion = true;
      this.getAnswer();
    },
  },
};
</script>

<style scoped>
img,
.bg-dark {
  height: 100vh;
  left: 0px;
  max-height: 100%;
  max-width: 100%;
  position: fixed;
  top: 0px;
  width: 100vw;
}

.bg-dark {
  background-color: rgba(0, 0, 0, 0.4);
}

.indecision-container {
  position: relative;
  z-index: 99;
}

input {
  width: 250px;
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
}
input:focus {
  outline: none;
}

p {
  color: white;
  font-size: 20px;
  margin-top: 0px;
}

h1,
h2 {
  color: white;
}

h2 {
  margin-top: 150px;
}
</style>