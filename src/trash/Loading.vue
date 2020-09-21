<template>
  <div :style="$q.dark.isActive ? 'background-color: #000;' : 'background-color: #f6f6f6;'">
    <!-- <div class="q-pb-xl">
    </div> -->
    <div v-if="firstCard" class="q-pt-xl">
      <h1 class="text-center">
        <small><strong> Criando um</strong><strong style="color: #7c50ff;"> único</strong><strong> produto,</strong>
        <br>
        <strong> presente em todas as</strong><strong style="color: #7c50ff;"> plataformas.</strong></small>
      </h1>
    </div>

      <div id="perspective3d" class="row wrap">
        <!-- <transition name="bounce" mode="out-in">
          <div class="card row  col-xs-12 col-sm-12 col-md-12">
            <div id="mac1-preview" class="platform-mac mat-only card row col-xs-12 col-sm-12"
                    :class="SecondCard ? 'col-md-5' : 'col-md-12'"
            >
                    <div class="col">
                      <div class="">
                        <div class="parent">
                          <div class="child text-white">
                            oiasdasdasdadad
                          </div>
                          <img class="child" src="../../assets/1.gif" alt="Loading">
                        </div>
                        <h1 class=" text-center">
                          <small><strong> Criando um</strong><strong :style="$q.dark.isActive ? 'color: #7c50ff;' : 'color: #7c50ff;'"> único</strong>
                          <br>
                          <strong> produto,</strong>
                          <br>
                          <strong> presente em <strong :style="$q.dark.isActive ? 'color: #7c50ff;' : 'color: #7c50ff;'">todas</strong>
                          <br>
                          as plataformas.</strong></small>
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div v-if="firstCard" class="card row  col-xs-0 col-md-1"
                  >
                  </div>
                <transition name="bounce" mode="out-in">
                  <div v-if="SecondCard" class="card row  col-xs-12 col-sm-12 col-md-6">
                    <div class="col">
                      <div id="ios-preview" class="platform-ios mat-only">
                        <iframe id="ios-iframe" frameborder="0" :src="'http://localhost:8080/#/services'"/>
                      </div>
                    </div>
                  </div>
                </transition>
            </div>
        </transition> -->
        <!-- <div
                    class="card row col-xs-12 col-sm-12"
                    :class="SecondCard ? 'col-md-5' : 'col-md-12'"
                  >
                    <div class="col">
                      <div class="">
                        <h1 class=" text-center">
                          <small><strong> Criando um</strong><strong :style="$q.dark.isActive ? 'color: #7c50ff;' : 'color: #7c50ff;'"> único</strong>
                          <br>
                          <strong> produto,</strong>
                          <br>
                          <strong> presente em <strong :style="$q.dark.isActive ? 'color: #7c50ff;' : 'color: #7c50ff;'">todas</strong>
                          <br>
                          as plataformas.</strong></small>
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div v-if="firstCard" class="card row  col-xs-0 col-md-1"
                  >
                  </div>
                <transition name="bounce" mode="out-in">
                  <div v-if="SecondCard" class="card row  col-xs-12 col-sm-12 col-md-6">
                    <div class="col">
                      <div id="ios-preview" class="platform-ios mat-only">
                        <iframe id="ios-iframe" frameborder="0" :src="'http://localhost:8080/#/services'"/>
                      </div>
                    </div>
                  </div>
                </transition> -->
        <div class="parent">
          <div class="child text-white">
            <div class="card row">
          <!-- <div class="col-xs-6 col-sm-6 col-md-6"> -->
                <div id="mac3-preview">
                </div>
          <!-- </div> -->
            </div>
          </div>
        </div>
        <!-- <div class="col-xs-12 col-sm-0 col-md-0">
        </div> -->
        <!-- <div class="card row">
          <div class="col-xs-6 col-sm-6 col-md-6">
            <div id="mac2-preview">
              <h1 class="text-center">
              <small><strong> Criando um</strong><strong style="color: #7c50ff;"> único</strong><strong> produto,</strong>
              <br>
              <strong> presente em todas as</strong><strong style="color: #7c50ff;"> plataformas.</strong></small>
              </h1>
            </div>
          </div>
        </div> -->
        <!-- <div class="col-xs-12 col-sm-0 col-md-0">
        </div> -->
        <!-- <div class="card row">
          <div class="col-xs-6 col-sm-6 col-md-6">
            <div id="mac3-preview">
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-sm-0 col-md-0">
        </div>
        <div class="card row">
          <div class="col-xs-6 col-sm-6 col-md-6">
            <div id="mac3-preview">
            </div>
          </div>
        </div> -->

        <!-- <div class="card text-justify row col-xs-12 col-sm-12 col-md-6">
          <div class="col">
            <h1 class="text-center">
              <small><strong> Criando um</strong><strong style="color: #7c50ff;"> único</strong><strong> produto,</strong>
              <br>
              <strong> presente em todas as</strong><strong style="color: #7c50ff;"> plataformas.</strong></small>
            </h1>
          </div>
        </div>
        <div class="card text-justify row col-xs-12 col-sm-12 col-md-6">
          <div class="col">
            <h1 class="text-center">
              <small><strong> Criando um</strong><strong style="color: #7c50ff;"> único</strong><strong> produto,</strong>
              <br>
              <strong> presente em todas as</strong><strong style="color: #7c50ff;"> plataformas.</strong></small>
            </h1>
          </div>
        </div>
        <div class="card row col-xs-6 col-sm-6 col-md-6">
          <div class="col">
            <div id="mac2-preview">
            </div>
          </div>
        </div> -->
    </div>
  </div>
</template>

