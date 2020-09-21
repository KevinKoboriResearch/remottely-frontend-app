<template>
  <div>
    <!-- :style="$q.dark.isActive ? 'background-color: #000;' : 'background-color: #f6f6f6;'" -->
    <div id="perspective3d">
      <div class="parent">
        <div class="child text-white grow">
          <div
            class="card"
            @click="$router.go()"
          >
            <div id="mac3-preview">
              <div class="child text-black">
                <!-- <q-btn @click="$router.go()"/> -->
                <h1 class="grow-text selectDisable"><small>RELOAD THE PAGE</small></h1>
                <!-- <img class="child" src="../../assets/red.gif" alt="Loading"> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <q-page-sticky
      position="top-left"
      :offset="[40, 40]"
    >
      <!-- <q-btn class="bg-green">oi</q-btn> -->
      <img
        @click="$router.go()"
        src="../../assets/logo/remottely.png"
        height="22"
      >
    </q-page-sticky>
    <q-page-sticky
      position="top-right"
      :offset="[40, 40]"
    >
      <!-- <q-btn class="bg-green">oi</q-btn> -->
      <!-- <img
        @click="$router.go()"
        src="../../assets/logo/your-design-trans-white.png"
        height="22"
      > -->
      <!-- color="orange" -->
      <q-btn
        dense
        padding="none"
        size="18px"
        class="text-white q-mb-sm q-ml-sm"
        @click="$q.fullscreen.toggle()"
        :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
      />
    </q-page-sticky>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  data () {
    return {
      // crep: false
      firstCard: true,
      SecondCard: false
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll (event) {
      if (window.scrollY >= 500) {
        this.SecondCard = true
      }
      if (window.scrollY >= 500) {
        this.firstCard = false
        // }
        // } else if (window.scrollY === 0) {
        //   this.firstCard = true
      }
    }
  }
}
</script>

<style scoped>
html,
body {
  position: fixed;
}
.parent {
  background-color: #fff;
  /* background-image: linear-gradient(#00001c, #00001c 15%, #010144 35%, #00001c 85%, #000000); */
  background-image: linear-gradient(#000024, #010144 25%, #00001c 75%, #000);
  display: flex;
  min-height: 100vh;
}
.child {
  margin: auto;
}

.grow {
  transition: all 0.2s ease-in-out;
  opacity: 0.9;
}
/* .grow:hover {
  transform: scale(1.1);
  opacity: 2;
} */
.grow-text {
  transform: scale(1);
  transition: all 0.2s ease-in-out;
}
.grow-text:hover {
  transform: scale(1.2);
}

#perspective3d .card #mac3-preview {
  -webkit-transform: rotateY(0deg);
  -webkit-box-shadow: 0 0 100px #010172;
  -webkit-transition-property: transform;
  /* -webkit-transition-duration: 1s; */
  transition: all 0.2s ease-in-out;
  display: flex;
  position: relative;
  border-top-left-radius: 1000px;
  border-top-right-radius: 1000px;
  border-bottom-left-radius: 1000px;
  border-bottom-right-radius: 1000px;
}

/* #perspective3d .card:hover{
  transition: transform 1s;
  transform: scale(1.2);
}
#perspective3d .card{
  transition: transform 1s;
  transform: scale(1);
} */

#perspective3d .card:hover #mac3-preview {
  /* -webkit-transform: rotateY(15deg); */
  -webkit-box-shadow: 0 0 100px #0202a0;
  transform: scale(1.1);
  opacity: 2;
}

#mac3-preview {
  width: 30vh;
  height: 30vh;
  background: url("../../assets/orb.gif") center -11.2vh no-repeat;
  background-size: 75vh;
}

/* #mac2-preview iframe {
  position: absolute;
  margin: 94px -323px 0;
  width: 644px;
  height: 364px;
} */

/* BASIC RESET */
ul,
ol,
li,
.card,
h1,
h2,
h3,
h4,
h5,
h6,
pre,
form,
body,
html,
p,
blockquote,
fieldset,
input {
  margin: 0;
  padding: 0;
}

/* HTML ELEMENTS */
/* body { background-color:#deddcd; font:14px/21px Arial,Helvetica,sans-serif; } */
h1 {
  font: bold 0vw/6vw Helvetica, Arial, Sans-serif;
  text-shadow: 0px 0px 5px rgb(255, 255, 255);
}
h1 small {
  font-size: 1.2vh;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  display: block;
  white-space: nowrap;
  transition: all 0.2s ease-in-out;
}
h1 small:hover {
  -webkit-transform: rotateY(20deg);
}
/* h2 a { display: block; text-decoration: none; margin: 0 0 30px 0; font: italic 45px Georgia, Times, Serif;  text-align: center; color: #bfe1f1; text-shadow: 0px 2px 6px #333; }
h2 a:hover { color: #90bcd0; } */

/* COMMON CLASSES */
.break {
  clear: both;
}

/* WRAPPER */
/* #wrapper {
  width:960px;
  margin:40px auto;
} */

/* CONTENT */
#content {
}
#content .info {
  padding: 10px;
}

/* MOVIE POSTERS */
#perspective3d {
  justify: center;
  list-style: none;
  /* margin:0 0; */
  /* height:550px; */
}
#perspective3d .card {
  margin: 100px 0;
  display: inline;
  float: left;
  -webkit-perspective: 500;
  -webkit-transform-style: preserve-3d;
  -webkit-transition-property: perspective;
  -webkit-transition-duration: 0.5s;
}

#perspective3d .card:hover {
  -webkit-perspective: 1500;
}

/* #perspective3d li img {
  border:10px solid #fcfafa;
  -webkit-transform: rotateY(30deg);
  -moz-box-shadow:0 3px 10px #888;
  -webkit-box-shadow:0 3px 10px #888;
  -webkit-transition-property: transform;
  -webkit-transition-duration: 0.5s;
}
#perspective3d li:hover img {
  -webkit-transform: rotateY(0deg);
} */

/* .movieinfo {
  border:10px solid #fcfafa;
  padding:20px; width:200px;
  height:180px;
  background-color:#deddcd;
  margin:-195px 0 0 55px;
  position:absolute;
  -moz-box-shadow:0 20px 40px #888;
  -webkit-box-shadow:0 20px 40px #888;
  -webkit-transform: translateZ(30px)
  rotateY(30deg);
  -webkit-transition-property: transform, box-shadow, margin;
  -webkit-transition-duration: 0.5s;
}
#perspective3d li:hover .movieinfo {
  -webkit-transform: rotateY(0deg);
  -webkit-box-shadow:0 5px 10px #888;
  margin:-175px 0 0 30px;
}
.movieinfo h3 {
  color:#7a3f3a;
  font-variant: small-caps;
  font-family:Georgia,serif,Times;
  text-align:center;
  padding-bottom:15px;
}
.movieinfo p {
  padding-bottom:15px;
}
.movieinfo a {
  background-color:#7a3f3a;
  padding:5px 10px;
  color:#eee;
  text-decoration:none;
  display:block;
  width:80px;
  text-align:center;
  margin:0 auto;
  -moz-border-radius:5px;
  -webkit-border-radius:5px;
}
.movieinfo a:hover, .movieinfo a:focus {
  background-color:#6a191f;
  color:#fff;
} */
</style>
