<template>
  <div class="fit row wrap justify-center items-start content-start">
    <div class="container-row-card">
      <div class="row-card">
        <h3 class="title">João 1</h3>
        <div class="bar">
          <div class="emptybar"></div>
          <div class="filledbar"></div>
        </div>
        <div class="circle">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              class="stroke"
              cx="60"
              cy="60"
              r="50"
            />
          </svg>
        </div>
      </div>
      <div class="row-card">
        <h3 class="title">João 2</h3>
        <div class="bar">
          <div class="emptybar"></div>
          <div class="filledbar"></div>
        </div>
        <div class="circle">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              class="stroke"
              cx="60"
              cy="60"
              r="50"
            />
          </svg>
        </div>
      </div>
    </div>
    <div class="container-row-card">
      <div class="row-card">
        <h3 class="title">João 3</h3>
        <div class="bar">
          <div class="emptybar"></div>
          <div class="filledbar"></div>
        </div>
        <div class="circle">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              class="stroke"
              cx="60"
              cy="60"
              r="50"
            />
          </svg>
        </div>
      </div>
      <div class="row-card">
        <h3 class="title">João 4</h3>
        <div class="bar">
          <div class="emptybar"></div>
          <div class="filledbar"></div>
        </div>
        <div class="circle">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              class="stroke"
              cx="60"
              cy="60"
              r="50"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
/* body {
  background-color: #100e17;
  font-family: "Open Sans", sans-serif;
} */

.container-row-card {
  /* position: absolute;
  height: 300px;
  width: 600px;
  top: 60px;
  left: calc(50% - 300px); */
  display: flex;
}

.row-card {
  display: flex;
  height: 280px;
  width: 200px;
  background-color: #17141d;
  border-radius: 10px;
  box-shadow: -10px 10px 10px #000;
  /*   margin-left: -50px; */
  transition: 0.4s ease-out;
  position: relative;
  left: 0px;
}

.row-card:not(:first-child) {
  margin-left: -50px;
}

.row-card:hover {
  transform: translateY(-20px);
  transition: 0.4s ease-out;
}

.row-card:hover ~ .row-card {
  position: relative;
  left: 50px;
  transition: 0.4s ease-out;
}

.title {
  color: white;
  font-weight: 300;
  position: absolute;
  left: 20px;
  top: 15px;
}

.bar {
  position: absolute;
  top: 100px;
  left: 20px;
  height: 5px;
  width: 150px;
}

.emptybar {
  background-color: #2e3033;
  width: 100%;
  height: 100%;
}

.filledbar {
  position: absolute;
  top: 0px;
  z-index: 3;
  width: 0px;
  height: 100%;
  background: rgb(0, 154, 217);
  background: linear-gradient(
    90deg,
    rgba(0, 154, 217, 1) 0%,
    rgba(217, 147, 0, 1) 65%,
    rgba(255, 186, 0, 1) 100%
  );
  transition: 0.6s ease-out;
}

.row-card:hover .filledbar {
  width: 120px;
  transition: 0.4s ease-out;
}

.circle {
  position: absolute;
  top: 150px;
  left: calc(50% - 60px);
}

.stroke {
  stroke: white;
  stroke-dasharray: 360;
  stroke-dashoffset: 360;
  transition: 0.6s ease-out;
}

svg {
  fill: #17141d;
  stroke-width: 2px;
}

.row-card:hover .stroke {
  stroke-dashoffset: 100;
  transition: 0.6s ease-out;
}
</style>