<script>
export default {
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
.parent{
  /* background-color: rgb(0, 0, 0); */
  display: flex;
  min-height: 100vh;
}
.child{
  margin: auto;
}

#perspective3d #ios-preview {
  /* border:1px solid #fff; */
  -webkit-transform: rotateY(-10deg);
  width: 342px;
  /* -moz-box-shadow:0 3px 10px #888;
  -webkit-box-shadow:0 3px 10px #888; */
  -webkit-transition-property: transform;
  -webkit-transition-duration: 1s;
}
#perspective3d :hover #ios-preview {
  width: 342px;
  -webkit-transform: rotateY(0deg);
}

#ios-preview {
  text-align: center;
  width: 98vw;
  height: 678px;
  background: url('../../assets/frames copy/iphonex-2.png') center center no-repeat;
  background-size: 486px;
  margin: -50px auto 0;
  /* text-align: center;
  width: 600px;
  height: 400px;
  background: url('../../assets/frames/iphonex-2.png') center center no-repeat;
  background-size: 1000px;
  margin: -40px auto 0; */
}

#ios-preview iframe {
  margin: 22px -12px auto 0;
  width: 294px;
  height: 636px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
}

#perspective3d .card #mac1-preview {
  border:1px solid #fff;
  -webkit-transform: rotateY(16deg);
  -moz-box-shadow:0 3px 10px #888;
  -webkit-box-shadow:0 3px 10px #888;
  -webkit-transition-property: transform;
  -webkit-transition-duration: 1s;
  background-color: rgb(0, 0, 0);
  display: flex;
  /* min-height: 100vh; */
}
#perspective3d .card:hover #mac1-preview {
  -webkit-transform: rotateY(0deg);
}

#mac1-preview {
  /* text-align: center; */
  width: 95vw;
  height: 20vw;
  background: url('../../assets/red.gif') center center no-repeat;
  /* background-size: 100vw; */
  /* margin: 0 auto 0; */
  margin: auto;
}

#perspective3d .card #mac2-preview {
  border:1px solid #fff;
  -webkit-transform: rotateY(-10deg);
  -moz-box-shadow:0 3px 10px #888;
  -webkit-box-shadow:0 3px 10px #888;
  -webkit-transition-property: transform;
  -webkit-transition-duration: 1s;
  display: flex;
  /* justify-content: center; */
  /* align-items: center; */
  position: relative;
}
#perspective3d .card:hover #mac2-preview {
  -webkit-transform: rotateY(0deg);
}

#mac2-preview {
  /* left: 5%; */
  right: 5%;
  /* text-align: center; */
  width: 50vw;
  height: 50vw;
  background: url('../../assets/logo/your-design-trans-light.png') center center no-repeat;
  background-size: 46vw;
  /* margin: -40px auto 0; */
}

#perspective3d .card #mac2-2-preview {
  -webkit-transform: rotateY(10deg);
  -webkit-transition-property: transform;
  -webkit-transition-duration: 1s;
}
#perspective3d .card:hover #mac2-2-preview {
  -webkit-transform: rotateY(0deg);
}

#mac2-2-preview {
  text-align: center;
  width: 700px;
  height: 400px;
}

#perspective3d .card #mac3-preview {
  /* text-align: center;
  content: center; */
  border:1px solid #fff;
  -webkit-transform: rotateY(10deg);
  -moz-box-shadow:0 3px 10px #888;
  -webkit-box-shadow:0 3px 10px #888;
  -webkit-transition-property: transform;
  -webkit-transition-duration: 1s;
  display: flex;
  /* justify-content: center; */
  /* align-items: center; */
  position: relative;
}
#perspective3d .card:hover #mac3-preview {
  -webkit-transform: rotateY(0deg);
}

#mac3-preview {
  /* position: absolute; */
  left: 5%;
  /* right: 5%; */
  /* top: 50%; */
  /* transform: translate(-50%,-50%); */
  width: 50vw;
  height: 50vw;
  background: url('../../assets/logo/your-design-trans-light.png') center center no-repeat;
  background-size: 46vw;
}

#perspective3d .card #mac3-2-preview {
  -webkit-transform: rotateY(-10deg);
  -webkit-transition-property: transform;
  -webkit-transition-duration: 1s;
}
#perspective3d .card:hover #mac3-2-preview {
  -webkit-transform: rotateY(0deg);
}

#mac3-2-preview {
  text-align: center;
  width: 700px;
  height: 400px;
}

/* #mac2-preview iframe {
  position: absolute;
  margin: 94px -323px 0;
  width: 644px;
  height: 364px;
} */

/* BASIC RESET */
ul,ol,li,.card,h1,h2,h3,h4,h5,h6,pre,form,body,html,p,blockquote,fieldset,input{margin:0; padding:0;}

/* HTML ELEMENTS */
/* body { background-color:#deddcd; font:14px/21px Arial,Helvetica,sans-serif; } */
h1 { font: bold 0vw/6vw Helvetica, Arial, Sans-serif; text-shadow: -6px 4px 7px #444; }
h1 small{ font-size: 20px; text-transform:uppercase; letter-spacing: 14px; display: block; }
/* h2 a { display: block; text-decoration: none; margin: 0 0 30px 0; font: italic 45px Georgia, Times, Serif;  text-align: center; color: #bfe1f1; text-shadow: 0px 2px 6px #333; }
h2 a:hover { color: #90bcd0; } */

/* COMMON CLASSES */
.break {
  clear:both;
}

/* WRAPPER */
#wrapper {
  width:960px;
  margin:40px auto;
}

/* CONTENT */
#content { }
#content .info {
  padding:10px;
}

/* MOVIE POSTERS */
#perspective3d {
  justify: center;
  list-style:none;
  /* margin:0 0; */
  /* height:550px; */
}
#perspective3d .card {
  margin:100px 0;
  display:inline;
  float:left;
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
