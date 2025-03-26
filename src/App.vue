<template>
  <nav>
    <h1>BPDuction</h1>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #d60101;
  -webkit-text-stroke:0.5px black;
}

nav{
  display: flex;
  background-color: #7cffee;
  border: 3px solid black;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 60px;
  position: fixed;
  top: 0;
  right: 0;
  margin-top: -10px;
  margin-left: -300px;
  margin-right: 0px;
  justify-content: left;
  letter-spacing: 10px;
  width: 1477px;
  z-index: 10;
}

ul{
  display: inline-block;
  margin-left: 100px;
}

label{
  text-align: left;
  margin-left: -580px;
  margin-right: 100px;
  padding-bottom: 70px;
}

#beaconname{
  margin: 20px;
}

#position{
  margin-left: 10px;
  margin-right: 10px;
}

.Beacon{
  display: flexbox;
  color: black;
  position: sticky;
  text-align: left;
  margin-left: 100px;
  padding-bottom: 100px;
  padding-right: 600px;
}

.btn{
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 1rem 1.5rem 1rem;
}

.items{
  margin-left: 250px;
}

h1 {
  text-align: left;
}

h2 {
  margin-left: 40px;
  text-align: center;
  line-height: 70px;
}

h3 {
  text-align: left;
  margin-left: -100px;
}

select {
  margin-left: 100px;
}

button.save {
    background-color: #4bff5d;
    border: 2px solid  #000000;
    color: rgb(0, 0, 0);
    padding: 0.75em 1.5em;
    margin: 0 .5em;
    cursor: pointer;
}

button.cancel {
    background-color: #ff4848;
    border: 2px solid  #000000;
    color: rgb(0, 0, 0);
    padding: 0.75em 1.5em;
    margin: 0 .5em;
    cursor: pointer;
}

</style>

<script setup>
import { useRoute } from "vue-router";
import { watch } from "vue";

const route = useRoute();

// เปลี่ยนสีพื้นหลังตาม meta.bgColor
watch(route, () => {
  document.body.style.backgroundColor = route.meta.bgColor || "pink";
});
</script>
